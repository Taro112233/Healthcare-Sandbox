// components/AboutPage/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-tertiary/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center"
        >

          <motion.h1
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-content-primary mb-6 leading-tight"
          >
            About Us
          </motion.h1>

          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="text-xl text-content-secondary max-w-3xl mx-auto leading-relaxed"
          >
            เราสร้างพื้นที่ให้บุคลากรทางการแพทย์ส่งไอเดียและปัญหาที่เจอจริง
            <br />
            แล้วทดลองพัฒนาเป็นเครื่องมือดิจิทัลที่ใช้งานได้จริง
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}