// components/LandingPage/RequestTypesSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Calculator, FileText, GitBranch, Brain } from 'lucide-react';
import { fadeIn, staggerContainer } from './animations';

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

export function RequestTypesSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [isHovered, setIsHovered] = React.useState(false);

  // Auto-scroll effect
  React.useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      if (!isHovered) {
        api.scrollNext();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [api, isHovered]);

  return (
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

        {/* Carousel */}
        <div className="relative px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CarouselContent>
              {requestTypes.map((type, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                      <CardHeader className="flex-shrink-0">
                        <CardTitle className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 ${type.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <type.icon className={`w-6 h-6 ${type.iconColor}`} />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{type.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {type.subtitle}
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex items-start">
                        <p className="text-muted-foreground text-sm">
                          {type.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Mobile Navigation Hint */}
        <div className="md:hidden text-center mt-6 text-sm text-muted-foreground">
          <p>← Swipe เพื่อดูเพิ่มเติม →</p>
        </div>
      </div>
    </section>
  );
}