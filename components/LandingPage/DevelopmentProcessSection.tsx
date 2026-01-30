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
import { cn } from '@/lib/utils';

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
      'ตรวจสอบความชัดเจนและประเมินความเป็นไปได้ทางเทคนิค',
      'พิจารณาลำดับความสำคัญและวางแผนทรัพยากร',
      'ระยะเวลา: 1-3 วันทำการ',
    ],
    bgColor: 'bg-alert-warning-bg/80',
    iconBgColor: 'bg-alert-warning-bg',
    iconColor: 'text-alert-warning-icon',
    ringColor: 'ring-alert-warning-border/50',
    activeRing: 'ring-alert-warning-border',
    hoverBg: 'hover:bg-alert-warning-bg/60',
  },
  {
    id: 'step-2',
    icon: Eye,
    title: 'อยู่ในการพิจารณา',
    description: 'วิเคราะห์ความต้องการเชิงลึก',
    details: [
      'ประชุมสรุป Pain Point และ Workflow ร่วมกับผู้ขอ',
      'ออกแบบโซลูชันและประเมินระยะเวลาส่งมอบ',
      'ระยะเวลา: 3-5 วันทำการ',
    ],
    bgColor: 'bg-alert-info-bg/80',
    iconBgColor: 'bg-alert-info-bg',
    iconColor: 'text-alert-info-icon',
    ringColor: 'ring-alert-info-border/50',
    activeRing: 'ring-alert-info-border',
    hoverBg: 'hover:bg-alert-info-bg/60',
  },
  {
    id: 'step-3',
    icon: Code,
    title: 'อยู่ในการพัฒนา',
    description: 'ทีมพัฒนาสร้างเครื่องมือดิจิทัล',
    details: [
      'พัฒนา UI/UX ให้ตรงตามความต้องการ',
      'เขียนโค้ดและฟังก์ชันการทำงานต่างๆ',
      'ระยะเวลา: 1-4 สัปดาห์',
    ],
    bgColor: 'bg-interactive-primary/10',
    iconBgColor: 'bg-interactive-primary/20',
    iconColor: 'text-interactive-primary',
    ringColor: 'ring-interactive-primary/40',
    activeRing: 'ring-interactive-primary',
    hoverBg: 'hover:bg-interactive-primary/15',
  },
  {
    id: 'step-4',
    icon: TestTube,
    title: 'อยู่ในการทดสอบ',
    description: 'ทดลองใช้และเก็บ Feedback',
    details: [
      'ทดสอบความปลอดภัยและความถูกต้องของเครื่องมือ',
      'แก้ไขข้อผิดพลาด (Bugs) และปรับปรุงประสิทธิภาพ',
      'ระยะเวลา: 3-7 วัน',
    ],
    bgColor: 'bg-alert-error-bg/80',
    iconBgColor: 'bg-alert-error-bg',
    iconColor: 'text-alert-error-icon',
    ringColor: 'ring-alert-error-border/50',
    activeRing: 'ring-alert-error-border',
    hoverBg: 'hover:bg-alert-error-bg/60',
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
    bgColor: 'bg-alert-success-bg/80',
    iconBgColor: 'bg-alert-success-bg',
    iconColor: 'text-alert-success-icon',
    ringColor: 'ring-alert-success-border/50',
    activeRing: 'ring-alert-success-border',
    hoverBg: 'hover:bg-alert-success-bg/60',
  },
];

export function DevelopmentProcessSection() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [openId, setOpenId] = React.useState<string>("");

  React.useEffect(() => {
    if (openId !== "") return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 1200);
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
    <section className="py-24 px-4 bg-surface-primary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-4xl font-black text-content-primary mb-4">
            ขั้นตอนหลังจากส่งคำขอ
          </motion.h2>
          <motion.p variants={fadeIn} className="text-content-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            คำขอของคุณจะถูกตรวจสอบ วิเคราะห์ และพัฒนาอย่างเป็นระบบ
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <Accordion type="single" collapsible className="space-y-4" value={openId} onValueChange={handleAccordionChange}>
            {processSteps.map((step, index) => (
              <motion.div key={step.id} variants={fadeIn}>
                <AccordionItem
                  value={step.id}
                  className={cn(
                    "ring-[3px] rounded-2xl overflow-hidden transition-all duration-500",
                    step.bgColor,
                    activeStep === index 
                      ? `${step.activeRing} shadow-elevation-3 scale-[1.02]` 
                      : `${step.ringColor} opacity-70`,
                    step.hoverBg
                  )}
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <div className="flex items-center gap-5 w-full">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500",
                        step.iconBgColor,
                        activeStep === index ? 'scale-110 shadow-inner' : 'group-hover:scale-105'
                      )}>
                        <step.icon className={cn("w-7 h-7", step.iconColor)} />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold text-content-primary mb-1 tracking-tight">{step.title}</h3>
                        <p className="text-sm text-content-secondary font-medium">{step.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 border-t border-border-secondary pt-4">
                    <div className="pl-16">
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-content-secondary">
                            <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0", step.iconColor)} />
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