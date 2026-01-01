// components/RequestDetail/CommentSection/StatusChangeItem.tsx
'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusHistory } from '@/types/request';
import { REQUEST_STATUS_INFO } from '@/types/request';
import { getRelativeTime } from '@/types/comment';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusChangeItemProps {
  statusChange: StatusHistory;
}

export function StatusChangeItem({ statusChange }: StatusChangeItemProps) {
  const fromInfo = REQUEST_STATUS_INFO[statusChange.fromStatus];
  const toInfo = REQUEST_STATUS_INFO[statusChange.toStatus];

  const getUserInitials = () => {
    if (!statusChange.user) return 'A';
    return `${statusChange.user.firstName.charAt(0)}${statusChange.user.lastName.charAt(0)}`.toUpperCase();
  };

  const getUserName = () => {
    if (!statusChange.user) return 'Admin';
    return `${statusChange.user.firstName} ${statusChange.user.lastName}`;
  };

  return (
    <div className="flex gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
      {/* Avatar */}
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
          {getUserInitials()}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground text-sm">
            {getUserName()}
          </span>
          
          <BadgeCheck className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          
          <span className="text-xs text-muted-foreground">
            {getRelativeTime(statusChange.changedAt)}
          </span>
        </div>

        {/* Status Change Display */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">เปลี่ยนสถานะเป็น</span>
          <Badge 
            variant="outline" 
            className={`text-xs ${toInfo.bgColor} ${toInfo.textColor} border-0`}
          >
            {toInfo.labelTh}
          </Badge>
        </div>

        {/* Note */}
        {statusChange.note && (
          <p className="text-sm text-foreground whitespace-pre-wrap break-words">
            {statusChange.note}
          </p>
        )}
      </div>
    </div>
  );
}