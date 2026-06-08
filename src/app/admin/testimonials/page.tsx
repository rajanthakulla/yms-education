'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '@/components/ImageUpload';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [program, setProgram] = useState('');
  const [university, setUniversity] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [photo, setPhoto] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setProgram('');
    setUniversity('');
    setQuote('');
    setRating(5);
    setPhoto('');
    setPublished(false);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (t: any) => {
    setName(t.name);
    setProgram(t.program || '');
    setUniversity(t.university || '');
    setQuote(t.quote);
    setRating(t.rating);
    setPhoto(t.photo || '');
    setPublished(t.published === 1);
    setEditingId(t.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, program, university, quote, rating, photo, published };

    try {
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchTestimonials();
        resetForm();
      } else {
        alert('Failed to save testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchTestimonials();
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  const togglePublish = async (t: any) => {
    try {
      await fetch(`/api/testimonials/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...t, published: !t.published }),
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-black font-nunito text-[#1B2A6B]">Manage Testimonials</h1>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="px-6 py-2 bg-[#E8192C] text-white rounded-full font-bold hover:bg-[#1B2A6B] transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span> New Testimonial
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
                  <th className="p-4 font-bold">Student</th>
                  <th className="p-4 font-bold">Program / Uni</th>
                  <th className="p-4 font-bold">Rating</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      {t.photo ? (
                        <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <span className="material-symbols-outlined">person</span>
                        </div>
                      )}
                      <span className="font-bold text-[#1B2A6B]">{t.name}</span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-[#334155]">{t.program || '-'}</p>
                      <p className="text-xs text-[#0097A7]">{t.university}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-[16px] ${i < t.rating ? 'fill' : 'text-gray-300'}`}>star</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => togglePublish(t)}
                        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                          t.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {t.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(t)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(t.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {testimonials.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              <span className="material-symbols-outlined text-5xl mb-2 block text-gray-300">forum</span>
              <p>No testimonials found.</p>
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
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f0f4f8]">
                <h2 className="text-xl font-bold text-[#1B2A6B]">
                  {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-[#E8192C]">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Student Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0097A7]" />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Program (e.g. Language Class)</label>
                      <input type="text" value={program} onChange={(e) => setProgram(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0097A7]" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1B2A6B] mb-2">University / School</label>
                      <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0097A7]" />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <ImageUpload value={photo} onChange={setPhoto} label="Student Photo" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Quote *</label>
                    <textarea value={quote} onChange={(e) => setQuote(e.target.value)} required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0097A7] resize-none"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button 
                          key={num} 
                          type="button"
                          onClick={() => setRating(num)}
                          className="focus:outline-none"
                        >
                          <span className={`material-symbols-outlined text-3xl transition-colors ${rating >= num ? 'fill text-yellow-400' : 'text-gray-300'}`}>
                            star
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <input type="checkbox" id="published-t" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 text-[#0097A7] rounded focus:ring-[#0097A7]" />
                    <label htmlFor="published-t" className="font-bold text-[#1B2A6B] cursor-pointer">Publish immediately</label>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button type="button" onClick={resetForm} className="px-6 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="testimonial-form" className="px-6 py-2 bg-[#1B2A6B] text-white rounded-full font-bold hover:bg-[#0097A7] transition-colors shadow-lg">
                  Save Testimonial
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
