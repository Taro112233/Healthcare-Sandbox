// components/ProfileForm/ConfirmDialog.tsx
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, Save, Loader2, AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  title: string;
  description: string;
  requiresLogout: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting,
  title,
  description,
  requiresLogout,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {requiresLogout ? (
              <LogOut className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            ) : (
              <Save className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            )}
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Warning - Requires Logout */}
          {requiresLogout && (
            <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>⚠️ คุณกำลังเปลี่ยนรหัสผ่าน</strong>
              </AlertDescription>
            </Alert>
          )}
          
          {/* Info Message */}
          <div className="text-sm text-muted-foreground space-y-2">
            {requiresLogout ? (
              <>
                <p>
                  หลังจากบันทึกสำเร็จ ระบบจะ<strong className="text-foreground">ออกจากระบบอัตโนมัติ</strong>
                </p>
                <p>
                  คุณจะต้องเข้าสู่ระบบใหม่อีกครั้งด้วยรหัสผ่านใหม่
                </p>
              </>
            ) : (
              <p>
                การเปลี่ยนแปลงจะมีผลทันที ไม่จำเป็นต้องออกจากระบบ
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter className="gap-2 gap-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
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
                ยืนยันการบันทึก
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}