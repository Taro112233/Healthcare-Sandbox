// app/dashboard/page.tsx
// HealthTech Sandbox - User Dashboard Page (My Requests)

'use client';

import React, { useState } from 'react';
import { RequestList } from '@/components/RequestList';
import { AppHeader } from '@/components/shared/AppHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRequests } from '@/hooks/useRequests';
import { RequestStatus, RequestType } from '@/types/request';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: userLoading, isAuthenticated } = useCurrentUser();
  
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<RequestType | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Fetch user's own requests
  const { 
    requests, 
    total, 
    loading: requestsLoading,
    error,
    refetch 
  } = useRequests({
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  // Redirect if not authenticated
  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [userLoading, isAuthenticated, router]);

  // Handle filter changes
  const handleStatusChange = (status: RequestStatus | 'ALL') => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: RequestType | 'ALL') => {
    setTypeFilter(type);
    setCurrentPage(1);
  };

  // Loading state
  if (userLoading) {
    return <LoadingState message="กำลังโหลด..." fullScreen />;
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RequestList
          title="คำขอของฉัน"
          requests={requests}
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