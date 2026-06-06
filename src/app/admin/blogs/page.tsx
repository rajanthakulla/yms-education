'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('General');
    setExcerpt('');
    setContent('');
    setThumbnail('');
    setPublished(false);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (blog: any) => {
    setTitle(blog.title);
    setCategory(blog.category);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setThumbnail(blog.thumbnail);
    setPublished(blog.published === 1);
    setEditingId(blog.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, category, excerpt, content, thumbnail, published };

    try {
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchBlogs();
        resetForm();
      } else {
        alert('Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchBlogs();
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const togglePublish = async (blog: any) => {
    try {
      await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...blog, published: !blog.published }),
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-black font-nunito text-[#1B2A6B]">Manage Blogs</h1>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="px-6 py-2 bg-[#E8192C] text-white rounded-full font-bold hover:bg-[#1B2A6B] transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span> New Blog
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="material-symbols-outlined animate-spin text-4xl text-[#E8192C]">progress_activity</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f0f4f8] text-[#1B2A6B] text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-[#1B2A6B] line-clamp-1">{blog.title}</p>
                      <p className="text-xs text-gray-500">{blog.slug}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-100 text-[#5d3f3d] text-xs font-bold rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => togglePublish(blog)}
                        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                          blog.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(blog)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(blog.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {blogs.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              <span className="material-symbols-outlined text-5xl mb-2 block text-gray-300">article</span>
              <p>No blogs found. Create your first blog post!</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={resetForm}
            />
            <motion.div 
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f0f4f8]">
                <h2 className="text-xl font-bold text-[#1B2A6B]">
                  {editingId ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-[#E8192C]">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Title *</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C]" />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C] bg-white">
                        <option value="General">General</option>
                        <option value="Study Tips">Study Tips</option>
                        <option value="Language Learning">Language Learning</option>
                        <option value="Visa Guide">Visa Guide</option>
                        <option value="Student Life">Student Life</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Thumbnail URL</label>
                      <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C]" placeholder="https://..." />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Excerpt</label>
                    <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C] resize-none" placeholder="Short description..."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Content (HTML) *</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={10} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C] font-mono text-sm"></textarea>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 text-[#E8192C] rounded focus:ring-[#E8192C]" />
                    <label htmlFor="published" className="font-bold text-[#1B2A6B] cursor-pointer">Publish immediately</label>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button type="button" onClick={resetForm} className="px-6 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="blog-form" className="px-6 py-2 bg-[#1B2A6B] text-white rounded-full font-bold hover:bg-[#E8192C] transition-colors shadow-lg">
                  Save Blog
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
