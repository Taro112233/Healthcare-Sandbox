// components/RequestDetail/CommentSection/CommentInput.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, Loader2, RefreshCw } from 'lucide-react';
import { RequestStatus, REQUEST_STATUS_INFO } from '@/types/request';

interface CommentInputUser {
  fullName: string;
  role: 'USER' | 'ADMIN';
}

interface CommentInputProps {
  user: CommentInputUser;
  currentStatus: RequestStatus;
  onSubmit: (content: string, toStatus?: RequestStatus) => Promise<boolean>;
  isSubmitting: boolean;
}

export function CommentInput({ user, currentStatus, onSubmit, isSubmitting }: CommentInputProps) {
  const [content, setContent] = useState('');
  const [newStatus, setNewStatus] = useState<RequestStatus>(currentStatus);

  const isAdmin = user.role === 'ADMIN';
  const hasStatusChanged = newStatus !== currentStatus;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || isSubmitting) return;

    const success = await onSubmit(
      content,
      hasStatusChanged ? newStatus : undefined
    );
    
    if (success) {
      setContent('');
      setNewStatus(currentStatus); // Reset to current status
    }
  };

  const allStatuses: RequestStatus[] = [
    'PENDING_REVIEW',
    'UNDER_CONSIDERATION',
    'IN_DEVELOPMENT',
    'IN_TESTING',
    'COMPLETED',
    'BEYOND_CAPACITY',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={isAdmin ? "เขียนความคิดเห็น หรือบันทึกการเปลี่ยนสถานะ..." : "เขียนความคิดเห็น..."}
        className="min-h-[80px] resize-none"
        disabled={isSubmitting}
      />
      
      <div className="flex items-center justify-between gap-3">
        {/* ✅ Admin: Status Selector (ซ้าย) */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
            <Select 
              value={newStatus} 
              onValueChange={(value) => setNewStatus(value as RequestStatus)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-[200px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${REQUEST_STATUS_INFO[status].color}`} />
                      {REQUEST_STATUS_INFO[status].labelTh}
                      {status === currentStatus && (
                        <span className="text-xs text-muted-foreground">(ปัจจุบัน)</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Spacer for non-admin */}
        {!isAdmin && <div />}
        
        {/* ✅ Submit Button (ขวา) */}
        <Button 
          type="submit" 
          size="sm"
          disabled={!content.trim() || isSubmitting}
          className={hasStatusChanged && isAdmin ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              กำลังส่ง...
            </>
          ) : hasStatusChanged && isAdmin ? (
            <>
              <RefreshCw className="w-4 h-4 mr-1" />
              ส่ง
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-1" />
              ส่ง
            </>
          )}
        </Button>
      </div>
    </form>
  );
}