// components/RequestDetail/CommentSection/CommentList.tsx
'use client';

import React from 'react';
import { Comment } from '@/types/comment';
import { CommentItem } from './CommentItem';
import { MessageSquare, Loader2 } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
}

export function CommentList({ 
  comments, 
  isLoading 
}: CommentListProps) {
  if (isLoading && comments.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
        <p className="text-sm">ยังไม่มีความคิดเห็น</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          เป็นคนแรกที่แสดงความคิดเห็น!
        </p>
      </div>
    );
  }

  // ✅ เรียงจากเก่า → ใหม่ (ล่างสุดคือล่าสุด)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}