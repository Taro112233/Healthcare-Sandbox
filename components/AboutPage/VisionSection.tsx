// components/AboutPage/VisionSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Globe2, Rocket, Users2, TrendingUp } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function VisionSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            วิสัยทัศน์
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            เริ่มต้นที่ไทย ขยายสู่อาเซียนและภูมิภาคเอเชีย
          </p>
        </motion.div>

        {/* Current Focus */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 dark:from-teal-700 dark:to-emerald-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  มุ่งเน้นบุคลากรทางการแพทย์ในไทย
                </h3>
                <p className="text-lg text-teal-50 leading-relaxed">
                  ตอนนี้ Project NextGen มุ่งเน้นให้บริการบุคลากรทางการแพทย์ในประเทศไทยเป็นหลัก 
                  โดยรองรับภาษาไทยอย่างเต็มที่ และเข้าใจบริบทการทำงานในระบบสุขภาพไทย
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-teal-100 mb-1">รองรับ</p>
                <p className="text-2xl font-bold">ภาษาไทย 100%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-teal-100 mb-1">เข้าใจ</p>
                <p className="text-2xl font-bold">บริบทไทย</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-teal-100 mb-1">ไม่เก็บ</p>
                <p className="text-2xl font-bold">ข้อมูลผู้ป่วย</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Future Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              ขยายสู่อาเซียน
            </h3>
            <p className="text-muted-foreground">
              เตรียมรองรับบุคลากรทางการแพทย์ในภูมิภาคอาเซียน 
              ด้วยระบบหลายภาษาและการปรับแต่งตามบริบทท้องถิ่น
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              สร้างชุมชนภูมิภาค
            </h3>
            <p className="text-muted-foreground">
              เชื่อมโยงบุคลากรทางการแพทย์ในภูมิภาคเอเชีย 
              ให้แบ่งปันความรู้และเครื่องมือที่พัฒนาขึ้น
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              เป็นแพลตฟอร์มอ้างอิง
            </h3>
            <p className="text-muted-foreground">
              สร้างมาตรฐานการพัฒนาเครื่องมือดิจิทัลสำหรับการแพทย์ 
              ที่ปลอดภัย โปร่งใส และเข้าถึงได้
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}