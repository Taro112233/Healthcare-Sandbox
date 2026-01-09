// components/TermsCheckbox/index.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

export function TermsCheckbox({ checked, onCheckedChange, error }: TermsCheckboxProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="mt-1"
        />
        <Label
          htmlFor="terms"
          className="text-sm leading-relaxed cursor-pointer"
        >
          ข้าพเจ้ายอมรับ{' '}
          <Link
            href="/terms-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            ข้อกำหนดและเงื่อนไขการใช้บริการ
          </Link>{' '}
          และ{' '}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            นโยบายความเป็นส่วนตัว
          </Link>{' '}
          ของ HealthTech Sandbox
        </Label>
      </div>
      {error && (
        <p className="text-sm text-red-500 ml-7">{error}</p>
      )}
    </div>
  );
}