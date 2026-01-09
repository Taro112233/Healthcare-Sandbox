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
  ArrowLeft,
  Clock,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.4 }}
          >
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-6 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับหน้าหลัก
              </Button>
            </Link>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  นโยบายความเป็นส่วนตัว
                </h1>
                <p className="text-lg text-muted-foreground">
                  HealthTech Sandbox - Technology Request Platform
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>อัปเดตล่าสุด: 10 มกราคม 2568</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>เวอร์ชัน 1.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  บทนำ
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  บริษัท เอช แล็บ จำกัด (&quot;เรา&quot;, &quot;HLAB&quot; หรือ &quot;แพลตฟอร์ม&quot;) ให้ความสำคัญกับความเป็นส่วนตัว
                  และการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งานทุกท่าน นโยบายความเป็นส่วนตัวฉบับนี้อธิบายถึง
                  วิธีการที่เราเก็บรวบรวม ใช้งาน เปิดเผย และปกป้องข้อมูลส่วนบุคคลของท่าน
                  เมื่อท่านใช้บริการ HealthTech Sandbox
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  โดยการใช้บริการของเรา ท่านยอมรับและตกลงตามข้อกำหนดในนโยบายความเป็นส่วนตัวนี้
                  หากท่านไม่เห็นด้วยกับนโยบายใดๆ โปรดหยุดการใช้บริการของเราทันที
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  ข้อมูลที่เราเก็บรวบรวม
                </h2>
                
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                  1. ข้อมูลที่ท่านให้แก่เราโดยตรง
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>ข้อมูลการลงทะเบียน: ชื่อ-นามสกุล, อีเมล, เบอร์โทรศัพท์, หน่วยงาน</li>
                  <li>ข้อมูลในคำขอ: รายละเอียดปัญหา, ขั้นตอนการทำงาน, ความต้องการ</li>
                  <li>ไฟล์แนบ: เอกสาร รูปภาพ หรือไฟล์ประกอบคำขอ</li>
                  <li>ข้อมูลการสื่อสาร: ความคิดเห็น ข้อความในระบบ</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                  2. ข้อมูลที่เก็บอัตโนมัติ
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>ข้อมูลการใช้งาน: เวลาเข้าสู่ระบบ, หน้าที่เข้าชม, ฟีเจอร์ที่ใช้</li>
                  <li>ข้อมูลอุปกรณ์: IP Address, Browser, ระบบปฏิบัติการ</li>
                  <li>คุกกี้และเทคโนโลยีติดตาม: เพื่อปรับปรุงประสบการณ์การใช้งาน</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                  3. ข้อมูลจากบุคคลที่สาม
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>ข้อมูลจากหน่วยงานภาครัฐที่ร่วมมือกับเรา</li>
                  <li>ข้อมูลจากผู้ให้บริการด้านเทคโนโลยี (เช่น Cloud Storage)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Purpose */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  วัตถุประสงค์ในการใช้ข้อมูล
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  เราใช้ข้อมูลของท่านเพื่อวัตถุประสงค์ดังต่อไปนี้:
                </p>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      การให้บริการและจัดการระบบ
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• ยืนยันตัวตนและสิทธิ์การใช้งาน</li>
                      <li>• ประมวลผลและติดตามคำขอของท่าน</li>
                      <li>• สื่อสารและแจ้งสถานะคำขอ</li>
                      <li>• ให้บริการช่วยเหลือและสนับสนุน</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      การปรับปรุงและพัฒนา
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• วิเคราะห์พฤติกรรมการใช้งานเพื่อพัฒนาบริการ</li>
                      <li>• ทดสอบฟีเจอร์ใหม่และปรับปรุงประสิทธิภาพ</li>
                      <li>• สร้างรายงานและสถิติการใช้งาน</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      ความปลอดภัยและการปฏิบัติตามกฎหมาย
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• ป้องกันการฉ้อโกงและการใช้งานที่ผิดกฎหมาย</li>
                      <li>• ปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้อง</li>
                      <li>• รักษาความปลอดภัยของระบบและข้อมูล</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  การเปิดเผยข้อมูล
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  เราอาจเปิดเผยข้อมูลของท่านในกรณีดังต่อไปนี้:
                </p>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">ผู้ให้บริการ:</strong> บุคคลที่สามที่ช่วยเราดำเนินงาน 
                      (เช่น Cloud Storage, Email Service) ภายใต้ข้อตกลงการรักษาความลับ
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">หน่วยงานภาครัฐ:</strong> เมื่อมีข้อบังคับทางกฎหมาย 
                      หรือเพื่อการร่วมมือในโครงการของภาครัฐ
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">ความยินยอม:</strong> เมื่อได้รับความยินยอมจากท่าน
                    </span>
                  </li>
                </ul>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>ข้อสังเกต:</strong> เราไม่ขาย แลกเปลี่ยน หรือให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาด
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  ความปลอดภัยของข้อมูล
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  เรามีมาตรการรักษาความปลอดภัยทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลของท่าน:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      มาตรการทางเทคนิค
                    </h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• การเข้ารหัสข้อมูล (Encryption)</li>
                      <li>• Firewall และระบบป้องกันการโจมตี</li>
                      <li>• การสำรองข้อมูลสม่ำเสมอ</li>
                      <li>• ระบบยืนยันตัวตนแบบหลายชั้น</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      มาตรการทางองค์กร
                    </h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• จำกัดการเข้าถึงข้อมูลเฉพาะผู้มีสิทธิ์</li>
                      <li>• อบรมพนักงานเรื่องความปลอดภัย</li>
                      <li>• นโยบายและขั้นตอนที่ชัดเจน</li>
                      <li>• การตรวจสอบและประเมินความเสี่ยง</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  สิทธิของท่าน
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ท่านมีสิทธิดังต่อไปนี้:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        สิทธิในการเข้าถึง
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        ขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของท่าน
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        สิทธิในการแก้ไข
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        ขอแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        สิทธิในการลบ
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        ขอให้ลบข้อมูลของท่านภายใต้เงื่อนไขที่กฎหมายกำหนด
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">4</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        สิทธิในการคัดค้าน
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        คัดค้านการประมวลผลข้อมูลของท่านในบางกรณี
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">5</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        สิทธิในการถอนความยินยอม
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        ถอนความยินยอมที่เคยให้ไว้ในการประมวลผลข้อมูล
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">6</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        สิทธิในการโอนย้าย
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        ขอรับข้อมูลในรูปแบบที่ใช้งานได้และขอให้โอนไปยังผู้ควบคุมข้อมูลอื่น
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4 mt-6">
                  <p className="text-sm text-teal-800 dark:text-teal-200">
                    <strong>การใช้สิทธิ:</strong> ท่านสามารถใช้สิทธิได้โดยติดต่อเราผ่านช่องทางที่ระบุไว้ด้านล่าง 
                    เราจะดำเนินการตามคำขอของท่านภายใน 30 วัน
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  คุกกี้และเทคโนโลยีติดตาม
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อปรับปรุงประสบการณ์การใช้งานของท่าน:
                </p>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      คุกกี้ที่จำเป็น
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดได้
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      คุกกี้เพื่อการใช้งาน
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      จดจำการตั้งค่าและความชอบของท่าน เช่น ภาษา ธีม
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      คุกกี้เพื่อการวิเคราะห์
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      ช่วยให้เราเข้าใจการใช้งานเพื่อปรับปรุงบริการ (Google Analytics)
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  ท่านสามารถจัดการการตั้งค่าคุกกี้ได้ผ่านเบราว์เซอร์ หรือคลิกปุ่มตั้งค่าในแบนเนอร์คุกกี้
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  ติดต่อเรา
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  หากท่านมีคำถาม ข้อสงสัย หรือต้องการใช้สิทธิใดๆ กรุณาติดต่อ:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        อีเมล
                      </h4>
                      <a 
                        href="mailto:privacy@hlabconsulting.com" 
                        className="text-primary hover:underline text-sm"
                      >
                        privacy@hlabconsulting.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        โทรศัพท์
                      </h4>
                      <a 
                        href="tel:0612345678" 
                        className="text-primary hover:underline text-sm"
                      >
                        061-234-5678
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        เวลาทำการ: จันทร์-ศุกร์ 09:00-18:00 น.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        ที่อยู่
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        บริษัท เอช แล็บ จำกัด<br />
                        123 ถนนสุขุมวิท แขวงคลองเตย<br />
                        เขตคลองเตย กรุงเทพฯ 10110
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  การปรับปรุงนโยบาย
                </h2>
                
                <p className="text-muted-foreground">
                  เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราวเพื่อให้สอดคล้องกับการเปลี่ยนแปลงของบริการและกฎหมาย 
                  การเปลี่ยนแปลงที่สำคัญจะถูกแจ้งให้ท่านทราบผ่านอีเมลหรือประกาศบนเว็บไซต์ 
                  เราขอแนะนำให้ท่านตรวจสอบนโยบายนี้เป็นประจำ
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              นโยบายความเป็นส่วนตัวนี้มีผลบังคับใช้ตั้งแต่วันที่ 10 มกราคม 2568
            </p>
            <p className="mt-2">
              © 2025 บริษัท เอช แล็บ จำกัด - สงวนลิขสิทธิ์
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}