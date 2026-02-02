// components/RequestDetail/CommentSection/index.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { useComments } from '@/hooks/useComments';
import { MessageSquare, Bell } from 'lucide-react';
import { RequestStatus } from '@/types/request';

interface CommentSectionUser {
  id: string;
  fullName: string;
  role: 'USER' | 'ADMIN';
}

interface CommentSectionProps {
  requestId: string;
  user: CommentSectionUser;
  canComment: boolean;
  currentStatus: RequestStatus;
  onRefresh: () => void;
}

export function CommentSection({ 
  requestId, 
  user, 
  canComment,
  currentStatus,
  onRefresh
}: CommentSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const previousCommentsLength = useRef(0);
  
  const { 
    comments, 
    loading, 
    error, 
    addComment, 
    isSubmitting,
    refetch 
  } = useComments(requestId);

  // ✅ ตรวจสอบว่า user อยู่ที่ด้านล่างหรือไม่
  const checkIfAtBottom = () => {
    if (!scrollRef.current) return false;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    return isAtBottom;
  };

  // ✅ Handle scroll event
  const handleScroll = () => {
    const isAtBottom = checkIfAtBottom();
    setShouldAutoScroll(isAtBottom);
  };

  // ✅ Auto-scroll เฉพาะเมื่อควร scroll
  useEffect(() => {
    if (!scrollRef.current || comments.length === 0) return;

    const isNewComment = comments.length > previousCommentsLength.current;
    const isAtBottom = checkIfAtBottom();

    if ((isNewComment && (shouldAutoScroll || isAtBottom)) || previousCommentsLength.current === 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    previousCommentsLength.current = comments.length;
  }, [comments, shouldAutoScroll]);

  // ✅ Auto-refresh ทุก 5 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleAddComment = async (
    content: string, 
    toStatus?: RequestStatus
  ): Promise<boolean> => {
    try {
      setShouldAutoScroll(true);
      
      await addComment(content, currentStatus, toStatus);
      
      if (toStatus) {
        onRefresh();
      }
      
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
      
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card className="flex flex-col h-150">
      {/* Header - Fixed */}
      <CardHeader className="pb-3 border-b border-border-primary shrink-0">
        <div className="space-y-2">
          <CardTitle className="text-base font-medium text-content-primary flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            ความคิดเห็น ({comments.length})
          </CardTitle>
          
          {/* ✅ ข้อความเตือนให้ติดตามความคืบหน้า */}
          <div className="flex items-start gap-2 px-3 py-2 bg-alert-info-bg border border-alert-info-border rounded-lg">
            <Bell className="w-4 h-4 text-alert-info-icon shrink-0 mt-0.5" />
            <p className="text-xs text-alert-info-text leading-relaxed">
              โปรดเข้ามาติดตามความคืบหน้าของโปรเจคเป็นระยะ ๆ เพื่อรับการอัปเดตและตอบคำถามจากทีมพัฒนา
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
        {/* Error Display - Fixed */}
        {error && (
          <div className="px-4 py-3 text-center text-alert-error-text text-sm bg-alert-error-bg border-b border-border-primary">
            {error}
          </div>
        )}

        {/* Comment List - Scrollable */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth"
        >
          <CommentList 
            comments={comments}
            isLoading={loading} 
          />
        </div>

        {/* Comment Input - Fixed ด้านล่าง */}
        {canComment && (
          <div className="px-4 py-3 border-t border-border-primary bg-card shrink-0">
            <CommentInput
              user={user}
              currentStatus={currentStatus}
              onSubmit={handleAddComment}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}