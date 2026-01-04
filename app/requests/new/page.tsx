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
import { Separator } from '@/components/ui/separator';
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
  CheckCircle2,
  Clock,
  Eye,
  Code,
  TestTube,
  Sparkles,
  Target,
  FileText,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';

// Skeleton Component (unchanged)
function NewRequestSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
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
                      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" />
                            เคล็ดลับการส่งคำขอที่มีประสิทธิภาพ
                          </DialogTitle>
                          <DialogDescription>
                            วิธีการเขียนคำขอที่ดีเพื่อให้ทีมพัฒนาเข้าใจและช่วยเหลือได้อย่างตรงจุด
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 mt-4">
                          {/* Tip 1 - Be Specific */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="space-y-3"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-2">
                                  1. ระบุรายละเอียดให้ชัดเจนและเฉพาะเจาะจง
                                </h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                  <p className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-foreground">ดี:</strong> &ldquo;ต้องคำนวณ Vancomycin dose ตาม Cockcroft-Gault eGFR ทุกครั้งที่ใช้ยา ซึ่งใช้เวลา 5-10 นาที/ครั้ง&rdquo;</span>
                                  </p>
                                  <p className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-foreground">ไม่ดี:</strong> &ldquo;ต้องคำนวณยาตลอดเวลา ลำบาก&rdquo;</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          <Separator />

                          {/* Tip 2 - Include Numbers */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="space-y-3"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-2">
                                  2. ใส่ตัวเลขและความถี่ในการใช้งาน
                                </h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                  <p className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-foreground">ดี:</strong> &ldquo;ER รับผู้ป่วยเฉลี่ย 150 ราย/วัน ต้องคำนวณ GCS + AVPU ประมาณ 40-50 ครั้ง/วัน&rdquo;</span>
                                  </p>
                                  <p className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-foreground">ไม่ดี:</strong> &ldquo;ต้องคำนวณบ่อยมาก&rdquo;</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          <Separator />

                          {/* Tip 3 - Step by Step */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="space-y-3"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-2">
                                  3. อธิบายขั้นตอนการทำงานแบบ Step-by-Step
                                </h3>
                                <div className="bg-muted/50 rounded-lg p-3 space-y-1.5 text-sm">
                                  <p className="font-medium text-foreground">ตัวอย่างที่ดี:</p>
                                  <ol className="space-y-1 text-muted-foreground ml-4 list-decimal">
                                    <li>เปิด EMR ดูน้ำหนักผู้ป่วย</li>
                                    <li>เปิดหนังสือยาหา dose แนะนำ</li>
                                    <li>คำนวณ dose ด้วยเครื่องคิดเลข</li>
                                    <li>เขียน order ในกระดาษ</li>
                                    <li>พยาบาลพิมพ์ลง EMR ซ้ำอีกครั้ง</li>
                                  </ol>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          <Separator />

                          {/* Tip 4 - Add Screenshots */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="space-y-3"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center flex-shrink-0">
                                <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-2">
                                  4. แนบรูปภาพหรือตัวอย่าง (ถ้ามี)
                                </h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Screenshot ของแบบฟอร์มที่ต้องกรอกบ่อย</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>ภาพถ่ายหน้าหนังสือที่ใช้อ้างอิง</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>ตัวอย่าง flow ที่วาดด้วยมือ</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </motion.div>

                          {/* Summary Box */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4"
                          >
                            <p className="text-sm text-teal-800 dark:text-teal-200 font-medium mb-2">
                              💡 สรุป: ยิ่งให้รายละเอียดมาก ทีมพัฒนาจะเข้าใจและช่วยได้ดียิ่งขึ้น
                            </p>
                            <p className="text-xs text-teal-700 dark:text-teal-300">
                              ข้อมูลที่ดีช่วยให้ประหยัดเวลาไปมาถาม-ตอบ และได้เครื่องมือที่ตรงกับความต้องการมากขึ้น
                            </p>
                          </motion.div>
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
                      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                            <ListChecks className="w-5 h-5" />
                            ขั้นตอนหลังส่งคำขอ
                          </DialogTitle>
                          <DialogDescription>
                            กระบวนการพิจารณาและพัฒนาเครื่องมือตามคำขอของคุณ
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 mt-4">
                          {/* Step 1 - Pending Review */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="flex gap-4"
                          >
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-950/30 flex items-center justify-center flex-shrink-0">
                                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                              </div>
                              <div className="w-0.5 h-full bg-gradient-to-b from-yellow-200 to-blue-200 dark:from-yellow-900 dark:to-blue-900 mt-2" />
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="mb-2">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200">
                                  รอตรวจสอบ
                                </span>
                              </div>
                              <h3 className="font-semibold text-foreground mb-2">
                                1. ทีมตรวจสอบคำขอ
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                ทีมพัฒนาจะตรวจสอบรายละเอียดและความเป็นไปได้ของคำขอ
                              </p>
                              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                                <p className="text-muted-foreground">
                                  ⏱️ ระยะเวลา: <strong className="text-foreground">1-3 วันทำการ</strong>
                                </p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Step 2 - Under Consideration */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="flex gap-4"
                          >
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="w-0.5 h-full bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 mt-2" />
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="mb-2">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200">
                                  อยู่ในการพิจารณา
                                </span>
                              </div>
                              <h3 className="font-semibold text-foreground mb-2">
                                2. วิเคราะห์ความต้องการ
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                ทีมจะพูดคุยกับคุณเพิ่มเติม (ผ่าน Comment) เพื่อเข้าใจปัญหาลึกซึ้งยิ่งขึ้น
                              </p>
                              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
                                <p className="text-blue-800 dark:text-blue-200">
                                  💬 คุณสามารถตอบคำถามผ่าน Comment Section ในหน้ารายละเอียดคำขอ
                                </p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Step 3 - In Development */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="flex gap-4"
                          >
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center flex-shrink-0">
                                <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div className="w-0.5 h-full bg-gradient-to-b from-purple-200 to-orange-200 dark:from-purple-900 dark:to-orange-900 mt-2" />
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="mb-2">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-950/30 text-purple-800 dark:text-purple-200">
                                  อยู่ในการพัฒนา
                                </span>
                              </div>
                              <h3 className="font-semibold text-foreground mb-2">
                                3. เริ่มพัฒนาเครื่องมือ
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                ทีม Developer จะเริ่มสร้างเครื่องมือตามที่วิเคราะห์ไว้
                              </p>
                              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                                <p className="text-muted-foreground">
                                  ⏱️ ระยะเวลา: <strong className="text-foreground">1-4 สัปดาห์</strong> (ขึ้นกับความซับซ้อน)
                                </p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Step 4 - In Testing */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="flex gap-4"
                          >
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center flex-shrink-0">
                                <TestTube className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                              </div>
                              <div className="w-0.5 h-full bg-gradient-to-b from-orange-200 to-green-200 dark:from-orange-900 dark:to-green-900 mt-2" />
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="mb-2">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-950/30 text-orange-800 dark:text-orange-200">
                                  อยู่ในการทดสอบ
                                </span>
                              </div>
                              <h3 className="font-semibold text-foreground mb-2">
                                4. ทดสอบกับผู้ใช้จริง
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                คุณจะได้ทดลองใช้เครื่องมือและให้ Feedback
                              </p>
                              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 text-sm">
                                <p className="text-orange-800 dark:text-orange-200">
                                  🔗 คุณจะได้รับลิงก์ทดลองใช้ผ่าน Comment Section
                                </p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Step 5 - Completed */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="flex gap-4"
                          >
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="mb-2">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-200">
                                  สำเร็จ
                                </span>
                              </div>
                              <h3 className="font-semibold text-foreground mb-2">
                                5. ส่งมอบเครื่องมือ
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                เครื่องมือพร้อมใช้งานจริง! 🎉
                              </p>
                              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm">
                                <p className="text-green-800 dark:text-green-200 font-medium mb-2">
                                  ✅ คุณจะได้รับ:
                                </p>
                                <ul className="space-y-1 text-green-700 dark:text-green-300 ml-4 list-disc">
                                  <li>ลิงก์เครื่องมือที่ใช้งานได้จริง</li>
                                  <li>คู่มือการใช้งาน (ถ้ามี)</li>
                                  <li>การสนับสนุนหลังการส่งมอบ</li>
                                </ul>
                              </div>
                            </div>
                          </motion.div>

                          {/* Timeline Summary */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4"
                          >
                            <p className="text-sm font-semibold text-foreground mb-2">
                              ⏱️ ระยะเวลารวมโดยประมาณ
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                              <div className="bg-background/50 rounded-lg p-2">
                                <p className="text-muted-foreground mb-1">เครื่องมือง่าย</p>
                                <p className="font-bold text-foreground">1-2 สัปดาห์</p>
                              </div>
                              <div className="bg-background/50 rounded-lg p-2">
                                <p className="text-muted-foreground mb-1">เครื่องมือปานกลาง</p>
                                <p className="font-bold text-foreground">2-4 สัปดาห์</p>
                              </div>
                              <div className="bg-background/50 rounded-lg p-2">
                                <p className="text-muted-foreground mb-1">เครื่องมือซับซ้อน</p>
                                <p className="font-bold text-foreground">1-3 เดือน</p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
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