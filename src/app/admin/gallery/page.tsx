'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '@/components/ImageUpload';

interface GalleryItem {
  id: number;
  title: string;
  category: 'Events' | 'Sports' | 'Success';
  img: string;
  desc: string;
  published: number;
}

export default function ManageGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Events');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [published, setPublished] = useState(true);

  const categories: GalleryItem['category'][] = ['Events', 'Sports', 'Success'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setItems(data.gallery || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Events');
    setImg('');
    setDesc('');
    setPublished(true);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (item: GalleryItem) => {
    setTitle(item.title);
    setCategory(item.category);
    setImg(item.img);
    setDesc(item.desc || '');
    setPublished(item.published === 1);
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, category, img, desc, published };

    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchGallery();
        resetForm();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to save gallery item');
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('An error occurred while saving the gallery item.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this gallery image?')) {
      try {
        const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchGallery();
        } else {
          alert('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error);
      }
    }
  };

  const togglePublish = async (item: GalleryItem) => {
    try {
      const updatedPublished = item.published === 1 ? 0 : 1;
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          category: item.category,
          img: item.img,
          desc: item.desc || '',
          published: updatedPublished === 1,
        }),
      });
      if (res.ok) {
        fetchGallery();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black font-nunito text-[#1B2A6B]">Manage Gallery</h1>
          <p className="text-gray-500 mt-1">Upload and categorize photos of YMS events, classrooms, and student activities.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="px-6 py-2 bg-[#E8192C] text-white rounded-full font-bold hover:bg-[#1B2A6B] transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add_a_photo</span> Add Image
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
                  <th className="p-4 font-bold">Preview</th>
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Description</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/100x75?text=Error';
                          }}
                        />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#1B2A6B]">
                      {item.title}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#1B2A6B]/10 text-[#1B2A6B]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs text-sm text-[#556987] truncate">
                      {item.desc || '-'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => togglePublish(item)}
                        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                          item.published === 1 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.published === 1 ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {items.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              <span className="material-symbols-outlined text-5xl mb-2 block text-gray-300">photo_library</span>
              <p>No gallery images found.</p>
            </div>
          )}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
            />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f0f4f8]">
                <h2 className="text-xl font-bold text-[#1B2A6B]">
                  {editingId ? 'Edit Gallery Image' : 'Add Gallery Image'}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-[#E8192C]">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="gallery-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Image Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="e.g. Visa Celebration 2026"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0097A7]"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0097A7] bg-white"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-full">
                      <ImageUpload value={img} onChange={setImg} label="Gallery Image" />
                    </div>
                  </div>

                  {/* Image Live Preview */}


                  <div>
                    <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Description / Caption</label>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      rows={3}
                      placeholder="Add a short details about the photo..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0097A7] resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <input
                      type="checkbox"
                      id="published-g"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="w-5 h-5 text-[#0097A7] rounded focus:ring-[#0097A7]"
                    />
                    <label htmlFor="published-g" className="font-bold text-[#1B2A6B] cursor-pointer">
                      Publish immediately (visible on public gallery)
                    </label>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="gallery-form"
                  className="px-6 py-2 bg-[#1B2A6B] text-white rounded-full font-bold hover:bg-[#0097A7] transition-colors shadow-lg"
                >
                  {editingId ? 'Save Changes' : 'Upload Image'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
