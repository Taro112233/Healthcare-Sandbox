// components/AboutPage/VisionSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Target, Sparkles, Users, TrendingUp } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const highlights = [
  {
    icon: Target,
    title: 'แพลตฟอร์มแรกที่นึกถึง',
    description: 'เมื่อบุคลากรทางการแพทย์ต้องการลองพัฒนาเครื่องมือดิจิทัล',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'ฐานข้อมูลแนวทางแก้ปัญหา',
    description: 'คำขอและเครื่องมือที่พัฒนาขึ้นกลายเป็นความรู้ที่มีค่า',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'ชุมชนแห่งการแบ่งปัน',
    description: 'คนที่เจอปัญหาคล้ายกันสามารถเรียนรู้จากกันและกันได้',
    color: 'from-orange-500 to-amber-500',
  },
];

export function VisionSection() {
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
            วิสัยทัศน์
          </h2>
          <p className="text-xl text-content-secondary max-w-3xl mx-auto">
            สร้างพื้นที่ทดลองพัฒนาเครื่องมือดิจิทัลสำหรับบุคลากรทางการแพทย์
          </p>
        </motion.div>

        {/* Main Vision Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden gradient-brand-semantic rounded-2xl p-8 md:p-12 text-white">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">
                  5 ปีข้างหน้า
                </h3>
              </div>
              
              <p className="text-xl text-white/95 leading-relaxed text-center max-w-4xl mx-auto">
                เราหวังว่า NextHealTH Sandbox จะเป็นแพลตฟอร์มที่บุคลากรทางการแพทย์นึกถึง
                เมื่อต้องการลองทำเครื่องมือดิจิทัลเพื่อแก้ปัญหาในหน้างาน
                <br /><br />
                และหวังว่าคำขอที่ส่งเข้ามาจะกลายเป็นฐานข้อมูลแนวทางการแก้ปัญหาที่มีคุณค่า
                สำหรับคนอื่นๆ ที่เจอปัญหาคล้ายกัน
              </p>
            </div>
          </div>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative group"
            >
              <div className="bg-card border border-border-primary rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:border-interactive-primary hover:-translate-y-1">
                {/* Icon with gradient */}
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${item.color} p-0.5 mb-4`}>
                  <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-content-primary" />
                  </div>
                </div>

                <h4 className="text-lg font-bold text-content-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-content-secondary leading-relaxed">
                  {item.description}
                </p>

                {/* Hover gradient glow */}
                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}