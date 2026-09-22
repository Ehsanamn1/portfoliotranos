'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

const sampleInsights: Insight[] = [
  {
    id: '1',
    title: 'The Future of AI in Creative Industries',
    excerpt: 'Exploring how artificial intelligence is reshaping design, art, and creative workflows.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    category: 'AI & Technology',
    date: 'Dec 15, 2024',
  },
  {
    id: '2',
    title: 'Building Scalable Design Systems',
    excerpt: 'A comprehensive guide to creating design systems that grow with your product.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80',
    category: 'Design',
    date: 'Dec 10, 2024',
  },
  {
    id: '3',
    title: 'Web Performance in 2025',
    excerpt: 'Key strategies for optimizing web applications in the age of AI-powered experiences.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'Development',
    date: 'Dec 5, 2024',
  },
];

export function InsightsSection() {
  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-primary text-sm uppercase tracking-widest">Insights</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter">
              Latest Thinking
            </h2>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center text-primary hover:text-secondary transition-colors group"
          >
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleInsights.map((insight, index) => (
            <motion.article
              key={insight.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-xs text-primary uppercase tracking-wider">
                  {insight.category}
                </div>
              </div>
              
              <div className="mt-6">
                <time className="text-sm text-zinc-500">{insight.date}</time>
                <h3 className="mt-2 text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                <p className="mt-3 text-zinc-400 text-sm line-clamp-3">
                  {insight.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
