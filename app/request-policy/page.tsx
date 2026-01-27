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
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-linear-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />

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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-950/30 rounded-full mb-4">
                <FileText className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                นโยบายการส่งคำขอพัฒนาเครื่องมือ
              </h1>
              <p className="text-lg text-muted-foreground">
                Request Development Policy
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                มีผลบังคับใช้: 26 มกราคม 2568
              </p>
            </motion.div>

            {/* Critical Warning */}
            <motion.div variants={fadeIn}>
              <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 mb-8">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-200">
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
                    <Info className="w-5 h-5 text-teal-600 dark:text-teal-400" />
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
                  <p className="text-sm text-muted-foreground mt-4">
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
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    1. คุณสมบัติผู้ส่งคำขอ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">ผู้ที่สามารถส่งคำขอได้:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>บุคลากรทางการแพทย์และสาธารณสุข</li>
                      <li>นักวิจัย นักศึกษาสาขาสุขภาพ</li>
                      <li>ผู้ที่สนใจพัฒนาเครื่องมือสุขภาพ</li>
                    </ul>
                  </div>

                  <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="text-blue-800 dark:text-blue-200">
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
                    <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    2. หลักเกณฑ์การส่งคำขอ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      คำขอที่เหมาะสม:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>มีวัตถุประสงค์ชัดเจนในการแก้ปัญหาหน้างานจริง</li>
                      <li>ระบุ Pain Point และขั้นตอนการทำงานปัจจุบันอย่างละเอียด</li>
                      <li>เป็นเครื่องมือที่สามารถพัฒนาได้ด้วยเทคโนโลยีเว็บ</li>
                      <li>ไม่ต้องการข้อมูลผู้ป่วยจริงในการทดสอบ</li>
                      <li>มีประโยชน์ต่อการเรียนรู้และพัฒนาทักษะ</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      คำขอที่ไม่เหมาะสม:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>คำขอที่ต้องใช้ข้อมูลผู้ป่วยจริง (Real Patient Data)</li>
                      <li>เครื่องมือที่ต้องการการรับรอง Medical Device</li>
                      <li>ระบบที่ต้องการ Real-time Integration กับ HIS/EMR</li>
                      <li>คำขอที่ซับซ้อนเกินไป หรือต้องใช้ทรัพยากรมาก</li>
                      <li>คำขอที่ผิดกฎหมายหรือขัดต่อจริยธรรม</li>
                    </ul>
                  </div>

                  <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertDescription className="text-amber-800 dark:text-amber-200">
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
                    <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    3. กระบวนการพิจารณาและพัฒนา
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">ขั้นตอนการพิจารณา:</h3>
                    <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">รอตรวจสอบ (Pending Review)</strong>
                        <p className="ml-6 mt-1">ทีมตรวจสอบความเหมาะสมเบื้องต้น (1-3 วันทำการ)</p>
                      </li>
                      <li>
                        <strong className="text-foreground">อยู่ในการพิจารณา (Under Consideration)</strong>
                        <p className="ml-6 mt-1">วิเคราะห์ความต้องการและความเป็นไปได้ อาจมีการสอบถามเพิ่มเติม</p>
                      </li>
                      <li>
                        <strong className="text-foreground">อยู่ในการพัฒนา (In Development)</strong>
                        <p className="ml-6 mt-1">เริ่มพัฒนาเครื่องมือ (1-4 สัปดาห์ ขึ้นกับความซับซ้อน)</p>
                      </li>
                      <li>
                        <strong className="text-foreground">อยู่ในการทดสอบ (In Testing)</strong>
                        <p className="ml-6 mt-1">ผู้ส่งคำขอทดลองใช้และให้ Feedback</p>
                      </li>
                      <li>
                        <strong className="text-foreground">สำเร็จ (Completed)</strong>
                        <p className="ml-6 mt-1">ส่งมอบเครื่องมือพร้อมคู่มือการใช้งาน</p>
                      </li>
                    </ol>
                  </div>

                  <Alert className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                    <Info className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <AlertDescription className="text-purple-800 dark:text-purple-200">
                      <strong>หมายเหตุ:</strong> ระยะเวลาเป็นเพียงประมาณการ และขึ้นกับความซับซ้อนของคำขอ
                      ทีมพัฒนาสามารถเปลี่ยนสถานะเป็น &quot;เกินความสามารถ (Beyond Capacity)&quot; ได้หากคำขอซับซ้อนเกินไป
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
                    <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    4. ลิขสิทธิ์และการใช้งาน
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">4.1 ความเป็นเจ้าของ:</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong className="text-foreground">Idea/Concept:</strong> เป็นของผู้ส่งคำขอ</li>
                      <li><strong className="text-foreground">Source Code:</strong> เป็นของ NextHealTH Sandbox</li>
                      <li><strong className="text-foreground">เครื่องมือที่สำเร็จ:</strong> Dual License (ผู้ส่งคำขอใช้ได้ฟรี, ผู้พัฒนาเป็นเจ้าของโค้ด)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">4.2 การใช้งาน:</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>ผู้ส่งคำขอสามารถ<strong className="text-foreground">ใช้งานฟรี</strong>ตลอดไป</li>
                      <li>สามารถแชร์ให้เพื่อนร่วมงานใช้ได้ (ไม่แนะนำให้ใช้กับผู้ป่วยจริงโดยตรง)</li>
                      <li><strong className="text-foreground">ห้าม</strong>นำไปขายหรือต่อยอดเชิงพาณิชย์โดยไม่ได้รับอนุญาต</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">4.3 การใช้เชิงพาณิชย์:</h3>
                    <p className="text-muted-foreground mb-2">
                      หากต้องการนำเครื่องมือไปใช้เชิงพาณิชย์ (ขาย, ให้บริการแบบเสียค่าใช้จ่าย):
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>ต้องติดต่อขออนุญาตล่วงหน้า</li>
                      <li>อาจมีค่าธรรมเนียม License Fee (ตามตกลง)</li>
                      <li>ต้องลงนามในสัญญา Commercial License Agreement</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">4.4 Open Source Policy:</h3>
                    <p className="text-muted-foreground">
                      เครื่องมือบางประเภทอาจถูกเผยแพร่เป็น Open Source (MIT License หรือ Apache 2.0)
                      ขึ้นกับความซับซ้อนและประโยชน์สาธารณะ:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                      <li><strong className="text-foreground">Simple Tools:</strong> มักเป็น Open Source</li>
                      <li><strong className="text-foreground">Complex Tools:</strong> Proprietary (ใช้ได้แต่ไม่เปิดโค้ด)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 5: Usage Warning */}
            <motion.div variants={fadeIn}>
              <Card className="mb-8 border-orange-200 dark:border-orange-800">
                <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
                  <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                    <AlertTriangle className="w-5 h-5" />
                    5. ข้อจำกัดและการใช้งาน
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-6 space-y-4">
                  <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                    <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <AlertDescription className="text-orange-800 dark:text-orange-200">
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
                    <h3 className="font-semibold text-foreground mb-2">5.1 ข้อจำกัดการรับประกัน:</h3>
                    <p className="text-muted-foreground mb-2">
                      เครื่องมือจัดทำขึ้นตาม <strong>&quot;AS-IS&quot;</strong> basis โดยไม่มีการรับประกันใดๆ ทั้งโดยชัดแจ้งหรือโดยนัยยะ:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>ไม่รับประกันความถูกต้อง ครบถ้วน หรือเหมาะสมต่อวัตถุประสงค์เฉพาะ</li>
                      <li>ไม่รับประกันว่าจะไม่มีข้อผิดพลาดหรือการทำงานหยุดชะงัก</li>
                      <li>ไม่รับประกันความปลอดภัยของข้อมูล 100%</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">5.2 ข้อจำกัดความรับผิด:</h3>
                    <p className="text-muted-foreground">
                      NextHealTH Sandbox และผู้พัฒนา<strong>ไม่รับผิดชอบ</strong>ต่อความเสียหายใดๆ ที่เกิดจาก:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
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
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    6. การคุ้มครองข้อมูลส่วนบุคคล
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    การส่งคำขอถือว่าผู้ใช้ยอมรับนโยบายความเป็นส่วนตัว (Privacy Policy) ของเรา
                  </p>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">ข้อมูลที่เก็บรวบรวม:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>ชื่อ-นามสกุล, อีเมล, เบอร์โทรศัพท์</li>
                      <li>หน่วยงาน/โรงพยาบาล</li>
                      <li>เนื้อหาคำขอ (Pain Point, Workflow, Expected Tech Help)</li>
                      <li>ไฟล์แนบ (รูปภาพ, เอกสาร PDF)</li>
                    </ul>
                  </div>

                  <Alert className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
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
                    <Scale className="w-5 h-5 text-green-600 dark:text-green-400" />
                    7. สิทธิและหน้าที่
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">สิทธิของผู้ส่งคำขอ:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>ติดตามสถานะคำขอผ่านระบบ</li>
                      <li>สอบถามและให้ข้อมูลเพิ่มเติมผ่าน Comment Section</li>
                      <li>ทดลองใช้เครื่องมือในขั้นตอน Testing</li>
                      <li>ให้ Feedback และขอปรับปรุง</li>
                      <li>ขอลบคำขอที่ยังไม่เริ่มพัฒนา</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">หน้าที่ของผู้ส่งคำขอ:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>ให้ข้อมูลที่ถูกต้อง ครบถ้วน และชัดเจน</li>
                      <li>ตอบคำถามและให้ความร่วมมือในขั้นตอน Under Consideration</li>
                      <li>ทดสอบเครื่องมือและให้ Feedback ในขั้นตอน Testing</li>
                      <li>ไม่ส่งคำขอซ้ำซ้อน</li>
                      <li>ปฏิบัติตามข้อกำหนดและนโยบายทั้งหมด</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">สิทธิของ NextHealTH Sandbox:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
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
                  <p className="text-muted-foreground">
                    NextHealTH Sandbox สงวนสิทธิ์ในการแก้ไขนโยบายนี้ได้ตลอดเวลา โดยจะแจ้งให้ทราบผ่าน:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>ประกาศบนแพลตฟอร์ม</li>
                    <li>อีเมลแจ้งผู้ใช้ (กรณีเปลี่ยนแปลงสำคัญ)</li>
                  </ul>
                  <p className="text-muted-foreground">
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
                  <p className="text-muted-foreground">
                    หากมีข้อสงสัยเกี่ยวกับนโยบายนี้ กรุณาติดต่อ:
                  </p>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-foreground">NextHealTH Sandbox</p>
                    <p className="text-sm text-muted-foreground">Phitsanulok, Thailand 65000</p>
                    <div className="pt-2 space-y-1">
                      <p className="text-sm">
                        <strong>อีเมล:</strong>{' '}
                        <a href="mailto:thanatouchth@gmail.com" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                          thanatouchth@gmail.com
                        </a>
                      </p>
                      <p className="text-sm">
                        <strong>โทรศัพท์:</strong>{' '}
                        <a href="tel:0955904245" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                          095-590-4245
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        (วันจันทร์-ศุกร์ เวลา 09:00-17:00 น.)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer */}
            <motion.div variants={fadeIn} className="text-center pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                นโยบายฉบับนี้มีผลบังคับใช้ตั้งแต่วันที่ 26 มกราคม 2568 เป็นต้นไป
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                © 2025 NextHealTH Sandbox - Educational & Experimental Use Only
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}