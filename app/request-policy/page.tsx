// app/request-policy/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Scale,
  Users,
  Lightbulb,
  Shield,
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RequestPolicyPage() {
  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="fixed inset-0 bg-linear-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-tertiary/10 pointer-events-none" />

      <main className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Header */}
            <motion.div variants={fadeIn} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-interactive-primary/10 rounded-full mb-4">
                <FileText className="w-8 h-8 text-interactive-primary" />
              </div>
              <h1 className="text-4xl font-bold text-content-primary mb-4">
                นโยบายการส่งคำขอพัฒนาเครื่องมือ
              </h1>
              <p className="text-lg text-content-secondary">
                Request Development Policy
              </p>
              <p className="text-sm text-content-tertiary mt-2">
                มีผลบังคับใช้: 26 มกราคม 2568
              </p>
            </motion.div>

            {/* Critical Warning */}
            <motion.div variants={fadeIn}>
              <Alert className="border-alert-error-border bg-alert-error-bg mb-8">
                <AlertTriangle className="h-5 w-5 text-alert-error-icon" />
                <AlertDescription className="text-alert-error-text">
                  <strong className="font-semibold">⚠️ ข้อกำหนดสำคัญ:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>NextHealTH Sandbox เป็น <strong>Sandbox/Prototype Environment</strong> สำหรับการทดลองและเรียนรู้เท่านั้น</li>
                    <li><strong>ไม่รับประกัน</strong>ว่าคำขอทุกรายการจะได้รับการพัฒนา</li>
                    <li><strong>ห้าม</strong>ใช้ข้อมูลผู้ป่วยจริง (Real Patient Data) ในการทดสอบ</li>
                    <li>เครื่องมือที่พัฒนาเสร็จ <strong>ไม่ได้รับรอง</strong>ตาม HIPAA, PDPA, หรือข้อกำหนด Medical Device Regulation</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* Introduction */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-interactive-primary" />
                    บทนำ
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    NextHealTH Sandbox เป็นแพลตฟอร์มสำหรับรับและพัฒนาเครื่องมือดิจิทัลทางการแพทย์
                    โดยมีวัตถุประสงค์เพื่อ:
                  </p>
                  <ul>
                    <li>เป็นพื้นที่ทดลอง (Sandbox) สำหรับนวัตกรรมด้าน HealthTech</li>
                    <li>ส่งเสริมการเรียนรู้และพัฒนาทักษะทางเทคโนโลยี</li>
                    <li>สนับสนุนการแก้ปัญหาในหน้างานจริงด้วยเครื่องมือดิจิทัล</li>
                  </ul>
                  <p className="text-sm text-content-tertiary mt-4">
                    นโยบายฉบับนี้กำหนดหลักเกณฑ์และเงื่อนไขในการส่งคำขอพัฒนาเครื่องมือผ่านแพลตฟอร์ม
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 1: Eligibility */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-alert-info-icon" />
                    1. คุณสมบัติผู้ส่งคำขอ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">ผู้ที่สามารถส่งคำขอได้:</h3>
                    <ul className="list-disc list-inside space-y-1 text-content-secondary">
                      <li>บุคลากรทางการแพทย์และสาธารณสุข</li>
                      <li>นักวิจัย นักศึกษาสาขาสุขภาพ</li>
                      <li>ผู้ที่สนใจพัฒนาเครื่องมือสุขภาพ</li>
                    </ul>
                  </div>

                  <Alert className="bg-alert-info-bg border-alert-info-border">
                    <Info className="h-4 w-4 text-alert-info-icon" />
                    <AlertDescription className="text-alert-info-text">
                      <strong>หมายเหตุ:</strong> ผู้ส่งคำขอต้องลงทะเบียนบัญชีผู้ใช้งานในระบบก่อนส่งคำขอ
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 2: Request Guidelines */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-alert-warning-icon" />
                    2. หลักเกณฑ์การส่งคำขอ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-content-primary mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-alert-success-icon" />
                      คำขอที่เหมาะสม:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-content-secondary">
                      <li>มีวัตถุประสงค์ชัดเจนในการแก้ปัญหาหน้างานจริง</li>
                      <li>ระบุ Pain Point และขั้นตอนการทำงานปัจจุบันอย่างละเอียด</li>
                      <li>เป็นเครื่องมือที่สามารถพัฒนาได้ด้วยเทคโนโลยีเว็บ</li>
                      <li>ไม่ต้องการข้อมูลผู้ป่วยจริงในการทดสอบ</li>
                      <li>มีประโยชน์ต่อการเรียนรู้และพัฒนาทักษะ</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-alert-error-icon" />
                      คำขอที่ไม่เหมาะสม:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-content-secondary">
                      <li>คำขอที่ต้องใช้ข้อมูลผู้ป่วยจริง (Real Patient Data)</li>
                      <li>เครื่องมือที่ต้องการการรับรอง Medical Device</li>
                      <li>ระบบที่ต้องการ Real-time Integration กับ HIS/EMR</li>
                      <li>คำขอที่ซับซ้อนเกินไป หรือต้องใช้ทรัพยากรมาก</li>
                      <li>คำขอที่ผิดกฎหมายหรือขัดต่อจริยธรรม</li>
                    </ul>
                  </div>

                  <Alert className="bg-alert-warning-bg border-alert-warning-border">
                    <AlertTriangle className="h-4 w-4 text-alert-warning-icon" />
                    <AlertDescription className="text-alert-warning-text">
                      <strong>สำคัญ:</strong> ทีมพัฒนามีสิทธิ์ปฏิเสธหรือระงับคำขอที่ไม่เหมาะสมโดยไม่ต้องแจ้งเหตุผล
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 3: Development Process */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-interactive-primary" />
                    3. กระบวนการพิจารณาและพัฒนา
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-content-primary mb-3">ขั้นตอนการพิจารณา:</h3>
                    <ol className="list-decimal list-inside space-y-3 text-content-secondary">
                      <li>
                        <strong className="text-content-primary">รอตรวจสอบ (Pending Review)</strong>
                        <p className="ml-6 mt-1">ทีมตรวจสอบความเหมาะสมเบื้องต้น (1-3 วันทำการ)</p>
                      </li>
                      <li>
                        <strong className="text-content-primary">อยู่ในการพิจารณา (Under Consideration)</strong>
                        <p className="ml-6 mt-1">วิเคราะห์ความต้องการและความเป็นไปได้ อาจมีการสอบถามเพิ่มเติม</p>
                      </li>
                      <li>
                        <strong className="text-content-primary">อยู่ในการพัฒนา (In Development)</strong>
                        <p className="ml-6 mt-1">เริ่มพัฒนาเครื่องมือ (1-4 สัปดาห์ ขึ้นกับความซับซ้อน)</p>
                      </li>
                      <li>
                        <strong className="text-content-primary">อยู่ในการทดสอบ (In Testing)</strong>
                        <p className="ml-6 mt-1">ผู้ส่งคำขอทดลองใช้และให้ Feedback</p>
                      </li>
                      <li>
                        <strong className="text-content-primary">สำเร็จ (Completed)</strong>
                        <p className="ml-6 mt-1">ส่งมอบเครื่องมือพร้อมคู่มือการใช้งาน</p>
                      </li>
                    </ol>
                  </div>

                  <Alert className="bg-alert-info-bg border-alert-info-border">
                    <Info className="h-4 w-4 text-alert-info-icon" />
                    <AlertDescription className="text-alert-info-text">
                      <strong>หมายเหตุ:</strong> ระยะเวลาเป็นเพียงประมาณการ และขึ้นกับความซับซ้อนของคำขอ
                      ทีมพัฒนาสามารถเปลี่ยนสถานะเป็น &quot;อยู่นอกขอบเขต (Out of Scope)&quot; ได้หากคำขอซับซ้อนเกินไป
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 4: Intellectual Property */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-interactive-primary" />
                    4. ลิขสิทธิ์และการใช้งาน
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">4.1 ความเป็นเจ้าของ:</h3>
                    <ul className="list-disc list-inside space-y-2 text-content-secondary">
                      <li><strong className="text-content-primary">Idea/Concept:</strong> เป็นของผู้ส่งคำขอ</li>
                      <li><strong className="text-content-primary">Source Code:</strong> เป็นของ NextHealTH Sandbox</li>
                      <li><strong className="text-content-primary">เครื่องมือที่สำเร็จ:</strong> Dual License (ผู้ส่งคำขอใช้ได้ฟรี, ผู้พัฒนาเป็นเจ้าของโค้ด)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">4.2 การใช้งาน:</h3>
                    <ul className="list-disc list-inside space-y-2 text-content-secondary">
                      <li>ผู้ส่งคำขอสามารถ<strong className="text-content-primary">ใช้งานฟรี</strong>ตลอดไป</li>
                      <li>สามารถแชร์ให้เพื่อนร่วมงานใช้ได้ (ไม่แนะนำให้ใช้กับผู้ป่วยจริงโดยตรง)</li>
                      <li><strong className="text-content-primary">ห้าม</strong>นำไปขายหรือต่อยอดเชิงพาณิชย์โดยไม่ได้รับอนุญาต</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">4.3 การใช้เชิงพาณิชย์:</h3>
                    <p className="text-content-secondary mb-2">
                      หากต้องการนำเครื่องมือไปใช้เชิงพาณิชย์ (ขาย, ให้บริการแบบเสียค่าใช้จ่าย):
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-content-secondary">
                      <li>ต้องติดต่อขออนุญาตล่วงหน้า</li>
                      <li>อาจมีค่าธรรมเนียม License Fee (ตามตกลง)</li>
                      <li>ต้องลงนามในสัญญา Commercial License Agreement</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">4.4 Open Source Policy:</h3>
                    <p className="text-content-secondary">
                      เครื่องมือบางประเภทอาจถูกเผยแพร่เป็น Open Source (MIT License หรือ Apache 2.0)
                      ขึ้นกับความซับซ้อนและประโยชน์สาธารณะ:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-content-secondary mt-2">
                      <li><strong className="text-content-primary">Simple Tools:</strong> มักเป็น Open Source</li>
                      <li><strong className="text-content-primary">Complex Tools:</strong> Proprietary (ใช้ได้แต่ไม่เปิดโค้ด)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 5: Usage Warning */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8 border-alert-warning-border">
                <CardHeader className="bg-alert-warning-bg">
                  <CardTitle className="flex items-center gap-2 text-alert-warning-text">
                    <AlertTriangle className="w-5 h-5" />
                    5. ข้อจำกัดและการใช้งาน
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-6 space-y-4">
                  <Alert className="border-alert-warning-border bg-alert-warning-bg">
                    <AlertTriangle className="h-5 w-5 text-alert-warning-icon" />
                    <AlertDescription className="text-alert-warning-text">
                      <strong className="text-lg">⚠️ เครื่องมือที่พัฒนาเป็น Sandbox/Prototype สำหรับการทดลองและเรียนรู้เท่านั้น</strong>
                      <div className="mt-3 space-y-2">
                        <p><strong>หากต้องการนำไปใช้กับผู้ป่วยจริง:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>✅ ผู้ใช้ต้อง<strong>รับผิดชอบ</strong>ในการ Validate ความถูกต้องด้วยตัวเอง</li>
                          <li>✅ แนะนำให้<strong>ทดสอบอย่างละเอียด</strong>ก่อนใช้จริง</li>
                          <li>✅ ควรมี<strong>แพทย์หรือผู้เชี่ยวชาญ</strong>ตรวจสอบผลลัพธ์</li>
                          <li>❌ ผู้พัฒนา<strong>ไม่รับผิดชอบ</strong>ต่อความเสียหายใดๆ ที่เกิดขึ้น</li>
                          <li>❌ เครื่องมือ<strong>ไม่ได้รับรอง</strong>ตามมาตรฐาน HIPAA, PDPA, หรือ Medical Device Regulation</li>
                        </ul>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">5.1 ข้อจำกัดการรับประกัน:</h3>
                    <p className="text-content-secondary mb-2">
                      เครื่องมือจัดทำขึ้นตาม &quot;AS-IS&quot; basis โดยไม่มีการรับประกันใดๆ ทั้งโดยชัดแจ้งหรือโดยนัยยะ:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-content-secondary">
                      <li>ไม่รับประกันความถูกต้อง ครบถ้วน หรือเหมาะสมต่อวัตถุประสงค์เฉพาะ</li>
                      <li>ไม่รับประกันว่าจะไม่มีข้อผิดพลาดหรือการทำงานหยุดชะงัก</li>
                      <li>ไม่รับประกันความปลอดภัยของข้อมูล 100%</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">5.2 ข้อจำกัดความรับผิด:</h3>
                    <p className="text-content-secondary">
                      NextHealTH Sandbox และผู้พัฒนา<strong>ไม่รับผิดชอบ</strong>ต่อความเสียหายใดๆ ที่เกิดจาก:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-content-secondary mt-2">
                      <li>การใช้งานเครื่องมือไม่ถูกต้อง</li>
                      <li>ข้อผิดพลาดของเครื่องมือ (Bug, Calculation Error)</li>
                      <li>ความเสียหายต่อผู้ป่วย อุปกรณ์ หรือข้อมูล</li>
                      <li>การสูญหายของข้อมูล</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 6: Data Protection */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-alert-info-icon" />
                    6. การคุ้มครองข้อมูลส่วนบุคคล
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-content-secondary">
                    การส่งคำขอถือว่าผู้ใช้ยอมรับนโยบายความเป็นส่วนตัว (Privacy Policy) ของเรา
                  </p>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">ข้อมูลที่เก็บรวบรวม:</h3>
                    <ul className="list-disc list-inside space-y-1 text-content-secondary">
                      <li>ชื่อ-นามสกุล, อีเมล, เบอร์โทรศัพท์</li>
                      <li>หน่วยงาน/โรงพยาบาล</li>
                      <li>เนื้อหาคำขอ (Pain Point, Workflow, Expected Tech Help)</li>
                      <li>ไฟล์แนบ (รูปภาพ, เอกสาร PDF)</li>
                    </ul>
                  </div>

                  <Alert className="bg-alert-error-bg border-alert-error-border">
                    <AlertTriangle className="h-4 w-4 text-alert-error-icon" />
                    <AlertDescription className="text-alert-error-text">
                      <strong>ห้ามเด็ดขาด:</strong> ห้ามแนบข้อมูลผู้ป่วยจริง (ชื่อ, HN, ผลแลป, ภาพถ่ายผู้ป่วย)
                      ในคำขอหรือไฟล์แนบ หากพบจะถูกลบทันทีและอาจถูกระงับบัญชี
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 7: Rights & Responsibilities */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-alert-success-icon" />
                    7. สิทธิและหน้าที่
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">สิทธิของผู้ส่งคำขอ:</h3>
                    <ul className="list-disc list-inside space-y-1 text-content-secondary">
                      <li>ติดตามสถานะคำขอผ่านระบบ</li>
                      <li>สอบถามและให้ข้อมูลเพิ่มเติมผ่าน Comment Section</li>
                      <li>ทดลองใช้เครื่องมือในขั้นตอน Testing</li>
                      <li>ให้ Feedback และขอปรับปรุง</li>
                      <li>ขอลบคำขอที่ยังไม่เริ่มพัฒนา</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">หน้าที่ของผู้ส่งคำขอ:</h3>
                    <ul className="list-disc list-inside space-y-1 text-content-secondary">
                      <li>ให้ข้อมูลที่ถูกต้อง ครบถ้วน และชัดเจน</li>
                      <li>ตอบคำถามและให้ความร่วมมือในขั้นตอน Under Consideration</li>
                      <li>ทดสอบเครื่องมือและให้ Feedback ในขั้นตอน Testing</li>
                      <li>ไม่ส่งคำขอซ้ำซ้อน</li>
                      <li>ปฏิบัติตามข้อกำหนดและนโยบายทั้งหมด</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-content-primary mb-2">สิทธิของ NextHealTH Sandbox:</h3>
                    <ul className="list-disc list-inside space-y-1 text-content-secondary">
                      <li>ปฏิเสธหรือระงับคำขอที่ไม่เหมาะสม</li>
                      <li>เปลี่ยนแปลงสถานะคำขอตามความเหมาะสม</li>
                      <li>แก้ไขหรือปรับปรุงเครื่องมือในภายหลัง</li>
                      <li>เผยแพร่เครื่องมือเป็น Open Source (ตามดุลยพินิจ)</li>
                      <li>ระงับบัญชีผู้ใช้ที่ละเมิดเงื่อนไข</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 8: Policy Updates */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>8. การแก้ไขนโยบาย</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-content-secondary">
                    NextHealTH Sandbox สงวนสิทธิ์ในการแก้ไขนโยบายนี้ได้ตลอดเวลา โดยจะแจ้งให้ทราบผ่าน:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-content-secondary">
                    <li>ประกาศบนแพลตฟอร์ม</li>
                    <li>อีเมลแจ้งผู้ใช้ (กรณีเปลี่ยนแปลงสำคัญ)</li>
                  </ul>
                  <p className="text-content-secondary">
                    การส่งคำขอหลังจากมีการแก้ไข ถือว่าผู้ใช้ยอมรับนโยบายฉบับใหม่
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Section */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>9. ติดต่อเรา</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-content-secondary">
                    หากมีข้อสงสัยเกี่ยวกับนโยบายนี้ กรุณาติดต่อ:
                  </p>

                  <div className="bg-surface-secondary rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-content-primary">NextHealTH Sandbox</p>
                    <p className="text-sm text-content-tertiary">Phitsanulok, Thailand 65000</p>
                    <div className="pt-2 space-y-1">
                      <p className="text-sm">
                        <strong>อีเมล:</strong>{' '}
                        <a href="mailto:thanatouchth@gmail.com" className="text-interactive-primary hover:opacity-80">
                          thanatouchth@gmail.com
                        </a>
                      </p>
                      <p className="text-sm">
                        <strong>โทรศัพท์:</strong>{' '}
                        <a href="tel:0955904245" className="text-interactive-primary hover:opacity-80">
                          095-590-4245
                        </a>
                      </p>
                      <p className="text-sm text-content-tertiary">
                        (วันจันทร์-ศุกร์ เวลา 09:00-17:00 น.)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer */}
            <motion.div variants={fadeIn} className="text-center pt-8 border-t border-border-primary">
              <p className="text-sm text-content-secondary">
                นโยบายฉบับนี้มีผลบังคับใช้ตั้งแต่วันที่ 26 มกราคม 2568 เป็นต้นไป
              </p>
              <p className="text-xs text-content-tertiary mt-2">
                © 2025 NextHealTH Sandbox - Educational & Experimental Use Only
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}