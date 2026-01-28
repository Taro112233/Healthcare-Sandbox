// components/RequestList/index.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RequestCard } from './RequestCard';
import { RequestFilters } from './RequestFilters';
import { RequestPagination } from './RequestPagination';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { Request, RequestStatus, RequestType } from '@/types/request';
import { AlertTriangle, FileText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RequestListProps {
  title?: string;
  requests: Request[];
  loading?: boolean;
  error?: string | null;
  showFilters?: boolean;
  showUser?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  emptyActionHref?: string;
  statusFilter?: RequestStatus | 'ALL';
  typeFilter?: RequestType | 'ALL';
  onStatusChange?: (status: RequestStatus | 'ALL') => void;
  onTypeChange?: (type: RequestType | 'ALL') => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onRefresh?: () => void;
}

export function RequestList({
  title = 'คำขอทั้งหมด',
  requests,
  loading = false,
  error = null,
  showFilters = true,
  showUser = false,
  emptyTitle = 'ยังไม่มีคำขอ',
  emptyDescription = 'คุณยังไม่ได้ส่งคำขอใดๆ เริ่มต้นส่งคำขอแรกของคุณได้เลย',
  emptyActionLabel = 'ส่งคำขอใหม่',
  emptyActionHref = '/requests/new',
  statusFilter = 'ALL',
  typeFilter = 'ALL',
  onStatusChange,
  onTypeChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  onRefresh,
}: RequestListProps) {

  if (loading) {
    return <LoadingState message="กำลังโหลดคำขอ..." />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              ลองใหม่
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-content-primary">{title}</h2>
        
        {showFilters && onStatusChange && onTypeChange && (
          <RequestFilters
            status={statusFilter}
            type={typeFilter}
            onStatusChange={onStatusChange}
            onTypeChange={onTypeChange}
          />
        )}
      </div>

      {/* Empty State */}
      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <EmptyState
              icon={<FileText className="w-16 h-16 text-content-secondary" />}
              title={emptyTitle}
              description={emptyDescription}
              actionLabel={emptyActionLabel}
              actionHref={emptyActionHref}
            />
          </CardContent>
        </Card>
      ) : (
        /* Card Grid - With Stagger Animation */
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {requests.map((request, index) => (
            <motion.div 
              key={request.id} 
              className="min-w-0 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <RequestCard 
                request={request}
                showUser={showUser}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {requests.length > 0 && totalPages > 1 && onPageChange && (
        <RequestPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}