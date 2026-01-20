// components/providers/AuthProvider.tsx
// Project NextGen - Auth Provider

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";

// Types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: "USER" | "ADMIN";
  status: string;
  isActive: boolean;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: {
    email: (data: {
      email: string;
      password: string;
      rememberMe?: boolean;
    }) => Promise<void>;
    google: () => Promise<void>;
  };
  signUp: (data: {
    email: string;
    password: string;
    name: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending, refetch } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

  // Transform session user to our AuthUser type
  const user: AuthUser | null = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        firstName: (session.user as any).firstName || session.user.name?.split(" ")[0] || "",
        lastName: (session.user as any).lastName || session.user.name?.split(" ").slice(1).join(" ") || "",
        phone: (session.user as any).phone || null,
        role: ((session.user as any).role as "USER" | "ADMIN") || "USER",
        status: (session.user as any).status || "ACTIVE",
        isActive: (session.user as any).isActive ?? true,
        image: session.user.image || undefined,
        emailVerified: session.user.emailVerified || false,
        createdAt: new Date(session.user.createdAt),
        updatedAt: new Date(session.user.updatedAt),
      }
    : null;

  const handleSignInEmail = async (data: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    const result = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe ?? true,
    });

    if (result.error) {
      throw new Error(result.error.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  const handleSignInGoogle = async () => {
    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });

    if (result.error) {
      throw new Error(result.error.message || "เข้าสู่ระบบด้วย Google ไม่สำเร็จ");
    }
  };

  const handleSignUp = async (data: {
    email: string;
    password: string;
    name: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => {
    const result = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      // Additional fields
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || "",
      role: "USER",
      status: "ACTIVE",
      isActive: true,
    } as any);

    if (result.error) {
      throw new Error(result.error.message || "สมัครสมาชิกไม่สำเร็จ");
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  const handleRefetch = async () => {
    await refetch();
  };

  const value: AuthContextType = {
    user,
    loading: isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    signIn: {
      email: handleSignInEmail,
      google: handleSignInGoogle,
    },
    signUp: handleSignUp,
    signOut: handleSignOut,
    refetch: handleRefetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export for backward compatibility
export { useAuth as useCurrentUser };