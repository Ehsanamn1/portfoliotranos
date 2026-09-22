import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';

export default function ServicesPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Our{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl">
            Comprehensive digital solutions tailored to your unique challenges, 
            from AI integration to full-stack development.
          </p>
        </div>
      </div>
      <ServicesSection />
      <ProcessSection />
    </>
  );
}
