// components/RequestDetail/RequestInfo.tsx
// HealthTech Sandbox - Request Information Display Component

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TypeBadge } from '@/components/shared/TypeBadge';
import { Request } from '@/types/request';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { 
  User, 
  Calendar, 
  MessageSquare, 
  Paperclip,
} from 'lucide-react';

interface RequestInfoProps {
  request: Request;
}

export function RequestInfo({ request }: RequestInfoProps) {
  const getUserInitials = () => {
    if (!request.user) return 'U';
    return `${request.user.firstName.charAt(0)}${request.user.lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, 'dd MMMM yyyy, HH:mm', { locale: th });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={request.status} />
            <TypeBadge type={request.requestType} />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {request.user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-gray-200">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span>{request.user.firstName} {request.user.lastName}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(request.createdAt)}</span>
            </div>

            {request._count && (
              <>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{request._count.comments} ความคิดเห็น</span>
                </div>
                <div className="flex items-center gap-1">
                  <Paperclip className="w-4 h-4" />
                  <span>{request._count.attachments} ไฟล์แนบ</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Pain Point */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-gray-700">
            Pain Point หน้างาน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-900 whitespace-pre-wrap">{request.painPoint}</p>
        </CardContent>
      </Card>

      {/* Current Workflow */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-gray-700">
            ขั้นตอนการทำงานปัจจุบัน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-900 whitespace-pre-wrap">{request.currentWorkflow}</p>
        </CardContent>
      </Card>

      {/* Expected Tech Help */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-gray-700">
            สิ่งที่ต้องการให้ Tech ช่วย
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-900 whitespace-pre-wrap">{request.expectedTechHelp}</p>
        </CardContent>
      </Card>
    </div>
  );
}