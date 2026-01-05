// components/LandingPage/ProductShowcaseSection.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { fadeIn, staggerContainer } from './animations';

interface Product {
  id: string;
  title: string;
  category: string;
  videoSrc: string;
  demoUrl: string;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    title: 'CHA₂DS₂-VASc Score',
    category: 'เครื่องคำนวณ',
    videoSrc: '/products/video1.mp4',
    demoUrl: '/products/cha2ds2-vasc',
  },
  {
    id: '2',
    title: 'BMI Calculator',
    category: 'เครื่องคำนวณ',
    videoSrc: '/products/video2.mp4',
    demoUrl: '/products/bmi-calculator',
  },
  {
    id: '3',
    title: 'Drug Dosing',
    category: 'เครื่องคำนวณ',
    videoSrc: '/products/video3.mp4',
    demoUrl: '/products/drug-dosing',
  },
];

export function ProductShowcaseSection() {
  return (
    <section className="py-24 px-4 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-24"
        >
          <motion.h2
            variants={fadeIn}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            เครื่องมือที่สร้างแล้ว
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            พัฒนาจากคำขอจริง ใช้งานได้จริง
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <div className="space-y-32">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mt-32"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 text-xl text-teal-400 hover:text-teal-300 transition-colors group"
          >
            ดูเครื่องมือทั้งหมด
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // เช็คลำดับเพื่อสลับฝั่ง (Even: Text ซ้าย Video ขวา | Odd: Video ซ้าย Text ขวา)
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <Link href={product.demoUrl} className="group block">
        {/* ใช้ lg:grid-cols-12 เพื่อแบ่งสัดส่วนที่ละเอียดขึ้น
            - ฝั่ง Text ใช้ 4/12 ส่วน (สัดส่วน 1)
            - ฝั่ง Video ใช้ 8/12 ส่วน (สัดส่วน 2)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Text Content Area (1 Part) */}
          <div className={`space-y-6 lg:col-span-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="inline-block">
              <span className="text-teal-400 text-sm font-semibold tracking-wider uppercase">
                {product.category}
              </span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-teal-400 transition-colors">
              {product.title}
            </h3>

            <div className="flex items-center gap-3 text-teal-400 group-hover:gap-5 transition-all">
              <span className="text-lg font-semibold">ดูตัวอย่าง</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Video Showcase Area (2 Parts) */}
          <div className={`relative lg:col-span-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative aspect-video lg:aspect-[16/9] rounded-[2rem] overflow-hidden bg-gray-900 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-teal-500/10">
              <video
                ref={videoRef}
                src={product.videoSrc}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Overlay ไล่เฉดสีให้ดูพรีเมียม */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5" />
            </div>

            {/* Background Glow Effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-teal-500/5 to-emerald-500/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          </div>
          
        </div>
      </Link>
    </motion.div>
  );
}