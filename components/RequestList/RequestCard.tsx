// components/RequestList/RequestCard.tsx
// HealthTech Sandbox - Request Card Component

'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TypeBadge } from '@/components/shared/TypeBadge';
import { Request, truncateText } from '@/types/request';
import { getRelativeTime } from '@/types/comment';
import { MessageSquare, Paperclip, ChevronRight } from 'lucide-react';

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
      <Card className="hover:shadow-md hover:border-teal-200 transition-all duration-200 cursor-pointer group">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header with badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <StatusBadge status={request.status} size="sm" />
                <TypeBadge type={request.requestType} size="sm" />
              </div>

              {/* Pain Point (Title) */}
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                {truncateText(request.painPoint, 120)}
              </h3>

              {/* Expected Help (Subtitle) */}
              <p className="text-sm text-gray-600 mb-3">
                {truncateText(request.expectedTechHelp, 100)}
              </p>

              {/* Footer Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                {/* User Info */}
                {showUser && request.user && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs bg-gray-200">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{request.user.firstName} {request.user.lastName}</span>
                  </div>
                )}

                {/* Date */}
                <span>{getRelativeTime(request.createdAt)}</span>

                {/* Comments Count */}
                {request._count && request._count.comments > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{request._count.comments}</span>
                  </div>
                )}

                {/* Attachments Count */}
                {request._count && request._count.attachments > 0 && (
                  <div className="flex items-center gap-1">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{request._count.attachments}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 self-center">
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}