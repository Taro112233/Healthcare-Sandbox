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
import { MessageSquare, Paperclip, ChevronRight, Building2 } from 'lucide-react';

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
      <Card className="hover:shadow-md hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-200 cursor-pointer group">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <StatusBadge status={request.status} size="sm" />
                <TypeBadge type={request.requestType} size="sm" />
                <Badge variant="outline" className="text-xs bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800">
                  <Building2 className="w-3 h-3 mr-1" />
                  {request.department}
                </Badge>
              </div>

              <h3 className="font-semibold text-foreground mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                {truncateText(request.painPoint, 120)}
              </h3>

              <p className="text-sm text-muted-foreground mb-3">
                {truncateText(request.expectedTechHelp, 100)}
              </p>

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
            </div>

            <div className="flex-shrink-0 self-center">
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}