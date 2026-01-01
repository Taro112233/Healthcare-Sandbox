// components/RequestDetail/CommentSection/CommentItem.tsx
'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Comment, getRelativeTime } from '@/types/comment';
import { BadgeCheck } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const getUserInitials = () => {
    if (!comment.user) return 'U';
    return `${comment.user.firstName.charAt(0)}${comment.user.lastName.charAt(0)}`.toUpperCase();
  };

  const getUserName = () => {
    if (!comment.user) return 'Unknown User';
    return `${comment.user.firstName} ${comment.user.lastName}`;
  };

  const isAdmin = comment.user?.role === 'ADMIN';

  return (
    <div className="flex gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback 
          className={`text-xs font-medium ${
            isAdmin 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {getUserInitials()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground text-sm">
            {getUserName()}
          </span>
          
          {isAdmin && (
            <BadgeCheck className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          )}
          
          <span className="text-xs text-muted-foreground">
            {getRelativeTime(comment.createdAt)}
          </span>
        </div>

        <div className="text-sm text-foreground whitespace-pre-wrap break-words">
          {comment.content}
        </div>
      </div>
    </div>
  );
}