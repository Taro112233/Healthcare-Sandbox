// app/request-policy/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  AlertTriangle,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Code,
  TestTube,
  Sparkles,
  Scale,
  Target,
  FileSearch,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RequestPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-6"
        >
          {/* Hero Section */}
          <motion.div variants={fadeIn} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-950/30 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              นโยบายการส่งคำขอพัฒนาเครื่องมือ
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Request Policy for HealthTech Sandbox
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>มีผลบังคับใช้ตั้งแต่วันที่ 15 มกราคม พ.ศ. 2568</span>
            </div>
          </motion.div>

          {/* Warning Banner */}
          <motion.div variants={fadeIn}>
            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-2">
                    ⚠️ สำคัญ: โปรดอ่านอย่างละเอียดก่อนส่งคำขอ
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                    นี่คือ <strong>Sandbox Environment</strong> สำหรับทดลองและเรียนรู้เท่านั้น 
                    ไม่เหมาะสำหรับใช้กับผู้ป่วยจริงในสภาพแวดล้อมคลินิก 
                    กรุณาอ่านและทำความเข้าใจนโยบายทั้งหมดก่อนยอมรับ
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 1: Service Nature */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  1. ลักษณะการให้บริการ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
                    text="นี่คือ sandbox environment สำหรับทดลองและเรียนรู้เท่านั้น"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
                    text="ไม่รับประกันว่าคำขอทุกรายการจะได้รับการพัฒนา"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
                    text="ทีมพัฒนามีสิทธิ์เลือกพิจารณาคำขอตามความเหมาะสม ความเป็นไปได้ และทรัพยากรที่มี"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
                    text="การพัฒนาเครื่องมือเป็นไปเพื่อวัตถุประสงค์ทางการศึกษาและทดลอง"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 2: Data & Security Restrictions */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  2. ข้อจำกัดด้านข้อมูลและความปลอดภัย
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-900 dark:text-red-100 leading-relaxed font-semibold mb-3">
                    🚫 ข้อห้ามสำคัญ:
                  </p>
                  <div className="grid gap-3">
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="ห้ามใช้ข้อมูลผู้ป่วยจริงในทุกกรณี"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="หากเครื่องมือต้องการข้อมูล ต้องใช้ข้อมูลจำลองหรือข้อมูลสาธิต (demo data) เท่านั้น"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="แพลตฟอร์มไม่รับรอง HIPAA, PDPA หรือมาตรฐานด้านความปลอดภัยทางการแพทย์"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="เครื่องมือเหมาะสำหรับการทดสอบและนำเสนอแนวคิด ไม่ใช่ใช้กับผู้ป่วยจริง"
                      variant="danger"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 3: Responsibilities & Risks */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  3. ความรับผิดชอบและความเสี่ยง
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-purple-500" />}
                    text="เครื่องมืออยู่ในสถานะ 'As-Is' โดยไม่มีการรับประกันใดๆ"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-purple-500" />}
                    text="ผู้ใช้งานต้องรับผิดชอบเองในการ validate ความถูกต้องของเครื่องมือก่อนนำไปใช้จริง"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-purple-500" />}
                    text="ทีมพัฒนาไม่รับผิดชอบต่อความเสียหายหรือผลกระทบใดๆ ที่เกิดจากการใช้เครื่องมือ"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-purple-500" />}
                    text="หากต้องการนำไปใช้งานจริงในสภาพแวดล้อมคลินิก ผู้ใช้ต้องทำการทดสอบและรับรองเพิ่มเติมเอง"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 4: Intellectual Property */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  4. ทรัพย์สินทางปัญญาและการใช้งาน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-indigo-500" />}
                    text="เครื่องมือที่พัฒนาอาจถูกเผยแพร่เป็น Open Source หรือตัวอย่างสาธารณะ"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-indigo-500" />}
                    text="แนวคิดและ pain point ที่ส่งมาอาจถูกใช้เพื่อพัฒนาเครื่องมือสำหรับผู้อื่นหรือชุมชน"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-indigo-500" />}
                    text="ข้อมูลที่ส่งมา (ไม่รวมข้อมูลส่วนบุคคล) อาจถูกใช้เพื่อวิจัยและปรับปรุงแพลตฟอร์ม"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-indigo-500" />}
                    text="คุณยังคงเป็นเจ้าของแนวคิดและ use case แต่เครื่องมือที่พัฒนาเป็น collaborative work"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 5: Development Process */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  5. กระบวนการพัฒนาและระยะเวลา
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                    text="ไม่มีการรับประกันระยะเวลาในการพิจารณาหรือพัฒนา"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                    text="สถานะคำขออาจเปลี่ยนแปลงได้ตลอดเวลา รวมถึง 'เกินความสามารถ'"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                    text="ทีมพัฒนาอาจร้องขอข้อมูลเพิ่มเติมหรือปรับขอบเขตโครงการตามความเหมาะสม"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                    text="การพัฒนาจะเป็นไปแบบ iterative โดยอาจมีการทดสอบและปรับปรุงหลายรอบ"
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    ขั้นตอนหลังส่งคำขอ:
                  </p>
                  <div className="grid gap-2">
                    <StatusBadgeDemo
                      icon={<Clock className="w-4 h-4" />}
                      label="รอตรวจสอบ"
                      description="1-3 วันทำการ"
                      color="yellow"
                    />
                    <StatusBadgeDemo
                      icon={<Eye className="w-4 h-4" />}
                      label="อยู่ในการพิจารณา"
                      description="วิเคราะห์ความต้องการ"
                      color="blue"
                    />
                    <StatusBadgeDemo
                      icon={<Code className="w-4 h-4" />}
                      label="อยู่ในการพัฒนา"
                      description="1-4 สัปดาห์ (ขึ้นกับความซับซ้อน)"
                      color="purple"
                    />
                    <StatusBadgeDemo
                      icon={<TestTube className="w-4 h-4" />}
                      label="อยู่ในการทดสอบ"
                      description="ทดลองใช้งานกับผู้ใช้จริง"
                      color="orange"
                    />
                    <StatusBadgeDemo
                      icon={<CheckCircle2 className="w-4 h-4" />}
                      label="สำเร็จ"
                      description="พร้อมใช้งาน"
                      color="green"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 6: Prohibited Actions */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  6. สิ่งที่ไม่อนุญาต
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <div className="grid gap-3">
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="ส่งข้อมูลผู้ป่วยจริง (ชื่อ, HN, ข้อมูลทางการแพทย์ที่ระบุตัวตนได้)"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="ขอเครื่องมือที่ต้องการการรับรองทางการแพทย์หรือมาตรฐาน FDA/ISO"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="คาดหวังระดับความปลอดภัยเทียบเท่าระบบ Production ระดับโรงพยาบาล"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="ใช้เครื่องมือที่ได้กับผู้ป่วยจริงโดยไม่ผ่านการทดสอบและรับรองเพิ่มเติม"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-5 h-5 text-red-500" />}
                      text="เรียกร้องค่าเสียหายหากเครื่องมือทำงานไม่ถูกต้องหรือไม่ได้รับการพัฒนา"
                      variant="danger"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 7: Platform Purpose */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-600" />
                  7. วัตถุประสงค์ของแพลตฟอร์ม
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
                  <p className="text-sm font-semibold text-cyan-900 dark:text-cyan-100 mb-3">
                    ✅ HealthTech Sandbox มีจุดประสงค์เพื่อ:
                  </p>
                  <div className="grid gap-2">
                    <PolicyItem
                      icon={<Sparkles className="w-4 h-4 text-cyan-500" />}
                      text="สร้างพื้นที่ทดลองสำหรับบุคลากรทางการแพทย์ในการแปลง pain point → digital solution"
                      variant="info"
                    />
                    <PolicyItem
                      icon={<Sparkles className="w-4 h-4 text-cyan-500" />}
                      text="ส่งเสริมการเรียนรู้และแลกเปลี่ยนความรู้ในชุมชน healthcare innovation"
                      variant="info"
                    />
                    <PolicyItem
                      icon={<Sparkles className="w-4 h-4 text-cyan-500" />}
                      text="พัฒนา proof-of-concept ที่สามารถนำไปต่อยอดหรือเป็นแรงบันดาลใจ"
                      variant="info"
                    />
                    <PolicyItem
                      icon={<Sparkles className="w-4 h-4 text-cyan-500" />}
                      text="สร้างเครื่องมือต้นแบบที่แสดงให้เห็นว่าเทคโนโลยีช่วยแก้ปัญหาทางคลินิกได้อย่างไร"
                      variant="info"
                    />
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-3">
                    ❌ ไม่ใช่แพลตฟอร์มสำหรับ:
                  </p>
                  <div className="grid gap-2">
                    <PolicyItem
                      icon={<XCircle className="w-4 h-4 text-red-500" />}
                      text="พัฒนาระบบ Production ระดับโรงพยาบาล"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-4 h-4 text-red-500" />}
                      text="สร้าง Medical Device ที่ต้องการการรับรอง"
                      variant="danger"
                    />
                    <PolicyItem
                      icon={<XCircle className="w-4 h-4 text-red-500" />}
                      text="แทนที่บริการพัฒนาซอฟต์แวร์แบบเต็มรูปแบบ"
                      variant="danger"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 8: Contact & Support */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-teal-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                  8. การติดต่อและการสนับสนุน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-foreground">
                <div className="grid gap-3">
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-teal-500" />}
                    text="หากต้องการพัฒนาเครื่องมือระดับ Production โปรดติดต่อทีมพัฒนาโดยตรง"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-teal-500" />}
                    text="หากพบปัญหาหรือต้องการคำแนะนำ สามารถแสดงความคิดเห็นผ่าน Comment Section"
                  />
                  <PolicyItem
                    icon={<CheckCircle2 className="w-5 h-5 text-teal-500" />}
                    text="ทีมพัฒนาจะตอบกลับผ่าน Comment Section เท่านั้น ไม่มีการรับประกันเวลาตอบกลับ"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Acceptance Notice */}
          <motion.div variants={fadeIn}>
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-teal-600" />
                การยอมรับนโยบาย
              </h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                การกด <strong>&ldquo;ฉันยอมรับนโยบาย&rdquo;</strong> และส่งคำขอ แสดงว่าคุณ:
              </p>
              <div className="grid gap-2 ml-4">
                <div className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>อ่านและเข้าใจนโยบายทั้งหมดแล้ว</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>ยอมรับข้อจำกัดและเงื่อนไขการให้บริการ</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>รับทราบว่าเครื่องมือเป็น sandbox และไม่เหมาะสำหรับใช้กับผู้ป่วยจริง</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>จะไม่ส่งข้อมูลผู้ป่วยจริงหรือข้อมูลที่ละเมิด PDPA</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>รับผิดชอบในการ validate และทดสอบเครื่องมือเองก่อนนำไปใช้จริง</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer Notice */}
          <motion.div variants={fadeIn}>
            <div className="text-center py-8 text-sm text-muted-foreground space-y-2">
              <p className="font-medium">
                <strong>หมายเหตุ:</strong> นโยบายนี้อาจมีการปรับปรุงเป็นครั้งคราว 
                โปรดตรวจสอบก่อนส่งคำขอทุกครั้ง
              </p>
              <Separator className="my-4" />
              <p>
                © 2025 HLAB Consulting - HealthTech Sandbox Platform
              </p>
              <p className="text-xs">
                Building the future of healthcare innovation, one sandbox at a time.
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Link
                  href="/terms-of-service"
                  className="text-primary hover:underline"
                >
                  ข้อกำหนดและเงื่อนไข
                </Link>
                <span>•</span>
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline"
                >
                  นโยบายความเป็นส่วนตัว
                </Link>
                <span>•</span>
                <Link
                  href="/"
                  className="text-primary hover:underline"
                >
                  กลับหน้าหลัก
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Helper Components
function PolicyItem({ 
  icon, 
  text, 
  variant = 'default' 
}: { 
  icon: React.ReactNode; 
  text: string;
  variant?: 'default' | 'danger' | 'info';
}) {
  const textColor = {
    default: 'text-foreground',
    danger: 'text-red-900 dark:text-red-100',
    info: 'text-cyan-900 dark:text-cyan-100'
  };

  return (
    <div className="flex items-start gap-3">
      {icon}
      <span className={`text-sm leading-relaxed ${textColor[variant]}`}>
        {text}
      </span>
    </div>
  );
}

function StatusBadgeDemo({ 
  icon, 
  label, 
  description, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  description: string;
  color: 'yellow' | 'blue' | 'purple' | 'orange' | 'green';
}) {
  const colorClasses = {
    yellow: 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-900 dark:text-yellow-100',
    blue: 'bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100',
    purple: 'bg-purple-50 dark:bg-purple-950/20 text-purple-900 dark:text-purple-100',
    orange: 'bg-orange-50 dark:bg-orange-950/20 text-orange-900 dark:text-orange-100',
    green: 'bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-100'
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${colorClasses[color]}`}>
      {icon}
      <div className="flex-1">
        <span className="font-medium text-sm">{label}</span>
        <span className="text-xs text-muted-foreground ml-2">- {description}</span>
      </div>
    </div>
  );
}