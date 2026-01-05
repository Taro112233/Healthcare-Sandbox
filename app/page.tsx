// app/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AppHeader } from '@/components/shared/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Stethoscope,
  Zap,
  MessageSquare,
  FileText,
  ArrowRight,
  CheckCircle2,
  Calculator,
  GitBranch,
  Brain,
  Users,
  Shield,
  Activity,
  TrendingUp,
  Clock,
  Eye,
  Code,
  TestTube,
  Lightbulb,
  Target,
  Workflow,
  AlertCircle,
  Star,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  const [showManual, setShowManual] = useState(false);

  const handleManualClick = () => {
    setShowManual(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeIn} className="inline-flex mb-6">
              <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Technology Request Platform
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              HealthTech Sandbox
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                แพลตฟอร์มส่งคำขอ
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeIn}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              แพลตฟอร์มสำหรับบุคลากรทางการแพทย์ในการส่งคำขอพัฒนาเครื่องมือดิจิทัล 
              ตั้งแต่เครื่องคำนวณยา ไปจนถึงระบบช่วยตัดสินใจทางคลินิก
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/requests/new">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 w-full sm:w-auto bg-teal-600 hover:bg-teal-700"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  ส่งคำขอใหม่
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 w-full sm:w-auto"
                >
                  <Activity className="w-5 h-5 mr-2" />
                  ดูคำขอของฉัน
                </Button>
              </Link>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              <motion.div variants={fadeIn} className="bg-card border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                  Real-time
                </div>
                <div className="text-sm text-muted-foreground">
                  อัปเดตสถานะทันที
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-card border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Collaborative
                </div>
                <div className="text-sm text-muted-foreground">
                  ทำงานร่วมกันได้
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-card border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  Transparent
                </div>
                <div className="text-sm text-muted-foreground">
                  ติดตามได้ทุกขั้นตอน
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-card border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  Efficient
                </div>
                <div className="text-sm text-muted-foreground">
                  ประหยัดเวลา
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Request Types Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-bold text-foreground mb-4"
            >
              ประเภทเครื่องมือที่รองรับ
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-muted-foreground max-w-3xl mx-auto text-lg"
            >
              เลือกประเภทเครื่องมือที่ต้องการให้ทีมพัฒนา
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-violet-100 dark:bg-violet-950/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calculator className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">เครื่องคำนวณ</div>
                      <div className="text-sm text-muted-foreground">
                        Calculator
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    เครื่องคำนวณทางการแพทย์ เช่น BMI, Drug Dosing, Risk Score
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sky-100 dark:bg-sky-950/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">แบบฟอร์ม</div>
                      <div className="text-sm text-muted-foreground">Form</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    แบบฟอร์มบันทึกข้อมูล, Checklist, Assessment Form
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <GitBranch className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">ระบบจัดการงาน</div>
                      <div className="text-sm text-muted-foreground">
                        Workflow
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    ระบบจัดการขั้นตอนการทำงาน, Process Automation
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Brain className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">ช่วยตัดสินใจ</div>
                      <div className="text-sm text-muted-foreground">
                        Decision Aid
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    เครื่องมือช่วยตัดสินใจทางคลินิก, Clinical Decision Support
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-bold text-foreground mb-4"
            >
              กระบวนการพัฒนา
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-muted-foreground max-w-3xl mx-auto text-lg"
            >
              จากคำขอของคุณสู่เครื่องมือที่ใช้งานได้จริง
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Timeline connector - hide on mobile */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-200  to-green-200 dark:from-yellow-900  dark:to-green-900 -translate-y-1/2" />

            <div className="grid md:grid-cols-5 gap-8 relative">
              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-950/30 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 border-4 border-background">
                  <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-bold mb-2">รอตรวจสอบ</h3>
                <p className="text-sm text-muted-foreground">
                  ทีมตรวจสอบความเป็นไปได้
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 border-4 border-background">
                  <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold mb-2">อยู่ในการพิจารณา</h3>
                <p className="text-sm text-muted-foreground">
                  วิเคราะห์ความต้องการ
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950/30 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 border-4 border-background">
                  <Code className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-bold mb-2">อยู่ในการพัฒนา</h3>
                <p className="text-sm text-muted-foreground">
                  ทีมพัฒนาสร้างเครื่องมือ
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950/30 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 border-4 border-background">
                  <TestTube className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-bold mb-2">อยู่ในการทดสอบ</h3>
                <p className="text-sm text-muted-foreground">
                  ทดลองใช้และปรับปรุง
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 border-4 border-background">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold mb-2">สำเร็จ</h3>
                <p className="text-sm text-muted-foreground">
                  พร้อมใช้งานจริง
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-bold text-foreground mb-4"
            >
              คุณสมบัติเด่น
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-muted-foreground max-w-3xl mx-auto text-lg"
            >
              ทุกอย่างที่คุณต้องการในแพลตฟอร์มเดียว
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-950/30 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Real-time Comments</div>
                      <div className="text-sm text-muted-foreground">
                        สื่อสารแบบเรียลไทม์
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    ถาม-ตอบกับทีมพัฒนาได้ทันที พร้อมระบบแจ้งเตือน
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Comment Thread
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Status Updates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Auto-scroll
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Rich Text Editor</div>
                      <div className="text-sm text-muted-foreground">
                        เขียนได้ครบจบ
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    เขียนคำขอพร้อมจัดรูปแบบข้อความได้อย่างสวยงาม
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Bold, Italic, Lists
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Headings, Alignment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Code Blocks
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/30 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Secure & Private</div>
                      <div className="text-sm text-muted-foreground">
                        ปลอดภัยทุกขั้นตอน
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    ระบบรักษาความปลอดภัยระดับ Enterprise
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      JWT Authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Arcjet Security
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Rate Limiting
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                เคล็ดลับการส่งคำขอที่ดี
              </h2>
              <p className="text-muted-foreground text-lg">
                ยิ่งให้รายละเอียดมาก ทีมพัฒนาจะช่วยได้ดียิ่งขึ้น
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.div variants={fadeIn}>
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">
                          ระบุรายละเอียดให้ชัดเจนและเฉพาะเจาะจง
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          บอกปัญหาที่พบและความถี่ในการใช้งาน
                        </p>
                        <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
                          <p className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>ดี:</strong> &ldquo;ต้องคำนวณ Vancomycin dose
                              ตาม Cockcroft-Gault eGFR ทุกครั้งที่ใช้ยา ซึ่งใช้เวลา
                              5-10 นาที/ครั้ง&rdquo;
                            </span>
                          </p>
                          <p className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>ไม่ดี:</strong> &ldquo;ต้องคำนวณยาตลอดเวลา
                              ลำบาก&rdquo;
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="border-l-4 border-l-orange-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Workflow className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">
                          อธิบายขั้นตอนการทำงานแบบ Step-by-Step
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          ให้ทีมเข้าใจ workflow ปัจจุบัน
                        </p>
                        <div className="bg-muted/50 rounded-lg p-3 text-sm">
                          <p className="font-medium mb-2">ตัวอย่างที่ดี:</p>
                          <ol className="space-y-1 ml-4 list-decimal text-muted-foreground">
                            <li>เปิด EMR ดูน้ำหนักผู้ป่วย</li>
                            <li>เปิดหนังสือยาหา dose แนะนำ</li>
                            <li>คำนวณ dose ด้วยเครื่องคิดเลข</li>
                            <li>เขียน order ในกระดาษ</li>
                            <li>พยาบาลพิมพ์ลง EMR ซ้ำอีกครั้ง</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">
                          อธิบายสิ่งที่ต้องการให้ชัดเจน
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          บอกว่าต้องการให้เครื่องมือช่วยอะไร
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ระบุ input/output ที่ต้องการ
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            แนบรูปภาพตัวอย่าง (ถ้ามี)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            บอกข้อจำกัดหรือข้อควรระวัง
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-teal-600 to-emerald-700 dark:from-teal-800 dark:to-emerald-900 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-6">
            พร้อมที่จะเริ่มต้นแล้วหรือยัง?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl mb-8 text-teal-100 dark:text-teal-200"
          >
            เริ่มส่งคำขอพัฒนาเครื่องมือดิจิทัลของคุณได้เลยวันนี้
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link href="/requests/new">
              <Button
                size="lg"
                className="text-lg px-8 py-6 w-full sm:w-auto bg-white text-teal-600 hover:bg-gray-100"
              >
                <Zap className="w-5 h-5 mr-2" />
                ส่งคำขอใหม่
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 w-full sm:w-auto border-white text-white hover:bg-white/10"
              onClick={handleManualClick}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              อ่านคู่มือ
            </Button>
          </motion.div>

          <motion.div variants={fadeIn} className="text-teal-100 dark:text-teal-200">
            <p>
              ✨ ระบบพร้อมใช้งานทันที • 🔒 ปลอดภัยด้วย Arcjet Security • 📱
              รองรับทุกอุปกรณ์
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-bold text-foreground text-xl">
                    HealthTech Sandbox
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Technology Request Platform
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                แพลตฟอร์มสำหรับบุคลากรทางการแพทย์ในการส่งคำขอพัฒนาเครื่องมือดิจิทัล
                เพื่อปรับปรุงการทำงานและคุณภาพการดูแลผู้ป่วย
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Core Features</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  Real-time Comments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  Rich Text Editor
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  File Attachments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  Status Tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  Dark Mode Support
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Tech Stack</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Next.js 15 + React 19
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  PostgreSQL + Prisma
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  TailwindCSS v4
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  Tiptap Editor
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  Arcjet Security
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                <p>© 2025 HealthTech Sandbox - Technology Request Platform</p>
                <p className="mt-1">Educational & Experimental Use Only</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Built with ❤️ for Healthcare</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>System Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Manual Dialog */}
      <Dialog open={showManual} onOpenChange={setShowManual}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <Stethoscope className="w-6 h-6 text-teal-600" />
              HealthTech Sandbox - คู่มือการใช้งาน
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
                  <strong>HealthTech Sandbox</strong> คือแพลตฟอร์มสำหรับบุคลากรทางการแพทย์
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
                  <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
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
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
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
                  <Code className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
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
                  <TestTube className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
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
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
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
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-teal-700 dark:text-teal-400 flex items-center gap-2">
                💡 เคล็ดลับ
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
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
                  <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">ใส่ตัวเลขและความถี่</p>
                    <p className="text-muted-foreground text-xs">
                      บอกว่าใช้บ่อยแค่ไหน ส่งผลต่อการจัดลำดับความสำคัญ
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
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
                © 2025 HealthTech Sandbox - Educational & Experimental Use Only
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}