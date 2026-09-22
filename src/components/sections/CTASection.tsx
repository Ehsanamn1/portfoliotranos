'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px]" />
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary text-sm uppercase tracking-widest">Get in Touch</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter">
            Ready to Build Something{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Extraordinary
            </span>
            ?
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Let's discuss your project and explore how we can help bring your vision to life 
            with cutting-edge technology and design.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white font-medium rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              Start Your Project
            </a>
            <a
              href="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-zinc-700 text-zinc-300 font-medium rounded-full hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
