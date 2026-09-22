'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Nebula AI',
    description: 'AI-powered creative suite for digital artists',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    category: 'AI/ML',
    technologies: ['React', 'Python', 'TensorFlow'],
  },
  {
    id: '2',
    title: 'Quantum Dashboard',
    description: 'Real-time analytics platform for enterprise',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'Web App',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    id: '3',
    title: 'Ethereal Brand',
    description: 'Complete brand identity and digital presence',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    category: 'Branding',
    technologies: ['Figma', 'Blender', 'After Effects'],
  },
  {
    id: '4',
    title: 'Phoenix E-commerce',
    description: 'Luxury fashion e-commerce experience',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    category: 'E-commerce',
    technologies: ['Shopify', 'React', 'Three.js'],
  },
];

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
  showAll?: boolean;
}

export function ProjectsSection({
  title = "Selected Work",
  subtitle = "Crafting digital experiences that push boundaries",
  projects = sampleProjects,
  showAll = false,
}: ProjectsSectionProps) {
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

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
          <span className="text-primary text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter">
            {title}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl">{subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <span className="text-primary text-sm uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-primary text-sm uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-zinc-400 text-sm">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-zinc-900 text-zinc-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <a
              href="/work"
              className="inline-flex items-center px-8 py-4 border border-zinc-700 text-zinc-300 font-medium rounded-full hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
            >
              View All Projects
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
