'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalTestimonials: 0,
    publishedTestimonials: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsRes, testimonialsRes] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/testimonials')
      ]);

      if (blogsRes.ok && testimonialsRes.ok) {
        const blogsData = await blogsRes.json();
        const testimonialsData = await testimonialsRes.json();

        const blogs = blogsData.blogs || [];
        const testimonials = testimonialsData.testimonials || [];

        setStats({
          totalBlogs: blogs.length,
          publishedBlogs: blogs.filter((b: any) => b.published === 1).length,
          totalTestimonials: testimonials.length,
          publishedTestimonials: testimonials.filter((t: any) => t.published === 1).length
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black font-nunito text-[#1B2A6B]">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back to the YMS Education Admin Portal.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/blogs" className="px-6 py-2 bg-[#1B2A6B] text-white rounded-full font-bold hover:bg-[#E8192C] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span> New Blog
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="material-symbols-outlined animate-spin text-4xl text-[#E8192C]">progress_activity</span>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Blogs', value: stats.totalBlogs, icon: 'article', color: 'bg-blue-50 text-blue-600', border: 'border-blue-600' },
            { label: 'Published Blogs', value: stats.publishedBlogs, icon: 'public', color: 'bg-green-50 text-green-600', border: 'border-green-600' },
            { label: 'Total Testimonials', value: stats.totalTestimonials, icon: 'forum', color: 'bg-purple-50 text-purple-600', border: 'border-purple-600' },
            { label: 'Published Testimonials', value: stats.publishedTestimonials, icon: 'verified', color: 'bg-teal-50 text-teal-600', border: 'border-teal-600' },
          ].map((stat, index) => (
            <div key={index} className={`bg-white p-6 rounded-2xl shadow-sm border-t-4 ${stat.border}`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
              </div>
              <h3 className="text-4xl font-black font-nunito text-[#1B2A6B] mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f8fafc]">
            <h2 className="font-bold text-[#1B2A6B] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0097A7]">lightbulb</span> Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/admin/blogs" className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1B2A6B] hover:bg-gray-50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-3xl text-gray-400">edit_document</span>
                <span className="font-bold text-[#1B2A6B]">Manage Blogs</span>
              </Link>
              <Link href="/admin/testimonials" className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#1B2A6B] hover:bg-gray-50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-3xl text-gray-400">rate_review</span>
                <span className="font-bold text-[#1B2A6B]">Manage Testimonials</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
