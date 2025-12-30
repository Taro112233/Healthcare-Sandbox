// app/register/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/utils/auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Loader2, 
  Stethoscope, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  UserPlus,
  Mail,
  Phone,
} from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const { register, loading } = useAuth();
  const router = useRouter();

  const validateForm = (): boolean => {
    if (!formData.username?.trim() || formData.username.length < 3) {
      const errorMsg = 'Username ต้องมีอย่างน้อย 3 ตัวอักษร';
      setError(errorMsg);
      toast.error('Username ไม่ถูกต้อง', {
        description: errorMsg,
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 4000,
      });
      return false;
    }

    const usernamePattern = /^[a-zA-Z0-9._-]+$/;
    if (!usernamePattern.test(formData.username)) {
      const errorMsg = 'Username ใช้ได้เฉพาะ a-z, 0-9, ., _, -';
      setError(errorMsg);
      toast.error('Username ไม่ถูกต้อง', {
        description: errorMsg,
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 4000,
      });
      return false;
    }

    if (!formData.password || formData.password.length < 8) {
      const errorMsg = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
      setError(errorMsg);
      toast.error('รหัสผ่านไม่ถูกต้อง', {
        description: errorMsg,
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 4000,
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      const errorMsg = 'รหัสผ่านไม่ตรงกัน';
      setError(errorMsg);
      toast.error('รหัสผ่านไม่ตรงกัน', {
        description: 'กรุณาตรวจสอบรหัสผ่านและการยืนยันรหัสผ่าน',
        icon: <XCircle className="w-4 h-4" />,
        duration: 4000,
      });
      return false;
    }

    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      const errorMsg = 'กรุณากรอกชื่อ-นามสกุล';
      setError(errorMsg);
      toast.error('ข้อมูลไม่ครบถ้วน', {
        description: errorMsg,
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 4000,
      });
      return false;
    }

    if (formData.email?.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        const errorMsg = 'รูปแบบอีเมลไม่ถูกต้อง';
        setError(errorMsg);
        toast.error('อีเมลไม่ถูกต้อง', {
          description: errorMsg,
          icon: <AlertTriangle className="w-4 h-4" />,
          duration: 4000,
        });
        return false;
      }
    }

    if (!acceptedTerms) {
      const errorMsg = 'กรุณายอมรับเงื่อนไขการใช้งาน';
      setError(errorMsg);
      toast.error('ยังไม่ได้ยอมรับเงื่อนไข', {
        description: 'กรุณาอ่านและยอมรับเงื่อนไขการใช้งานก่อนสมัครสมาชิก',
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 5000,
      });
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
    setError('');

    const loadingToast = toast.loading('กำลังสร้างบัญชีผู้ใช้', {
      description: 'กรุณารอสักครู่...',
    });

    try {
      const registerData: {
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
      } = {
        username: formData.username.trim().toLowerCase(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
      };

      if (formData.email?.trim()) {
        registerData.email = formData.email.trim().toLowerCase();
      }

      if (formData.phone?.trim()) {
        registerData.phone = formData.phone.trim();
      }

      await register(registerData);
      
      toast.dismiss(loadingToast);
      
      toast.success('สมัครสมาชิกสำเร็จ!', {
        description: 'ยินดีต้อนรับเข้าสู่ HealthTech Sandbox',
        icon: <UserPlus className="w-4 h-4" />,
        duration: 2000,
      });
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
        
    } catch (error) {
      toast.dismiss(loadingToast);
      
      console.error('Registration error:', error);
      const errorMsg = error instanceof Error ? error.message : 'สมัครสมาชิกไม่สำเร็จ';
      setError(errorMsg);
      
      if (errorMsg.includes('username') || errorMsg.includes('Username')) {
        toast.error('Username นี้มีคนใช้แล้ว', {
          description: 'กรุณาเลือก Username อื่น',
          icon: <XCircle className="w-4 h-4" />,
          duration: 5000,
          action: {
            label: "แก้ไข",
            onClick: () => {
              setError('');
              document.getElementById('username')?.focus();
            },
          },
        });
      } else if (errorMsg.includes('email') || errorMsg.includes('Email')) {
        toast.error('อีเมลนี้มีคนใช้แล้ว', {
          description: 'กรุณาใช้อีเมลอื่น หรือเว้นว่างไว้',
          icon: <XCircle className="w-4 h-4" />,
          duration: 5000,
        });
      } else {
        toast.error('สมัครสมาชิกไม่สำเร็จ', {
          description: errorMsg,
          icon: <XCircle className="w-4 h-4" />,
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };

  const handleLoginClick = () => {
    toast.info('กำลังไปหน้าเข้าสู่ระบบ', {
      description: 'จะนำไปยังหน้าเข้าสู่ระบบในอีกสักครู่',
      duration: 2000,
    });
    router.push('/login');
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
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-foreground">HealthTech Sandbox</h1>
              <p className="text-sm text-muted-foreground">Technology Request Platform</p>
            </div>
          </div>
        </div>

        {/* Register Form */}
        <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">สมัครสมาชิก</CardTitle>
            <CardDescription className="text-center">
              กรอกข้อมูลเพื่อเริ่มใช้งาน Sandbox
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Username - Required */}
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username (a-z, 0-9, ., _, -)"
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="username"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  ต้องมีอย่างน้อย 3 ตัวอักษร ใช้ได้เฉพาะ a-z, 0-9, ., _, -
                </p>
              </div>

              {/* Name - Required */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">ชื่อ *</Label>
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
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">นามสกุล *</Label>
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
              </div>

              {/* Email - Optional */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-1" />
                  อีเมล (ไม่บังคับ)
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="email"
                />
                <p className="text-xs text-muted-foreground">
                  สำหรับรับการแจ้งเตือนเมื่อมี update
                </p>
              </div>

              {/* Phone - Optional */}
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

              {/* Password - Required */}
              <div className="space-y-2">
                <Label htmlFor="password">รหัสผ่าน *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)"
                    disabled={isLoading}
                    className="h-11 pr-10"
                    autoComplete="new-password"
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

              {/* Confirm Password - Required */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="ยืนยันรหัสผ่าน"
                    disabled={isLoading}
                    className="h-11 pr-10"
                    autoComplete="new-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-10 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
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

              {/* Terms of Service */}
              <div className="space-y-4 pt-2">
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => {
                        setAcceptedTerms(checked as boolean);
                        if (error && checked) {
                          setError('');
                        }
                      }}
                      disabled={isLoading}
                      className="h-4 w-4"
                    />
                    <Label 
                      htmlFor="terms" 
                      className="text-sm text-foreground leading-relaxed cursor-pointer"
                    >
                      ข้าพเจ้ายอมรับเงื่อนไขการใช้งาน Sandbox *
                    </Label>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      <strong>ข้อควรระวัง:</strong> ห้ามใช้ข้อมูลผู้ป่วยจริง - Sandbox นี้สำหรับทดสอบเท่านั้น
                    </p>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-lg p-3">
                    <p className="text-xs text-teal-700 dark:text-teal-300 leading-relaxed">
                      <CheckCircle2 className="w-3 h-3 inline mr-1" />
                      บัญชีพร้อมใช้งานทันที - เริ่มส่ง Request ได้เลย
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className={`w-full h-11 text-base transition-colors duration-200 ${
                  acceptedTerms 
                    ? 'bg-teal-600 hover:bg-teal-700' 
                    : 'bg-muted hover:bg-muted'
                }`}
                disabled={isLoading || !acceptedTerms}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    กำลังสร้างบัญชี...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    สมัครสมาชิก
                  </>
                )}
              </Button>
            </form>

            {/* Login link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                มีบัญชีอยู่แล้ว?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto text-teal-600 hover:text-teal-800"
                  onClick={handleLoginClick}
                  disabled={isLoading}
                >
                  เข้าสู่ระบบ
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