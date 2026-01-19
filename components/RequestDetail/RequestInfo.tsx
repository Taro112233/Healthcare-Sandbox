// components/RequestDetail/RequestInfo.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
  User,
  Mail,
  Phone,
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
    <div className="space-y-6 min-w-0">
      {/* Header Card */}
      <Card className="bg-card border-border w-full overflow-hidden">
        <CardContent className="pt-6 pb-6">
          {/* Top Row - Type Badge (Left) and Status Badge (Right) */}
          <div className="flex items-start justify-between gap-2 mb-4 flex-wrap">
            <TypeBadge type={request.requestType} size="md" />
            <StatusBadge status={request.status} size="md" />
          </div>

          {/* Department - With proper text wrapping */}
          <div className="mb-4 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-foreground flex items-start gap-2">
              <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="break-words min-w-0 flex-1">{request.department}</span>
            </h1>
          </div>

          {/* Bottom Row - User Info (Left) and Metadata (Right) */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            {/* Left - User Name (Clickable Popover) */}
            {request.user && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group self-start">
                    <Avatar className="h-6 w-6 flex-shrink-0">
                      <AvatarFallback className="text-xs bg-muted text-foreground group-hover:bg-muted-foreground/20 transition-colors">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium underline decoration-transparent group-hover:decoration-current transition-all break-words">
                      {request.user.firstName} {request.user.lastName}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {request.user.firstName} {request.user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ผู้ส่งคำขอ
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* User Details */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">ชื่อ-นามสกุล</p>
                          <p className="text-sm text-foreground font-medium break-words">
                            {request.user.firstName} {request.user.lastName}
                          </p>
                        </div>
                      </div>

                      {request.user.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">อีเมล</p>
                            <p className="text-sm text-foreground break-all">
                              {request.user.email}
                            </p>
                          </div>
                        </div>
                      )}

                      {request.user.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">เบอร์โทร</p>
                            <p className="text-sm text-foreground break-words">
                              {request.user.phone}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Right - Date, Comments, Files */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground sm:justify-end">
              <div className="flex items-center gap-1.5 min-w-0">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{formatDate(request.createdAt)}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span>{totalComments}</span>
              </div>

              {request._count && (
                <div className="flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 flex-shrink-0" />
                  <span>{request._count.attachments}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pain Point Card - Red */}
      <Card className="border-l-4 border-l-red-500 dark:border-l-red-400 bg-card w-full overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-400 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="break-words">Pain Point หน้างาน</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RichTextViewer content={request.painPoint} />
        </CardContent>
      </Card>

      {/* Current Workflow Card - Blue */}
      <Card className="border-l-4 border-l-blue-500 dark:border-l-blue-400 bg-card w-full overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-400 flex items-start gap-2">
            <Workflow className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="break-words">ขั้นตอนการทำงานปัจจุบัน</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RichTextViewer content={request.currentWorkflow} />
        </CardContent>
      </Card>

      {/* Expected Tech Help Card - Green */}
      <Card className="border-l-4 border-l-green-500 dark:border-l-green-400 bg-card w-full overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-400 flex items-start gap-2">
            <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="break-words">สิ่งที่ต้องการให้ Tech ช่วย</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RichTextViewer content={request.expectedTechHelp} />
        </CardContent>
      </Card>
    </div>
  );
}