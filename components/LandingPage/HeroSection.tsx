// components/LandingPage/HeroSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Activity, Sparkles } from 'lucide-react';
import { fadeIn, staggerContainer } from './animations';

export function HeroSection() {
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
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
        </motion.div>
      </div>
    </section>
  );
}