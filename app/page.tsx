// app/page.tsx
'use client';

import React from 'react';
import { AppHeader } from '@/components/shared/AppHeader';
import { HeroSection } from '@/components/LandingPage/HeroSection';
import { RequestTypesSection } from '@/components/LandingPage/RequestTypesSection';
import { DevelopmentProcessSection } from '@/components/LandingPage/DevelopmentProcessSection';
import { ProductShowcaseSection } from '@/components/LandingPage/ProductShowcaseSection';
import { CTASection } from '@/components/LandingPage/CTASection';
import { Footer } from '@/components/LandingPage/Footer';
import { ManualDialog } from '@/components/LandingPage/ManualDialog';

export default function LandingPage() {
  const [showManual, setShowManual] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <HeroSection />
      <RequestTypesSection />
      <DevelopmentProcessSection />
      <ProductShowcaseSection />
      <CTASection onManualClick={() => setShowManual(true)} />
      <Footer />
      <ManualDialog open={showManual} onOpenChange={setShowManual} />
    </div>
  );
}