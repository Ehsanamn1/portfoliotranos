import { AboutSection } from '@/components/sections/AboutSection';

export default function AboutPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            About{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Tranos
            </span>
          </h1>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl">
            We are a team of passionate engineers, designers, and innovators 
            dedicated to shaping the future of digital experiences.
          </p>
        </div>
      </div>
      <AboutSection />
      
      {/* Team Section */}
      <section className="py-24 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm uppercase tracking-widest">Our Team</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter">
              Meet the Minds Behind Tranos
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Alex Tran', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { name: 'Sarah Chen', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              { name: 'Marcus Johnson', role: 'Lead Engineer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
              { name: 'Elena Rodriguez', role: 'AI Research Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
            ].map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-900 mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="mt-2 text-zinc-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
