// app/api/profile/basic-info/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromHeaders } from '@/lib/auth-server';
import { z } from 'zod';

const UpdateBasicInfoSchema = z.object({
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  firstName: z.string().min(1, 'กรุณากรอกชื่อ').max(100).trim(),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล').max(100).trim(),
  phone: z.string().max(20).optional().or(z.literal('')),
});

export async function PATCH(request: NextRequest) {
  try {
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const validation = UpdateBasicInfoSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details: validation.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    const { email, firstName, lastName, phone } = validation.data;
    
    // Check email uniqueness
    const cleanEmail = email?.trim().toLowerCase() || null;
    
    if (cleanEmail) {
      const emailExists = await prisma.user.findFirst({
        where: { 
          email: cleanEmail,
          NOT: { id: userInfo.userId }
        }
      });
      
      if (emailExists) {
        return NextResponse.json(
          { success: false, error: 'อีเมลนี้มีผู้ใช้งานแล้ว' },
          { status: 409 }
        );
      }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userInfo.userId },
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: cleanEmail,
        phone: phone?.trim() || null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        updatedAt: true,
      },
    });
    
    console.log(`✅ Basic info updated: ${userInfo.userId}`);
    
    return NextResponse.json({
      success: true,
      data: {
        ...updatedUser,
        fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
      },
      message: 'อัปเดตข้อมูลสำเร็จ',
    });
    
  } catch (error) {
    console.error('Update basic info error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}