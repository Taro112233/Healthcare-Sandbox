// app/page.tsx
'use client';

import React from 'react';
import { HeroSection } from '@/components/LandingPage/HeroSection';
import { DevelopmentProcessSection } from '@/components/LandingPage/DevelopmentProcessSection';
import { ProductShowcaseSection } from '@/components/LandingPage/ProductShowcaseSection';
import { CTASection } from '@/components/LandingPage/CTASection';
import { Footer } from '@/components/LandingPage/Footer';
import { ManualDialog } from '@/components/LandingPage/ManualDialog';

export default function LandingPage() {
  const [showManual, setShowManual] = React.useState(false);

  return (
    <>
      <HeroSection />
      <DevelopmentProcessSection />
      <ProductShowcaseSection />
      <CTASection onManualClick={() => setShowManual(true)} />
      <Footer />
      <ManualDialog open={showManual} onOpenChange={setShowManual} />
    </>
  );
}