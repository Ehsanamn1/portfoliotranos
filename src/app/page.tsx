'use client';

import { Hero } from '@/components/Hero';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <InsightsSection />
      <CTASection />
    </>
  );
}
