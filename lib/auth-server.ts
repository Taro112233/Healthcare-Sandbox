// lib/auth-server.ts
// Project NextGen - Server-side User Verification Utilities (Simplified)

import { cookies } from 'next/headers';
import { verifyToken, JWTUser, UserRole } from './auth';
import { prisma } from './prisma';

/**
 * Get current user from server-side (JWT with role)
 */
export async function getServerUser(): Promise<JWTUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
      return null;
    }

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive || user.status !== 'ACTIVE') {
      return null;
    }

    return {
      userId: user.id,
      email: user.email || '',
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
    };
  } catch (error) {
    console.error('Server user verification failed:', error);
    return null;
  }
}

/**
 * Get user from request headers (injected by middleware)
 */
export function getUserFromHeaders(headers: Headers): {
  userId: string;
  email: string;
  username: string;
  role: UserRole;
} | null {
  const userId = headers.get('x-user-id');
  const email = headers.get('x-user-email');
  const username = headers.get('x-username');
  const role = headers.get('x-user-role') as UserRole;

  if (!userId || !username) {
    return null;
  }

  return { 
    userId, 
    email: email || '',
    username,
    role: role || 'USER',
  };
}

/**
 * Check if user is admin (from headers or DB)
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    
    return user?.role === 'ADMIN';
  } catch (error) {
    console.error('Admin check failed:', error);
    return false;
  }
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<JWTUser> {
  const user = await getServerUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}

/**
 * Require admin role - throws if not admin
 */
export async function requireAdmin(): Promise<JWTUser> {
  const user = await requireAuth();
  
  if (user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  
  return user;
}

/**
 * API route helper - check auth from headers
 */
export function withAuth(
  handler: (userId: string, role: UserRole) => Promise<Response>
) {
  return async (request: Request) => {
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return await handler(userInfo.userId, userInfo.role);
  };
}

/**
 * API route helper - check admin from headers
 */
export function withAdmin(
  handler: (userId: string) => Promise<Response>
) {
  return async (request: Request) => {
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (userInfo.role !== 'ADMIN') {
      return new Response(
        JSON.stringify({ success: false, error: 'Admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return await handler(userInfo.userId);
  };
}

/**
 * Check request ownership (user owns the request or is admin)
 */
export async function checkRequestOwnership(
  userId: string,
  role: UserRole,
  requestId: string
): Promise<{ hasAccess: boolean; isOwner: boolean; request: unknown | null }> {
  try {
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    
    if (!request) {
      return { hasAccess: false, isOwner: false, request: null };
    }
    
    const isOwner = request.userId === userId;
    const hasAccess = isOwner || role === 'ADMIN';
    
    return { hasAccess, isOwner, request };
  } catch (error) {
    console.error('Ownership check failed:', error);
    return { hasAccess: false, isOwner: false, request: null };
  }
}

/**
 * Check comment permission (user owns the request or is admin)
 */
export async function canCommentOnRequest(
  userId: string,
  role: UserRole,
  requestId: string
): Promise<boolean> {
  // Admins can comment anywhere
  if (role === 'ADMIN') return true;
  
  // Users can only comment on their own requests
  const result = await checkRequestOwnership(userId, role, requestId);
  return result.isOwner;
}