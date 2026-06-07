'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import TwoToneHeading from '@/components/TwoToneHeading';
import AnimatedCard from '@/components/AnimatedCard';
import Link from 'next/link';

export default function StudyInJapan() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* --- Section 1: Hero --- */}
      <section className="relative min-h-[40vh] flex items-center pt-32 pb-10 overflow-hidden z-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 lg:px-24 grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="font-nunito font-black text-5xl md:text-6xl text-[#1B2A6B] mb-6 leading-tight">
              Study in <span className="text-[#E8192C]">Japan</span>
            </h1>
            <p className="text-lg text-[#334155] mb-10 max-w-lg">
              Unlock world-class education, immerse yourself in a unique culture, and build a global career in one of the safest and most advanced countries in the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-8 py-4 bg-[#E8192C] text-[#ffffff] rounded-full font-bold shadow-lg hover:bg-[#1B2A6B] transition-colors">
                Apply Now
              </Link>
              <button className="px-8 py-4 bg-white border-2 border-[#1B2A6B] text-[#1B2A6B] rounded-full font-bold hover:bg-[#1B2A6B] hover:text-white transition-colors">
                Download Brochure
              </button>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[400px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <Image 
              src="/images/study-in-japan.png"
              alt="Study in Japan"
              fill
              className="object-cover"
              priority={true}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1B2A6B]/50 to-transparent"></div>
          </motion.div>
        </div>
        
        {/* Decor */}
        <div className="deco-circle w-[600px] h-[600px] -bottom-48 -right-48 opacity-50"></div>
      </section>

      {/* --- Section 2: Why Study in Japan --- */}
      <SectionWrapper id="why-japan" bgColor="bg-transparent" className="relative z-10">
        <div className="text-center mb-16">
          <TwoToneHeading firstText="Why Study" secondText="in Japan?" className="text-4xl md:text-5xl" />
        </div>

        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: "security", title: "Safety & Cleanliness", desc: "Consistently ranked as one of the safest countries globally with impeccably clean cities." },
            { icon: "school", title: "World-Class Education", desc: "Home to numerous top-ranking universities and cutting-edge research facilities." },
            { icon: "card_membership", title: "Abundant Scholarships", desc: "Numerous scholarships and financial aid options available for international students." },
          ].map((item, index) => (
            <AnimatedCard key={index} delay={index * 0.1} className="p-8 text-center" borderColor="border-t-[#E8192C]">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#ffdad7] text-[#E8192C] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
              </div>
              <h3 className="text-2xl font-bold font-nunito text-[#1B2A6B] mb-4">{item.title}</h3>
              <p className="text-[#334155]">{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      {/* --- Section 3: Academic Pathways --- */}
      <SectionWrapper id="pathways" bgColor="bg-transparent" className="relative z-10">
        <div className="text-center mb-16">
          <TwoToneHeading firstText="Academic" secondText="Pathways" className="text-4xl md:text-5xl" />
        </div>

        <div className="max-w-[1280px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Language School", desc: "1-2 years intensive Japanese to prepare for higher ed.", icon: "translate" },
            { title: "Vocational College", desc: "2-3 years specialized skills training (Senmon Gakko).", icon: "engineering" },
            { title: "Undergraduate", desc: "4 years bachelor's degree at top universities.", icon: "menu_book" },
            { title: "Graduate School", desc: "Master's and PhD programs with advanced research.", icon: "workspace_premium" },
          ].map((item, index) => (
            <AnimatedCard key={index} delay={index * 0.1} className="p-8" borderColor="border-t-[#1B2A6B]">
              <span className="material-symbols-outlined text-4xl text-[#0097A7] mb-4">{item.icon}</span>
              <h3 className="text-xl font-bold font-nunito text-[#1B2A6B] mb-2">{item.title}</h3>
              <p className="text-sm text-[#334155]">{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      {/* --- Section 4: Top Destinations --- */}
      <SectionWrapper id="destinations" bgColor="bg-transparent" className="relative z-10">
        <div className="text-center mb-16">
          <TwoToneHeading firstText="Top" secondText="Destinations" className="text-4xl md:text-5xl" />
        </div>

        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8">
          {[
            { name: "Nagoya", img: "https://images.unsplash.com/photo-1596489370601-527e02e0ee37?q=80&w=800&auto=format&fit=crop" },
            { name: "Tokyo", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF9ze6xCAvZaMXcAosZnPYK5QBBZdbJ0kkQwcRfcziFJ9KVUj8i5NFPhuMYV6YdOlkZlxGxp4NCA3ce6CQwycaUrICUXQfXRdnGQCHD0oOeGM_t2v8IQFx2YG9P_wdmbQerwdGLwljEbao7dx2WA9Yl3CrDCaYz_f-gsxU0Hcnx3h541cMBg3hFqRQYUO15MxzjnrVqnJzlOysXNXUPXz_-SyhU3tTqIZf83X0kIm5EKObjVmpzFxBPSDBfGqnkV2s0aKigog6R7CZ" },
            { name: "Osaka", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7KPeVJiYYejOlbGSXH9l-YTxGF_ddFSCYY34aMsJxnjfD8DFfl7a-Xy72FwN6AccivFrt8FN3u8iOQePBkxVgOZOd1URSnttvXGVIGj-ui4aJGOjPUmZrjElXbF6TmWpN_Mf43iGb5s6mV8tw-GwF7cXYTzVPlMQMbC1WwNL2ttBkluWHInuzKHJQguVrI5URW0nfHdybECZDwv6JNz14i0BHXfy4WwrHmFUaHldnvcSgyGTAYnzu8gJKkcwiYzcLLWbyowGncxwR" },
          ].map((city, index) => (
            <motion.div
              key={index}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Image src={city.img} alt={city.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A6B]/90 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-black font-nunito text-white">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* --- Section 5: YAMASA Partner Spotlight --- */}
      <SectionWrapper id="yamasa" bgColor="bg-[#1B2A6B]" className="text-white">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden border-8 border-white/10 bg-white shadow-[0_0_50px_rgba(0,151,167,0.3)]">
              <Image 
                src="/images/partners/yamasa-logo.png"
                alt="YAMASA Logo"
                fill
                className="object-contain p-12"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#0097A7] font-bold tracking-widest uppercase mb-2 block">Partner Spotlight</span>
            <h2 className="text-4xl md:text-5xl font-black font-nunito mb-6">YAMASA Institute</h2>
            <p className="text-white/80 text-lg mb-8">
              Located in Okazaki, Aichi, YAMASA is renowned for its intensive programs and outstanding student support. Experience authentic Japan while mastering the language.
            </p>
            <ul className="space-y-4 mb-10">
              {['Affordable living costs in Okazaki', 'High university acceptance rate', 'Comprehensive part-time job support', 'Excellent facilities and dormitories'].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#E8192C]">check_circle</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 bg-[#E8192C] text-white rounded-full font-bold hover:bg-white hover:text-[#E8192C] transition-colors">
              Explore YAMASA Programs
            </button>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* --- Section 6: Admission Essentials --- */}
      <SectionWrapper id="admission" bgColor="bg-transparent" className="relative z-10">
        <div className="text-center mb-16">
          <TwoToneHeading firstText="Admission" secondText="Essentials" className="text-4xl md:text-5xl" />
        </div>

        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-3 gap-8">
          <AnimatedCard className="p-8 lg:col-span-1 bg-[#f0f4f8]" borderColor="border-t-[#E8192C]">
            <h3 className="text-2xl font-bold font-nunito text-[#1B2A6B] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E8192C]">verified</span>
              Qualifications
            </h3>
            <ul className="space-y-4 text-[#334155]">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1B2A6B] text-white flex items-center justify-center text-xs mt-1">1</div>
                <div>12 years of formal education (High School passed)</div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1B2A6B] text-white flex items-center justify-center text-xs mt-1">2</div>
                <div>Minimum 150 hours of Japanese language study</div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1B2A6B] text-white flex items-center justify-center text-xs mt-1">3</div>
                <div>A reliable financial sponsor</div>
              </li>
            </ul>
          </AnimatedCard>

          <AnimatedCard className="p-8 lg:col-span-2" borderColor="border-t-[#0097A7]">
            <h3 className="text-2xl font-bold font-nunito text-[#1B2A6B] mb-8">Visa Process Flow</h3>
            <div className="grid md:grid-cols-3 gap-6 relative">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-8 left-10 right-10 h-1 bg-gray-200 z-0"></div>
              
              {[
                { title: 'Application', desc: 'Submit documents to school', icon: 'file_copy' },
                { title: 'COE Processing', desc: 'School applies to Immigration', icon: 'approval' },
                { title: 'Visa Stamping', desc: 'Apply at Japan Embassy, Nepal', icon: 'flight_takeoff' }
              ].map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-[#0097A7] text-[#0097A7] flex items-center justify-center mb-4 shadow-md">
                    <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                  </div>
                  <h4 className="font-bold text-[#1B2A6B] mb-2">Step {index + 1}: {step.title}</h4>
                  <p className="text-sm text-[#334155]">{step.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </SectionWrapper>
    </div>
  );
}
