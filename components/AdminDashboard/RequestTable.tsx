// components/AdminDashboard/RequestTable.tsx
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
        <div className="h-4 w-20 bg-muted rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-48 bg-muted rounded" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-20 bg-muted rounded" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-24 bg-muted rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-28 bg-muted rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-20 bg-muted rounded" />
      </TableCell>
      <TableCell>
        <div className="h-8 w-16 bg-muted rounded" />
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
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
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
      <div className="border border-border rounded-lg p-8 text-center text-muted-foreground">
        <p>ไม่พบคำขอที่ตรงกับเงื่อนไข</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
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
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {request.id.slice(0, 8)}...
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {truncateText(request.painPoint, 80)}
                    </p>
                    {request._count && (
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {request._count.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          {request._count.attachments}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <TypeBadge type={request.requestType} size="sm" />
                </TableCell>

                <TableCell>
                  <StatusBadge status={request.status} size="sm" />
                </TableCell>

                <TableCell>
                  {request.user ? (
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {request.user.firstName} {request.user.lastName?.charAt(0)}.
                      </p>
                      {request.user.email && (
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {request.user.email}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(request.createdAt)}
                </TableCell>

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