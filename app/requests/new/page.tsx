// app/requests/new/page.tsx
'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RequestForm } from '@/components/RequestForm';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GuideDialog } from '@/components/RequestForm/GuideDialog';

// ✅ Skeleton Component
function NewRequestSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-linear-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
      
      <main className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="border-l-4">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-8 w-64" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-9 w-32" />
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + (i * 0.05) }}
              >
                <Card className={i <= 3 ? "border-l-4" : ""}>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full max-w-md" />
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    {i === 2 ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <>
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-4 w-24 ml-auto" />
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex justify-end gap-3"
            >
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function NewRequestPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useCurrentUser();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <NewRequestSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="fixed inset-0 bg-linear-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
            
      <main className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="border-l-4 border-l-teal-500 dark:border-l-teal-400">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-foreground">
                        ส่งคำขอพัฒนาเครื่องมือ
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-2">
                        อธิบาย pain point และสิ่งที่ต้องการให้ทีมเทคโนโลยีช่วยพัฒนา
                      </CardDescription>
                    </div>
                    
                    <GuideDialog />
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <RequestForm />
            </motion.div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}