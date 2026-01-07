'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Activity, Sparkles, Calculator, FileText, GitBranch, Brain, Send } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const requestTypes = [
  {
    icon: Calculator,
    title: 'เครื่องคำนวณ',
    subtitle: 'Calculator',
    description: 'เครื่องคำนวณทางการแพทย์ เช่น BMI, Drug Dosing, Risk Score',
    bgColor: 'bg-violet-100 dark:bg-violet-950/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    icon: FileText,
    title: 'แบบฟอร์ม',
    subtitle: 'Form',
    description: 'แบบฟอร์มบันทึกข้อมูล, Checklist, Assessment Form',
    bgColor: 'bg-sky-100 dark:bg-sky-950/30',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    icon: GitBranch,
    title: 'ระบบจัดการงาน',
    subtitle: 'Workflow',
    description: 'ระบบจัดการขั้นตอนการทำงาน, Process Automation',
    bgColor: 'bg-amber-100 dark:bg-amber-950/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Brain,
    title: 'ช่วยตัดสินใจ',
    subtitle: 'Decision Aid',
    description: 'เครื่องมือช่วยตัดสินใจทางคลินิก, Clinical Decision Support',
    bgColor: 'bg-rose-100 dark:bg-rose-950/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
];

export function HeroSection() {
  // นำ [api, setApi] ออกเนื่องจากไม่ได้ถูกเรียกใช้งานในฟังก์ชันอื่น
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cinematic Smoothness
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  // แสงระดับ 1600px ที่อาบทั่วทั้งบริเวณ
  const laserGradient = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(1600px circle at ${x}px ${y}px, #10b981 0%, #059669 15%, #064e3b 35%, transparent 70%)`
  );

  const autoplayRef = React.useRef(
    Autoplay({ 
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section 
      className="relative overflow-hidden cursor-default py-20 md:py-32 bg-white dark:bg-slate-950" 
      onMouseMove={handleMouseMove}
    >
      {/* 1600px Background Aura */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-25 blur-[120px]"
        style={{ background: laserGradient }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeIn} className="inline-flex mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              Technology Request Platform
            </div>
          </motion.div>

          {/* Title */}
          <motion.div variants={fadeIn} className="relative mb-8">
            <h1 
              ref={textRef}
              className="text-5xl md:text-7xl font-black tracking-tight inline-block relative leading-[1.1]"
            >
              <span className="text-slate-900 dark:text-white transition-colors duration-500">
                HealthTech Sandbox
              </span>
              
              <motion.span 
                className="absolute inset-0 pointer-events-none select-none text-transparent bg-clip-text z-10"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  backgroundImage: laserGradient,
                }}
              >
                HealthTech Sandbox
              </motion.span>
              
              <motion.span 
                className="absolute inset-0 blur-[60px] -z-10 opacity-40"
                style={{ background: laserGradient }}
              />
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            แพลตฟอร์มสำหรับบุคลากรทางการแพทย์ในการส่งคำขอพัฒนาเครื่องมือดิจิทัล 
            ตั้งแต่เครื่องคำนวณยา ไปจนถึงระบบช่วยตัดสินใจทางคลินิก
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link href="/requests/new">
              <Button
                size="lg"
                className="text-lg px-10 py-7 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.03] active:scale-95"
              >
                <Send className="w-5 h-5 mr-2 fill-current" />
                ส่งคำขอใหม่
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-7 w-full sm:w-auto border-emerald-200 dark:border-emerald-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm transition-all hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              >
                <Activity className="w-5 h-5 mr-2" />
                ดูคำขอของฉัน
              </Button>
            </Link>
          </motion.div>

          {/* Request Types Carousel */}
          <motion.div variants={fadeIn}>
            <Carousel
              opts={{ align: 'start', loop: true }}
              plugins={[autoplayRef.current]}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-4">
                {[...requestTypes, ...requestTypes].map((type, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-4 text-left">
                          <div className={`w-12 h-12 ${type.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                            <type.icon className={`w-6 h-6 ${type.iconColor}`} />
                          </div>
                          <div>
                            <div className="text-base font-bold">{type.title}</div>
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-black opacity-60">
                              {type.subtitle}
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 text-left">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {type.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}