// lib/reserved-routes.ts
// HealthTech Sandbox - Reserved Routes (Simplified)
// Note: Currently not used - kept for future expansion

/**
 * System reserved paths (cannot be used as slugs)
 */
export const SYSTEM_RESERVED = [
  'api',
  '_next',
  'static',
  'images',
  'icons',
  'favicon',
  'manifest',
  'robots',
  'admin',
  'system',
  'auth',
  'health',
] as const;

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/showcase',
] as const;

/**
 * Public API routes (no auth required)
 */
export const PUBLIC_API_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/health',
] as const;

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number]);
}

export function isPublicApiRoute(pathname: string): boolean {
  return PUBLIC_API_ROUTES.some(route => pathname.startsWith(route));
}

export type SystemReserved = (typeof SYSTEM_RESERVED)[number];
export type PublicRoute = (typeof PUBLIC_ROUTES)[number];