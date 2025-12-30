// middleware.ts
// HealthTech Sandbox - Authentication & Security Middleware
// Simplified - No Multi-tenant Logic

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

// ===== ARCJET SECURITY (AUTH ENDPOINTS ONLY) =====
const ajAuth = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR"],
    }),
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip.src"],
      refillRate: 3,
      interval: "5m",
      capacity: 5,
    }),
  ],
});

// ===== PUBLIC ROUTES (NO AUTH REQUIRED) =====
const PUBLIC_ROUTES = ['/', '/login', '/register', '/showcase'];
const PUBLIC_API_ROUTES = ['/api/auth/login', '/api/auth/register'];
const AUTH_ENDPOINTS = ['/api/auth/login', '/api/auth/register'];

// ===== SECURITY: Detect suspicious payloads =====
function hasSuspiciousPatterns(obj: any): boolean {
  const suspicious = [
    '__proto__',
    'constructor',
    'prototype',
    'eval(',
    'Function(',
    'require(',
    'import(',
    'process.env',
  ];
  
  try {
    const str = JSON.stringify(obj);
    return suspicious.some(pattern => str.includes(pattern));
  } catch {
    return true; // Cannot serialize = suspicious
  }
}

// ===== SECURITY: Validate request payload =====
async function validateRequestPayload(request: NextRequest): Promise<boolean> {
  const contentType = request.headers.get('content-type');
  
  if (contentType?.includes('application/json')) {
    try {
      const clonedRequest = request.clone();
      const text = await clonedRequest.text();
      
      if (text) {
        const parsed = JSON.parse(text);
        
        if (hasSuspiciousPatterns(parsed)) {
          const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
          
          console.error('🚨 Suspicious payload detected:', {
            ip: clientIp,
            path: request.nextUrl.pathname,
          });
          
          return false;
        }
      }
    } catch (e) {
      // Invalid JSON
      return false;
    }
  }
  
  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';

  // ===== SKIP STATIC FILES =====
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/manifest') ||
    pathname.startsWith('/robots') ||
    (pathname.includes('.') && !pathname.includes('/api/'))
  ) {
    return NextResponse.next();
  }

  // ===== SECURITY: Validate payload for POST/PUT/PATCH requests =====
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const isValid = await validateRequestPayload(request);
    
    if (!isValid) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request payload' 
        },
        { status: 400 }
      );
    }
  }

  // ===== ARCJET PROTECTION (AUTH ENDPOINTS ONLY) =====
  try {
    if (AUTH_ENDPOINTS.some(endpoint => pathname.startsWith(endpoint))) {
      const decision = await ajAuth.protect(request, { requested: 1 });

      if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          console.log(`⛔ Auth rate limit exceeded from IP: ${clientIp}`);
          
          return NextResponse.json(
            { 
              success: false,
              error: "Too many authentication attempts",
              retryAfter: 300
            },
            { status: 429, headers: { 'Retry-After': '300' } }
          );
        } 
        
        console.log(`🛡️ Auth request blocked from IP: ${clientIp}`);
        
        return NextResponse.json(
          { success: false, error: "Access denied" },
          { status: 403 }
        );
      }
    }
  } catch (arcjetError) {
    console.error('🚨 Arcjet protection failed:', arcjetError);
  }

  // ===== PUBLIC ROUTES =====
  if (PUBLIC_ROUTES.includes(pathname) || 
      PUBLIC_API_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // ===== AUTH REQUIRED - CHECK TOKEN =====
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    console.log(`❌ No token for ${pathname}, redirecting to login`);
    
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ===== VERIFY TOKEN =====
  try {
    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
      throw new Error('Invalid token');
    }

    console.log(`✅ User authenticated: ${payload.userId} (${payload.role})`);
    
    // ===== INJECT USER HEADERS (FOR API ROUTES) =====
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email || '');
    requestHeaders.set('x-username', payload.username);
    requestHeaders.set('x-user-role', payload.role);
    
    return NextResponse.next({
      request: { headers: requestHeaders },
    });

  } catch (error) {
    console.log(`❌ Token verification failed for ${pathname}`);

    const response = pathname.startsWith('/api/')
      ? NextResponse.json(
          { success: false, error: 'Invalid or expired token' },
          { status: 401 }
        )
      : NextResponse.redirect(new URL('/login', request.url));

    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|images|icons).*)',
  ],
};