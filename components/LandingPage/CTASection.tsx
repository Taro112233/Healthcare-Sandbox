// components/LandingPage/CTASection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Send } from 'lucide-react';
import { fadeIn, staggerContainer } from './animations';

interface CTASectionProps {
  onManualClick: () => void;
}

export function CTASection({ onManualClick }: CTASectionProps) {
  return (
    <section className="py-20 px-4 gradient-brand-semantic text-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-6">
          พร้อมที่จะเริ่มต้นแล้วหรือยัง?
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="text-xl mb-8 text-white/90"
        >
          เริ่มส่งคำขอพัฒนาเครื่องมือดิจิทัลของคุณได้เลยวันนี้
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Link href="/requests/new">
            <Button
              size="lg"
              className="text-lg px-8 py-6 w-full sm:w-auto bg-white text-interactive-primary hover:bg-surface-tertiary transition-colors"
            >
              <Send className="w-5 h-5 mr-2" />
              ส่งคำขอใหม่
            </Button>
          </Link>

          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 w-full sm:w-auto"
            onClick={onManualClick}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            อ่านคู่มือ
          </Button>
        </motion.div>

        <motion.div variants={fadeIn} className="text-white/90">
          <p>
            ✨ ระบบพร้อมใช้งานทันที • 🔒 ปลอดภัยด้วย Arcjet Security • 📱
            รองรับทุกอุปกรณ์
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}