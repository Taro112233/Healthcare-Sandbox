// components/AboutPage/FounderSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FounderSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Image */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-surface-tertiary">
              <Image
                src="/images/thanatouch-picture.jpg"
                alt="ธนธัช ธำรงโสตถิสกุล"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-interactive-primary rounded-full blur-3xl opacity-20" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl font-bold text-content-primary mb-2">
                นสภ.ธนธัช ธำรงโสตถิสกุล
              </h2>
              <p className="text-xl text-interactive-primary font-medium">
                Founder & Developer
              </p>
            </div>

            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-interactive-primary/20" />
              <blockquote className="text-lg text-content-secondary leading-relaxed pl-6 border-l-4 border-interactive-primary">
                &ldquo;ผมเชื่อว่าเทคโนโลยีควรช่วยแก้ปัญหาจริงในหน้างาน ไม่ใช่สร้างภาระเพิ่ม 
                NextHealTH Sandbox เกิดจากประสบการณ์การทำงานเป็นเภสัชกร และเห็นปัญหาที่ต้องแก้ด้วยมือทุกวัน&rdquo;
              </blockquote>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-interactive-primary mt-2 shrink-0" />
                <p className="text-content-secondary">
                  <strong className="text-content-primary">Pharmacist & Full-Stack Developer</strong> — 
                  เชื่อมโยงความรู้ทางการแพทย์กับเทคโนโลยี
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-interactive-primary mt-2 shrink-0" />
                <p className="text-content-secondary">
                  <strong className="text-content-primary">Healthcare Systems Builder</strong> — 
                  พัฒนาระบบโรงพยาบาลและเครื่องมือดิจิทัลที่ใช้งานจริง
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-interactive-primary mt-2 shrink-0" />
                <p className="text-content-secondary">
                  <strong className="text-content-primary">Problem Solver</strong> — 
                  มุ่งเน้นแก้ pain point จริงด้วยเทคโนโลยีที่เข้าถึงได้
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}