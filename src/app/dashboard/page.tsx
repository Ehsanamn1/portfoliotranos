'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, FolderOpen, FileText, Mail, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'blog' | 'messages'>('overview');

  const handleLogout = () => {
    // In a real app, this would clear the session
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Dashboard
            </h1>
            <p className="mt-2 text-zinc-400">Manage your content and view analytics</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white hover:border-zinc-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-zinc-800 pb-4">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'projects', label: 'Projects', icon: FolderOpen },
            { id: 'blog', label: 'Blog Posts', icon: FileText },
            { id: 'messages', label: 'Messages', icon: Mail },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Total Projects', value: '12', change: '+2 this month' },
                { label: 'Blog Posts', value: '24', change: '+4 this month' },
                { label: 'Messages', value: '8', change: '3 unread' },
                { label: 'Page Views', value: '12.5K', change: '+15% vs last month' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-xs text-primary">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'New project added', item: 'Nebula AI', time: '2 hours ago' },
                  { action: 'Blog post published', item: 'The Future of AI in Creative Industries', time: '5 hours ago' },
                  { action: 'New contact message', item: 'From: Sarah Johnson', time: '1 day ago' },
                  { action: 'Project updated', item: 'Quantum Dashboard', time: '2 days ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-zinc-400">{activity.item}</p>
                    </div>
                    <span className="text-xs text-zinc-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Projects</h2>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Add New Project
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Nebula AI', category: 'AI/ML', status: 'Published' },
                { title: 'Quantum Dashboard', category: 'Web App', status: 'Published' },
                { title: 'Ethereal Brand', category: 'Branding', status: 'Published' },
                { title: 'Phoenix E-commerce', category: 'E-commerce', status: 'Draft' },
              ].map((project) => (
                <div key={project.title} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">{project.title}</h3>
                      <p className="text-sm text-zinc-400 mt-1">{project.category}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Published' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-zinc-800 rounded hover:bg-red-900/50 text-red-400 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'blog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Blog Posts</h2>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Write New Post
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'The Future of AI in Creative Industries', category: 'AI & Technology', status: 'Published', date: 'Dec 15, 2024' },
                { title: 'Building Scalable Design Systems', category: 'Design', status: 'Published', date: 'Dec 10, 2024' },
                { title: 'Web Performance in 2025', category: 'Development', status: 'Draft', date: 'Dec 5, 2024' },
              ].map((post) => (
                <div key={post.title} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">{post.title}</h3>
                      <p className="text-sm text-zinc-400 mt-1">{post.category} • {post.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'Published' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-zinc-800 rounded hover:bg-red-900/50 text-red-400 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', email: 'sarah@techcorp.com', company: 'TechCorp', subject: 'Enterprise Project', time: '2 hours ago', read: false },
                { name: 'Michael Chen', email: 'michael@startup.io', company: 'StartupIO', subject: 'AI Integration', time: '1 day ago', read: false },
                { name: 'Emma Williams', email: 'emma@designco.com', company: 'DesignCo', subject: 'Brand Redesign', time: '3 days ago', read: true },
              ].map((message, index) => (
                <div 
                  key={index} 
                  className={`p-6 bg-zinc-900/50 border rounded-xl ${
                    message.read ? 'border-zinc-800' : 'border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{message.name}</h3>
                        {!message.read && (
                          <span className="px-2 py-0.5 text-xs bg-primary text-white rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {message.email} {message.company && `• ${message.company}`}
                      </p>
                      <p className="text-sm font-medium mt-2">{message.subject}</p>
                    </div>
                    <span className="text-xs text-zinc-500">{message.time}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                      Reply
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                      Mark as Read
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-zinc-800 rounded hover:bg-red-900/50 text-red-400 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
