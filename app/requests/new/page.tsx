// app/requests/new/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RequestForm } from '@/components/RequestForm';
import { AppHeader } from '@/components/shared/AppHeader';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Lightbulb, 
  ListChecks,
} from 'lucide-react';

// Skeleton Component for New Request Page
function NewRequestSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card Skeleton */}
          <Card className="border-l-4">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Form Cards Skeleton */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className={i <= 3 ? "border-l-4" : ""}>
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
          ))}

          {/* Submit Buttons Skeleton */}
          <div className="flex justify-end gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function NewRequestPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useCurrentUser();
  const [tipsOpen, setTipsOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Show skeleton during initial load
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
      <AppHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header Card with Modal Buttons */}
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
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* Tips Dialog */}
                    <Dialog open={tipsOpen} onOpenChange={setTipsOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Lightbulb className="w-4 h-4" />
                          <span className="hidden sm:inline">เคล็ดลับ</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" />
                            เคล็ดลับการส่งคำขอ
                          </DialogTitle>
                          <DialogDescription>
                            วิธีการเขียนคำขอที่ดีเพื่อให้ทีมพัฒนาเข้าใจและช่วยเหลือได้อย่างมีประสิทธิภาพ
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    {/* Process Dialog */}
                    <Dialog open={processOpen} onOpenChange={setProcessOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <ListChecks className="w-4 h-4" />
                          <span className="hidden sm:inline">ขั้นตอน</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                            <ListChecks className="w-5 h-5" />
                            ขั้นตอนหลังส่งคำขอ
                          </DialogTitle>
                          <DialogDescription>
                            กระบวนการพิจารณาและพัฒนาเครื่องมือตามคำขอของคุณ
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Request Form with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <RequestForm />
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}