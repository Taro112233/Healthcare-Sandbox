// app/requests/[id]/page.tsx
'use client';

import React, { useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { RequestDetail } from '@/components/RequestDetail';
import { AppHeader } from '@/components/shared/AppHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRequest } from '@/hooks/useRequests';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Skeleton Component for Request Detail
function RequestDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Gradient - fixed position */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
      
      <AppHeader />
      <main className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-36" />
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </motion.div>

              {/* Content Cards Skeleton */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + (i * 0.1) }}
                >
                  <Card className="border-l-4 bg-card">
                    <CardHeader className="pb-4">
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Attachments Skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Card className="bg-card">
                  <CardHeader className="pb-3">
                    <Skeleton className="h-5 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Skeleton className="w-16 h-16 rounded" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar Skeleton */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="lg:sticky lg:top-6 lg:self-start"
            >
              <Card className="h-[600px] bg-card">
                <CardHeader className="pb-3 border-b border-border">
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
                      className="flex gap-3"
                    >
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function RequestDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: userLoading, isAuthenticated } = useCurrentUser();
  const { request, loading: requestLoading, error, refetch } = useRequest(id);

  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [userLoading, isAuthenticated, router]);

  // Show skeleton during initial load
  if (userLoading || requestLoading) {
    return <RequestDetailSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-background"
      >
        {/* Background Gradient - fixed position */}
        <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
        
        <AppHeader />
        <main className="relative">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <EmptyState
                icon={<AlertCircle className="w-16 h-16 text-red-400" />}
                title="เกิดข้อผิดพลาด"
                description={error}
                actionLabel="กลับหน้าหลัก"
                actionHref="/dashboard"
              />
            </motion.div>
          </div>
        </main>
      </motion.div>
    );
  }

  if (!request) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-background"
      >
        {/* Background Gradient - fixed position */}
        <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
        
        <AppHeader />
        <main className="relative">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <EmptyState
                icon={<AlertCircle className="w-16 h-16 text-muted-foreground" />}
                title="ไม่พบคำขอ"
                description="คำขอที่คุณต้องการอาจถูกลบหรือคุณไม่มีสิทธิ์เข้าถึง"
                actionLabel="กลับหน้าหลัก"
                actionHref="/dashboard"
              />
            </motion.div>
          </div>
        </main>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Background Gradient - fixed position */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
      
      <AppHeader />
      
      <main className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <RequestDetail 
              request={request}
              user={{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
              }}
              onRefresh={refetch}
            />
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}