// components/ProfileForm/BasicInfoForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, Save, Loader2, AlertTriangle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from './ConfirmDialog';
import type { CurrentUser } from '@/hooks/useCurrentUser';

interface BasicInfoFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface BasicInfoFormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface BasicInfoFormProps {
  user: CurrentUser;
  onSuccess: () => void;
}

export function BasicInfoForm({ user, onSuccess }: BasicInfoFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<BasicInfoFormData>({
    email: user.email || '',
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone || '',
  });
  
  const [errors, setErrors] = useState<BasicInfoFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleInputChange = (field: keyof BasicInfoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setSubmitError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: BasicInfoFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'กรุณากรอกชื่อ';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'กรุณากรอกนามสกุล';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
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
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
      };

      const response = await fetch('/api/profile/basic-info', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'อัปเดตข้อมูลไม่สำเร็จ');
      }

      if (data.success) {
        toast.success('อัปเดตข้อมูลสำเร็จ');
        onSuccess();
      } else {
        throw new Error(data.error || 'อัปเดตข้อมูลไม่สำเร็จ');
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

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Username (Read-only) */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={user.username}
            disabled
            className="bg-muted cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">
            Username ไม่สามารถเปลี่ยนแปลงได้
          </p>
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">
            ชื่อ <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="ชื่อ"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={isSubmitting}
            className={errors.firstName ? 'border-red-500' : ''}
            maxLength={100}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">
            นามสกุล <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="นามสกุล"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={isSubmitting}
            className={errors.lastName ? 'border-red-500' : ''}
            maxLength={100}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            <Mail className="w-4 h-4 inline mr-1" />
            อีเมล (ไม่บังคับ)
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@hospital.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isSubmitting}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            <Phone className="w-4 h-4 inline mr-1" />
            เบอร์โทร (ไม่บังคับ)
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="081-234-5678"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={isSubmitting}
            className={errors.phone ? 'border-red-500' : ''}
            maxLength={20}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
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
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                บันทึกการเปลี่ยนแปลง
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
        title="ยืนยันการบันทึกข้อมูล"
        description="คุณแน่ใจหรือไม่ว่าต้องการบันทึกการเปลี่ยนแปลง?"
        requiresLogout={false}
      />
    </>
  );
}