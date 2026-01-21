// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/products",
  "/about",
  "/terms-of-service",
  "/privacy-policy",
  "/request-policy",
];

// Routes that don't require onboarding completion
const ONBOARDING_EXEMPT_ROUTES = [
  "/onboarding",
  "/api/onboarding",
  "/api/auth",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Allow Better Auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Get session from Better Auth
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // No session - redirect to login
  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check onboarding completion
  const user = session.user as any;
  const isOnboardingExempt = ONBOARDING_EXEMPT_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!user.onboardingCompleted && !isOnboardingExempt) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { success: false, error: "Onboarding required" },
        { status: 403 }
      );
    }
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    const userRole = user.role;
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // ✅ Inject user info into headers (ASCII-safe values only)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", session.user.id);
  requestHeaders.set("x-user-email", session.user.email);
  requestHeaders.set("x-user-role", user.role || "USER");
  requestHeaders.set(
    "x-user-onboarding-completed",
    String(user.onboardingCompleted || false)
  );
  // ✅ Don't send names in headers to avoid encoding issues
  // API routes will query names from database using x-user-id when needed

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|images|icons).*)",
  ],
};