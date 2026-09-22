import { InsightsSection } from '@/components/sections/InsightsSection';

export default function BlogPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Latest{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl">
            Thoughts, trends, and insights from our team on AI, design, 
            development, and the future of digital experiences.
          </p>
        </div>
      </div>
      <InsightsSection />
    </>
  );
}
