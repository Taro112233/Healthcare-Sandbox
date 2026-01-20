// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "@/components/shared/AppHeader";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Project NextGen",
  description:
    "Next-Generation Healthcare Innovation Sandbox - แพลตฟอร์มรับคำขอพัฒนาเครื่องมือดิจิทัลทางการแพทย์",
  keywords: "healthcare, technology, digital health, medical tools, sandbox",
  authors: [{ name: "HLAB Consulting" }],
  openGraph: {
    title: "Project NextGen",
    description: "Next-Generation Healthcare Innovation Sandbox",
    type: "website",
  },
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
          <div className="min-h-screen bg-background">
            <AppHeader />
            <main className="relative">{children}</main>
          </div>
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}