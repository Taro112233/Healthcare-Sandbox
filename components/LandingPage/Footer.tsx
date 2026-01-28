// components/LandingPage/Footer.tsx
'use client';

import React from 'react';
import { Stethoscope, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border-primary py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
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
          </div>

          <div>
            <h4 className="font-semibold text-content-primary mb-4">Core Features</h4>
            <ul className="space-y-3 text-sm text-content-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-alert-success-icon" />
                Real-time Comments
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-alert-success-icon" />
                Rich Text Editor
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-alert-success-icon" />
                File Attachments
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-alert-success-icon" />
                Status Tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-alert-success-icon" />
                Dark Mode Support
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-content-primary mb-4">Tech Stack</h4>
            <ul className="space-y-3 text-sm text-content-secondary">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-alert-info-icon rounded-full" />
                Next.js 15 + React 19
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-alert-success-icon rounded-full" />
                PostgreSQL + Prisma
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-interactive-primary rounded-full" />
                TailwindCSS v4
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-alert-warning-icon rounded-full" />
                Tiptap Editor
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-alert-error-icon rounded-full" />
                Arcjet Security
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-primary pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-content-secondary mb-4 md:mb-0">
              <p>© 2025 NextHealTH Sandbox - Public Health Innovation Sandbox</p>
              <p className="mt-1">Educational & Experimental Use Only</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-content-secondary">
              <span>Built with ❤️ for Healthcare</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-alert-success-icon rounded-full animate-pulse" />
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}