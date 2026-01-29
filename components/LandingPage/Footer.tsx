// components/LandingPage/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, Shield, HelpCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border-primary py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gradient-brand-semantic rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-content-primary text-xl">
                  NextHealTH Sandbox
                </span>
                <p className="text-sm text-content-secondary">
                  Public Health Innovation Sandbox
                </p>
              </div>
            </div>
            <p className="text-content-secondary mb-4 max-w-md">
              แพลตฟอร์มสำหรับบุคลากรทางการแพทย์ในการส่งคำขอพัฒนาเครื่องมือดิจิทัล
              เพื่อปรับปรุงการทำงานและคุณภาพการดูแลผู้ป่วย
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-alert-success-icon rounded-full animate-pulse" />
              <span className="text-content-secondary">ระบบพร้อมใช้งาน</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-content-primary mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              ลิงก์ด่วน
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-content-secondary hover:text-interactive-primary transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-content-secondary hover:text-interactive-primary transition-colors">
                  ผลงานที่พัฒนา
                </Link>
              </li>
              <li>
                <Link href="/request-policy" className="text-content-secondary hover:text-interactive-primary transition-colors">
                  นโยบายการส่งคำขอ
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-content-secondary hover:text-interactive-primary transition-colors">
                  คำขอของฉัน
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-content-primary mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              นโยบายและข้อกำหนด
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms-of-service" className="text-content-secondary hover:text-interactive-primary transition-colors">
                  เงื่อนไขการใช้บริการ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-content-secondary hover:text-interactive-primary transition-colors">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link href="/request-policy" className="text-content-secondary hover:text-interactive-primary transition-colors">
                  แนวทางการส่งคำขอ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border-primary pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-content-secondary text-center md:text-left">
              <p>© 2025 NextHealTH Sandbox - Public Health Innovation Sandbox</p>
            </div>
            <div className="text-sm text-content-secondary">
              Built with ❤️ for Healthcare Professionals
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}