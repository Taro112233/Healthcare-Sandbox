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

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const processSteps = [
  {
    id: 'step-1',
    icon: Clock,
    title: 'รอตรวจสอบ',
    description: 'ทีมตรวจสอบความเป็นไปได้',
    details: [
      'ระยะเวลา: 1-3 วันทำการ',
      'ตรวจสอบความชัดเจนและประเมินความเป็นไปได้ทางเทคนิค',
      'พิจารณาลำดับความสำคัญและวางแผนทรัพยากร',
    ],
    bgColor: 'bg-amber-100 dark:bg-amber-950/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800/40',
    glowColor: 'shadow-amber-500/10 dark:shadow-amber-500/20',
    activeBorder: 'dark:border-amber-500/50',
  },
  {
    id: 'step-2',
    icon: Eye,
    title: 'อยู่ในการพิจารณา',
    description: 'วิเคราะห์ความต้องการเชิงลึก',
    details: [
      'ระยะเวลา: 3-5 วันทำการ',
      'ประชุมสรุป Pain Point และ Workflow ร่วมกับผู้ขอ',
      'ออกแบบโซลูชันและประเมินระยะเวลาส่งมอบ',
    ],
    bgColor: 'bg-sky-100 dark:bg-sky-950/40', // เปลี่ยนจาก Blue เป็น Sky เพื่อเลี่ยงความสับสน
    iconColor: 'text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-200 dark:border-sky-800/40',
    glowColor: 'shadow-sky-500/10 dark:shadow-sky-500/20',
    activeBorder: 'dark:border-sky-500/50',
  },
  {
    id: 'step-3',
    icon: Code,
    title: 'อยู่ในการพัฒนา',
    description: 'ทีมพัฒนาสร้างเครื่องมือดิจิทัล',
    details: [
      'ระยะเวลา: 1-4 สัปดาห์',
      'เขียนโค้ดและพัฒนา UI/UX ให้ตรงตามโจทย์',
      'ทดสอบภายใน (Internal QA) และปรับปรุงตามรอบ',
    ],
    bgColor: 'bg-indigo-100 dark:bg-indigo-950/40', // ปรับเป็น Indigo เพื่อให้คมชัดขึ้น
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    borderColor: 'border-indigo-200 dark:border-indigo-800/40',
    glowColor: 'shadow-indigo-500/10 dark:shadow-indigo-500/20',
    activeBorder: 'dark:border-indigo-500/50',
  },
  {
    id: 'step-4',
    icon: TestTube,
    title: 'อยู่ในการทดสอบ',
    description: 'ทดลองใช้และเก็บ Feedback',
    details: [
      'ระยะเวลา: 3-7 วัน',
      'ส่งลิงก์ Beta ให้ผู้ขอทดสอบใช้งานจริง',
      'แก้ไขข้อผิดพลาด (Bugs) และปรับปรุงประสิทธิภาพ',
    ],
    bgColor: 'bg-rose-100 dark:bg-rose-950/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
    borderColor: 'border-rose-200 dark:border-rose-800/40',
    glowColor: 'shadow-rose-500/10 dark:shadow-rose-500/20',
    activeBorder: 'dark:border-rose-500/50',
  },
  {
    id: 'step-5',
    icon: CheckCircle2,
    title: 'สำเร็จ',
    description: 'พร้อมใช้งานอย่างเป็นทางการ',
    details: [
      'ส่งมอบเครื่องมือเวอร์ชัน Production',
      'แชร์คู่มือการใช้งานและสนับสนุนหลังการส่งมอบ',
      'ติดตามผลลัพธ์การใช้งานจริง',
    ],
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800/40',
    glowColor: 'shadow-emerald-500/10 dark:shadow-emerald-500/20',
    activeBorder: 'dark:border-emerald-500/50',
  },
];

export function DevelopmentProcessSection() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [openId, setOpenId] = React.useState<string>("");

  React.useEffect(() => {
    if (openId !== "") return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 1200); // ช้าลงเพื่อให้คนอ่านทัน
    return () => clearInterval(interval);
  }, [openId]);

  const handleAccordionChange = (value: string) => {
    setOpenId(value);
    if (value !== "") {
      const index = processSteps.findIndex((step) => step.id === value);
      if (index !== -1) setActiveStep(index);
    }
  };

  return (
    <section className="py-24 px-4 bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-4xl font-black text-foreground mb-4">
            กระบวนการพัฒนา
          </motion.h2>
          <motion.p variants={fadeIn} className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            เปลี่ยนไอเดียของคุณให้เป็นเครื่องมือที่ใช้งานได้จริง ด้วยขั้นตอนที่เป็นระบบและรวดเร็ว
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <Accordion type="single" collapsible className="space-y-4" value={openId} onValueChange={handleAccordionChange}>
            {processSteps.map((step, index) => (
              <motion.div key={step.id} variants={fadeIn}>
                <AccordionItem
                  value={step.id}
                  className={`border-2 rounded-2xl overflow-hidden bg-card transition-all duration-500 ${
                    activeStep === index 
                      ? `${step.borderColor} ${step.activeBorder} ${step.glowColor} scale-[1.02] shadow-xl` 
                      : 'border-transparent opacity-70 grayscale-[0.3]'
                  }`}
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <div className="flex items-center gap-5 w-full">
                      <div className={`w-14 h-14 ${step.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        activeStep === index ? 'scale-110 shadow-inner' : 'group-hover:scale-105'
                      }`}>
                        <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight">{step.title}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{step.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 border-t border-slate-100 dark:border-white/5 pt-4">
                    <div className="pl-16">
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-muted-foreground/90">
                            <div className={`w-2 h-2 rounded-full ${step.iconColor} mt-2 flex-shrink-0`} />
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