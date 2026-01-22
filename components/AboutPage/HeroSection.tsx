// components/AboutPage/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div 
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="inline-flex mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              About Us
            </div>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            เปลี่ยน Pain Point
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
              เป็นเครื่องมือดิจิทัล
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            แพลตฟอร์ม Sandbox สำหรับรับและพัฒนาเครื่องมือดิจิทัลจากคำขอของบุคลากรทางการแพทย์
            <br />
            ไม่ใช้ข้อมูลผู้ป่วยจริง • เน้น Educational & Experimental
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}