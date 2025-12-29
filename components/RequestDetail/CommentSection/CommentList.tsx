// components/RequestDetail/CommentSection/CommentList.tsx
// HealthTech Sandbox - Comment List Component

'use client';

import React from 'react';
import { Comment } from '@/types/comment';
import { CommentItem } from './CommentItem';
import { MessageSquare } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
}

export function CommentList({ comments, isLoading }: CommentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 p-4">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">ยังไม่มีความคิดเห็น</p>
        <p className="text-xs text-gray-400 mt-1">
          เป็นคนแรกที่แสดงความคิดเห็น!
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}