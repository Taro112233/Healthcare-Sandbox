// app/requests/[id]/page.tsx
'use client';

import React, { useEffect, use } from 'react';
import { RequestDetail } from '@/components/RequestDetail';
import { AppHeader } from '@/components/shared/AppHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRequest } from '@/hooks/useRequests';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
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

  if (userLoading || requestLoading) {
    return <LoadingState message="กำลังโหลดข้อมูล..." fullScreen />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับไปหน้ารายการ
              </Button>
            </Link>
          </div>
          <EmptyState
            icon={<AlertCircle className="w-16 h-16 text-red-400" />}
            title="เกิดข้อผิดพลาด"
            description={error}
            actionLabel="กลับหน้าหลัก"
            actionHref="/dashboard"
          />
        </main>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับไปหน้ารายการ
              </Button>
            </Link>
          </div>
          <EmptyState
            icon={<AlertCircle className="w-16 h-16 text-muted-foreground" />}
            title="ไม่พบคำขอ"
            description="คำขอที่คุณต้องการอาจถูกลบหรือคุณไม่มีสิทธิ์เข้าถึง"
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
      </main>
    </div>
  );
}