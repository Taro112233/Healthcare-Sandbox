// app/about/page.tsx
'use client';

import {
  HeroSection,
  FounderSection,
  MissionSection,
  VisionSection,
} from '@/components/AboutPage';

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