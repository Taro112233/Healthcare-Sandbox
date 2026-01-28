// components/LandingPage/ProductShowcaseSection.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { fadeIn, staggerContainer } from './animations';
import productsData from '@/data/products.json';

interface Product {
  id: string;
  title: string;
  description: string;
  tags: string[];
  videoSrc: string;
  demoUrl: string;
}

export function ProductShowcaseSection() {
  const products: Product[] = productsData.products;
  const featuredProducts = products.slice(0, 3);

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
            className="text-xl text-content-tertiary max-w-3xl mx-auto"
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
            className="inline-flex items-center gap-3 text-xl text-interactive-primary hover:opacity-80 transition-colors group"
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
      <a 
        href={product.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Text Content Area */}
          <div className={`space-y-6 lg:col-span-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="inline-block">
              <span className="text-interactive-primary text-sm font-semibold tracking-wider uppercase">
                {product.tags[0] || 'WEB APP'}
              </span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-interactive-primary transition-colors">
              {product.title}
            </h3>

            <p className="text-lg text-content-tertiary leading-relaxed">
              {product.description}
            </p>

            {/* Tags Display */}
            {product.tags.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.slice(1).map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-wide bg-white/5 text-content-tertiary border border-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center gap-3 text-interactive-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-lg font-semibold">ดูตัวอย่าง</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Video Showcase Area */}
          <div className={`relative lg:col-span-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative aspect-video lg:aspect-video rounded-4xl overflow-hidden bg-surface-secondary shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-glow-semantic">
              <video
                ref={videoRef}
                src={product.videoSrc}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-white/5" />
            </div>

            {/* Background Glow Effect */}
            <div className="absolute -inset-8 bg-interactive-primary/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          </div>
          
        </div>
      </a>
    </motion.div>
  );
}