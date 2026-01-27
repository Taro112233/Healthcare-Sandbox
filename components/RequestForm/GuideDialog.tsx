// components/RequestForm/GuideDialog.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Lightbulb,
  FileCode,
  ListChecks,
  Target,
  Workflow,
  FileText,
  Image as ImageIcon,
  Building2,
  Calculator,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Code,
  TestTube,
  BookOpen,
} from 'lucide-react';

export function GuideDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">คู่มือการส่งคำขอ</span>
          <span className="sm:hidden">คู่มือ</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            คู่มือการส่งคำขอพัฒนาเครื่องมือ
          </DialogTitle>
          <DialogDescription>
            เคล็ดลับ ตัวอย่าง และขั้นตอนการส่งคำขอที่มีประสิทธิภาพ
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="tips" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tips" className="gap-2">
              <Lightbulb className="w-4 h-4" />
              เคล็ดลับ
            </TabsTrigger>
            <TabsTrigger value="example" className="gap-2">
              <FileCode className="w-4 h-4" />
              ตัวอย่าง
            </TabsTrigger>
            <TabsTrigger value="process" className="gap-2">
              <ListChecks className="w-4 h-4" />
              ขั้นตอน
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: เคล็ดลับ */}
          <TabsContent value="tips" className="flex-1 overflow-y-auto mt-6 space-y-6">
            {/* Tip 1: Specific Problem */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    1. อธิบายปัญหาให้ชัดเจนและเฉพาะเจาะจง
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground mb-1.5">ตัวอย่าง:</p>
                      <p className="text-muted-foreground leading-relaxed">
                        "ต้องคำนวณ Vancomycin dose ตาม eGFR ของผู้ป่วยทุกครั้ง ซึ่งต้องเปิดดูสูตร Cockcroft-Gault 
                        แล้วคำนวณด้วยเครื่องคิดเลข ใช้เวลาประมาณ 5-10 นาทีต่อครั้ง และบางครั้งก็คำนวณผิด"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Tip 2: Current Workflow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center shrink-0">
                  <Workflow className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    2. บอกขั้นตอนที่ทำอยู่ตอนนี้
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
                    <p className="font-medium text-foreground">ตัวอย่าง:</p>
                    <ol className="space-y-2 text-muted-foreground ml-4 list-decimal leading-relaxed">
                      <li>เปิด EMR ดูน้ำหนักและอายุผู้ป่วย</li>
                      <li>เปิดหนังสือยาหาสูตรคำนวณ dose</li>
                      <li>ใช้เครื่องคิดเลขคำนวณ</li>
                      <li>เขียน order ลงกระดาษ</li>
                      <li>พยาบาลพิมพ์ลง EMR ซ้ำอีกรอบ</li>
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Tip 3: What You Want */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    3. บอกว่าอยากได้อะไร
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground mb-1.5">ตัวอย่าง:</p>
                      <p className="text-muted-foreground leading-relaxed">
                        "อยากได้เครื่องคำนวณที่กรอกน้ำหนัก อายุ เพศ กับค่า Creatinine แล้วแสดง dose ที่แนะนำทันที 
                        โดยรองรับยาหลายชนิดที่ใช้บ่อย เช่น Vancomycin, Gentamicin, Acyclovir"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Tip 4: Attachments */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    4. แนบรูปภาพหรือตัวอย่าง (ถ้ามี)
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <p>• Screenshot ของแบบฟอร์มที่ต้องกรอกบ่อย</p>
                    <p>• ภาพถ่ายหน้าหนังสือที่ใช้อ้างอิง</p>
                    <p>• ตัวอย่าง flow ที่วาดด้วยมือ</p>
                    <p>• ตัวอย่างข้อมูลที่ต้องป้อน (ไม่ใช้ข้อมูลจริง)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Summary */}
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
          </TabsContent>

          {/* Tab 2: ตัวอย่าง */}
          <TabsContent value="example" className="flex-1 overflow-y-auto mt-6 space-y-6">
            {/* Department Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    🏥 หน่วยงานที่ขอ
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-3 text-sm text-foreground">
                    ห้องยานอก โรงพยาบาลสู่สวรรค์
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Request Type Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-950/30 flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    📋 ประเภทคำขอ
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 text-sm font-medium">
                      <Calculator className="w-4 h-4" />
                      เครื่องคำนวณ
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Pain Point Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950/30 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    🧠 Pain Point หน้างาน
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm text-foreground whitespace-pre-wrap">
                    {`การปรับขนาดยาตามการทำงานของไตเป็นงานที่ต้องทำบ่อยมาก โดยเฉพาะในผู้ป่วยสูงอายุหรือผู้ป่วยโรคเรื้อรัง

แม้โรงพยาบาลจะมีตารางหรือใบแนวทางการปรับขนาดยาตามค่า Creatinine clearance (CrCl) สำหรับยาแต่ละตัวอยู่แล้ว แต่การใช้งานจริงยังต้องคำนวณ CrCl แยกต่างหาก และเปิดเอกสารอ้างอิงหลายหน้า

กระบวนการนี้ใช้เวลานาน เสี่ยงต่อการคำนวณผิด และอาจเลือกขนาดยาผิดช่วง CrCl โดยเฉพาะในช่วงที่มีงานเร่งด่วนหรือผู้ป่วยจำนวนมาก`}
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Current Workflow Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                  <Workflow className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    🔄 ขั้นตอนการทำงานปัจจุบัน
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm text-foreground whitespace-pre-wrap">
                    {`1. ตรวจสอบค่า serum creatinine จากผลแลบ
2. ดูข้อมูลพื้นฐาน เช่น อายุ น้ำหนัก เพศ จากระบบ HIS
3. คำนวณค่า Creatinine clearance ด้วยสูตร Cockcroft-Gault ด้วยตนเอง
4. เปิดใบแนวทางการปรับขนาดยาของโรงพยาบาล (กระดาษหรือไฟล์ PDF)
5. เทียบช่วงค่า CrCl กับตารางการปรับขนาดยาของยาที่จะใช้
6. เลือกขนาดยาและความถี่ที่เหมาะสม
7. หากมียาหลายรายการ ต้องทำขั้นตอนซ้ำทุกตัว

ขั้นตอนทั้งหมดต้องอาศัยการคำนวณและการอ้างอิงด้วยตนเอง ซึ่งมีโอกาสผิดพลาดและใช้เวลาค่อนข้างมาก`}
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Expected Tech Help Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    🛠️ สิ่งที่ต้องการให้ Tech ช่วย
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm text-foreground whitespace-pre-wrap">
                    {`ต้องการระบบตัวอย่างที่ช่วยคำนวณค่า Creatinine clearance จากข้อมูลจำลอง เช่น อายุ น้ำหนัก เพศ และค่า serum creatinine โดยไม่ใช้ข้อมูลผู้ป่วยจริง

หลังจากคำนวณค่า CrCl แล้ว ระบบสามารถแสดงช่วงค่า CrCl และเชื่อมโยงกับตารางการปรับขนาดยาตามแนวทางของโรงพยาบาลที่กำหนดไว้ล่วงหน้า เพื่อแสดงขนาดยาที่เหมาะสมโดยอัตโนมัติ

ระบบควรช่วยลดขั้นตอนการคำนวณซ้ำ ๆ ลดความเสี่ยงจาก human error และใช้เป็นต้นแบบ (sandbox) สำหรับพัฒนาเครื่องมือสนับสนุนการตัดสินใจทางคลินิกในอนาคต`}
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 3: ขั้นตอน */}
          <TabsContent value="process" className="flex-1 overflow-y-auto mt-6 space-y-6">
            {/* Step 1 - Pending Review */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-950/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="w-0.5 h-full bg-linear-to-b from-yellow-200 to-blue-200 dark:from-yellow-900 dark:to-blue-900 mt-2" />
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
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                  <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="w-0.5 h-full bg-linear-to-b from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 mt-2" />
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
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="w-0.5 h-full bg-linear-to-b from-purple-200 to-orange-200 dark:from-purple-900 dark:to-orange-900 mt-2" />
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
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center shrink-0">
                  <TestTube className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="w-0.5 h-full bg-linear-to-b from-orange-200 to-green-200 dark:from-orange-900 dark:to-green-900 mt-2" />
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
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center shrink-0">
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
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={() => setOpen(false)}>
            ปิด
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}