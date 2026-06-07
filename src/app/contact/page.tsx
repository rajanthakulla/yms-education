'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import AnimatedCard from '@/components/AnimatedCard';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-10 z-10">
        <div className="relative z-10 text-center px-4 md:px-12 max-w-4xl mx-auto">
          <motion.div 
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-noto-sans text-sm text-[#E8192C] font-bold tracking-widest uppercase">Get in Touch</span>
          </motion.div>
          
          <motion.h1 
            className="font-nunito text-[56px] leading-[1.1] mb-8 font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-[#E8192C] relative inline-block">Contact
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E8192C]/30" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="4"></path>
              </svg>
            </span>
            <span className="text-[#1B2A6B] ml-4">Us</span>
          </motion.h1>
          
          <motion.p 
            className="font-nunito-sans text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We are here to answer your questions and guide you on your journey to Japan.
          </motion.p>
        </div>
      </section>

      <SectionWrapper id="contact-content" bgColor="bg-transparent" className="relative z-10">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedCard className="p-8 lg:p-12" borderColor="border-t-[#E8192C]">
            <h2 className="text-3xl font-black font-nunito text-[#1B2A6B] mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C] focus:ring-1 focus:ring-[#E8192C] transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C] focus:ring-1 focus:ring-[#E8192C] transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C] focus:ring-1 focus:ring-[#E8192C] transition-colors" placeholder="+977 9767220276" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Program Interest</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C] focus:ring-1 focus:ring-[#E8192C] transition-colors bg-white">
                    <option value="">Select a program</option>
                    <option value="language">Language School</option>
                    <option value="vocational">Vocational College</option>
                    <option value="university">University</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B2A6B] mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E8192C] focus:ring-1 focus:ring-[#E8192C] transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-[#E8192C] text-white rounded-full font-bold shadow-lg hover:bg-[#1B2A6B] transition-colors">
                SEND MESSAGE
              </button>
            </form>
          </AnimatedCard>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatedCard delay={0.1} className="p-6" borderColor="border-t-[#0097A7]">
                <span className="material-symbols-outlined text-4xl text-[#0097A7] mb-4">location_on</span>
                <h3 className="font-bold text-[#1B2A6B] mb-2">Visit Us</h3>
                <p className="text-[#334155] text-sm">New Baneshwor, Kanti Galli,<br/>Opposite to Pani Tanki, 44600</p>
              </AnimatedCard>

              <AnimatedCard delay={0.2} className="p-6" borderColor="border-t-[#0097A7]">
                <span className="material-symbols-outlined text-4xl text-[#0097A7] mb-4">call</span>
                <h3 className="font-bold text-[#1B2A6B] mb-2">Call Us</h3>
                <p className="text-[#334155] text-sm">01-5921908<br/>+977 9767220276</p>
              </AnimatedCard>

              <AnimatedCard delay={0.3} className="p-6" borderColor="border-t-[#0097A7]">
                <span className="material-symbols-outlined text-4xl text-[#0097A7] mb-4">mail</span>
                <h3 className="font-bold text-[#1B2A6B] mb-2">Email Us</h3>
                <p className="text-[#334155] text-sm">
                  <a href="mailto:educationyms@gmail.com" className="hover:text-[#E8192C] transition-colors hover:underline">educationyms@gmail.com</a>
                </p>
              </AnimatedCard>

              <AnimatedCard delay={0.4} className="p-6" borderColor="border-t-[#0097A7]">
                <span className="material-symbols-outlined text-4xl text-[#0097A7] mb-4">schedule</span>
                <h3 className="font-bold text-[#1B2A6B] mb-2">Office Hours</h3>
                <p className="text-[#334155] text-sm">Sunday - Friday<br/>10:00 AM - 6:00 PM</p>
              </AnimatedCard>
            </div>

            {/* Google Maps Embed */}
            <AnimatedCard delay={0.5} className="h-[300px] w-full overflow-hidden relative group">
              <iframe 
                src="https://maps.google.com/maps?q=New%20Baneshwor,%20Kanti%20Galli,%20Opposite%20to%20Pani%20Tanki,%20Kathmandu,%20Nepal&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a 
                href="https://maps.google.com/maps?q=New%20Baneshwor,%20Kanti%20Galli,%20Opposite%20to%20Pani%20Tanki,%20Kathmandu,%20Nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-[#E8192C] text-white px-4 py-2 rounded-full text-xs font-bold shadow-md hover:bg-[#1B2A6B] transition-colors flex items-center gap-1 opacity-90 hover:opacity-100 z-10"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                Open in Google Maps
              </a>
            </AnimatedCard>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
