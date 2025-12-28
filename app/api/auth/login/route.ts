// app/api/auth/login/route.ts
// HealthTech Sandbox - Login API (Simplified - Includes Role)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createToken, getCookieOptions, userToPayload } from '@/lib/auth';
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
      refillRate: 3,
      interval: "5m",
      capacity: 5,
    }),
    slidingWindow({
      mode: "LIVE",
      characteristics: ["ip.src"],
      interval: "1h",
      max: 10,
    }),
  ],
});

const LoginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

interface ValidationError {
  field: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const decision = await aj.protect(request, { requested: 1 });
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        console.log(`🚨 Login rate limit exceeded from IP: ${clientIp}`);
        return NextResponse.json(
          { 
            success: false,
            error: "Too many login attempts", 
            message: "กรุณารอ 5 นาทีก่อนลองใหม่",
            retryAfter: 300
          },
          { 
            status: 429,
            headers: { 'Retry-After': '300' }
          }
        );
      }
      
      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validation = LoginSchema.safeParse(body);
    
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

    const { username, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      select: {
        id: true, 
        username: true, 
        email: true, 
        password: true,
        firstName: true, 
        lastName: true, 
        phone: true,
        role: true,
        status: true, 
        isActive: true, 
        emailVerified: true, 
        lastLogin: true, 
        createdAt: true, 
        updatedAt: true,
      }
    });

    if (!user) {
      console.log(`❌ Login failed - user not found: ${username} from IP: ${clientIp}`);
      return NextResponse.json({ success: false, error: 'Username ไม่พบในระบบ' }, { status: 401 });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      console.log(`❌ Login failed - invalid password: ${username} from IP: ${clientIp}`);
      return NextResponse.json({ success: false, error: 'รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }

    if (user.status !== 'ACTIVE' || !user.isActive) {
      console.log(`❌ Login failed - inactive account: ${username} from IP: ${clientIp}`);
      return NextResponse.json({ success: false, error: 'บัญชีถูกระงับการใช้งาน' }, { status: 403 });
    }

    console.log(`✅ Login successful: ${username} (role: ${user.role}) from IP: ${clientIp}`);

    // Create JWT with role
    const userPayload = userToPayload(user);
    const token = await createToken(userPayload);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    const userResponse = {
      id: user.id, 
      username: user.username, 
      email: user.email,
      firstName: user.firstName, 
      lastName: user.lastName,
      phone: user.phone,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
      status: user.status, 
      isActive: user.isActive,
      emailVerified: user.emailVerified, 
      createdAt: user.createdAt, 
      updatedAt: user.updatedAt,
    };

    const response = NextResponse.json({
      success: true, 
      message: 'เข้าสู่ระบบสำเร็จ',
      user: userResponse, 
      token: token,
    });

    response.cookies.set('auth-token', token, getCookieOptions());
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}