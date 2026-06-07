'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import TwoToneHeading from '@/components/TwoToneHeading';
import AnimatedCard from '@/components/AnimatedCard';
import Image from 'next/image';
import Link from 'next/link';

export default function LanguageClass() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-10 z-10">
        <div className="relative z-10 text-center px-4 md:px-12 max-w-4xl mx-auto">
          <motion.div 
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-noto-sans text-sm text-[#E8192C] font-bold tracking-widest uppercase">Academic Excellence</span>
          </motion.div>
          
          <motion.h1 
            className="font-nunito text-[56px] leading-[1.1] mb-8 font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-[#E8192C] relative inline-block">Language
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E8192C]/30" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="4"></path>
              </svg>
            </span>
            <span className="text-[#1B2A6B] ml-4">Classes</span>
          </motion.h1>
          
          <motion.p 
            className="font-nunito-sans text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Master Japanese with our expert instructors and comprehensive curriculum designed for your success.
          </motion.p>
        </div>
      </section>

      <SectionWrapper id="benefits" bgColor="bg-transparent" className="relative z-10">
        <div className="text-center mb-16">
          <TwoToneHeading firstText="Why Learn" secondText="With Us?" className="text-4xl md:text-5xl" />
        </div>
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Native-Level Instructors", desc: "Learn from teachers who understand the nuances of Japanese culture and communication.", icon: "record_voice_over" },
            { title: "JLPT/NAT Focused", desc: "Curriculum aligned directly with standard test requirements for maximum success.", icon: "menu_book" },
            { title: "Small Batch Sizes", desc: "Personalized attention ensuring every student masters the fundamentals.", icon: "groups" }
          ].map((item, index) => (
            <AnimatedCard key={index} delay={index * 0.1} className="p-8 text-center border-b-4 border-[#0097A7] bg-white/80 backdrop-blur-md">
              <span className="material-symbols-outlined text-5xl text-[#0097A7] mb-6 block">{item.icon}</span>
              <h3 className="text-xl font-bold font-nunito text-[#1B2A6B] mb-4">{item.title}</h3>
              <p className="text-[#334155]">{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="courses" bgColor="bg-transparent" className="relative z-10">
        <div className="text-center mb-16">
          <TwoToneHeading firstText="Our" secondText="Courses" className="text-4xl md:text-5xl" />
        </div>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "JLPT Preparation",
              level: "N5 to N1",
              desc: "Intensive preparation for the Japanese Language Proficiency Test. Focus on kanji, grammar, reading, and listening.",
              duration: "6 Months / Level",
              color: "border-[#E8192C]",
              bg: "bg-[#ffdad7]",
              text: "text-[#E8192C]"
            },
            {
              title: "NAT Test Prep",
              level: "Level 5 to 1",
              desc: "Targeted practice for the NAT test, popular for student visa applications. Includes extensive mock tests.",
              duration: "3 Months / Level",
              color: "border-[#1B2A6B]",
              bg: "bg-[#a7b5fe]/30",
              text: "text-[#1B2A6B]"
            },
            {
              title: "Conversational",
              level: "Beginner to Pro",
              desc: "Focus on speaking and listening skills for daily life in Japan or business environments.",
              duration: "Flexible",
              color: "border-[#0097A7]",
              bg: "bg-[#97f0ff]/50",
              text: "text-[#0097A7]"
            }
          ].map((course, index) => (
            <AnimatedCard key={index} delay={index * 0.1} className="flex flex-col bg-white/80 backdrop-blur-md" borderColor={`border-t-[6px] ${course.color.replace('border-', '')}`}>
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-black font-nunito text-[#1B2A6B]">{course.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.bg} ${course.text}`}>{course.level}</span>
                </div>
                <p className="text-[#334155] mb-6">{course.desc}</p>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-8">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  {course.duration}
                </div>
              </div>
              <div className="p-6 bg-white/50 border-t border-gray-100 text-center">
                <Link href="/contact" className="block w-full">
                  <button className={`w-full py-3 rounded-full font-bold text-white transition-colors cursor-pointer ${
                    index === 0 ? 'bg-[#E8192C] hover:bg-[#1B2A6B]' : 
                    index === 1 ? 'bg-[#1B2A6B] hover:bg-[#E8192C]' : 
                    'bg-[#0097A7] hover:bg-[#1B2A6B]'
                  }`}>
                    Enroll Now
                  </button>
                </Link>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="instructor" bgColor="bg-transparent" className="relative z-10 mb-20">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-[3rem] shadow-xl border border-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <Image 
                src="/images/team/nabin_bohora.jpeg"
                alt="Nabin Bohora - Instructor"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <TwoToneHeading firstText="Meet" secondText="Nabin Bohora" className="text-4xl md:text-5xl mb-6" />
            <h3 className="text-xl font-bold text-[#0097A7] mb-6">Senior Japanese Language Teacher</h3>
            <p className="text-[#334155] text-lg mb-6 leading-relaxed">
              With years of experience teaching Japanese to international students, Nabin brings a practical, result-oriented approach to language learning. His classes are known for being engaging, thorough, and perfectly aligned with what students need to succeed in Japan.
            </p>

          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
