// components/LandingPage/HeroSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Zap, Activity, Sparkles, Calculator, FileText, GitBranch, Brain } from 'lucide-react';
import { fadeIn, staggerContainer } from './animations';
import Autoplay from 'embla-carousel-autoplay';

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
  const [api, setApi] = React.useState<CarouselApi>();
  
  const autoplayRef = React.useRef(
    Autoplay({ 
      delay: 3000, // ลดเวลาลงเพื่อให้ไหลเร็วขึ้น
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    })
  );

  return (
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
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
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

          {/* Request Types Carousel */}
          <motion.div
            variants={fadeIn}
            className="mt-12"
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
                loop: true,
                skipSnaps: false, // ให้ snap แต่นุ่มนวล
                dragFree: true, // ปิด dragFree เพื่อให้ autoplay ทำงานได้ดี
                containScroll: false, // ไม่จำกัด scroll
              }}
              plugins={[autoplayRef.current]}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {/* เพิ่มจำนวน duplicate เพื่อให้ loop ไม่มีรอยต่อ */}
                {[...requestTypes, ...requestTypes, ...requestTypes].map((type, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 ${type.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <type.icon className={`w-6 h-6 ${type.iconColor}`} />
                          </div>
                          <div className="text-left">
                            <div className="text-base font-bold text-foreground">{type.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {type.subtitle}
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm text-left leading-relaxed">
                          {type.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Mobile Swipe Hint */}
            <div className="md:hidden text-center mt-4 text-sm text-muted-foreground">
              <p>← เลื่อนเพื่อดูเพิ่มเติม →</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}