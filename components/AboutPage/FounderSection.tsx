// components/AboutPage/FounderSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FounderSection() {
  return (
    <section className="py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Left: Image - ✅ ปรับ responsive และ max-width */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="relative w-full max-w-md mx-auto md:max-w-none"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-surface-tertiary w-full">
              <Image
                src="/images/thanatouch-picture.jpg"
                alt="ธนธัช ธำรงโสตถิสกุล"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </div>
            
            {/* Decorative Element - ✅ ซ่อนใน mobile ถ้าจำเป็น */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-interactive-primary rounded-full blur-3xl opacity-20" />
          </motion.div>

          {/* Right: Content - ✅ เพิ่ม min-w-0 เพื่อป้องกัน overflow */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="space-y-4 md:space-y-6 min-w-0"
          >
            <div className="min-w-0">
              <h2 className="text-3xl sm:text-4xl font-bold text-content-primary mb-2 wrap-break-word">
                นสภ.ธนธัช ธำรงโสตถิสกุล
              </h2>
              <p className="text-lg sm:text-xl text-interactive-primary font-medium wrap-break-word">
                Founder & Developer
              </p>
            </div>

            <div className="relative min-w-0">
              <blockquote className="text-sm sm:text-base md:text-lg text-content-secondary leading-relaxed pl-4 md:pl-6 border-l-4 border-interactive-primary wrap-break-word">
                &ldquo;ผมเชื่อว่าการมีระบบที่ดีหรือเทคโนโลยีที่ช่วยอำนวยความสะดวกให้กับคนทำงานในสายงานนี้ 
                จะช่วยให้เขาได้มีเวลาพักผ่อนที่เพิ่มขึ้น และทำให้มีประสิทธิภาพในการดูแลผู้ป่วยที่มากขึ้น
                <br /><br />
                NextHealTH Sandbox คือพื้นที่ที่ให้โอกาสได้เริ่มไอเดียหรือแนวคิดใหม่ๆ 
                โดยเริ่มจากทำให้มันเกิดขึ้นจริงก่อนเป็นอันดับแรก ไม่สนว่ามันจะเวิร์กมั้ย 
                ถ้ามีคนต้องการมัน เราก็จะทำให้เต็มที่&rdquo;
              </blockquote>
            </div>

            <div className="space-y-3 md:space-y-4 pt-2 md:pt-4 min-w-0">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-interactive-primary mt-2 shrink-0" />
                <p className="text-sm sm:text-base text-content-secondary min-w-0 wrap-break-word">
                  <strong className="text-content-primary">Pharmacy Student & Full-Stack Developer</strong> — 
                  เชื่อมโยงความรู้ทางการแพทย์กับเทคโนโลยีเพื่อพัฒนาระบบสาธารณสุขให้ดีขึ้น
                </p>
              </div>
              
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-interactive-primary mt-2 shrink-0" />
                <p className="text-sm sm:text-base text-content-secondary min-w-0 wrap-break-word">
                  <strong className="text-content-primary">Healthcare Systems Builder</strong> — 
                  ฝึกงานในโรงพยาบาลหลายแห่งตลอด 1 ปี เห็นปัญหาจริงที่สามารถแก้ได้ด้วยเทคโนโลยี
                </p>
              </div>
              
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-interactive-primary mt-2 shrink-0" />
                <p className="text-sm sm:text-base text-content-secondary min-w-0 wrap-break-word">
                  <strong className="text-content-primary">Problem Solver</strong> — 
                  สร้างแพลตฟอร์มให้ทุกโรงพยาบาลเข้าถึงโอกาสในการพัฒนาเครื่องมือดิจิทัล
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}