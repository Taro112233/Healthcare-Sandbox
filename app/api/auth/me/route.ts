// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED' 
      }, { status: 401 });
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
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
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!userData) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found',
        code: 'USER_NOT_FOUND' 
      }, { status: 404 });
    }

    if (!userData.isActive || userData.status !== 'ACTIVE') {
      return NextResponse.json({ 
        success: false, 
        error: 'User account not active',
        code: 'ACCOUNT_INACTIVE' 
      }, { status: 403 });
    }

    const response = {
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone,
        role: userData.role as 'USER' | 'ADMIN',
        status: userData.status,
        isActive: userData.isActive,
        emailVerified: userData.emailVerified,
        lastLogin: userData.lastLogin,
        avatar: `https://ui-avatars.com/api/?name=${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}&background=3B82F6&color=ffffff&size=128&rounded=true`,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
      session: {
        isTokenExpiringSoon: false,
        timezone: 'Asia/Bangkok',
        language: 'th',
      },
    };

    return NextResponse.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Get user data error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}