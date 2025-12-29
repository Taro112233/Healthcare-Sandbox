// components/RequestDetail/StatusHistory.tsx
// HealthTech Sandbox - Status History Timeline Component

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StatusHistory as StatusHistoryType } from '@/types/request';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { History, ArrowRight, User } from 'lucide-react';

interface StatusHistoryProps {
  history: StatusHistoryType[];
}

export function StatusHistory({ history }: StatusHistoryProps) {
  if (!history || history.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-gray-700 flex items-center gap-2">
            <History className="w-4 h-4" />
            ประวัติการเปลี่ยนสถานะ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center py-4">
            ยังไม่มีประวัติการเปลี่ยนสถานะ
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, 'dd MMM yyyy, HH:mm', { locale: th });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-gray-700 flex items-center gap-2">
          <History className="w-4 h-4" />
          ประวัติการเปลี่ยนสถานะ ({history.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Timeline Line */}
              {index < history.length - 1 && (
                <div className="absolute left-3 top-8 w-0.5 h-full bg-gray-200" />
              )}
              
              <div className="flex gap-4">
                {/* Timeline Dot */}
                <div className="relative z-10 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-teal-600" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  {/* Status Change */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <StatusBadge status={item.fromStatus} size="sm" showIcon={false} />
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <StatusBadge status={item.toStatus} size="sm" showIcon={false} />
                  </div>

                  {/* Note */}
                  {item.note && (
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mb-2">
                      {item.note}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {item.user && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {item.user.firstName} {item.user.lastName}
                      </span>
                    )}
                    <span>{formatDate(item.changedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}