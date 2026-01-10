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
    title: 'แก้ปัญหาจริง',
    description: 'ไม่สร้างเครื่องมือที่ซับซ้อนเกินไป แต่มุ่งแก้ pain point ที่เจอในหน้างานจริง',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'ปลอดภัยและโปร่งใส',
    description: 'ไม่ใช้ข้อมูลผู้ป่วยจริง ทุกเครื่องมือเป็น Sandbox สำหรับการเรียนรู้และทดลอง',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'รวดเร็วและเข้าถึงได้',
    description: 'พัฒนาเครื่องมือที่ใช้งานง่าย รองรับทุกอุปกรณ์ และไม่ต้องติดตั้งซอฟต์แวร์',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Users,
    title: 'สร้างชุมชนผู้ใช้',
    description: 'เปิดให้ทุกคนส่งคำขอ แบ่งปันปัญหา และเรียนรู้จากเครื่องมือที่สร้างขึ้น',
    color: 'from-purple-500 to-pink-500',
  },
];

export function MissionSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
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
            ภารกิจของเรา
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
              <div className="bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:border-teal-500/50">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${mission.color} p-0.5 mb-6`}>
                  <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                    <mission.icon className="w-8 h-8 text-foreground" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {mission.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mission.description}
                </p>

                {/* Hover effect - gradient border glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mission.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}