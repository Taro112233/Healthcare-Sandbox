// components/RequestDetail/CommentSection/CommentItem.tsx
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Comment, getRelativeTime } from '@/types/comment';
import { REQUEST_STATUS_INFO } from '@/types/request';
import { BadgeCheck, RefreshCw } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
}

// ✅ Helper function สำหรับ user initials
function getUserInitials(user: Comment['user']): string {
  if (!user) return 'U';
  
  const userObj = user as Record<string, unknown>;
  
  // Priority 1: fullName
  if ('fullName' in userObj && typeof userObj.fullName === 'string') {
    const names = userObj.fullName.split(' ').filter(Boolean);
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return userObj.fullName.charAt(0).toUpperCase();
  }
  
  // Priority 2: name
  if ('name' in userObj && typeof userObj.name === 'string') {
    const names = userObj.name.split(' ').filter(Boolean);
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return userObj.name.charAt(0).toUpperCase();
  }
  
  // Priority 3: firstName + lastName
  if ('firstName' in userObj && 'lastName' in userObj && 
      typeof userObj.firstName === 'string' && typeof userObj.lastName === 'string') {
    return `${userObj.firstName.charAt(0)}${userObj.lastName.charAt(0)}`.toUpperCase();
  }
  
  // Priority 4: firstName only
  if ('firstName' in userObj && typeof userObj.firstName === 'string') {
    return userObj.firstName.charAt(0).toUpperCase();
  }
  
  return 'U';
}

// ✅ Helper function สำหรับ display name แบบย่อ (FirstName + LastInitial)
function getUserDisplayName(user: Comment['user']): string {
  if (!user) return 'Unknown User';
  
  const userObj = user as Record<string, unknown>;
  
  // Priority 1: fullName → FirstName + Last Initial
  if ('fullName' in userObj && typeof userObj.fullName === 'string') {
    const names = userObj.fullName.split(' ').filter(Boolean);
    if (names.length >= 2) {
      return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
    }
    return userObj.fullName;
  }
  
  // Priority 2: name → FirstName + Last Initial
  if ('name' in userObj && typeof userObj.name === 'string') {
    const names = userObj.name.split(' ').filter(Boolean);
    if (names.length >= 2) {
      return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
    }
    return userObj.name;
  }
  
  // Priority 3: firstName + lastName → FirstName + Last Initial
  if ('firstName' in userObj && 'lastName' in userObj && 
      typeof userObj.firstName === 'string' && typeof userObj.lastName === 'string') {
    return `${userObj.firstName} ${userObj.lastName.charAt(0)}.`;
  }
  
  // Priority 4: firstName only
  if ('firstName' in userObj && typeof userObj.firstName === 'string') {
    return userObj.firstName;
  }
  
  return 'Unknown User';
}

// ✅ Helper function สำหรับ avatar image
function getUserImage(user: Comment['user']): string | undefined {
  if (!user) return undefined;
  
  const userObj = user as Record<string, unknown>;
  
  if ('image' in userObj && typeof userObj.image === 'string') {
    return userObj.image;
  }
  
  return undefined;
}

export function CommentItem({ comment }: CommentItemProps) {
  const isAdmin = comment.user?.role === 'ADMIN';
  const isStatusChange = comment.type === 'STATUS_CHANGE';
  const userImage = getUserImage(comment.user);  // ✅ ดึง image

  return (
    <div className="flex gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
      <Avatar className="h-8 w-8 shrink-0">
        {/* ✅ เพิ่ม AvatarImage component */}
        {userImage && <AvatarImage src={userImage} alt={getUserDisplayName(comment.user)} />}
        <AvatarFallback 
          className={`text-xs font-medium ${
            isAdmin 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {getUserInitials(comment.user)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground text-sm">
            {getUserDisplayName(comment.user)}
          </span>
          
          {isAdmin && (
            <BadgeCheck className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          )}
          
          <span className="text-xs text-muted-foreground">
            {getRelativeTime(comment.createdAt)}
          </span>
        </div>

        {/* ✅ ถ้าเป็น STATUS_CHANGE - แสดงการเปลี่ยนสถานะ */}
        {isStatusChange && comment.toStatus && (
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">เปลี่ยนสถานะเป็น</span>
            <Badge 
              variant="outline" 
              className={`text-xs ${REQUEST_STATUS_INFO[comment.toStatus].bgColor} ${REQUEST_STATUS_INFO[comment.toStatus].textColor} border-0`}
            >
              {REQUEST_STATUS_INFO[comment.toStatus].labelTh}
            </Badge>
          </div>
        )}

        <div className="text-sm text-foreground whitespace-pre-wrap break-words">
          {comment.content}
        </div>
      </div>
    </div>
  );
}