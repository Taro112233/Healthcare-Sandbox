// app/not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Home, ArrowLeft, Stethoscope } from 'lucide-react';

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 pointer-events-none" />
      
      <div className="relative w-full max-w-md">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                
                {/* Icon */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2 
                  }}
                  className="flex justify-center"
                >
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400" />
                  </div>
                </motion.div>
                
                {/* Title & Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold text-foreground">
                    404 - ไม่พบหน้าที่ต้องการ
                  </h2>
                  <p className="text-muted-foreground">
                    ขออภัย หน้าที่คุณกำลังมองหาไม่มีอยู่ในระบบ
                  </p>
                </motion.div>
                
                {/* Possible Reasons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-left"
                >
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                    สาเหตุที่เป็นไปได้:
                  </h3>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                    <li>• URL ไม่ถูกต้องหรือพิมพ์ผิด</li>
                    <li>• คำขอถูกลบหรือย้ายไปแล้ว</li>
                    <li>• ลิงก์หมดอายุหรือไม่ถูกต้อง</li>
                    <li>• คุณไม่มีสิทธิ์เข้าถึงหน้านี้</li>
                  </ul>
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="space-y-3"
                >
                  <Link href="/" className="block">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
                      <Home className="w-4 h-4 mr-2" />
                      กลับไปหน้าหลัก
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    size="lg"
                    onClick={handleGoBack}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    กลับหน้าก่อนหน้า
                  </Button>
                </motion.div>
                
                {/* Help Text */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="text-sm text-muted-foreground pt-4 border-t border-border"
                >
                  <p>
                    หากคุณคิดว่านี่เป็นข้อผิดพลาด
                    <br />
                    กรุณาติดต่อผู้ดูแลระบบ
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          <p>HealthTech Sandbox - Technology Request Platform</p>
          <p className="text-xs mt-1">© 2025 - Healthcare Innovation</p>
        </motion.div>
      </div>
    </div>
  );
}