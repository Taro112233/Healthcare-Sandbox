// app/api/auth/me/route.ts
// HealthTech Sandbox - Get Current User API

import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth-server';
import { prisma } from '@/lib/prisma';
import type { JWTUser } from '@/lib/auth';

// ===== RESPONSE INTERFACE =====
interface UserDataResponse {
  user: {
    id: string;
    username: string;
    email: string | null;
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string | null;
    role: 'USER' | 'ADMIN';
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

// ===== GET CURRENT USER =====
export async function GET(request: NextRequest) {
  try {
    // Verify JWT from cookie
    const user: JWTUser | null = await getServerUser();
    
    if (!user) {
      console.log('❌ No valid auth token found');
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required',
        message: 'กรุณาเข้าสู่ระบบ',
        code: 'AUTH_REQUIRED' 
      }, { status: 401 });
    }

    // Fetch complete user data from database
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

    // User not found in database (deleted or invalid)
    if (!userData) {
      console.log(`❌ User not found: ${user.userId}`);
      return NextResponse.json({ 
        success: false, 
        error: 'User not found',
        message: 'ไม่พบข้อมูลผู้ใช้',
        code: 'USER_NOT_FOUND' 
      }, { status: 404 });
    }

    // User account inactive
    if (!userData.isActive || userData.status !== 'ACTIVE') {
      console.log(`❌ Inactive account: ${user.userId}`);
      return NextResponse.json({ 
        success: false, 
        error: 'User account not active',
        message: 'บัญชีถูกระงับการใช้งาน',
        code: 'ACCOUNT_INACTIVE' 
      }, { status: 403 });
    }

    // Build response
    const response: UserDataResponse = {
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

    console.log(`✅ User data fetched: ${userData.username}`);

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
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

// ===== HELPER FUNCTIONS =====

/**
 * Generate avatar URL using UI Avatars service
 */
function generateAvatarUrl(firstName: string, lastName: string): string {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=3B82F6&color=ffffff&size=128&rounded=true`;
}

/**
 * Check if JWT token is expiring soon (within 24 hours)
 */
function checkTokenExpiry(user: JWTUser): boolean {
  if (user.exp) {
    const now = Math.floor(Date.now() / 1000);
    const timeToExpiry = user.exp - now;
    // Warn if token expires in less than 24 hours
    return timeToExpiry < 24 * 60 * 60;
  }
  return false;
}