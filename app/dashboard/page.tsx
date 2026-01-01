// app/dashboard/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { RequestList } from '@/components/RequestList';
import { AppHeader } from '@/components/shared/AppHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRequests } from '@/hooks/useRequests';
import { RequestStatus, RequestType, Request } from '@/types/request';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: userLoading, isAuthenticated } = useCurrentUser();
  
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<RequestType | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // ✅ ดึงข้อมูลทั้งหมดมาครั้งเดียว (ไม่มี filter)
  const { 
    requests: allRequests, 
    total: totalRequests,
    loading: requestsLoading,
    error,
    refetch 
  } = useRequests({
    page: 1,
    pageSize: 1000, // ดึงมาเยอะๆ เพื่อกรองเอง
  });

  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [userLoading, isAuthenticated, router]);

  // ✅ กรองข้อมูลฝั่ง client
  const filteredRequests = useMemo(() => {
    let filtered = [...allRequests];

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(req => req.requestType === typeFilter);
    }

    return filtered;
  }, [allRequests, statusFilter, typeFilter]);

  // ✅ Pagination ฝั่ง client
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredRequests.slice(startIndex, endIndex);
  }, [filteredRequests, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredRequests.length / pageSize);
  const total = filteredRequests.length;

  const handleStatusChange = (status: RequestStatus | 'ALL') => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page
  };

  const handleTypeChange = (type: RequestType | 'ALL') => {
    setTypeFilter(type);
    setCurrentPage(1); // Reset to first page
  };

  if (userLoading) {
    return <LoadingState message="กำลังโหลด..." fullScreen />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RequestList
          title="คำขอของฉัน"
          requests={paginatedRequests}
          loading={requestsLoading}
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
      </main>
    </div>
  );
}