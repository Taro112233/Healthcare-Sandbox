// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { prisma } from '@/lib/prisma';
import type { JWTUser } from '@/lib/auth';

interface CompleteUserData {
  user: {
    id: string;
    username: string;
    email: string | null;
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string | null;
    role: string;
    status: string;
    isActive: boolean;
    emailVerified: boolean;
    lastLogin: Date | null;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
  };
  session: {
    isTokenExpiringSoon: boolean;
    timezone: string;
    language: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const user: JWTUser | null = await getServerUser();
    
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

    if (!userData || !userData.isActive || userData.status !== 'ACTIVE') {
      return NextResponse.json({ 
        success: false, 
        error: 'User account not active',
        code: 'ACCOUNT_INACTIVE' 
      }, { status: 403 });
    }

    const response: CompleteUserData = {
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone,
        role: userData.role,
        status: userData.status,
        isActive: userData.isActive,
        emailVerified: userData.emailVerified,
        lastLogin: userData.lastLogin,
        avatar: generateAvatarUrl(userData.firstName, userData.lastName),
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
      session: {
        isTokenExpiringSoon: checkTokenExpiry(user),
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

function generateAvatarUrl(firstName: string, lastName: string): string {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=3B82F6&color=ffffff&size=128&rounded=true`;
}

function checkTokenExpiry(user: JWTUser): boolean {
  if (user.exp) {
    const now = Math.floor(Date.now() / 1000);
    const timeToExpiry = user.exp - now;
    return timeToExpiry < 24 * 60 * 60;
  }
  return false;
}