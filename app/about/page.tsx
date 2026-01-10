// app/about/page.tsx
'use client';

import { HeroSection } from '@/components/AboutPage/HeroSection';
import { FounderSection } from '@/components/AboutPage/FounderSection';
import { MissionSection } from '@/components/AboutPage/MissionSection';
import { VisionSection } from '@/components/AboutPage/VisionSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FounderSection />
      <MissionSection />
      <VisionSection />
    </div>
  );
}