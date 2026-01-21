// app/onboarding/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Stethoscope,
  AlertTriangle,
  UserCheck,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Skeleton } from "@/components/ui/skeleton";

interface OnboardingFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

function OnboardingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center from-teal-500/10 via-emerald-500/10 to-cyan-500/10 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <Skeleton className="h-7 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-11 w-full" />
            </div>
            <Skeleton className="h-11 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: userLoading, isAuthenticated } = useCurrentUser();

  const [formData, setFormData] = useState<OnboardingFormData>({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [userLoading, isAuthenticated, router]);

  // Redirect if already completed onboarding
  useEffect(() => {
    if (user && (user as any).onboardingCompleted) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Pre-fill if data exists - only once
  useEffect(() => {
    if (user && !isInitialized) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: (user as any).phone || "",
      });
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  if (userLoading) {
    return <OnboardingSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const validateForm = (): boolean => {
    if (!formData.firstName?.trim()) {
      setError("กรุณากรอกชื่อ");
      return false;
    }

    if (!formData.lastName?.trim()) {
      setError("กรุณากรอกนามสกุล");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim() || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "บันทึกข้อมูลไม่สำเร็จ");
      }

      toast.success("บันทึกข้อมูลสำเร็จ!", {
        description: "ยินดีต้อนรับเข้าสู่ Project NextGen",
      });

      // ✅ Same pattern as login
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "เกิดข้อผิดพลาด";
      setError(errorMsg);
      toast.error("เกิดข้อผิดพลาด", {
        description: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-teal-500/10 via-emerald-500/10 to-cyan-500/10 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 mb-4 group hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-foreground">
                Project NextGen
              </h1>
              <p className="text-sm text-muted-foreground">
                Next-Generation Healthcare Innovation Sandbox
              </p>
            </div>
          </Link>
        </div>

        {/* Onboarding Form */}
        <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">
              กรอกข้อมูลเพิ่มเติม
            </CardTitle>
            <CardDescription className="text-center">
              กรุณากรอกข้อมูลเพื่อใช้งานระบบ
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  <User className="w-4 h-4 inline mr-1" />
                  ชื่อ *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="ชื่อ"
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="given-name"
                  autoFocus
                  required
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  <User className="w-4 h-4 inline mr-1" />
                  นามสกุล *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="นามสกุล"
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="family-name"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-1" />
                  เบอร์โทรศัพท์ (ไม่บังคับ)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="08x-xxx-xxxx"
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="tel"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 text-base bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    เริ่มใช้งาน
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Project NextGen - Next-Generation Healthcare Innovation Sandbox</p>
          <p>© 2025 - Educational & Experimental Use Only</p>
        </div>
      </div>
    </div>
  );
}