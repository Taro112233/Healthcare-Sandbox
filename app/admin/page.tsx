// app/admin/page.tsx
// HealthTech Sandbox - Admin Dashboard Page

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

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Loading state
  if (loading) {
    return <LoadingState message="กำลังโหลด..." fullScreen />;
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return null; // Will redirect
  }

  // Not admin - show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader user={user} />
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
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </main>
    </div>
  );
}