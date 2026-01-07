// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/app/utils/auth"
import { ThemeProvider } from "@/components/theme-provider"
import { AppHeader } from "@/components/shared/AppHeader"

export const metadata: Metadata = {
  title: "HealthTech Sandbox",
  description: "Technology Request Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // บังคับให้เริ่มที่ Light Mode
          enableSystem={false} // ปิดการตรวจจับค่าจาก OS (เลือกตามความต้องการ)
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <AppHeader />
              <main className="relative">
                {children}
              </main>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}