// components/AuthGuard.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect } from "react";

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

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    
    if (!user && !isPublicRoute) {
      router.push("/login");
    }

    // Admin route check
    if (pathname.startsWith("/admin") && user?.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [user, loading, pathname, router]);

  return <>{children}</>;
}