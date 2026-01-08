// app/dashboard/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RequestList } from '@/components/RequestList';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRequests } from '@/hooks/useRequests';
import { RequestStatus, RequestType } from '@/types/request';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

function DashboardSkeleton() {
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + (i * 0.05) }}
              >
                <Card>
                  <CardContent className="p-5">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-28" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <Skeleton className="h-16 w-full" />
                      <div className="flex flex-wrap items-center gap-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center justify-between pt-4 border-t border-border"
          >
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-24" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: userLoading, isAuthenticated } = useCurrentUser();
  
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<RequestType | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const { 
    requests: allRequests, 
    loading: requestsLoading,
    error,
    refetch 
  } = useRequests({
    page: 1,
    pageSize: 1000,
  });

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [userLoading, isAuthenticated, router]);

  const filteredRequests = useMemo(() => {
    let filtered = [...allRequests];

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(req => req.requestType === typeFilter);
    }

    return filtered;
  }, [allRequests, statusFilter, typeFilter]);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredRequests.slice(startIndex, endIndex);
  }, [filteredRequests, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredRequests.length / pageSize);
  const total = filteredRequests.length;

  const handleStatusChange = (status: RequestStatus | 'ALL') => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: RequestType | 'ALL') => {
    setTypeFilter(type);
    setCurrentPage(1);
  };

  // ✅ Show skeleton while loading user OR initial requests fetch
  if (userLoading || (requestsLoading && allRequests.length === 0)) {
    return <DashboardSkeleton />;
  }

  // ✅ Don't render if not authenticated (waiting for redirect)
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <RequestList
            title="คำขอของฉัน"
            requests={paginatedRequests}
            loading={requestsLoading && allRequests.length > 0}
            error={error}
            showFilters
            showUser={false}
            emptyTitle="ยังไม่มีคำขอ"
            emptyDescription="เริ่มต้นส่งคำขอพัฒนาเครื่องมือดิจิทัลของคุณ"
            emptyActionLabel="ส่งคำขอใหม่"
            emptyActionHref="/requests/new"
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            onStatusChange={handleStatusChange}
            onTypeChange={handleTypeChange}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onRefresh={refetch}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}