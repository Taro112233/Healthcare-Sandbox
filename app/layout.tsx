// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "@/components/shared/AppHeader";
import { CookieConsent } from "@/components/CookieConsent";
import { AuthGuard } from "@/components/AuthGuard"; // ✅ เพิ่มนี้

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Project NextGen",
  description:
    "Next-Generation Healthcare Innovation Sandbox",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthGuard>
            <div className="min-h-screen bg-background">
              <AppHeader />
              <main className="relative">{children}</main>
            </div>
            <Toaster />
            <CookieConsent />
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}