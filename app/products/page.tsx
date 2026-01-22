// app/products/page.tsx
'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // เพิ่มการ Import Link
import productsData from '@/data/products.json';
import { ArrowRight, Send, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  tags: string[];
  videoSrc: string;
  demoUrl: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProductsPage() {
  const products: Product[] = productsData.products;
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeIn} className="inline-flex mb-6">
              <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Product Showcase
              </div>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              เครื่องมือที่สร้างเสร็จแล้ว
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                และใช้งานจริง
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              เครื่องมือดิจิทัลที่พัฒนาจากคำขอของบุคลากรทางการแพทย์ 
              ช่วยประหยัดเวลาและเพิ่มประสิทธิภาพการทำงาน
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-linear-to-br from-teal-600 to-emerald-700 dark:from-teal-800 dark:to-emerald-900 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-6">
            มีไอเดียเครื่องมือใหม่?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl mb-8 text-teal-100 dark:text-teal-200"
          >
            ส่งคำขอพัฒนาเครื่องมือของคุณได้เลย
          </motion.p>

          <motion.div variants={fadeIn}>
            {/* แก้ไขจาก <a> เป็น <Link> เพื่อประสิทธิภาพการนำทางที่ดีขึ้น */}
            <Link 
              href="/requests/new"
              className="inline-flex items-center gap-2 bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              <Send className="w-5 h-5" />
              ส่งคำขอใหม่
            </Link>
          </motion.div>

          <motion.div variants={fadeIn} className="text-teal-100 dark:text-teal-200 mt-8">
            <p>
              ✨ ฟรี • 🚀 ใช้งานง่าย • 📱 รองรับทุกอุปกรณ์
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    const playVideo = () => {
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    playVideo();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {/* สำหรับลิงก์ภายนอก (Demo) ยังคงใช้ <a> พร้อม target="_blank" ได้ปกติ */}
      <a 
        href={product.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-muted mb-4 border border-border shadow-lg hover:shadow-xl transition-all duration-300">
          <video
            ref={videoRef}
            src={product.videoSrc}
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/80 transition-all duration-300" />

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-foreground flex items-center gap-2">
              ดูตัวอย่าง
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200 leading-tight">
            {product.title}
          </h2>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-wide bg-muted text-muted-foreground border border-border rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </a>
    </motion.div>
  );
}