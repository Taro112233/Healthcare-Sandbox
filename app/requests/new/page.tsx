// app/requests/new/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { RequestForm } from '@/components/RequestForm';
import { AppHeader } from '@/components/shared/AppHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2,
  HelpCircle,
  ListChecks,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

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

  if (loading) {
    return <LoadingState message="กำลังโหลด..." fullScreen />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้ารายการ
            </Button>
          </Link>
        </div>

        {/* Main Content - Full Width */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header Card with Modal Buttons */}
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
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">อธิบาย Pain Point ให้ชัดเจน</h4>
                              <p className="text-sm text-muted-foreground">
                                บอกว่าปัญหาคืออะไร ทำไมถึงเป็นปัญหา มีผลกระทบอย่างไร เช่น "ต้องคำนวณ dose ยาด้วยมือทุกครั้ง ใช้เวลา 5-10 นาที เสี่ยงต่อการผิดพลาด"
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">อธิบายขั้นตอนการทำงานปัจจุบัน</h4>
                              <p className="text-sm text-muted-foreground">
                                เขียนเป็น step by step ว่าตอนนี้ทำงานอย่างไร ช่วยให้เห็นภาพรวมและเข้าใจ context เช่น "1. ดูน้ำหนักจาก chart 2. เปิดหนังสือหาสูตร 3. คำนวณด้วยเครื่องคิดเลข"
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">ระบุสิ่งที่คาดหวังจากเทคโนโลยี</h4>
                              <p className="text-sm text-muted-foreground">
                                บอกว่าอยากได้อะไร ทำงานอย่างไร มี feature อะไรบ้าง เช่น "อยากได้ calculator ที่ใส่น้ำหนักแล้วแสดง dose ทันที รองรับยา 10 ชนิด"
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">แนบไฟล์ภาพหรือเอกสารประกอบ</h4>
                              <p className="text-sm text-muted-foreground">
                                ถ้ามีรูปภาพ screenshot หรือเอกสารตอนนี้ใช้งาน ช่วยแนบมาด้วยจะทำให้เข้าใจง่ายขึ้น
                              </p>
                            </div>
                          </div>
                        </div>

                        <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <AlertDescription className="text-amber-800 dark:text-amber-200">
                            <strong>ข้อควรระวัง:</strong> ห้ามใช้ข้อมูลผู้ป่วยจริง - ใช้ข้อมูลตัวอย่างหรือ mock data เท่านั้น
                          </AlertDescription>
                        </Alert>
                      </div>
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
                      
                      <div className="space-y-4 py-4">
                        {/* Timeline */}
                        <div className="space-y-4">
                          {/* Step 1 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-950/30 flex items-center justify-center flex-shrink-0">
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                              </div>
                              <div className="w-0.5 h-full bg-border mt-2" />
                            </div>
                            <div className="flex-1 pb-6">
                              <h4 className="font-semibold text-foreground mb-1">1. รอตรวจสอบ</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                ทีมจะตรวจสอบความเป็นไปได้และความสำคัญของคำขอ
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>ประมาณ 1-3 วัน</span>
                              </div>
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                              </div>
                              <div className="w-0.5 h-full bg-border mt-2" />
                            </div>
                            <div className="flex-1 pb-6">
                              <h4 className="font-semibold text-foreground mb-1">2. อยู่ในการพิจารณา</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                ทีมกำลังวิเคราะห์ requirement และออกแบบ solution
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>ประมาณ 2-5 วัน</span>
                              </div>
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center flex-shrink-0">
                                <div className="w-3 h-3 rounded-full bg-purple-500" />
                              </div>
                              <div className="w-0.5 h-full bg-border mt-2" />
                            </div>
                            <div className="flex-1 pb-6">
                              <h4 className="font-semibold text-foreground mb-1">3. อยู่ในการพัฒนา</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Developer กำลังเขียนโค้ดและสร้างเครื่องมือตามที่ออกแบบไว้
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>ประมาณ 1-2 สัปดาห์</span>
                              </div>
                            </div>
                          </div>

                          {/* Step 4 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center flex-shrink-0">
                                <div className="w-3 h-3 rounded-full bg-orange-500" />
                              </div>
                              <div className="w-0.5 h-full bg-border mt-2" />
                            </div>
                            <div className="flex-1 pb-6">
                              <h4 className="font-semibold text-foreground mb-1">4. อยู่ในการทดสอบ</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                ทีมและผู้ใช้งานจริงทดสอบ ให้ feedback และปรับปรุง
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>ประมาณ 3-7 วัน</span>
                              </div>
                            </div>
                          </div>

                          {/* Step 5 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">5. สำเร็จ ✓</h4>
                              <p className="text-sm text-muted-foreground">
                                เครื่องมือพร้อมใช้งานจริง และมี user guide สำหรับทุกคน
                              </p>
                            </div>
                          </div>
                        </div>

                        <Alert className="bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800">
                          <HelpCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                          <AlertDescription className="text-teal-800 dark:text-teal-200">
                            <strong>หมายเหตุ:</strong> ระยะเวลาอาจแตกต่างกันไปตามความซับซ้อนของเครื่องมือ คุณสามารถติดตามสถานะได้ที่หน้า Dashboard
                          </AlertDescription>
                        </Alert>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Request Form */}
          <RequestForm />
        </div>
      </main>
    </div>
  );
}