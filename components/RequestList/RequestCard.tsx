// components/RequestList/RequestCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TypeBadge } from '@/components/shared/TypeBadge';
import { Request } from '@/types/request';
import { getRelativeTime } from '@/types/comment';
import { truncateRichText } from '@/lib/rich-text-utils';
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
    <Link href={`/requests/${request.id}`} className="block w-full h-full">
      <Card className="hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer group h-full w-full overflow-hidden">
        <CardContent className="p-5 flex flex-col h-full">
          {/* Badge Row - Type (ซ้าย) + Status (ขวา) */}
          <div className="flex items-start justify-between gap-2 mb-3 flex-wrap min-w-0">
            <div className="flex-shrink-0">
              <TypeBadge type={request.requestType} size="sm" />
            </div>
            <div className="flex-shrink-0">
              <StatusBadge status={request.status} size="sm" />
            </div>
          </div>

          {/* Department - แสดง 2 บรรทัด with proper wrapping */}
          <div className="flex items-start gap-2 mb-3 min-w-0">
            <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-foreground line-clamp-2 break-words min-w-0 flex-1">
              {request.department}
            </p>
          </div>

          {/* Expected Tech Help - 3 lines with proper wrapping */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 break-words flex-1">
            {truncateRichText(request.expectedTechHelp, 120)}
          </p>

          {/* Footer Info */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground mt-auto">
            {showUser && request.user && (
              <div className="flex items-center gap-2 min-w-0 max-w-full">
                <Avatar className="h-5 w-5 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-muted">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{request.user.firstName} {request.user.lastName}</span>
              </div>
            )}

            <span className="whitespace-nowrap flex-shrink-0">{getRelativeTime(request.createdAt)}</span>

            {request._count && request._count.comments > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{request._count.comments}</span>
              </div>
            )}

            {request._count && request._count.attachments > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
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