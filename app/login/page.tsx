// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 1. นำเข้า Link
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
  Eye,
  EyeOff,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, loading } = useAuth();
  const router = useRouter();

  // ... (ส่วนฟังก์ชัน validateForm, handleSubmit, handleInputChange, handleRegisterClick เหมือนเดิม)
  const validateForm = (): boolean => {
    if (!formData.username?.trim()) {
      setError("กรุณากรอก Username");
      toast.error("ข้อมูลไม่ครบถ้วน", {
        description: "กรุณากรอก Username เพื่อเข้าสู่ระบบ",
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 4000,
      });
      return false;
    }

    if (!formData.password?.trim()) {
      setError("กรุณากรอกรหัสผ่าน");
      toast.error("ข้อมูลไม่ครบถ้วน", {
        description: "กรุณากรอกรหัสผ่านเพื่อเข้าสู่ระบบ",
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError("");
    const loadingToast = toast.loading("กำลังเข้าสู่ระบบ...", {
      description: "กรุณารอสักครู่",
    });
    try {
      await login({
        username: formData.username.trim(),
        password: formData.password,
      });
      toast.dismiss(loadingToast);
      toast.success("เข้าสู่ระบบสำเร็จ!", {
        description: "ยินดีต้อนรับเข้าสู่ HealthTech Sandbox",
        duration: 2000,
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMsg = error instanceof Error ? error.message : "เข้าสู่ระบบไม่สำเร็จ";
      setError(errorMsg);
      // ... (toast error handling logic เหมือนเดิม)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500/10 to-emerald-500/10">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground text-sm">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 p-4">
      <div className="w-full max-w-md">
        
        {/* Header - เพิ่ม Link คลุมไว้ */}
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
                HealthTech Sandbox
              </h1>
              <p className="text-sm text-muted-foreground">
                Technology Request Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm">
          {/* ... ส่วนที่เหลือเหมือนเดิม ... */}
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">เข้าสู่ระบบ</CardTitle>
            <CardDescription className="text-center">
              กรอก Username และรหัสผ่านเพื่อเข้าสู่ระบบ
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="กรอก Username"
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">รหัสผ่าน</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="กรอกรหัสผ่าน"
                    disabled={isLoading}
                    className="h-11 pr-10"
                    autoComplete="current-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-10 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ยังไม่มีบัญชี?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-teal-600 hover:text-teal-800"
                  onClick={handleRegisterClick}
                  disabled={isLoading}
                >
                  สมัครสมาชิก
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>HealthTech Sandbox - Technology Request Platform</p>
          <p>© 2025 - Educational & Experimental Use Only</p>
        </div>
      </div>
    </div>
  );
}