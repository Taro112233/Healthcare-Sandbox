// components/LandingPage/DevelopmentProcessSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, Eye, Code, TestTube, CheckCircle2 } from 'lucide-react';
import { fadeIn, staggerContainer } from './animations';

const processSteps = [
  {
    id: 'step-1',
    icon: Clock,
    title: 'รอตรวจสอบ',
    duration: '1-3 วันทำการ',
    description: 'ทีมตรวจสอบความเป็นไปได้',
    details: [
      'ระยะเวลา: 1-3 วันทำการ',
      'ตรวจสอบความชัดเจนของคำขอ',
      'ประเมินความเป็นไปได้ทางเทคนิค',
      'พิจารณาลำดับความสำคัญ',
      'วางแผนทรัพยากรเบื้องต้น',
    ],
    bgColor: 'bg-yellow-100 dark:bg-yellow-950/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    glowColor: 'shadow-yellow-400/50 dark:shadow-yellow-600/50',
  },
  {
    id: 'step-2',
    icon: Eye,
    title: 'อยู่ในการพิจารณา',
    duration: '3-5 วันทำการ',
    description: 'วิเคราะห์ความต้องการ',
    details: [
      'ระยะเวลา: 3-5 วันทำการ',
      'สื่อสารกับผู้ส่งคำขอเพื่อขอรายละเอียดเพิ่มเติม',
      'วิเคราะห์ Pain Point และ Workflow',
      'ออกแบบโซลูชันเบื้องต้น',
      'ประเมินระยะเวลาและทรัพยากร',
    ],
    bgColor: 'bg-blue-100 dark:bg-blue-950/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
    glowColor: 'shadow-blue-400/50 dark:shadow-blue-600/50',
  },
  {
    id: 'step-3',
    icon: Code,
    title: 'อยู่ในการพัฒนา',
    duration: '1-4 สัปดาห์',
    description: 'ทีมพัฒนาสร้างเครื่องมือ',
    details: [
      'ระยะเวลา: 1-4 สัปดาห์',
      'เขียนโค้ดและพัฒนาฟีเจอร์',
      'ออกแบบ UI/UX ให้ใช้งานง่าย',
      'ทดสอบภายในทีม',
      'ปรับปรุงตาม Feedback',
    ],
    bgColor: 'bg-purple-100 dark:bg-purple-950/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800',
    glowColor: 'shadow-purple-400/50 dark:shadow-purple-600/50',
  },
  {
    id: 'step-4',
    icon: TestTube,
    title: 'อยู่ในการทดสอบ',
    duration: '3-7 วัน',
    description: 'ทดลองใช้และปรับปรุง',
    details: [
      'ระยะเวลา: 3-7 วัน',
      'ส่งลิงก์ทดลองใช้ให้ผู้ขอ',
      'รับ Feedback และข้อเสนอแนะ',
      'แก้ไข Bugs และปรับปรุง',
      'ทดสอบในสถานการณ์จริง',
    ],
    bgColor: 'bg-orange-100 dark:bg-orange-950/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-800',
    glowColor: 'shadow-orange-400/50 dark:shadow-orange-600/50',
  },
  {
    id: 'step-5',
    icon: CheckCircle2,
    title: 'สำเร็จ',
    duration: 'เสร็จสิ้น',
    description: 'พร้อมใช้งานจริง',
    details: [
      'เสร็จสิ้นการพัฒนา',
      'ส่งมอบเครื่องมือเวอร์ชันสมบูรณ์',
      'แชร์ลิงก์และคู่มือการใช้งาน',
      'ให้การสนับสนุนหลังการส่งมอบ',
      'รับฟัง Feedback เพื่อปรับปรุงต่อ',
    ],
    bgColor: 'bg-green-100 dark:bg-green-950/30',
    iconColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800',
    glowColor: 'shadow-green-400/50 dark:shadow-green-600/50',
  },
];

export function DevelopmentProcessSection() {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 500); // เปลี่ยนทุก 0.5 วินาที

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
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
        >
          <Accordion type="single" collapsible className="space-y-4">
            {processSteps.map((step, index) => (
              <motion.div key={step.id} variants={fadeIn}>
                <AccordionItem
                  value={step.id}
                  className={`border-2 ${step.borderColor} rounded-2xl overflow-hidden bg-card transition-all duration-500 ${
                    activeStep === index 
                      ? `shadow-lg ${step.glowColor}` 
                      : 'shadow-none'
                  }`}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <div className="flex items-center gap-4 w-full">
                      {/* Icon */}
                      <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                        activeStep === index ? 'scale-110' : ''
                      }`}>
                        <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-6">
                    <div className="pl-16 space-y-2">
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${step.iconColor} mt-2 flex-shrink-0`} />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}