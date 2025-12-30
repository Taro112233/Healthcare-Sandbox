// app/admin/page.tsx
'use client';

import React, { useEffect } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AppHeader } from '@/components/shared/AppHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, isAdmin } = useCurrentUser();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <LoadingState message="กำลังโหลด..." fullScreen />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            icon={<ShieldAlert className="w-16 h-16 text-red-400" />}
            title="ไม่มีสิทธิ์เข้าถึง"
            description="หน้านี้สำหรับผู้ดูแลระบบเท่านั้น"
            actionLabel="กลับหน้าหลัก"
            actionHref="/dashboard"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </main>
    </div>
  );
}