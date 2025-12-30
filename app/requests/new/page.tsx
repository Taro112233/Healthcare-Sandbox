// app/requests/new/page.tsx
'use client';

import React, { useEffect } from 'react';
import { RequestForm } from '@/components/RequestForm';
import { AppHeader } from '@/components/shared/AppHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewRequestPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useCurrentUser();

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

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้ารายการ
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            ส่งคำขอพัฒนาเครื่องมือ
          </h1>
          <p className="text-muted-foreground mt-2">
            อธิบาย pain point และสิ่งที่ต้องการให้ทีมเทคโนโลยีช่วยพัฒนา
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">ข้อแนะนำ</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• อธิบาย pain point ให้ชัดเจน เพื่อให้เข้าใจปัญหาที่แท้จริง</li>
            <li>• อธิบายขั้นตอนการทำงานปัจจุบัน เพื่อให้เห็นภาพรวม</li>
            <li>• ระบุสิ่งที่คาดหวังจากเทคโนโลยี เพื่อพัฒนาตรงความต้องการ</li>
            <li>• แนบไฟล์ภาพหรือเอกสารประกอบ (ถ้ามี)</li>
          </ul>
        </div>

        {/* Request Form */}
        <RequestForm />
      </main>
    </div>
  );
}