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
          <DialogTitle className="text-xl font-bold text-alert-info-text flex items-center gap-2">
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
                <div className="w-10 h-10 rounded-lg bg-alert-info-bg flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-alert-info-icon" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    1. อธิบายปัญหาให้ชัดเจนและเฉพาะเจาะจง
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-content-primary mb-1.5">ตัวอย่าง:</p>
                      <p className="text-content-secondary leading-relaxed">
                        &quot;ต้องคำนวณ Vancomycin dose ตาม eGFR ของผู้ป่วยทุกครั้ง ซึ่งต้องเปิดดูสูตร Cockcroft-Gault 
                        แล้วคำนวณด้วยเครื่องคิดเลข ใช้เวลาประมาณ 5-10 นาทีต่อครั้ง และบางครั้งก็คำนวณผิด&quot;
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
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Workflow className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    2. บอกขั้นตอนที่ทำอยู่ตอนนี้
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-4 space-y-3 text-sm">
                    <p className="font-medium text-content-primary">ตัวอย่าง:</p>
                    <ol className="space-y-2 text-content-secondary ml-4 list-decimal leading-relaxed">
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
                <div className="w-10 h-10 rounded-lg bg-alert-warning-bg flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-alert-warning-icon" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    3. บอกว่าอยากได้อะไร
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-content-primary mb-1.5">ตัวอย่าง:</p>
                      <p className="text-content-secondary leading-relaxed">
                        &quot;อยากได้เครื่องคำนวณที่กรอกน้ำหนัก อายุ เพศ กับค่า Creatinine แล้วแสดง dose ที่แนะนำทันที 
                        โดยรองรับยาหลายชนิดที่ใช้บ่อย เช่น Vancomycin, Gentamicin, Acyclovir&quot;
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
                <div className="w-10 h-10 rounded-lg bg-alert-success-bg flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5 text-alert-success-icon" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    4. แนบรูปภาพหรือตัวอย่าง (ถ้ามี)
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-4 space-y-2 text-sm text-content-secondary leading-relaxed">
                    <p>• Screenshot ของแบบฟอร์มที่ต้องกรอกบ่อย</p>
                    <p>• ภาพถ่ายหน้าหนังสือที่ใช้อ้างอิง</p>
                    <p>• ตัวอย่าง flow ที่วาดด้วยมือ</p>
                    <p>• ตัวอย่างข้อมูลที่ต้องป้อน</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-alert-success-bg border border-alert-success-border rounded-lg p-4"
            >
              <p className="text-sm text-alert-success-text font-medium mb-2">
                💡 สรุป: ยิ่งให้รายละเอียดมาก ทีมพัฒนาจะเข้าใจและช่วยได้ดียิ่งขึ้น
              </p>
              <p className="text-xs text-alert-success-text">
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
                <div className="w-10 h-10 rounded-lg bg-interactive-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-interactive-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    🏥 หน่วยงานที่ขอ
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-3 text-sm text-content-primary">
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
                <div className="w-10 h-10 rounded-lg bg-brand-tertiary/10 flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5 text-brand-tertiary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    📋 ประเภทคำขอ
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand-tertiary/10 text-brand-tertiary text-sm font-medium">
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
                <div className="w-10 h-10 rounded-lg bg-alert-error-bg flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-alert-error-icon" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    🧠 Pain Point หน้างาน
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-4 space-y-2 text-sm text-content-primary whitespace-pre-wrap">
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
                <div className="w-10 h-10 rounded-lg bg-alert-info-bg flex items-center justify-center shrink-0">
                  <Workflow className="w-5 h-5 text-alert-info-icon" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    🔄 ขั้นตอนการทำงานปัจจุบัน
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-4 space-y-2 text-sm text-content-primary whitespace-pre-wrap">
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
                <div className="w-10 h-10 rounded-lg bg-alert-success-bg flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-alert-success-icon" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-content-primary mb-2">
                    🛠️ สิ่งที่ต้องการให้ Tech ช่วย
                  </h3>
                  <div className="bg-surface-secondary rounded-lg p-4 space-y-2 text-sm text-content-primary whitespace-pre-wrap">
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
                <div className="w-12 h-12 rounded-full bg-alert-warning-bg flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-alert-warning-icon" />
                </div>
                <div className="w-0.5 h-full bg-linear-to-b from-alert-warning-border to-alert-info-border mt-2" />
              </div>
              <div className="flex-1 pb-6">
                <div className="mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-alert-warning-bg text-alert-warning-text">
                    รอตรวจสอบ
                  </span>
                </div>
                <h3 className="font-semibold text-content-primary mb-2">
                  1. ทีมตรวจสอบคำขอ
                </h3>
                <p className="text-sm text-content-secondary mb-3">
                  ทีมพัฒนาจะตรวจสอบรายละเอียดและความเป็นไปได้ของคำขอ
                </p>
                <div className="bg-surface-secondary rounded-lg p-3 text-sm">
                  <p className="text-content-secondary">
                    ⏱️ ระยะเวลา: <strong className="text-content-primary">1-3 วันทำการ</strong>
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
                <div className="w-12 h-12 rounded-full bg-alert-info-bg flex items-center justify-center shrink-0">
                  <Eye className="w-6 h-6 text-alert-info-icon" />
                </div>
                <div className="w-0.5 h-full bg-linear-to-b from-alert-info-border to-brand-primary/30 mt-2" />
              </div>
              <div className="flex-1 pb-6">
                <div className="mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-alert-info-bg text-alert-info-text">
                    อยู่ในการพิจารณา
                  </span>
                </div>
                <h3 className="font-semibold text-content-primary mb-2">
                  2. วิเคราะห์ความต้องการ
                </h3>
                <p className="text-sm text-content-secondary mb-3">
                  ทีมจะพูดคุยกับคุณเพิ่มเติม (ผ่าน Comment) เพื่อเข้าใจปัญหาลึกซึ้งยิ่งขึ้น
                </p>
                <div className="bg-alert-info-bg border border-alert-info-border rounded-lg p-3 text-sm">
                  <p className="text-alert-info-text">
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
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-brand-primary" />
                </div>
                <div className="w-0.5 h-full bg-linear-to-b from-brand-primary/30 to-alert-warning-border mt-2" />
              </div>
              <div className="flex-1 pb-6">
                <div className="mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary">
                    อยู่ในการพัฒนา
                  </span>
                </div>
                <h3 className="font-semibold text-content-primary mb-2">
                  3. เริ่มพัฒนาเครื่องมือ
                </h3>
                <p className="text-sm text-content-secondary mb-3">
                  ทีม Developer จะเริ่มสร้างเครื่องมือตามที่วิเคราะห์ไว้
                </p>
                <div className="bg-surface-secondary rounded-lg p-3 text-sm">
                  <p className="text-content-secondary">
                    ⏱️ ระยะเวลา: <strong className="text-content-primary">1-4 สัปดาห์</strong> (ขึ้นกับความซับซ้อน)
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
                <div className="w-12 h-12 rounded-full bg-alert-warning-bg flex items-center justify-center shrink-0">
                  <TestTube className="w-6 h-6 text-alert-warning-icon" />
                </div>
                <div className="w-0.5 h-full bg-linear-to-b from-alert-warning-border to-alert-success-border mt-2" />
              </div>
              <div className="flex-1 pb-6">
                <div className="mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-alert-warning-bg text-alert-warning-text">
                    อยู่ในการทดสอบ
                  </span>
                </div>
                <h3 className="font-semibold text-content-primary mb-2">
                  4. ทดสอบเครื่องมือ
                </h3>
                <p className="text-sm text-content-secondary mb-3">
                  ทีม QA จะทำการทดสอบเพื่อให้แน่ใจว่าเครื่องมือทำงานได้ถูกต้องและปลอดภัย
                </p>
                <div className="bg-alert-warning-bg border border-alert-warning-border rounded-lg p-3 text-sm">
                  <p className="text-alert-warning-text">
                    🛡️ เครื่องมือที่พัฒนาเสร็จแล้วจะได้รับการตรวจสอบเพื่อป้องกันข้อผิดพลาดที่อาจส่งผลกระทบต่อผู้ป่วย
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
                <div className="w-12 h-12 rounded-full bg-alert-success-bg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-alert-success-icon" />
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-alert-success-bg text-alert-success-text">
                    สำเร็จ
                  </span>
                </div>
                <h3 className="font-semibold text-content-primary mb-2">
                  5. ส่งมอบเครื่องมือ
                </h3>
                <p className="text-sm text-content-secondary mb-3">
                  เครื่องมือพร้อมใช้งานจริง! 🎉
                </p>
                <div className="bg-alert-success-bg border border-alert-success-border rounded-lg p-3 text-sm">
                  <p className="text-alert-success-text font-medium mb-2">
                    ✅ คุณจะได้รับ:
                  </p>
                  <ul className="space-y-1 text-alert-success-text ml-4 list-disc">
                    <li>ลิงก์เครื่องมือที่ใช้งานได้จริง</li>
                    <li>คู่มือการใช้งาน (ถ้ามี)</li>
                    <li>การสนับสนุนหลังการส่งมอบ</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t border-border-primary">
          <Button variant="outline" onClick={() => setOpen(false)}>
            ปิด
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}