'use client';

import React, { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Activity, Sparkles, Calculator, FileText, GitBranch, Brain, Send, LayoutDashboard } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const requestTypes = [
  {
    icon: LayoutDashboard,
    title: 'เว็บเพจ',
    subtitle: 'Web Tool',
    description: 'เครื่องมือออนไลน์สำหรับแสดงข้อมูลทางการแพทย์',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Calculator,
    title: 'เครื่องคำนวณ',
    subtitle: 'Calculator',
    description: 'เครื่องคำนวณทางการแพทย์ เช่น BMI, Drug Dosing, Risk Score',
    bgColor: 'bg-blue-100 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: FileText,
    title: 'แบบฟอร์ม',
    subtitle: 'Form',
    description: 'แบบฟอร์มบันทึกข้อมูล, Checklist, Assessment Form',
    bgColor: 'bg-sky-100 dark:bg-sky-950/40',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    icon: GitBranch,
    title: 'ระบบจัดการงาน',
    subtitle: 'Workflow',
    description: 'ระบบจัดการขั้นตอนการทำงาน, Process Automation',
    bgColor: 'bg-amber-100 dark:bg-amber-950/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Brain,
    title: 'ช่วยตัดสินใจ',
    subtitle: 'Decision Aid',
    description: 'เครื่องมือช่วยตัดสินใจทางคลินิก, Clinical Decision Support',
    bgColor: 'bg-rose-100 dark:bg-rose-950/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    icon: Sparkles,
    title: 'อื่นๆ',
    subtitle: 'Other',
    description: 'เครื่องมือดิจิทัลทางการแพทย์รูปแบบอื่น ๆ',
    bgColor: 'bg-slate-100 dark:bg-slate-900/50',
    iconColor: 'text-slate-600 dark:text-slate-400',
  }
];

export function HeroSection() {
  const [, setApi] = useState<CarouselApi>();
  const laserGradient = `radial-gradient(1200px circle at 35% 50%, #10b981 0%, #059669 20%, #064e3b 45%, transparent 100%)`;

  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-white dark:bg-slate-950">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] dark:opacity-25 blur-[100px]"
        style={{ background: laserGradient }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              Technology Request Platform
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative mb-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight inline-block relative leading-[1.1]">
              <span className="text-slate-900 dark:text-white">
                HealthTech Sandbox
              </span>
              
              <span 
                className="absolute inset-0 pointer-events-none select-none text-transparent bg-clip-text z-10"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  backgroundImage: laserGradient,
                }}
              >
                HealthTech Sandbox
              </span>

              <motion.span 
                initial={{ backgroundPosition: '-150% 0' }}
                animate={{ backgroundPosition: '250% 0' }}
                transition={{ 
                  delay: 2,
                  duration: 4.0, // Slow and smooth glint
                  ease: [0.4, 0, 0.2, 1],
                  repeat: Infinity,
                  repeatDelay: 5 
                }}
                className="absolute inset-0 pointer-events-none select-none text-transparent bg-clip-text z-20"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  backgroundImage: `linear-gradient(
                    115deg, 
                    transparent 45%, 
                    rgba(255,255,255,0) 47%, 
                    rgba(255,255,255,0.8) 50%, 
                    rgba(255,255,255,0) 53%, 
                    transparent 55%
                  )`,
                  backgroundSize: '300% 100%'
                }}
              >
                HealthTech Sandbox
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            แพลตฟอร์มสำหรับบุคลากรทางการแพทย์ในการส่งคำขอพัฒนาเครื่องมือดิจิทัล 
            เพื่อเพิ่มประสิทธิภาพในการดูแลผู้ป่วยด้วยเทคโนโลยี
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/requests/new">
              <Button size="lg" className="text-lg px-10 py-7 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-600/20 dark:shadow-emerald-900/40 transition-all duration-300">
                <Send className="w-5 h-5 mr-2" />
                ส่งคำขอใหม่
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 w-full sm:w-auto border-emerald-200 dark:border-emerald-800/60 backdrop-blur-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300">
                <Activity className="w-5 h-5 mr-2" />
                ดูคำขอของฉัน
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} plugins={[autoplayRef.current]} className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-4">
                {[...requestTypes, ...requestTypes].map((type, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="border-0 shadow-soft-lg hover:shadow-xl transition-all duration-500 group h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border-t border-white/20 dark:border-white/5">
                      <CardHeader className="pb-4 text-left">
                        <CardTitle className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${type.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
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
                        <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
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