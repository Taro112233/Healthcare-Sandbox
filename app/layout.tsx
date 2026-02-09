// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppHeader } from "@/components/shared/AppHeader";
import { CookieConsent } from "@/components/CookieConsent";
import { AuthGuard } from "@/components/AuthGuard";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "NextHealTH Sandbox",
  description: "Public Health Innovation Sandbox",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        {/* ✅ CRITICAL: Inline theme script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Get saved theme and mode from localStorage
                const savedTheme = localStorage.getItem('nexthealth-theme') || 'medical';
                const savedMode = localStorage.getItem('nexthealth-mode');
                
                // Determine mode (default to light for medical apps)
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const mode = savedMode || 'light';
                
                // Apply theme immediately to prevent flash
                const fullTheme = savedTheme + '-' + mode;
                document.documentElement.setAttribute('data-theme', fullTheme);
                
                // Store mode if not already saved
                if (!savedMode) {
                  localStorage.setItem('nexthealth-mode', mode);
                }
                if (!localStorage.getItem('nexthealth-theme')) {
                  localStorage.setItem('nexthealth-theme', savedTheme);
                }
              } catch (e) {
                // Fallback to default theme if anything fails
                document.documentElement.setAttribute('data-theme', 'medical-light');
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
          <AuthGuard>
            <div className="min-h-screen bg-background">
              <AppHeader />
              <main className="relative">{children}</main>
            </div>
            <Toaster />
            <CookieConsent />
          </AuthGuard>
      </body>
    </html>
  );
}