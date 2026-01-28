// components/LandingPage/HeroSection.tsx
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
import { Sparkles, Calculator, FileText, GitBranch, Brain, Send, LayoutDashboard, List } from 'lucide-react';
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
    bgColor: 'bg-alert-success-bg',
    iconColor: 'text-alert-success-icon',
  },
  {
    icon: Calculator,
    title: 'เครื่องคำนวณ',
    subtitle: 'Calculator',
    description: 'เครื่องคำนวณทางการแพทย์ เช่น BMI, Drug Dosing, Risk Score',
    bgColor: 'bg-alert-info-bg',
    iconColor: 'text-alert-info-icon',
  },
  {
    icon: FileText,
    title: 'แบบฟอร์ม',
    subtitle: 'Form',
    description: 'แบบฟอร์มบันทึกข้อมูล, Checklist, Assessment Form',
    bgColor: 'bg-surface-tertiary',
    iconColor: 'text-interactive-primary',
  },
  {
    icon: GitBranch,
    title: 'ระบบจัดการงาน',
    subtitle: 'Workflow',
    description: 'ระบบจัดการขั้นตอนการทำงาน, Process Automation',
    bgColor: 'bg-alert-warning-bg',
    iconColor: 'text-alert-warning-icon',
  },
  {
    icon: Brain,
    title: 'ช่วยตัดสินใจ',
    subtitle: 'Decision Aid',
    description: 'เครื่องมือช่วยตัดสินใจทางคลินิก, Clinical Decision Support',
    bgColor: 'bg-alert-error-bg',
    iconColor: 'text-alert-error-icon',
  },
  {
    icon: Sparkles,
    title: 'อื่นๆ',
    subtitle: 'Other',
    description: 'เครื่องมือดิจิทัลทางการแพทย์รูปแบบอื่น ๆ',
    bgColor: 'bg-surface-secondary',
    iconColor: 'text-content-tertiary',
  }
];

export function HeroSection() {
  const [, setApi] = useState<CarouselApi>();

  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-surface-primary">
      {/* Dynamic gradient background that adapts to theme */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] blur-[100px]"
        style={{ 
          background: `radial-gradient(1200px circle at 35% 50%, var(--color-brand-primary) 0%, var(--color-brand-secondary) 20%, var(--color-brand-tertiary) 45%, transparent 100%)`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex mb-8">
            <div className="inline-flex items-center gap-2 bg-interactive-primary/10 text-interactive-primary px-4 py-2 rounded-full text-sm font-bold border border-interactive-primary/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              Public Health Innovation Sandbox
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative mb-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight inline-block relative leading-[1.1]">
              <span className="text-content-primary">
                NextHealTH Sandbox
              </span>
              
              {/* Dynamic gradient overlay that adapts to theme */}
              <span 
                className="absolute inset-0 pointer-events-none select-none text-transparent bg-clip-text z-10"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  backgroundImage: `radial-gradient(1200px circle at 35% 50%, var(--color-brand-primary) 0%, var(--color-brand-secondary) 20%, var(--color-brand-tertiary) 45%, transparent 100%)`,
                }}
              >
                NextHealTH Sandbox
              </span>

              {/* Sharp Glint Effect */}
              <motion.span 
                initial={{ backgroundPosition: '-20% 0' }}
                animate={{ backgroundPosition: '120% 0' }}
                transition={{ 
                  delay: 2,
                  duration: 2,
                  ease: [0.4, 0, 0.2, 1],
                  repeat: Infinity,
                  repeatDelay: 10
                }}
                className="absolute inset-0 pointer-events-none select-none text-transparent bg-clip-text z-20"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  backgroundImage: `linear-gradient(
                    115deg, 
                    transparent 0%, 
                    transparent 40%, 
                    rgba(255,255,255,0) 45%, 
                    rgba(255,255,255,0.9) 50%, 
                    rgba(255,255,255,0) 55%, 
                    transparent 60%,
                    transparent 100%
                  )`,
                  backgroundSize: '300% 100%',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                NextHealTH Sandbox
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-content-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            แพลตฟอร์มสำหรับทดลองแนวคิดและนวัตกรรมด้านสาธารณสุข 
            <br />
            จาก pain point หน้างานสู่ digital solution
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/requests/new">
              <Button size="lg" className="text-lg px-10 py-7 w-full sm:w-auto gradient-brand-semantic hover:opacity-90 shadow-xl shadow-glow-semantic transition-all duration-300">
                <Send className="w-5 h-5 mr-2" />
                ส่งคำขอใหม่
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 w-full sm:w-auto border-border-primary backdrop-blur-sm hover:bg-surface-interactive transition-all duration-300">
                <List className="w-5 h-5 mr-2" />
                ดูคำขอของฉัน
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} plugins={[autoplayRef.current]} className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-4">
                {[...requestTypes, ...requestTypes].map((type, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="border-0 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-500 group h-full bg-card backdrop-blur-xl border-t border-border-subtle">
                      <CardHeader className="pb-4 text-left">
                        <CardTitle className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${type.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                            <type.icon className={`w-6 h-6 ${type.iconColor}`} />
                          </div>
                          <div>
                            <div className="text-base font-bold">{type.title}</div>
                            <div className="text-[10px] uppercase tracking-widest text-content-tertiary font-black opacity-60">
                              {type.subtitle}
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 text-left">
                        <p className="text-content-secondary text-sm leading-relaxed">{type.description}</p>
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