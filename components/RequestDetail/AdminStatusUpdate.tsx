// components/RequestDetail/AdminStatusUpdate.tsx
// HealthTech Sandbox - Admin Status Update Component

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RequestStatus, REQUEST_STATUS_INFO } from '@/types/request';
import { Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AdminStatusUpdateProps {
  requestId: string;
  currentStatus: RequestStatus;
  onStatusUpdated: () => void;
}

export function AdminStatusUpdate({ 
  requestId, 
  currentStatus, 
  onStatusUpdated 
}: AdminStatusUpdateProps) {
  const [newStatus, setNewStatus] = useState<RequestStatus>(currentStatus);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasChanged = newStatus !== currentStatus;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasChanged) {
      toast.error('กรุณาเลือกสถานะใหม่ที่แตกต่างจากสถานะปัจจุบัน');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          status: newStatus,
          note: note.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      toast.success('อัพเดทสถานะสำเร็จ', {
        description: `เปลี่ยนเป็น "${REQUEST_STATUS_INFO[newStatus].labelTh}"`,
      });

      setNote('');
      onStatusUpdated();
    } catch (error) {
      console.error('Update status error:', error);
      toast.error('ไม่สามารถอัพเดทสถานะได้', {
        description: error instanceof Error ? error.message : 'โปรดลองใหม่อีกครั้ง',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // All available statuses
  const allStatuses: RequestStatus[] = [
    'PENDING_REVIEW',
    'UNDER_CONSIDERATION',
    'IN_DEVELOPMENT',
    'IN_TESTING',
    'COMPLETED',
    'BEYOND_CAPACITY',
  ];

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-blue-700 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Admin: เปลี่ยนสถานะ
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Status Display */}
          <div>
            <Label className="text-sm text-gray-600">สถานะปัจจุบัน</Label>
            <div className={`mt-1 inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${REQUEST_STATUS_INFO[currentStatus].bgColor} ${REQUEST_STATUS_INFO[currentStatus].textColor}`}>
              {REQUEST_STATUS_INFO[currentStatus].labelTh}
            </div>
          </div>

          {/* New Status Selection */}
          <div className="space-y-2">
            <Label htmlFor="new-status">เปลี่ยนเป็น</Label>
            <Select 
              value={newStatus} 
              onValueChange={(value) => setNewStatus(value as RequestStatus)}
            >
              <SelectTrigger id="new-status">
                <SelectValue placeholder="เลือกสถานะใหม่" />
              </SelectTrigger>
              <SelectContent>
                {allStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${REQUEST_STATUS_INFO[status].color}`} />
                      {REQUEST_STATUS_INFO[status].labelTh}
                      {status === currentStatus && (
                        <span className="text-xs text-gray-400">(ปัจจุบัน)</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Note (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="status-note">
              บันทึก <span className="text-gray-400">(ไม่บังคับ)</span>
            </Label>
            <Textarea
              id="status-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เพิ่มบันทึกเกี่ยวกับการเปลี่ยนสถานะ..."
              className="min-h-[80px] resize-none bg-white"
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 text-right">
              {note.length} / 1000
            </p>
          </div>

          {/* Status Change Preview */}
          {hasChanged && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-amber-700">
                จะเปลี่ยนจาก "{REQUEST_STATUS_INFO[currentStatus].labelTh}" 
                → "{REQUEST_STATUS_INFO[newStatus].labelTh}"
              </span>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={!hasChanged || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                กำลังอัพเดท...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                ยืนยันเปลี่ยนสถานะ
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}