'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm uppercase tracking-widest">About Us</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter">
              Pioneering the Future of Digital Innovation
            </h2>
            <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
              Tranos Studio is a premium digital creative studio at the intersection of art, 
              technology, and artificial intelligence. We partner with visionary brands to 
              create experiences that define tomorrow.
            </p>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Founded by a team of engineers, designers, and AI researchers, we bring together 
              diverse expertise to solve complex challenges. Our approach combines cutting-edge 
              technology with timeless design principles.
            </p>
            
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { value: '50+', label: 'Projects' },
                { value: '30+', label: 'Clients' },
                { value: '5+', label: 'Years' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="mt-10 inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Work With Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Tranos Studio Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-8 -left-8 p-6 bg-zinc-900/90 backdrop-blur-sm rounded-xl border border-zinc-800 max-w-xs"
            >
              <p className="text-sm text-zinc-300 italic">
                "Tranos transformed our vision into reality. Their attention to detail and technical excellence is unmatched."
              </p>
              <p className="mt-4 text-sm font-medium text-primary">— CEO, Tech Startup</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
