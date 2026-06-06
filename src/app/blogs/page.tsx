'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import TwoToneHeading from '@/components/TwoToneHeading';
import AnimatedCard from '@/components/AnimatedCard';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  created_at: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Study Tips', 'Language Learning', 'Visa Guide', 'Student Life', 'General'];

  useEffect(() => {
    fetchBlogs();
  }, [activeCategory]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/blogs', window.location.origin);
      url.searchParams.append('published', '1');
      if (activeCategory !== 'All') {
        url.searchParams.append('category', activeCategory);
      }
      
      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-10 z-10">
        <div className="relative z-10 text-center px-4 md:px-12 max-w-4xl mx-auto">
          <motion.div 
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-noto-sans text-sm text-[#E8192C] font-bold tracking-widest uppercase">Latest Updates</span>
          </motion.div>
          
          <motion.h1 
            className="font-nunito text-[56px] leading-[1.1] mb-8 font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-[#E8192C] relative inline-block">Our
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E8192C]/30" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="4"></path>
              </svg>
            </span>
            <span className="text-[#1B2A6B] ml-4">Blog & Insights</span>
          </motion.h1>
          
          <motion.p 
            className="font-nunito-sans text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Insights, guides, and stories about studying and living in Japan. Stay updated with the latest news from YMS Education.
          </motion.p>
        </div>
      </section>

      <SectionWrapper id="blogs" className="relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="sr-only">Latest Articles</h2>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                  ? 'bg-[#1B2A6B] text-white shadow-md' 
                  : 'bg-[#f0f4f8] text-[#334155] hover:bg-[#d6dade]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="material-symbols-outlined animate-spin text-4xl text-[#E8192C]">progress_activity</span>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <AnimatedCard key={blog.id} delay={index * 0.1} className="flex flex-col h-full group">
                  <Link href={`/blogs/${blog.slug}`} className="flex-grow flex flex-col">
                    {/* Thumbnail */}
                    <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                      {blog.thumbnail ? (
                        <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A6B] to-[#0097A7] opacity-80 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <span className="material-symbols-outlined text-white text-5xl opacity-50">article</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1B2A6B] text-xs font-bold rounded-full shadow-sm">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-nunito font-black text-xl text-[#1B2A6B] mb-3 group-hover:text-[#E8192C] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-[#334155] text-sm mb-6 line-clamp-3 flex-grow">
                        {blog.excerpt || 'Read this post to learn more...'}
                      </p>
                      
                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500">
                          {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-[#E8192C] text-sm font-bold flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                          Read More <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#334155]">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-4 block">search_off</span>
              <p className="text-xl font-bold">No blogs found in this category.</p>
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
