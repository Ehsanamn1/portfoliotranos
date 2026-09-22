import { Hero } from '@/components/Hero';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export default function WorkPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Selected{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Work
            </span>
          </h1>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl">
            A curated collection of projects that showcase our expertise in AI, 
            design, and development.
          </p>
        </div>
      </div>
      <ProjectsSection showAll />
    </>
  );
}
