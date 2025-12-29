// components/AdminDashboard/RequestTable.tsx
// HealthTech Sandbox - Admin Request Management Table

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TypeBadge } from '@/components/shared/TypeBadge';
import { Request, truncateText } from '@/types/request';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Eye, MessageSquare, Paperclip } from 'lucide-react';

interface RequestTableProps {
  requests: Request[];
  isLoading?: boolean;
}

function TableRowSkeleton() {
  return (
    <TableRow className="animate-pulse">
      <TableCell>
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-20 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-24 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-28 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </TableCell>
    </TableRow>
  );
}

export function RequestTable({ requests, isLoading }: RequestTableProps) {
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, 'dd MMM yy', { locale: th });
  };

  if (isLoading) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Pain Point</TableHead>
              <TableHead className="font-semibold">ประเภท</TableHead>
              <TableHead className="font-semibold">สถานะ</TableHead>
              <TableHead className="font-semibold">ผู้ส่ง</TableHead>
              <TableHead className="font-semibold">วันที่</TableHead>
              <TableHead className="font-semibold text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRowSkeleton key={i} />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-gray-500">
        <p>ไม่พบคำขอที่ตรงกับเงื่อนไข</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold w-24">ID</TableHead>
              <TableHead className="font-semibold min-w-[200px]">Pain Point</TableHead>
              <TableHead className="font-semibold w-28">ประเภท</TableHead>
              <TableHead className="font-semibold w-36">สถานะ</TableHead>
              <TableHead className="font-semibold w-32">ผู้ส่ง</TableHead>
              <TableHead className="font-semibold w-24">วันที่</TableHead>
              <TableHead className="font-semibold w-20 text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow 
                key={request.id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                {/* ID */}
                <TableCell className="font-mono text-xs text-gray-500">
                  {request.id.slice(0, 8)}...
                </TableCell>

                {/* Pain Point */}
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {truncateText(request.painPoint, 80)}
                    </p>
                    {/* Counts */}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {request._count && (
                        <>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {request._count.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Paperclip className="w-3 h-3" />
                            {request._count.attachments}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Type */}
                <TableCell>
                  <TypeBadge type={request.requestType} size="sm" />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={request.status} size="sm" />
                </TableCell>

                {/* User */}
                <TableCell>
                  {request.user ? (
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {request.user.firstName} {request.user.lastName?.charAt(0)}.
                      </p>
                      {request.user.email && (
                        <p className="text-xs text-gray-500 truncate max-w-[120px]">
                          {request.user.email}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>

                {/* Date */}
                <TableCell className="text-sm text-gray-600">
                  {formatDate(request.createdAt)}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <Link href={`/requests/${request.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      ดู
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}