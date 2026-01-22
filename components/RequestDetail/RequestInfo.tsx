// components/RequestDetail/RequestInfo.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

// ✅ Helper function สำหรับ user initials
function getUserInitials(user: Request['user']): string {
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
function getUserDisplayName(user: Request['user']): string {
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

// ✅ Helper function สำหรับ full name (ใช้ใน Popover)
function getUserFullName(user: Request['user']): string {
  if (!user) return 'Unknown User';
  
  const userObj = user as Record<string, unknown>;
  
  // Priority 1: fullName
  if ('fullName' in userObj && typeof userObj.fullName === 'string') {
    return userObj.fullName;
  }
  
  // Priority 2: name
  if ('name' in userObj && typeof userObj.name === 'string') {
    return userObj.name;
  }
  
  // Priority 3: firstName + lastName
  if ('firstName' in userObj && 'lastName' in userObj && 
      typeof userObj.firstName === 'string' && typeof userObj.lastName === 'string') {
    return `${userObj.firstName} ${userObj.lastName}`;
  }
  
  // Priority 4: firstName only
  if ('firstName' in userObj && typeof userObj.firstName === 'string') {
    return userObj.firstName;
  }
  
  return 'Unknown User';
}

// ✅ Helper function สำหรับ avatar image
function getUserImage(user: Request['user']): string | undefined {
  if (!user) return undefined;
  
  const userObj = user as Record<string, unknown>;
  
  if ('image' in userObj && typeof userObj.image === 'string') {
    return userObj.image;
  }
  
  return undefined;
}

export function RequestInfo({ request }: RequestInfoProps) {
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, 'dd MMMM yyyy, HH:mm', { locale: th });
  };

  const totalComments = (request._count?.comments || 0) + (request.statusHistory?.length || 0);
  
  // Type guard for email and phone
  const userObj = request.user as Record<string, unknown>;
  const userEmail = ('email' in userObj && typeof userObj.email === 'string') ? userObj.email : null;
  const userPhone = ('phone' in userObj && typeof userObj.phone === 'string') ? userObj.phone : null;
  const userImage = getUserImage(request.user);  // ✅ ดึง image

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
              <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="wrap-break-words min-w-0 flex-1">{request.department}</span>
            </h1>
          </div>

          {/* Bottom Row - User Info (Left) and Metadata (Right) */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            {/* Left - User Name (Clickable Popover) */}
            {request.user && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group self-start">
                    <Avatar className="h-6 w-6 shrink-0">
                      {/* ✅ เพิ่ม AvatarImage component */}
                      {userImage && <AvatarImage src={userImage} alt={getUserDisplayName(request.user)} />}
                      <AvatarFallback className="text-xs bg-muted text-foreground group-hover:bg-muted-foreground/20 transition-colors">
                        {getUserInitials(request.user)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium underline decoration-transparent group-hover:decoration-current transition-all wrap-break-words">
                      {getUserDisplayName(request.user)}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 shrink-0">
                        {/* ✅ เพิ่ม AvatarImage component */}
                        {userImage && <AvatarImage src={userImage} alt={getUserFullName(request.user)} />}
                        <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                          {getUserInitials(request.user)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {getUserFullName(request.user)}
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
                        <User className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">ชื่อ-นามสกุล</p>
                          <p className="text-sm text-foreground font-medium wrap-break-words">
                            {getUserFullName(request.user)}
                          </p>
                        </div>
                      </div>

                      {userEmail && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">อีเมล</p>
                            <p className="text-sm text-foreground break-all">
                              {userEmail}
                            </p>
                          </div>
                        </div>
                      )}

                      {userPhone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">เบอร์โทร</p>
                            <p className="text-sm text-foreground wrap-break-words">
                              {userPhone}
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
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="truncate">{formatDate(request.createdAt)}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>{totalComments}</span>
              </div>

              {request._count && (
                <div className="flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 shrink-0" />
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
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="wrap-break-words">Pain Point หน้างาน</span>
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
            <Workflow className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="wrap-break-words">ขั้นตอนการทำงานปัจจุบัน</span>
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
            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="wrap-break-words">สิ่งที่ต้องการให้ Tech ช่วย</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RichTextViewer content={request.expectedTechHelp} />
        </CardContent>
      </Card>
    </div>
  );
}