// components/RequestList/RequestCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TypeBadge } from '@/components/shared/TypeBadge';
import { Request, truncateText } from '@/types/request';
import { getRelativeTime } from '@/types/comment';
import { MessageSquare, Paperclip, Building2 } from 'lucide-react';

interface RequestCardProps {
  request: Request;
  showUser?: boolean;
}

export function RequestCard({ request, showUser = false }: RequestCardProps) {
  const getUserInitials = () => {
    if (!request.user) return 'U';
    return `${request.user.firstName.charAt(0)}${request.user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Link href={`/requests/${request.id}`}>
      <Card className="hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer group h-full">
        <CardContent className="p-5">
          {/* Badge Row - Type (ซ้าย) + Status (ขวา) */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <TypeBadge type={request.requestType} size="sm" />
            <StatusBadge status={request.status} size="sm" />
          </div>

          {/* Department - แสดง 2 บรรทัด */}
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm font-medium text-foreground line-clamp-2">
              {request.department}
            </p>
          </div>

          {/* สิ่งที่ต้องการให้ Tech ช่วย - แสดง 3 บรรทัด */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {request.expectedTechHelp}
          </p>

          {/* Footer Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {showUser && request.user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs bg-muted">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span>{request.user.firstName} {request.user.lastName}</span>
              </div>
            )}

            <span>{getRelativeTime(request.createdAt)}</span>

            {request._count && request._count.comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{request._count.comments}</span>
              </div>
            )}

            {request._count && request._count.attachments > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5" />
                <span>{request._count.attachments}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}