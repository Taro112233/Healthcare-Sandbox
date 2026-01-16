// app/privacy-policy/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  FileText, 
  Lock, 
  Eye, 
  UserCheck, 
  Globe,
  Clock,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Background Gradient */}
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
              <Shield className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              นโยบายความเป็นส่วนตัว
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Privacy Policy for Project NextGen Platform
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>อัปเดตล่าสุด: 10 มกราคม 2568</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>เวอร์ชัน 1.0</span>
              </div>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-teal-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  บทนำ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground">
                <p className="text-sm leading-relaxed">
                  บริษัท เอช แล็บ จำกัด (&quot;เรา&quot;, &quot;HLAB&quot; หรือ &quot;แพลตฟอร์ม&quot;) ให้ความสำคัญกับความเป็นส่วนตัว
                  และการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งานทุกท่าน นโยบายความเป็นส่วนตัวฉบับนี้อธิบายถึง
                  วิธีการที่เราเก็บรวบรวม ใช้งาน เปิดเผย และปกป้องข้อมูลส่วนบุคคลของท่าน
                  เมื่อท่านใช้บริการ Project NextGen
                </p>
                <div className="bg-teal-50 dark:bg-teal-950/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
                  <p className="text-sm text-teal-900 dark:text-teal-100">
                    <strong>สำคัญ:</strong> โดยการใช้บริการของเรา ท่านยอมรับและตกลงตามข้อกำหนดในนโยบายความเป็นส่วนตัวนี้
                    หากท่านไม่เห็นด้วยกับนโยบายใดๆ โปรดหยุดการใช้บริการของเราทันที
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Collection */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  ข้อมูลที่เราเก็บรวบรวม
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    1. ข้อมูลที่ท่านให้แก่เราโดยตรง
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-900 dark:text-blue-100">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลการลงทะเบียน: ชื่อ-นามสกุล, อีเมล, เบอร์โทรศัพท์, หน่วยงาน</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลในคำขอ: รายละเอียดปัญหา, ขั้นตอนการทำงาน, ความต้องการ</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ไฟล์แนบ: เอกสาร รูปภาพ หรือไฟล์ประกอบคำขอ</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลการสื่อสาร: ความคิดเห็น ข้อความในระบบ</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 text-sm text-foreground">
                  <h4 className="font-semibold">2. ข้อมูลที่เก็บอัตโนมัติ</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลการใช้งาน: เวลาเข้าสู่ระบบ, หน้าที่เข้าชม, ฟีเจอร์ที่ใช้</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลอุปกรณ์: IP Address, Browser, ระบบปฏิบัติการ</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>คุกกี้และเทคโนโลยีติดตาม: เพื่อปรับปรุงประสบการณ์การใช้งาน</span>
                    </li>
                  </ul>

                  <h4 className="font-semibold mt-4">3. ข้อมูลจากบุคคลที่สาม</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลจากหน่วยงานภาครัฐที่ร่วมมือกับเรา</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>ข้อมูลจากผู้ให้บริการด้านเทคโนโลยี (เช่น Cloud Storage)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Purpose */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                  วัตถุประสงค์ในการใช้ข้อมูล
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  เราใช้ข้อมูลของท่านเพื่อวัตถุประสงค์ดังต่อไปนี้:
                </p>

                <div className="space-y-3">
                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 text-sm">
                      การให้บริการและจัดการระบบ
                    </h4>
                    <ul className="space-y-1 text-xs text-purple-900 dark:text-purple-100">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>ยืนยันตัวตนและสิทธิ์การใช้งาน</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>ประมวลผลและติดตามคำขอของท่าน</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>สื่อสารและแจ้งสถานะคำขอ</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>ให้บริการช่วยเหลือและสนับสนุน</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 text-sm">
                      การปรับปรุงและพัฒนา
                    </h4>
                    <ul className="space-y-1 text-xs text-purple-900 dark:text-purple-100">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>วิเคราะห์พฤติกรรมการใช้งานเพื่อพัฒนาบริการ</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>ทดสอบฟีเจอร์ใหม่และปรับปรุงประสิทธิภาพ</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>สร้างรายงานและสถิติการใช้งาน</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 text-sm">
                      ความปลอดภัยและการปฏิบัติตามกฎหมาย
                    </h4>
                    <ul className="space-y-1 text-xs text-purple-900 dark:text-purple-100">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>ป้องกันการฉ้อโกงและการใช้งานที่ผิดกฎหมาย</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>ปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้อง</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>รักษาความปลอดภัยของระบบและข้อมูล</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Sharing */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-600" />
                  การเปิดเผยข้อมูล
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  เราอาจเปิดเผยข้อมูลของท่านในกรณีดังต่อไปนี้:
                </p>

                <div className="space-y-2 text-sm text-foreground">
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>ผู้ให้บริการ:</strong> บุคคลที่สามที่ช่วยเราดำเนินงาน 
                      (เช่น Cloud Storage, Email Service) ภายใต้ข้อตกลงการรักษาความลับ
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>หน่วยงานภาครัฐ:</strong> เมื่อมีข้อบังคับทางกฎหมาย 
                      หรือเพื่อการร่วมมือในโครงการของภาครัฐ
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>ความยินยอม:</strong> เมื่อได้รับความยินยอมจากท่าน
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    <strong>ข้อสังเกต:</strong> เราไม่ขาย แลกเปลี่ยน หรือให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาด
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Security */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  ความปลอดภัยของข้อมูล
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  เรามีมาตรการรักษาความปลอดภัยทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลของท่าน:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm">
                      มาตรการทางเทคนิค
                    </h4>
                    <ul className="space-y-1 text-xs text-green-900 dark:text-green-100">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>การเข้ารหัสข้อมูล (Encryption)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Firewall และระบบป้องกันการโจมตี</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>การสำรองข้อมูลสม่ำเสมอ</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>ระบบยืนยันตัวตนแบบหลายชั้น</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm">
                      มาตรการทางองค์กร
                    </h4>
                    <ul className="space-y-1 text-xs text-green-900 dark:text-green-100">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>จำกัดการเข้าถึงข้อมูลเฉพาะผู้มีสิทธิ์</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>อบรมพนักงานเรื่องความปลอดภัย</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>นโยบายและขั้นตอนที่ชัดเจน</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>การตรวจสอบและประเมินความเสี่ยง</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Rights */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  สิทธิของท่าน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ท่านมีสิทธิดังต่อไปนี้:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      num: '1',
                      title: 'สิทธิในการเข้าถึง',
                      desc: 'ขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของท่าน'
                    },
                    {
                      num: '2',
                      title: 'สิทธิในการแก้ไข',
                      desc: 'ขอแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์'
                    },
                    {
                      num: '3',
                      title: 'สิทธิในการลบ',
                      desc: 'ขอให้ลบข้อมูลของท่านภายใต้เงื่อนไขที่กฎหมายกำหนด'
                    },
                    {
                      num: '4',
                      title: 'สิทธิในการคัดค้าน',
                      desc: 'คัดค้านการประมวลผลข้อมูลของท่านในบางกรณี'
                    },
                    {
                      num: '5',
                      title: 'สิทธิในการถอนความยินยอม',
                      desc: 'ถอนความยินยอมที่เคยให้ไว้ในการประมวลผลข้อมูล'
                    },
                    {
                      num: '6',
                      title: 'สิทธิในการโอนย้าย',
                      desc: 'ขอรับข้อมูลในรูปแบบที่ใช้งานได้และขอให้โอนไปยังผู้ควบคุมข้อมูลอื่น'
                    }
                  ].map((right) => (
                    <div key={right.num} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{right.num}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {right.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {right.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
                  <p className="text-sm text-indigo-900 dark:text-indigo-100">
                    <strong>การใช้สิทธิ:</strong> ท่านสามารถใช้สิทธิได้โดยติดต่อเราผ่านช่องทางที่ระบุไว้ด้านล่าง 
                    เราจะดำเนินการตามคำขอของท่านภายใน 30 วัน
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cookies */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-600" />
                  คุกกี้และเทคโนโลยีติดตาม
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อปรับปรุงประสบการณ์การใช้งานของท่าน:
                </p>

                <div className="space-y-3">
                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 text-sm">
                      คุกกี้ที่จำเป็น
                    </h4>
                    <p className="text-xs text-orange-900 dark:text-orange-100">
                      จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดได้
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 text-sm">
                      คุกกี้เพื่อการใช้งาน
                    </h4>
                    <p className="text-xs text-orange-900 dark:text-orange-100">
                      จดจำการตั้งค่าและความชอบของท่าน เช่น ภาษา ธีม
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 text-sm">
                      คุกกี้เพื่อการวิเคราะห์
                    </h4>
                    <p className="text-xs text-orange-900 dark:text-orange-100">
                      ช่วยให้เราเข้าใจการใช้งานเพื่อปรับปรุงบริการ (Google Analytics)
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  ท่านสามารถจัดการการตั้งค่าคุกกี้ได้ผ่านเบราว์เซอร์ หรือคลิกปุ่มตั้งค่าในแบนเนอร์คุกกี้
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-600" />
                  ติดต่อเรา
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  หากท่านมีคำถาม ข้อสงสัย หรือต้องการใช้สิทธิใดๆ กรุณาติดต่อ:
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">อีเมล</p>
                      <a 
                        href="mailto:privacy@hlabconsulting.com" 
                        className="text-sm text-primary hover:underline break-all"
                      >
                        privacy@hlabconsulting.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">โทรศัพท์</p>
                      <a 
                        href="tel:0612345678" 
                        className="text-sm text-primary hover:underline"
                      >
                        061-234-5678
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        เวลาทำการ: จันทร์-ศุกร์ 09:00-18:00 น.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg sm:col-span-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">ที่อยู่</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        บริษัท เอช แล็บ จำกัด<br />
                        123 ถนนสุขุมวิท แขวงคลองเตย<br />
                        เขตคลองเตย กรุงเทพฯ 10110
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Updates */}
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-l-gray-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  การปรับปรุงนโยบาย
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-foreground">
                <p>
                  เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราวเพื่อให้สอดคล้องกับการเปลี่ยนแปลงของบริการและกฎหมาย 
                  การเปลี่ยนแปลงที่สำคัญจะถูกแจ้งให้ท่านทราบผ่านอีเมลหรือประกาศบนเว็บไซต์ 
                  เราขอแนะนำให้ท่านตรวจสอบนโยบายนี้เป็นประจำ
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Notice */}
          <motion.div variants={fadeIn}>
            <div className="text-center py-8 text-sm text-muted-foreground space-y-2">
              <p>
                นโยบายความเป็นส่วนตัวนี้มีผลบังคับใช้ตั้งแต่วันที่ 10 มกราคม 2568
              </p>
              <p>
                © 2025 บริษัท เอช แล็บ จำกัด - สงวนลิขสิทธิ์
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