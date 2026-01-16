// app/terms-of-service/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Users,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  CheckCircle2,
  XCircle,
  Scale,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsConditionsPage() {
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-950/30 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              ข้อกำหนดและเงื่อนไขการใช้บริการ
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Terms & Conditions for Project NextGen Platform
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>มีผลบังคับใช้ตั้งแต่วันที่ 10 มกราคม พ.ศ. 2568</span>
            </div>
          </motion.div>

          {/* Introduction Card */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-teal-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  นิยามและบทนำ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground">
                <div className="bg-teal-50 dark:bg-teal-950/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
                  <p className="text-sm leading-relaxed">
                    <strong className="text-teal-800 dark:text-teal-200">
                      Project NextGen
                    </strong>{' '}
                    เป็นแพลตฟอร์มสำหรับรับและจัดการคำขอพัฒนาเครื่องมือดิจิทัลทางการแพทย์ 
                    โดยมุ่งเน้นการพัฒนาแบบ Sandbox (สภาพแวดล้อมทดลอง) 
                    ซึ่งไม่ใช้ข้อมูลผู้ป่วยจริงและเน้นวัตถุประสงค์เพื่อการศึกษาและทดลองเท่านั้น
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>&ldquo;แพลตฟอร์ม&rdquo;</strong> หมายถึง เว็บไซต์และแอปพลิเคชันของ Project NextGen
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>&ldquo;ผู้ใช้งาน&rdquo; หรือ &ldquo;ท่าน&rdquo;</strong> หมายถึง บุคคลธรรมดาหรือนิติบุคคลที่ใช้บริการแพลตฟอร์ม
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>&ldquo;คำขอ&rdquo; (Request)</strong> หมายถึง คำขอพัฒนาเครื่องมือที่ผู้ใช้งานส่งผ่านแพลตฟอร์ม
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>&ldquo;Admin&rdquo;</strong> หมายถึง ผู้ดูแลระบบที่มีสิทธิจัดการคำขอและเปลี่ยนสถานะ
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>&ldquo;บริษัทฯ&rdquo;</strong> หมายถึง HLAB Consulting ผู้ให้บริการแพลตฟอร์ม
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Responsibilities */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  การสมัครและหน้าที่ของผู้ใช้งาน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>คุณสมบัติผู้ใช้งาน:</strong> ผู้ใช้งานต้องเป็นบุคคลธรรมดาที่มีอายุครบ 18 ปีบริบูรณ์ 
                      หรือนิติบุคคลที่มีผู้แทนโดยชอบด้วยกฎหมาย
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>ข้อมูลที่ถูกต้อง:</strong> ผู้ใช้งานรับรองว่าข้อมูลที่ให้ไว้เป็นความจริงและครบถ้วน 
                      ไม่เป็นเท็จหรือทำให้ผู้อื่นเข้าใจผิด
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>ความปลอดภัย:</strong> ผู้ใช้งานมีหน้าที่รักษาความลับของบัญชีและรหัสผ่าน 
                      และแจ้งบริษัทฯ ทันทีหากพบการใช้งานที่ผิดปกติ
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>ข้อห้าม:</strong> ห้ามใช้แพลตฟอร์มเพื่อการที่ผิดกฎหมาย หลอกลวง หรือก่อกวน 
                      ห้ามเผยแพร่เนื้อหาที่ไม่เหมาะสมหรือละเมิดสิทธิผู้อื่น
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Usage */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                  การใช้บริการและคำขอ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    การส่งคำขอพัฒนา
                  </h4>
                  <ul className="space-y-2 text-sm text-purple-900 dark:text-purple-100">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ผู้ใช้งานสามารถส่งคำขอพัฒนาเครื่องมือดิจิทัลผ่านแบบฟอร์มที่กำหนด</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>คำขอจะถูกตรวจสอบโดย Admin ภายใน 1-3 วันทำการ</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>สถานะคำขอจะอัปเดตตลอดกระบวนการพัฒนา</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ผู้ใช้งานสามารถติดตามและแสดงความคิดเห็นได้ตลอดเวลา</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 text-sm text-foreground">
                  <p className="font-medium">สถานะของคำขอ (Request Status):</p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-3 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <span className="font-medium">รอตรวจสอบ</span>
                      <span className="text-muted-foreground">- คำขอรอการพิจารณา</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="font-medium">อยู่ในการพิจารณา</span>
                      <span className="text-muted-foreground">- กำลังวิเคราะห์ความต้องการ</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="font-medium">อยู่ในการพัฒนา</span>
                      <span className="text-muted-foreground">- กำลังสร้างเครื่องมือ</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="font-medium">อยู่ในการทดสอบ</span>
                      <span className="text-muted-foreground">- ทดลองใช้งานจริง</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-medium">สำเร็จ</span>
                      <span className="text-muted-foreground">- พร้อมใช้งาน</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  ข้อจำกัดความรับผิดและคำเตือน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    ข้อจำกัดสำคัญของแพลตฟอร์ม Sandbox
                  </h4>
                  <div className="space-y-3 text-sm text-amber-900 dark:text-amber-100">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>ไม่ใช่ระบบผลิตภัณฑ์:</strong> เครื่องมือที่พัฒนาเป็นแบบ Sandbox 
                        เพื่อการทดลองและศึกษาเท่านั้น ไม่ควรนำไปใช้กับผู้ป่วยจริง
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>ไม่รับประกันผลลัพธ์:</strong> บริษัทฯ ไม่รับประกันว่าคำขอทุกรายการจะได้รับการพัฒนา 
                        หรือผลลัพธ์จะตรงตามที่คาดหวังทุกประการ
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>ความรับผิดจำกัด:</strong> บริษัทฯ ไม่รับผิดชอบต่อความเสียหายใดๆ 
                        ที่เกิดจากการใช้เครื่องมือที่พัฒนา
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>ไม่มีค่าใช้จ่าย:</strong> การใช้บริการเป็นแบบไม่มีค่าใช้จ่าย 
                        แต่อาจมีข้อจำกัดตามนโยบายของบริษัทฯ
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  ทรัพย์สินทางปัญญาและความเป็นเจ้าของ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-foreground">
                <div className="space-y-3">
                  <p>
                    <strong>เครื่องมือที่พัฒนา:</strong> เครื่องมือที่พัฒนาผ่านแพลตฟอร์มจะเป็นทรัพย์สินของบริษัทฯ 
                    แต่ผู้ใช้งานสามารถใช้งานได้ฟรีตามเงื่อนไขที่กำหนด
                  </p>
                  <p>
                    <strong>ข้อมูลที่ส่ง:</strong> ข้อมูลและไอเดียที่ผู้ใช้งานส่งผ่านคำขออาจถูกนำไปพัฒนาต่อ 
                    หรือแชร์เป็นความรู้สาธารณะได้ โดยไม่ระบุตัวตนผู้ส่ง
                  </p>
                  <p>
                    <strong>การใช้งาน:</strong> ผู้ใช้งานสามารถใช้เครื่องมือที่พัฒนาเพื่อการศึกษา ทดลอง 
                    และวัตถุประสงค์ที่ไม่หวังผลกำไร
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  ความเป็นส่วนตัวและความปลอดภัย
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-900 dark:text-green-100 leading-relaxed">
                    บริษัทฯ ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน 
                    การเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลจะเป็นไปตาม{' '}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="text-green-700 dark:text-green-300 hover:underline font-medium"
                    >
                      นโยบายความเป็นส่วนตัว
                    </Link>{' '}
                    และพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
                  </p>
                </div>

                <div className="space-y-2 text-sm text-foreground">
                  <p className="font-medium">บริษัทฯ จะเก็บรักษาข้อมูลประเภทต่อไปนี้:</p>
                  <ul className="space-y-1 ml-4">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลบัญชีผู้ใช้งาน (ชื่อ-นามสกุล, อีเมล, เบอร์โทรศัพท์)</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลการใช้งานแพลตฟอร์ม (Login history, Activity logs)</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>เนื้อหาคำขอและความคิดเห็น</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ไฟล์แนบที่ส่งมาพร้อมคำขอ</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Termination */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  การระงับและยกเลิกบัญชี
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-foreground">
                <p>
                  บริษัทฯ มีสิทธิระงับหรือยกเลิกบัญชีผู้ใช้งานได้ หากพบว่า:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>ใช้บริการฝ่าฝืนข้อกำหนดและเงื่อนไขนี้</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>ให้ข้อมูลเท็จหรือทำให้เข้าใจผิด</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>กระทำการที่ผิดกฎหมายหรือไม่เหมาะสม</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>พยายามเข้าถึงระบบโดยไม่ได้รับอนุญาต</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>กระทำการที่อาจสร้างความเสียหายต่อแพลตฟอร์มหรือผู้ใช้รายอื่น</span>
                  </div>
                </div>

                <Separator />

                <p className="font-medium">
                  ผู้ใช้งานสามารถขอยกเลิกบัญชีได้ทุกเมื่อ โดยติดต่อผ่านช่องทางที่กำหนด
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-gray-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                  การแก้ไขข้อกำหนด
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-foreground">
                <p>
                  บริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขเพิ่มเติมข้อกำหนดและเงื่อนไขนี้ได้ตลอดเวลา 
                  โดยจะประกาศให้ทราบล่วงหน้าผ่านแพลตฟอร์มอย่างน้อย 7 วันก่อนมีผลบังคับใช้
                </p>
                <p>
                  การใช้บริการต่อไปหลังจากมีการแก้ไขถือว่าท่านยอมรับข้อกำหนดใหม่ 
                  หากไม่เห็นด้วย กรุณาหยุดใช้บริการและติดต่อบริษัทฯ เพื่อยกเลิกบัญชี
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-600" />
                  ข้อมูลการติดต่อ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  หากท่านมีคำถามหรือข้อสงสัยเกี่ยวกับข้อกำหนดและเงื่อนไขนี้ 
                  สามารถติดต่อบริษัทฯ ได้ตามช่องทางด้านล่าง:
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">อีเมล</p>
                      <p className="text-sm text-muted-foreground break-all">
                        legal@hlabconsulting.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">โทรศัพท์</p>
                      <p className="text-sm text-muted-foreground">
                        061-234-5678
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        จันทร์-ศุกร์ 09:00-17:00 น.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg sm:col-span-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">ที่อยู่</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        HLAB Consulting Co., Ltd.<br />
                        123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย<br />
                        กรุงเทพมหานคร 10110 ประเทศไทย
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
                  <p className="text-sm text-cyan-900 dark:text-cyan-100 leading-relaxed">
                    <strong>หมายเหตุ:</strong> ข้อกำหนดและเงื่อนไขนี้อยู่ภายใต้กฎหมายไทย 
                    และข้อพิพาทใดๆ จะอยู่ในเขตอำนาจศาลไทย
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Notice */}
          <motion.div variants={fadeIn}>
            <div className="text-center py-8 text-sm text-muted-foreground space-y-2">
              <p>
                © 2025 HLAB Consulting - Project NextGen Platform
              </p>
              <p>
                เอกสารฉบับนี้มีผลบังคับใช้ตั้งแต่วันที่ 10 มกราคม พ.ศ. 2568
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
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