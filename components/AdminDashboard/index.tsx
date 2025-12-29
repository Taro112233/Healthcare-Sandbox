// components/AdminDashboard/index.tsx
// HealthTech Sandbox - Admin Dashboard Container

'use client';

import React, { useState } from 'react';
import { StatsCards } from './StatsCards';
import { RequestTable } from './RequestTable';
import { RequestFilters } from '@/components/RequestList/RequestFilters';
import { RequestPagination } from '@/components/RequestList/RequestPagination';
import { useRequests, useAdminStats } from '@/hooks/useRequests';
import { RequestStatus, RequestType } from '@/types/request';
import { Button } from '@/components/ui/button';
import { RefreshCw, Shield } from 'lucide-react';

export function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<RequestType | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch admin stats
  const { 
    stats, 
    loading: statsLoading, 
    refetch: refetchStats 
  } = useAdminStats();

  // Fetch all requests (admin sees all)
  const { 
    requests, 
    total, 
    loading: requestsLoading,
    refetch: refetchRequests 
  } = useRequests({
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  const handleRefresh = () => {
    refetchStats();
    refetchRequests();
  };

  const handleFilterChange = (status: RequestStatus | 'ALL', type: RequestType | 'ALL') => {
    setStatusFilter(status);
    setTypeFilter(type);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            จัดการคำขอทั้งหมดในระบบ
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" />
          รีเฟรช
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} isLoading={statsLoading} />

      {/* Request Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            รายการคำขอ ({total})
          </h2>
          <RequestFilters
            status={statusFilter}
            type={typeFilter}
            onStatusChange={(status) => handleFilterChange(status, typeFilter)}
            onTypeChange={(type) => handleFilterChange(statusFilter, type)}
          />
        </div>

        {/* Request Table */}
        <RequestTable 
          requests={requests} 
          isLoading={requestsLoading} 
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <RequestPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}