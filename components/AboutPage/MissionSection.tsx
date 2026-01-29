// components/AboutPage/MissionSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Target, Shield, Zap, Users } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const missions = [
  {
    icon: Target,
    title: 'แก้ปัญหาจริงที่คนทำงานเจอ',
    description: 'เหมือนร้านอาหารตามสั่ง ไม่ใช่ภัตตาคารที่มีเมนูมาให้ตั้งแต่แรก — เราถามว่าคุณต้องการอะไร แล้วเราก็ทำให้จริงๆ ไม่ใช่แค่ระบบที่ครบแต่ซับซ้อน แต่เป็นเครื่องมือที่ตอบโจทย์ผู้ใช้งานจริงๆ',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'ปลอดภัยเป็นพื้นฐาน',
    description: 'ความปลอดภัยไม่ใช่ตัวเลือก แต่เป็นพื้นฐานที่ต้องมีก่อนเสมอ — ทั้งความปลอดภัยในข้อมูล และความปลอดภัยต่อตัวผู้ใช้และผู้ป่วย เราอยากให้คุณมั่นใจและกล้าใช้สิ่งที่เราทำให้',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'รวดเร็วและเข้าถึงได้',
    description: 'เราเข้าใจว่าระบบเก่าอาจช้าหรือใช้งานยาก เพราะสมัยนั้นมันเร็วที่สุดแล้ว แต่ตอนนี้เราสามารถทำให้ดีกว่าได้ — เครื่องมือที่ดีต้อง "สั้น ง่าย ตอบโจทย์ผู้ใช้งาน"',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Users,
    title: 'สร้างชุมชนและ Case Study',
    description: 'การส่งคำขอหรือบอก pain point ของคุณจะกลายเป็น case study ให้วงการสาธารณสุข เพื่อนำไปพัฒนาระบบการทำงานแบบเดิมที่ยังเป็นปัญหาอยู่ — คุณไม่ได้แค่ได้เครื่องมือ แต่ได้ช่วยพัฒนาวงการด้วย',
    color: 'from-purple-500 to-pink-500',
  },
];

export function MissionSection() {
  return (
    <section className="py-20 px-4 bg-surface-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-content-primary mb-4">
            ภารกิจของเรา
          </h2>
          <p className="text-xl text-content-secondary max-w-3xl mx-auto">
            เปลี่ยนปัญหาในหน้างานเป็นโอกาสในการเรียนรู้และพัฒนาเครื่องมือดิจิทัล
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-card border border-border-primary rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:border-interactive-primary">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${mission.color} p-0.5 mb-6`}>
                  <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                    <mission.icon className="w-8 h-8 text-content-primary" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-content-primary mb-3">
                  {mission.title}
                </h3>
                <p className="text-content-secondary leading-relaxed">
                  {mission.description}
                </p>

                {/* Hover effect - gradient border glow */}
                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${mission.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}