'use client';

import { motion } from 'framer-motion';
import { Brain, Palette, Code, Rocket, Shield, Zap } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Custom AI solutions that automate workflows and enhance user experiences with machine learning.',
    features: ['Custom ML Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
  },
  {
    icon: Palette,
    title: 'Digital Design',
    description: 'Premium visual identities and digital experiences that captivate and convert.',
    features: ['Brand Identity', 'UI/UX Design', 'Motion Graphics', '3D Visualization'],
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Full-stack engineering with modern technologies for scalable, performant applications.',
    features: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Infrastructure'],
  },
  {
    icon: Rocket,
    title: 'Product Strategy',
    description: 'End-to-end product development from concept to launch and beyond.',
    features: ['Product Discovery', 'MVP Development', 'Growth Strategy', 'Analytics & Optimization'],
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security implementations and compliance frameworks.',
    features: ['Security Audits', 'Data Protection', 'Compliance (GDPR, SOC2)', 'Penetration Testing'],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed and efficiency improvements for existing digital products.',
    features: ['Core Web Vitals', 'SEO Optimization', 'Conversion Rate Optimization', 'A/B Testing'],
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest">Services</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter">
            What We Do
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Comprehensive digital solutions tailored to your unique challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <ul className="mt-6 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 mr-3 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
