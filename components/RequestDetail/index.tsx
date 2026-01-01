// components/RequestDetail/index.tsx
'use client';

import React from 'react';
import { RequestInfo } from './RequestInfo';
import { AttachmentList } from './AttachmentList';
import { CommentSection } from './CommentSection';
import { AdminStatusUpdate } from './AdminStatusUpdate';
import { Request } from '@/types/request';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
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
      <div>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปหน้ารายการ
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <RequestInfo request={request} />

          {request.attachments && request.attachments.length > 0 && (
            <AttachmentList attachments={request.attachments} />
          )}
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Admin Status Update - Only for Admin */}
          {isAdmin && (
            <AdminStatusUpdate
              requestId={request.id}
              currentStatus={request.status}
              onStatusUpdated={onRefresh}
            />
          )}

          {/* Comment Section - Always Show */}
          <CommentSection 
            requestId={request.id}
            user={user}
            canComment={canComment}
            statusHistory={request.statusHistory || []}
          />
        </div>
      </div>
    </div>
  );
}