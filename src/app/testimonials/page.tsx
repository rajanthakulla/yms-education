'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Testimonial {
  id: number;
  name: string;
  program: string;
  university: string;
  quote: string;
  rating: number;
  photo: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials?published=1');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const featured = testimonials.length > 0 ? testimonials[0] : null;
  const others = testimonials.length > 1 ? testimonials.slice(1) : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-10 z-10">
        <div className="relative z-10 text-center px-4 md:px-12 max-w-4xl mx-auto">
          <motion.div 
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-noto-sans text-sm text-[#E8192C] font-bold tracking-widest uppercase">Inspiration Gallery</span>
          </motion.div>
          
          <motion.h1 
            className="font-nunito text-[56px] leading-[1.1] mb-8 font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-[#E8192C] relative inline-block">Student
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E8192C]/30" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="4"></path>
              </svg>
            </span>
            <span className="text-[#1B2A6B] ml-4">Success Stories</span>
          </motion.h1>
          
          <motion.p 
            className="font-nunito-sans text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Real experiences from students who have realized their dreams of studying in Japan through YMS Education. Your journey to the Land of the Rising Sun starts with these authentic narratives.
          </motion.p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative py-16 w-full my-12 overflow-hidden">
        <div className="absolute inset-0 stats-gradient opacity-95"></div>
        <div className="absolute inset-0 dot-pattern opacity-20"></div>
        <motion.div 
          className="max-w-[1280px] mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row justify-around items-center gap-12 text-white text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center group">
            <span className="font-nunito text-5xl md:text-6xl font-black mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">99.8%</span>
            <span className="font-noto-sans text-sm uppercase tracking-[0.2em] text-white/80 font-bold">Visa Success Rate</span>
          </div>
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
          <div className="flex flex-col items-center group">
            <span className="font-nunito text-5xl md:text-6xl font-black mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">500+</span>
            <span className="font-noto-sans text-sm uppercase tracking-[0.2em] text-white/80 font-bold">Dreams Fulfilled</span>
          </div>
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
          <div className="flex flex-col items-center group">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-4xl text-yellow-300 group-hover:scale-110 transition-transform duration-300">verified</span>
              <span className="font-nunito text-4xl md:text-5xl font-black drop-shadow-lg">Govt.</span>
            </div>
            <span className="font-noto-sans text-sm uppercase tracking-[0.2em] text-white/80 font-bold">Approved Partner</span>
          </div>
        </motion.div>
      </section>

      {/* Featured Testimonial */}
      {featured && (
        <section className="py-24 px-4 md:px-12 max-w-[1280px] mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#dfe3e7] to-transparent -z-10"></div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative order-2 lg:order-1 px-8 lg:px-0">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#1B2A6B]/5 to-[#E8192C]/5 blob-shape-2 -z-10 transform -rotate-6"></div>
              <div className="absolute -inset-8 bg-white border border-[#dfe3e7] blob-shape opacity-50 -z-20 transform rotate-12"></div>
              
              <div className="relative z-10">
                <div className="aspect-[4/5] blob-shape overflow-hidden shadow-premium group">
                  {featured.photo ? (
                    <img 
                      src={featured.photo} 
                      alt={featured.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f0f4f8] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[100px] text-gray-300">person</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#1B2A6B]/10 mix-blend-multiply"></div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-premium z-20 border-4 border-[#f6fafe]">
                  <div className="w-24 h-24 bg-[#E8192C]/10 rounded-full flex items-center justify-center pulse-animation">
                    <span className="material-symbols-outlined text-[#E8192C] text-4xl">school</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <span className="material-symbols-outlined text-[#E8192C]/20 text-[120px] leading-none absolute -top-10 -left-10 z-0">format_quote</span>
              
              <div className="editorial-quote relative">
                <p className="font-nunito-sans text-2xl lg:text-3xl text-[#1B2A6B] leading-[1.6] italic font-medium">
                  "{featured.quote}"
                </p>
              </div>
              
              <div className="pt-6 border-t border-[#dfe3e7] inline-block">
                <h3 className="font-nunito text-3xl text-[#E8192C] font-black mb-1">{featured.name}</h3>
                <p className="font-noto-sans text-[#334155] uppercase tracking-widest text-sm mb-4">
                  {featured.program} {featured.university ? `, ${featured.university}` : ''}
                </p>
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-yellow-400 ${i < featured.rating ? 'fill' : ''}`}>star</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Testimonial Masonry Grid */}
      <section className="bg-gradient-to-b from-[#f0f4f8] to-white py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1B2A6B]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="px-4 md:px-12 max-w-[1280px] mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-nunito text-[40px] font-extrabold mb-4 tracking-tight">
              <span className="text-[#1B2A6B]">Voices of </span>
              <span className="text-[#E8192C] italic">Excellence</span>
            </h2>
            <p className="font-nunito-sans text-lg text-[#334155]">Hear from our community of scholars who are making their mark across Japan's top institutions.</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-10">
              <span className="material-symbols-outlined animate-spin text-4xl text-[#E8192C]">progress_activity</span>
            </div>
          ) : others.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {others.map((t, index) => {
                // Cycle through 3 styles based on index
                const styleIndex = index % 3;
                let cardClass = "";
                
                if (styleIndex === 0) {
                  // Style 1: White
                  cardClass = "bg-white text-[#171c1f] shadow-soft-layered border border-[#dfe3e7]";
                } else if (styleIndex === 1) {
                  // Style 2: Light Gray
                  cardClass = "bg-[#ffffff] text-[#171c1f] shadow-soft-layered border border-[#dfe3e7]"; 
                } else {
                  // Style 3: Blue
                  cardClass = "bg-[#1B2A6B] text-white shadow-premium";
                }

                return (
                  <motion.div 
                    key={t.id}
                    className={`${cardClass} p-10 rounded-3xl hover:shadow-premium transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group flex flex-col h-full`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  >
                    {/* Unique decor per style */}
                    {styleIndex === 0 && (
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E8192C] to-[#E8192C]/40 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    )}
                    {styleIndex === 1 && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B2A6B]/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                    )}
                    {styleIndex === 2 && (
                      <>
                        <div className="absolute inset-0 dot-pattern opacity-10"></div>
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-[#E8192C]/20 transition-colors duration-700"></div>
                      </>
                    )}

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-yellow-400 text-sm ${i < t.rating ? 'fill' : 'text-gray-300'}`}>star</span>
                        ))}
                      </div>
                      
                      <p className={`font-nunito-sans text-xl mb-10 leading-relaxed font-light ${styleIndex === 2 ? 'text-white/90 italic' : 'text-[#171c1f]'}`}>
                        "{t.quote}"
                      </p>
                      
                      <div className="flex items-center gap-5 mt-auto">
                        <div className="relative">
                          {styleIndex === 0 && <div className="absolute inset-0 bg-[#E8192C] rounded-full blur blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>}
                          {styleIndex === 1 && <div className="absolute inset-0 bg-[#1B2A6B] rounded-full blur blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>}
                          
                          {t.photo ? (
                            <img 
                              src={t.photo} 
                              alt={t.name} 
                              className={`w-16 h-16 rounded-full object-cover border-2 relative z-10 shadow-sm ${styleIndex === 2 ? 'border-[#E8192C]/50' : 'border-white'}`} 
                            />
                          ) : (
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 relative z-10 shadow-sm ${styleIndex === 2 ? 'border-[#E8192C]/50 bg-[#1B2A6B] text-white' : 'border-white bg-gray-200 text-gray-500'}`}>
                              <span className="material-symbols-outlined text-2xl">person</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <p className={`font-noto-sans font-extrabold text-lg ${styleIndex === 2 ? 'text-white' : 'text-[#1B2A6B]'}`}>
                            {t.name}
                          </p>
                          <p className={`font-noto-sans uppercase tracking-wider text-xs font-bold mt-1 ${styleIndex === 0 ? 'text-[#E8192C]' : styleIndex === 1 ? 'text-[#334155]' : 'text-[#ffb3ae]'}`}>
                            {t.university || t.program}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            !featured && (
              <div className="text-center py-10 text-[#334155]">
                <p>No testimonials available yet.</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-12 text-center bg-transparent relative overflow-hidden z-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-[0.03]"></div>
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#1B2A6B]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#E8192C]/5 rounded-full translate-x-1/3 blur-3xl"></div>
        </div>
        
        <motion.div 
          className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-nunito text-5xl md:text-6xl font-black mb-8 tracking-tight">
            <span className="text-[#E8192C] block mb-2">Ready to</span>
            <span className="text-[#1B2A6B]"> Be Our Next Success Story?</span>
          </h2>
          <p className="font-nunito-sans text-xl text-[#334155] mb-12 font-light leading-relaxed">
            Join hundreds of successful scholars in Japan. Our expert academic counselors provide bespoke guidance for your unique career trajectory.
          </p>
          <Link href="/contact" className="inline-block bg-[#E8192C] text-white px-12 py-5 rounded-full font-nunito text-lg font-bold shadow-premium hover:shadow-[0_20px_40px_-10px_rgba(232,25,44,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 tracking-wide">
            SCHEDULE YOUR CONSULTATION
          </Link>
          <p className="mt-6 font-noto-sans text-sm text-[#334155]/70 uppercase tracking-widest">Free 30-minute initial assessment</p>
        </motion.div>
      </section>
    </div>
  );
}
