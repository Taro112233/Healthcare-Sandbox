// components/RequestDetail/index.tsx
'use client';

import React from 'react';
import { RequestInfo } from './RequestInfo';
import { AttachmentList } from './AttachmentList';
import { CommentSection } from './CommentSection';
import { Request } from '@/types/request';

interface CurrentUser {
  id: string;
  fullName: string;
  role: 'USER' | 'ADMIN';
}

interface RequestDetailProps {
  request: Request;
  user: CurrentUser;
  onRefresh: () => void;
}

export function RequestDetail({ request, user, onRefresh }: RequestDetailProps) {
  const isAdmin = user.role === 'ADMIN';
  const isOwner = request.userId === user.id;
  const canComment = isAdmin || isOwner;

  return (
    <div className="space-y-6">
      {/* Main Layout - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Takes 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <RequestInfo request={request} />

          {request.attachments && request.attachments.length > 0 && (
            <AttachmentList attachments={request.attachments} />
          )}
        </div>

        {/* Sidebar - Comment Section (Sticky on large screens) */}
        <div className="lg:sticky lg:top-6 lg:self-start min-w-0">
          <CommentSection 
            requestId={request.id}
            user={user}
            canComment={canComment}
            currentStatus={request.status}
            onRefresh={onRefresh}
          />
        </div>
      </div>
    </div>
  );
}