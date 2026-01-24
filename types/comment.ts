// types/comment.ts
// NextHealTH Sandbox - Comment Type Definitions

import type { RequestStatus } from './request';

// ===== COMMENT TYPE ENUM =====
export enum CommentType {
  COMMENT = 'COMMENT',           // ความคิดเห็นทั่วไป
  STATUS_CHANGE = 'STATUS_CHANGE', // การเปลี่ยนสถานะ
}

// ===== INTERFACES =====

export interface Comment {
  id: string;
  requestId: string;
  userId: string;
  content: string;
  type: CommentType;
  
  // For STATUS_CHANGE type only
  fromStatus?: RequestStatus | null;
  toStatus?: RequestStatus | null;
  
  createdAt: Date;
  updatedAt: Date;
  
  // User info (populated when needed)
  user?: {
    id: string;
    name: string;          // Better Auth field
    fullName?: string;     // Computed field
    firstName?: string;    // Fallback
    lastName?: string;     // Fallback
    image?: string;        // ✅ Added: Avatar image
    role: 'USER' | 'ADMIN';
  };
}

export interface CreateCommentFormData {
  content: string;
  type?: CommentType;
  fromStatus?: RequestStatus;
  toStatus?: RequestStatus;
}

export interface CommentListResponse {
  success: boolean;
  data: Comment[];
  meta: {
    total: number;
  };
}

export interface CreateCommentResponse {
  success: boolean;
  data: Comment;
  message: string;
}

// ===== HELPER FUNCTIONS =====

export function getUserInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'เมื่อสักครู่';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} นาทีที่แล้ว`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ชั่วโมงที่แล้ว`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} วันที่แล้ว`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} สัปดาห์ที่แล้ว`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} เดือนที่แล้ว`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ปีที่แล้ว`;
}

// ===== TYPE GUARDS =====

export function isStatusChangeComment(comment: Comment): boolean {
  return comment.type === CommentType.STATUS_CHANGE;
}

export function isRegularComment(comment: Comment): boolean {
  return comment.type === CommentType.COMMENT;
}