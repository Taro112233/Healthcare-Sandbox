// components/RequestDetail/CommentSection/CommentList.tsx
'use client';

import React, { useMemo } from 'react';
import { Comment } from '@/types/comment';
import { StatusHistory } from '@/types/request';
import { CommentItem } from './CommentItem';
import { StatusChangeItem } from './StatusChangeItem';
import { MessageSquare } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
  statusHistory: StatusHistory[];
  isLoading?: boolean;
}

type TimelineItem = 
  | { type: 'comment'; data: Comment; timestamp: Date }
  | { type: 'status'; data: StatusHistory; timestamp: Date };

export function CommentList({ 
  comments, 
  statusHistory,
  isLoading 
}: CommentListProps) {
  // ✅ Merge comments + status history และเรียงตามเวลา
  const timeline = useMemo(() => {
    const items: TimelineItem[] = [
      ...comments.map(c => ({ 
        type: 'comment' as const, 
        data: c, 
        timestamp: new Date(c.createdAt) 
      })),
      ...statusHistory.map(s => ({ 
        type: 'status' as const, 
        data: s, 
        timestamp: new Date(s.changedAt) 
      })),
    ];

    // เรียงจากใหม่ → เก่า
    return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [comments, statusHistory]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 p-4">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-2/3 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (timeline.length === 0) {
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

  return (
    <div className="space-y-3">
      {timeline.map((item, index) => {
        if (item.type === 'comment') {
          return <CommentItem key={`comment-${item.data.id}`} comment={item.data} />;
        } else {
          return <StatusChangeItem key={`status-${item.data.id}`} statusChange={item.data} />;
        }
      })}
    </div>
  );
}