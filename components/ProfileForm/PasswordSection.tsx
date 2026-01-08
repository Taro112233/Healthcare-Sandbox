// components/ProfileForm/PasswordForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Save, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from './ConfirmDialog';
import type { CurrentUser } from '@/hooks/useCurrentUser';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordFormProps {
  user: CurrentUser;
  onSuccess: () => void;
}

export function PasswordForm({ }: PasswordFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<PasswordFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleInputChange = (field: keyof PasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setSubmitError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: PasswordFormErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'กรุณากรอกรหัสผ่านปัจจุบัน';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'กรุณากรอกรหัสผ่านใหม่';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const response = await fetch('/api/profile/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'เปลี่ยนรหัสผ่านไม่สำเร็จ');
      }

      if (data.success) {
        toast.success('เปลี่ยนรหัสผ่านสำเร็จ', {
          description: 'ระบบจะออกจากระบบอัตโนมัติใน 3 วินาที',
        });
        
        setIsLoggingOut(true);
        
        setTimeout(async () => {
          try {
            await fetch('/api/auth/logout', {
              method: 'POST',
              credentials: 'include',
            });
            
            router.push('/login?password-changed=true');
          } catch {
            router.push('/login?password-changed=true');
          }
        }, 3000);
      } else {
        throw new Error(data.error || 'เปลี่ยนรหัสผ่านไม่สำเร็จ');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setSubmitError(errorMsg);
      toast.error('เกิดข้อผิดพลาด', {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || isLoggingOut;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword">
            รหัสผ่านปัจจุบัน <span className="text-red-500">*</span>
          </Label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="••••••••"
            value={formData.currentPassword}
            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
            disabled={isDisabled}
            className={errors.currentPassword ? 'border-red-500' : ''}
          />
          {errors.currentPassword && (
            <p className="text-sm text-red-500">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">
            รหัสผ่านใหม่ <span className="text-red-500">*</span>
          </Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="••••••••"
            value={formData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            disabled={isDisabled}
            className={errors.newPassword ? 'border-red-500' : ''}
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword}</p>
          )}
          <p className="text-xs text-muted-foreground">
            ต้องมีอย่างน้อย 8 ตัวอักษร
          </p>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            ยืนยันรหัสผ่านใหม่ <span className="text-red-500">*</span>
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            disabled={isDisabled}
            className={errors.confirmPassword ? 'border-red-500' : ''}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Error Alert */}
        {submitError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Submit Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isDisabled}
            className="w-full sm:w-auto"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700"
          >
            {isSubmitting || isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isLoggingOut ? 'กำลังออกจากระบบ...' : 'กำลังบันทึก...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                เปลี่ยนรหัสผ่าน
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmSave}
        isSubmitting={isSubmitting}
        title="ยืนยันการเปลี่ยนรหัสผ่าน"
        description="คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนรหัสผ่าน?"
        requiresLogout={true}
      />
    </>
  );
}