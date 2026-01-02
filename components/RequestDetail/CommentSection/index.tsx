// components/RequestDetail/CommentSection/index.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { useComments } from '@/hooks/useComments';
import { MessageSquare } from 'lucide-react';
import { RequestStatus } from '@/types/request';

interface CommentSectionUser {
  id: string;
  firstName: string;
  lastName: string;
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
  const { 
    comments, 
    loading, 
    error, 
    addComment, 
    isSubmitting 
  } = useComments(requestId);

  const handleAddComment = async (
    content: string, 
    toStatus?: RequestStatus
  ): Promise<boolean> => {
    try {
      await addComment(content, currentStatus, toStatus);
      
      // ถ้ามีการเปลี่ยนสถานะ - refresh ข้อมูล request
      if (toStatus) {
        onRefresh();
      }
      
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          ความคิดเห็น
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Comment Input - ด้านบน */}
        {canComment && (
          <div className="pb-4 border-b border-border">
            <CommentInput
              user={user}
              currentStatus={currentStatus}
              onSubmit={handleAddComment}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="text-center py-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Comment List */}
        <CommentList 
          comments={comments}
          isLoading={loading} 
        />
      </CardContent>
    </Card>
  );
}