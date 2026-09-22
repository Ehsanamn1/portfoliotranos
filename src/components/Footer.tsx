import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/tranosstudio', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/tranosstudio', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/tranosstudio', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/tranosstudio', label: 'GitHub' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter inline-block">
              <span className="text-white">TRANOS</span>
              <span className="text-primary">.</span>
            </Link>
            <p className="mt-4 text-zinc-400 max-w-sm">
              Premium AI and digital creative studio crafting extraordinary experiences 
              at the intersection of art, technology, and innovation.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
              <a
                href="mailto:hello@tranos.studio"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-primary transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Work', href: '/work' },
                { label: 'Services', href: '/services' },
                { label: 'About', href: '/about' },
                { label: 'Insights', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                'AI Integration',
                'Digital Design',
                'Development',
                'Product Strategy',
                'Brand Identity',
              ].map((service) => (
                <li key={service}>
                  <span className="text-zinc-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {currentYear} Tranos Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
