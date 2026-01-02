// components/RequestDetail/RequestInfo.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TypeBadge } from '@/components/shared/TypeBadge';
import { RichTextViewer } from '@/components/RichTextEditor';
import { Request } from '@/types/request';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { 
  Calendar, 
  MessageSquare, 
  Paperclip,
  Building2,
  AlertCircle,
  Workflow,
  Lightbulb,
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

  const totalComments = (request._count?.comments || 0) + (request.statusHistory?.length || 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={request.status} />
            <TypeBadge type={request.requestType} />
            <Badge variant="outline" className="bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800">
              <Building2 className="w-3 h-3 mr-1" />
              {request.department}
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {request.user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-muted">
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

            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{totalComments} ความคิดเห็น</span>
            </div>

            {request._count && (
              <div className="flex items-center gap-1">
                <Paperclip className="w-4 h-4" />
                <span>{request._count.attachments} ไฟล์แนบ</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pain Point Card - สีแดง */}
      <Card className="border-l-4 border-l-red-500 dark:border-l-red-400">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Pain Point หน้างาน
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RichTextViewer content={request.painPoint} />
        </CardContent>
      </Card>

      {/* Current Workflow Card - สีน้ำเงิน */}
      <Card className="border-l-4 border-l-blue-500 dark:border-l-blue-400">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            ขั้นตอนการทำงานปัจจุบัน
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RichTextViewer content={request.currentWorkflow} />
        </CardContent>
      </Card>

      {/* Expected Tech Help Card - สีเขียว */}
      <Card className="border-l-4 border-l-green-500 dark:border-l-green-400">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            สิ่งที่ต้องการให้ Tech ช่วย
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RichTextViewer content={request.expectedTechHelp} />
        </CardContent>
      </Card>
    </div>
  );
}