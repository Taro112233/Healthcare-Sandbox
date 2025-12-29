// components/RequestDetail/index.tsx
// HealthTech Sandbox - Request Detail Container Component

'use client';

import React from 'react';
import { RequestInfo } from './RequestInfo';
import { AttachmentList } from './AttachmentList';
import { StatusHistory } from './StatusHistory';
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
      {/* Back Button */}
      <div>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปหน้ารายการ
          </Button>
        </Link>
      </div>

      {/* Main Content - Two Column Layout on Desktop */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Information */}
          <RequestInfo request={request} />

          {/* Attachments */}
          {request.attachments && request.attachments.length > 0 && (
            <AttachmentList attachments={request.attachments} />
          )}

          {/* Comments */}
          <CommentSection 
            requestId={request.id}
            user={user}
            canComment={canComment}
          />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Admin Status Update */}
          {isAdmin && (
            <AdminStatusUpdate
              requestId={request.id}
              currentStatus={request.status}
              onStatusUpdated={onRefresh}
            />
          )}

          {/* Status History */}
          <StatusHistory history={request.statusHistory || []} />
        </div>
      </div>
    </div>
  );
}