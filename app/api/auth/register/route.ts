// app/api/auth/register/route.ts
// HealthTech Sandbox - Register API (Simplified - No Multi-tenant)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createToken, getCookieOptions, userToPayload } from '@/lib/auth';
import { z } from 'zod';
import arcjet, { shield, tokenBucket, slidingWindow } from "@arcjet/next";

// ===== ARCJET CONFIGURATION =====
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip.src"],
      refillRate: 2,
      interval: "10m",
      capacity: 3,
    }),
    slidingWindow({
      mode: "LIVE",
      characteristics: ["ip.src"],
      interval: "1h",
      max: 5,
    }),
  ],
});

// ===== VALIDATION SCHEMA =====
const RegisterSchema = z.object({
  username: z.string()
    .min(3, 'Username ต้องมีอย่างน้อย 3 ตัวอักษร')
    .max(50, 'Username ต้องไม่เกิน 50 ตัวอักษร')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Username ใช้ได้เฉพาะ a-z, 0-9, ., _, -'),
  password: z.string()
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
    .max(100, 'รหัสผ่านต้องไม่เกิน 100 ตัวอักษร'),
  firstName: z.string()
    .min(1, 'กรุณากรอกชื่อ')
    .max(100, 'ชื่อต้องไม่เกิน 100 ตัวอักษร')
    .trim(),
  lastName: z.string()
    .min(1, 'กรุณากรอกนามสกุล')
    .max(100, 'นามสกุลต้องไม่เกิน 100 ตัวอักษร')
    .trim(),
  email: z.string()
    .email('รูปแบบอีเมลไม่ถูกต้อง')
    .max(255)
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .max(20)
    .optional()
    .or(z.literal('')),
});

interface ValidationError {
  field: string;
  message: string;
}

interface PrismaError {
  code?: string;
  meta?: {
    target?: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    // ===== ARCJET PROTECTION =====
    const decision = await aj.protect(request, { requested: 1 });
    const clientIp = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        console.log(`🚨 Registration rate limit exceeded from IP: ${clientIp}`);
        return NextResponse.json(
          { 
            success: false,
            error: "Too many registration attempts", 
            message: "กรุณารอ 10 นาทีก่อนลองใหม่",
            retryAfter: 600
          },
          { 
            status: 429,
            headers: { 'Retry-After': '600' }
          }
        );
      }
      
      if (decision.reason.isShield()) {
        console.log(`🛡️ Registration attempt blocked by shield from IP: ${clientIp}`);
        return NextResponse.json(
          { success: false, error: "Request blocked by security filter" },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 }
      );
    }

    // ===== VALIDATE INPUT =====
    const body = await request.json();
    const validation = RegisterSchema.safeParse(body);
    
    if (!validation.success) {
      const details: ValidationError[] = validation.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details
        },
        { status: 400 }
      );
    }

    const { username, password, firstName, lastName, email, phone } = validation.data;
    const cleanEmail = email?.trim() || null;
    const cleanPhone = phone?.trim() || null;

    console.log(`📝 Registration attempt: ${username} from IP: ${clientIp}`);

    // ===== CHECK EXISTING USERNAME =====
    const existingUser = await prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    });

    if (existingUser) {
      console.log(`❌ Registration failed - username exists: ${username} from IP: ${clientIp}`);
      return NextResponse.json(
        { success: false, error: 'Username นี้มีผู้ใช้งานแล้ว' }, 
        { status: 409 }
      );
    }

    // ===== CHECK EXISTING EMAIL (if provided) =====
    if (cleanEmail) {
      const existingEmailUser = await prisma.user.findFirst({
        where: { email: cleanEmail.toLowerCase() }
      });
      if (existingEmailUser) {
        console.log(`❌ Registration failed - email exists: ${cleanEmail} from IP: ${clientIp}`);
        return NextResponse.json(
          { success: false, error: 'อีเมลนี้มีผู้ใช้งานแล้ว' }, 
          { status: 409 }
        );
      }
    }

    // ===== HASH PASSWORD =====
    const hashedPassword = await hashPassword(password);

    // ===== CREATE USER =====
    const newUser = await prisma.user.create({
      data: {
        username: username.toLowerCase(), 
        password: hashedPassword,
        firstName: firstName.trim(), 
        lastName: lastName.trim(),
        email: cleanEmail?.toLowerCase(), 
        phone: cleanPhone,
        role: 'USER',  // Default role
        status: 'ACTIVE', 
        isActive: true, 
        emailVerified: false,
      },
      select: {
        id: true, 
        username: true, 
        email: true, 
        firstName: true, 
        lastName: true,
        phone: true, 
        role: true,
        status: true, 
        isActive: true, 
        emailVerified: true,
        createdAt: true, 
        updatedAt: true,
      }
    });

    console.log(`✅ Registration successful: ${username} (role: ${newUser.role}) from IP: ${clientIp}`);

    // ===== CREATE JWT TOKEN =====
    const userPayload = userToPayload(newUser);
    const token = await createToken(userPayload);

    // ===== BUILD RESPONSE =====
    const userResponse = {
      id: newUser.id, 
      username: newUser.username, 
      email: newUser.email,
      firstName: newUser.firstName, 
      lastName: newUser.lastName,
      fullName: `${newUser.firstName} ${newUser.lastName}`,
      phone: newUser.phone, 
      role: newUser.role,
      status: newUser.status, 
      isActive: newUser.isActive,
      emailVerified: newUser.emailVerified, 
      createdAt: newUser.createdAt, 
      updatedAt: newUser.updatedAt,
    };

    const response = NextResponse.json({
      success: true, 
      message: 'สมัครสมาชิกสำเร็จ', 
      user: userResponse,
      token,
    });

    response.cookies.set('auth-token', token, getCookieOptions());
    return response;

  } catch (error) {
    console.error('Registration error:', error);
    
    const prismaError = error as PrismaError;
    
    if (prismaError?.code === 'P2002') {
      const target = prismaError?.meta?.target;
      if (target?.includes('username')) {
        return NextResponse.json({ 
          success: false, 
          error: 'Username นี้มีผู้ใช้งานแล้ว' 
        }, { status: 409 });
      }
      if (target?.includes('email')) {
        return NextResponse.json({ 
          success: false, 
          error: 'อีเมลนี้มีผู้ใช้งานแล้ว' 
        }, { status: 409 });
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}