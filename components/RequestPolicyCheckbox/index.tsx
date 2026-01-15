// components/RequestPolicyCheckbox/index.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface RequestPolicyCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

export function RequestPolicyCheckbox({ 
  checked, 
  onCheckedChange, 
  error 
}: RequestPolicyCheckboxProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id="request-policy"
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={error ? "border-red-500" : ""}
        />
        <Label
          htmlFor="request-policy"
          className="text-sm leading-relaxed cursor-pointer"
        >
          ฉันได้อ่านและยอมรับ{' '}
          <Link
            href="/request-policy"
            target="_blank"
            className="text-primary hover:underline font-medium"
          >
            นโยบายการส่งคำขอพัฒนาเครื่องมือ
          </Link>
        </Label>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm ml-7">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}