'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  thumbnail: string;
  author: string;
  created_at: string;
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/slug/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setBlog(data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-5xl text-[#E8192C]">progress_activity</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-[#1B2A6B] mb-4">Blog Not Found</h1>
        <Link href="/blogs" className="text-[#E8192C] font-bold hover:underline flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      <div className="max-w-[800px] mx-auto w-full px-4 py-8">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#E8192C] transition-colors mb-8">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to all blogs
        </Link>
        
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#f0f4f8] text-[#1B2A6B] text-xs font-bold rounded-full mb-4">
            {blog.category}
          </span>
          <h1 className="font-nunito font-black text-3xl md:text-5xl text-[#1B2A6B] mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">person</span> {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span> 
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {blog.thumbnail && (
        <div className="w-full max-w-[1000px] mx-auto px-4 mb-12">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
            <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" />
          </div>
        </div>
      )}

      <div className="max-w-[800px] mx-auto w-full px-4 pb-20">
        <div 
          className="prose prose-lg max-w-none prose-headings:font-nunito prose-headings:font-black prose-headings:text-[#1B2A6B] prose-a:text-[#E8192C]"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Share & Author block */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1B2A6B] text-white flex items-center justify-center font-bold text-xl">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-[#1B2A6B]">Written by {blog.author}</p>
                <p className="text-xs text-gray-500">YMS Education Foundation</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-[#f0f4f8] text-[#1B2A6B] flex items-center justify-center hover:bg-[#E8192C] hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
