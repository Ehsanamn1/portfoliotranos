'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your vision, goals, and challenges to craft a tailored strategy.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Developing a comprehensive roadmap that aligns technology with business objectives.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Creating stunning visuals and intuitive experiences that captivate users.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Building robust, scalable solutions with cutting-edge technologies.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Deploying with precision and providing ongoing support for success.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest">Process</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter">
            How We Work
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            A proven methodology that delivers exceptional results.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 text-center lg:text-left">
                  <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-zinc-400">{step.description}</p>
                </div>

                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
