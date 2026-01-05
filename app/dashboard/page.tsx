'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RequestList } from '@/components/RequestList';
import { AppHeader } from '@/components/shared/AppHeader';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRequests } from '@/hooks/useRequests';
import { RequestStatus, RequestType } from '@/types/request';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

// --- Skeleton Component ---
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500/5 via-emerald-500/5 to-cyan-500/5 pointer-events-none" />
      
      {/* Navbar Skeleton */}
      <div className="border-b bg-white/50 backdrop-blur-md h-16 w-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-4">
             <Skeleton className="h-8 w-8 rounded-full" />
             <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          
          {/* Header & Filter Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Skeleton className="h-10 w-48" /> {/* Title */}
              <Skeleton className="h-4 w-64" />  {/* Subtitle */}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-10 w-32 rounded-full" /> {/* Filter 1 */}
              <Skeleton className="h-10 w-32 rounded-full" /> {/* Filter 2 */}
              <Skeleton className="h-10 w-24 rounded-full" /> {/* Refresh button */}
            </div>
          </div>

          {/* Grid Layout: ตรงกับ RequestList จริง */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border-none shadow-sm">
                <CardContent className="p-0">
                  <div className="p-5 space-y-4">
                    {/* Top: Tag and Date */}
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    
                    {/* Middle: Title and Content */}
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>

                    {/* Bottom: User Info or Footer */}
                    <div className="pt-4 border-t flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center pt-8">
             <Skeleton className="h-10 w-64 rounded-md" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  
  // 1. ดึงข้อมูล User
  const { user, loading: userLoading, isAuthenticated } = useCurrentUser();
  
  // 2. ดึงข้อมูล Requests
  const { 
    requests = [], 
    loading: requestsLoading,
    error,
    refetch 
  } = useRequests({ page: 1, pageSize: 1000 });

  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<RequestType | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // 3. ปรับ Logic การเช็ก Loading ใหม่ (สำคัญมาก)
  // เราจะไม่ค้าง Skeleton ถ้า requestsLoading เป็น false แล้ว (แสดงว่าข้อมูลมาแล้ว)
  // แม้ว่า userLoading จะยังเป็น true อยู่ก็ตาม (ถ้ามีข้อมูล user อยู่บ้าง)
  const isActuallyLoading = useMemo(() => {
    // ถ้าไม่มีทั้ง user และข้อมูลยังไม่มา ให้รอ
    if (userLoading && !user && requests.length === 0) return true;
    // ถ้า requests กำลังโหลดครั้งแรก และยังไม่มีข้อมูลเลย ให้รอ
    if (requestsLoading && requests.length === 0) return true;
    return false;
  }, [userLoading, user, requestsLoading, requests.length]);

  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [userLoading, isAuthenticated, router]);

  const filteredRequests = useMemo(() => {
    const data = Array.isArray(requests) ? requests : [];
    return data.filter(req => {
      const matchStatus = statusFilter === 'ALL' || req.status === statusFilter;
      const matchType = typeFilter === 'ALL' || req.requestType === typeFilter;
      return matchStatus && matchType;
    });
  }, [requests, statusFilter, typeFilter]);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredRequests.slice(startIndex, startIndex + pageSize);
  }, [filteredRequests, currentPage, pageSize]);

  // --- RENDERING ---

  if (isActuallyLoading) {
    return <DashboardSkeleton />;
  }

  // ถ้าไม่มี user เลยจริงๆ หลังโหลดเสร็จ
  if (!user && !userLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background relative"
    >
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
      <AppHeader />
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RequestList
          title="คำขอของฉัน"
          requests={paginatedRequests}
          loading={requestsLoading}
          error={error}
          showFilters
          showUser={user?.role === 'ADMIN'}
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          onStatusChange={(s) => { setStatusFilter(s); setCurrentPage(1); }}
          onTypeChange={(t) => { setTypeFilter(t); setCurrentPage(1); }}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredRequests.length / pageSize)}
          totalItems={filteredRequests.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onRefresh={refetch}
        />
      </main>
    </motion.div>
  );
}