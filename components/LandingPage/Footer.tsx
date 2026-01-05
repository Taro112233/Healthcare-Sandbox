// components/LandingPage/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-foreground text-xl">
                  HealthTech Sandbox
                </span>
                <p className="text-sm text-muted-foreground">
                  Technology Request Platform
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              แพลตฟอร์มสำหรับบุคลากรทางการแพทย์ในการส่งคำขอพัฒนาเครื่องมือดิจิทัล
              เพื่อปรับปรุงการทำงานและคุณภาพการดูแลผู้ป่วย
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Core Features</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                Real-time Comments
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                Rich Text Editor
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                File Attachments
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                Status Tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                Dark Mode Support
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Tech Stack</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Next.js 15 + React 19
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                PostgreSQL + Prisma
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                TailwindCSS v4
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Tiptap Editor
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                Arcjet Security
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              <p>© 2025 HealthTech Sandbox - Technology Request Platform</p>
              <p className="mt-1">Educational & Experimental Use Only</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Built with ❤️ for Healthcare</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}