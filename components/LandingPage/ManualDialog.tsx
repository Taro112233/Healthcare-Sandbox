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
            <Stethoscope className="w-6 h-6 text-interactive-primary" />
            NextHealTH Sandbox - คู่มือการใช้งาน
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 text-sm">
          {/* Platform Overview */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-interactive-primary flex items-center gap-2">
              🏥 เกี่ยวกับแพลตฟอร์ม
            </h3>
            <div className="bg-surface-tertiary p-4 rounded-lg">
              <p className="text-content-primary mb-3">
                <strong>NextHealTH Sandbox</strong> คือแพลตฟอร์มสำหรับบุคลากรทางการแพทย์
                ในการส่งคำขอพัฒนาเครื่องมือดิจิทัลที่ช่วยปรับปรุงการทำงานและคุณภาพการดูแลผู้ป่วย
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-content-primary mb-2">
                    ประเภทเครื่องมือ
                  </h4>
                  <ul className="text-xs space-y-1 text-content-secondary">
                    <li>• เครื่องคำนวณทางการแพทย์</li>
                    <li>• แบบฟอร์มและ Checklist</li>
                    <li>• ระบบจัดการ Workflow</li>
                    <li>• เครื่องมือช่วยตัดสินใจทางคลินิก</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-content-primary mb-2">
                    คุณสมบัติหลัก
                  </h4>
                  <ul className="text-xs space-y-1 text-content-secondary">
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
            <h3 className="font-bold text-lg mb-4 text-alert-info-icon flex items-center gap-2">
              📝 ขั้นตอนการส่งคำขอ
            </h3>
            <div className="space-y-4">
              <div className="bg-alert-info-bg p-4 rounded-lg">
                <h4 className="font-semibold text-alert-info-text mb-2">
                  1. กรอกข้อมูลคำขอ
                </h4>
                <ul className="text-xs space-y-1 text-content-secondary">
                  <li>• ระบุหน่วยงานของคุณ</li>
                  <li>• เลือกประเภทเครื่องมือ</li>
                  <li>• อธิบาย Pain Point หน้างาน</li>
                  <li>• อธิบายขั้นตอนการทำงานปัจจุบัน</li>
                  <li>• บอกสิ่งที่ต้องการให้ Tech ช่วย</li>
                  <li>• แนบไฟล์เพิ่มเติม (ถ้ามี)</li>
                </ul>
              </div>

              <div className="bg-alert-success-bg p-4 rounded-lg">
                <h4 className="font-semibold text-alert-success-text mb-2">
                  2. ติดตามความคืบหน้า
                </h4>
                <ul className="text-xs space-y-1 text-content-secondary">
                  <li>• ดูสถานะคำขอใน Dashboard</li>
                  <li>• รับการแจ้งเตือนเมื่อมีการอัปเดต</li>
                  <li>• ตอบคำถามจากทีมพัฒนาผ่าน Comment</li>
                  <li>• ติดตาม Timeline การพัฒนา</li>
                </ul>
              </div>

              <div className="bg-surface-tertiary p-4 rounded-lg">
                <h4 className="font-semibold text-content-primary mb-2">
                  3. ทดสอบและรับมอบเครื่องมือ
                </h4>
                <ul className="text-xs space-y-1 text-content-secondary">
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
            <h3 className="font-bold text-lg mb-4 text-interactive-primary flex items-center gap-2">
              🔄 สถานะของคำขอ
            </h3>
            <div className="grid gap-3">
              <div className="bg-alert-warning-bg p-3 rounded-lg flex items-start gap-3">
                <Clock className="w-5 h-5 text-alert-warning-icon shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-alert-warning-text mb-1">
                    รอตรวจสอบ (Pending Review)
                  </h4>
                  <p className="text-xs text-content-secondary">
                    ทีมกำลังตรวจสอบความเป็นไปได้ของคำขอ (1-3 วันทำการ)
                  </p>
                </div>
              </div>

              <div className="bg-alert-info-bg p-3 rounded-lg flex items-start gap-3">
                <Eye className="w-5 h-5 text-alert-info-icon shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-alert-info-text mb-1">
                    อยู่ในการพิจารณา (Under Consideration)
                  </h4>
                  <p className="text-xs text-content-secondary">
                    กำลังวิเคราะห์ความต้องการและพูดคุยรายละเอียดเพิ่มเติม
                  </p>
                </div>
              </div>

              <div className="bg-surface-tertiary p-3 rounded-lg flex items-start gap-3">
                <Code className="w-5 h-5 text-interactive-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-content-primary mb-1">
                    อยู่ในการพัฒนา (In Development)
                  </h4>
                  <p className="text-xs text-content-secondary">
                    ทีมกำลังพัฒนาเครื่องมือ (1-4 สัปดาห์)
                  </p>
                </div>
              </div>

              <div className="bg-alert-error-bg p-3 rounded-lg flex items-start gap-3">
                <TestTube className="w-5 h-5 text-alert-error-icon shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-alert-error-text mb-1">
                    อยู่ในการทดสอบ (In Testing)
                  </h4>
                  <p className="text-xs text-content-secondary">
                    ทีมกำลังทดสอบความแม่นยำและความปลอดภัยของเครื่องมือ
                  </p>
                </div>
              </div>

              <div className="bg-alert-success-bg p-3 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-alert-success-icon shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-alert-success-text mb-1">
                    สำเร็จ (Completed)
                  </h4>
                  <p className="text-xs text-content-secondary">
                    เครื่องมือพร้อมใช้งาน รับมอบลิงก์และคู่มือการใช้งาน
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-surface-tertiary p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4 text-interactive-primary flex items-center gap-2">
              💡 เคล็ดลับ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-alert-warning-icon shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-content-primary">
                    ให้รายละเอียดมากที่สุด
                  </p>
                  <p className="text-content-secondary text-xs">
                    ยิ่งอธิบายชัดเจน ทีมจะเข้าใจและช่วยได้ดียิ่งขึ้น
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Target className="w-5 h-5 text-alert-info-icon shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-content-primary">ใส่ตัวเลขและความถี่</p>
                  <p className="text-content-secondary text-xs">
                    บอกว่าใช้บ่อยแค่ไหน ส่งผลต่อการจัดลำดับความสำคัญ
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-alert-success-icon shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-content-primary">ตอบ Comment ทันที</p>
                  <p className="text-content-secondary text-xs">
                    การสื่อสารที่รวดเร็วช่วยให้พัฒนาเสร็จไวขึ้น
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-surface-secondary p-4 rounded-lg text-center">
            <h3 className="font-semibold text-lg mb-2 text-content-primary">
              ต้องการความช่วยเหลือเพิ่มเติม?
            </h3>
            <p className="text-sm text-content-secondary mb-3">
              ติดต่อทีมพัฒนาสำหรับการสนับสนุนด้านเทคนิค
            </p>
            <p className="text-xs text-content-tertiary">
              © 2025 NextHealTH Sandbox - Educational & Experimental Use Only
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}