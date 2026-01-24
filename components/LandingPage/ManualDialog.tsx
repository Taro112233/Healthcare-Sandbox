// components/LandingPage/ManualDialog.tsx
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Stethoscope, Star, Target, MessageSquare, Clock, Eye, Code, TestTube, CheckCircle2 } from 'lucide-react';

interface ManualDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManualDialog({ open, onOpenChange }: ManualDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Stethoscope className="w-6 h-6 text-teal-600" />
            NextHealTH Sandbox - คู่มือการใช้งาน
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 text-sm">
          {/* Platform Overview */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-700 dark:text-teal-400 flex items-center gap-2">
              🏥 เกี่ยวกับแพลตฟอร์ม
            </h3>
            <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-lg">
              <p className="text-foreground mb-3">
                <strong>NextHealTH Sandbox</strong> คือแพลตฟอร์มสำหรับบุคลากรทางการแพทย์
                ในการส่งคำขอพัฒนาเครื่องมือดิจิทัลที่ช่วยปรับปรุงการทำงานและคุณภาพการดูแลผู้ป่วย
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">
                    ประเภทเครื่องมือ
                  </h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• เครื่องคำนวณทางการแพทย์</li>
                    <li>• แบบฟอร์มและ Checklist</li>
                    <li>• ระบบจัดการ Workflow</li>
                    <li>• เครื่องมือช่วยตัดสินใจทางคลินิก</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">
                    คุณสมบัติหลัก
                  </h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Real-time Comment System</li>
                    <li>• Rich Text Editor</li>
                    <li>• File Upload Support</li>
                    <li>• Status Tracking</li>
                    <li>• Mobile Responsive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Request Process */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
              📝 ขั้นตอนการส่งคำขอ
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  1. กรอกข้อมูลคำขอ
                </h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• ระบุหน่วยงานที่ขอ</li>
                  <li>• เลือกประเภทเครื่องมือ</li>
                  <li>• อธิบาย Pain Point หน้างาน</li>
                  <li>• อธิบายขั้นตอนการทำงานปัจจุบัน</li>
                  <li>• บอกสิ่งที่ต้องการให้ Tech ช่วย</li>
                  <li>• แนบไฟล์เพิ่มเติม (ถ้ามี)</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  2. ติดตามความคืบหน้า
                </h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• ดูสถานะคำขอใน Dashboard</li>
                  <li>• รับการแจ้งเตือนเมื่อมีการอัปเดต</li>
                  <li>• ตอบคำถามจากทีมพัฒนาผ่าน Comment</li>
                  <li>• ติดตาม Timeline การพัฒนา</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  3. ทดสอบและรับมอบเครื่องมือ
                </h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• ได้รับลิงก์ทดลองใช้</li>
                  <li>• ให้ Feedback ผ่าน Comment</li>
                  <li>• รับมอบเครื่องมือเวอร์ชันสมบูรณ์</li>
                  <li>• ได้รับ Support หลังการส่งมอบ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Status Explanation */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-purple-700 dark:text-purple-400 flex items-center gap-2">
              🔄 สถานะของคำขอ
            </h3>
            <div className="grid gap-3">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                    รอตรวจสอบ (Pending Review)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    ทีมกำลังตรวจสอบความเป็นไปได้ของคำขอ (1-3 วันทำการ)
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg flex items-start gap-3">
                <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                    อยู่ในการพิจารณา (Under Consideration)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    กำลังวิเคราะห์ความต้องการและพูดคุยรายละเอียดเพิ่มเติม
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg flex items-start gap-3">
                <Code className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                    อยู่ในการพัฒนา (In Development)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    ทีมกำลังพัฒนาเครื่องมือ (1-4 สัปดาห์)
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg flex items-start gap-3">
                <TestTube className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">
                    อยู่ในการทดสอบ (In Testing)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    ทดลองใช้งานและรับ Feedback เพื่อปรับปรุง
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                    สำเร็จ (Completed)
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    เครื่องมือพร้อมใช้งาน รับมอบลิงก์และคู่มือการใช้งาน
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-linear-to-r from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4 text-teal-700 dark:text-teal-400 flex items-center gap-2">
              💡 เคล็ดลับ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">
                    ให้รายละเอียดมากที่สุด
                  </p>
                  <p className="text-muted-foreground text-xs">
                    ยิ่งอธิบายชัดเจน ทีมจะเข้าใจและช่วยได้ดียิ่งขึ้น
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">ใส่ตัวเลขและความถี่</p>
                  <p className="text-muted-foreground text-xs">
                    บอกว่าใช้บ่อยแค่ไหน ส่งผลต่อการจัดลำดับความสำคัญ
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">ตอบ Comment ทันที</p>
                  <p className="text-muted-foreground text-xs">
                    การสื่อสารที่รวดเร็วช่วยให้พัฒนาเสร็จไวขึ้น
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <h3 className="font-semibold text-lg mb-2 text-foreground">
              ต้องการความช่วยเหลือเพิ่มเติม?
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              ติดต่อทีมพัฒนาสำหรับการสนับสนุนด้านเทคนิค
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 NextHealTH Sandbox - Educational & Experimental Use Only
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}