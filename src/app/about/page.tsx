'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import TwoToneHeading from '@/components/TwoToneHeading';
import AnimatedCard from '@/components/AnimatedCard';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* --- Section 1: Page Header --- */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-10 z-10">
        <div className="relative z-10 text-center px-4 md:px-12 max-w-4xl mx-auto">
          <motion.div 
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-noto-sans text-sm text-[#E8192C] font-bold tracking-widest uppercase">Discover Our Journey</span>
          </motion.div>
          
          <motion.h1 
            className="font-nunito text-[56px] leading-[1.1] mb-8 font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-[#E8192C] relative inline-block">About
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
            We are dedicated to providing honest, transparent, and comprehensive guidance to students aspiring to study in Japan.
          </motion.p>
        </div>
      </section>

      {/* --- Section 2: Our Story --- */}
      <SectionWrapper id="our-story" bgColor="bg-transparent" className="relative z-10">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] z-10">
              <Image 
                src="/images/about-page.jpg"
                alt="Our Story"
                fill
                className="object-cover rounded-3xl shadow-xl"
              />
            </div>
            {/* Decorative double border frame */}
            <div className="absolute inset-0 border-4 border-[#1B2A6B] rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
            <div className="absolute inset-0 border-4 border-[#0097A7] rounded-3xl -translate-x-4 -translate-y-4 -z-20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TwoToneHeading firstText="About" secondText="YMS Education" className="text-4xl md:text-5xl mb-6" />
            <div className="space-y-6 text-[#334155] text-lg">
              <p>
                Established with a vision to connect Nepalese students with world-class education in Japan, YMS Education Foundation has been a pioneer in educational guidance and language preparation.
              </p>
              <p>
                Our journey began with a simple belief: every student deserves honest guidance. Today, we pride ourselves on our proven visa success rate and our comprehensive post-arrival support that ensures our students don't just reach Japan, but thrive there.
              </p>
            </div>
            <button 
              onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 px-8 py-4 bg-[#1B2A6B] text-white rounded-full font-bold shadow-lg hover:bg-[#E8192C] transition-colors"
            >
              Discover Our History
            </button>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* --- Section: Our History --- */}
      <SectionWrapper id="history" bgColor="bg-white" className="relative z-10 py-24">
        <div className="max-w-[1280px] mx-auto px-4">
          <TwoToneHeading firstText="Our" secondText="History" className="text-center text-4xl md:text-5xl mb-16" />
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gray-200 -translate-x-1/2 rounded-full"></div>
            
            <div className="space-y-16">
              {/* Milestone 1 */}
              <motion.div 
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="md:w-[45%] text-left md:text-right order-2 md:order-1 pl-20 md:pl-0 mt-2 md:mt-0 md:pr-12">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#1B2A6B]/10 text-[#1B2A6B] font-bold text-sm mb-3">The Beginning</div>
                  <h3 className="text-2xl font-black font-nunito text-[#1B2A6B] mb-3">A Singular Focus</h3>
                  <p className="text-[#334155] font-noto-sans leading-relaxed">
                    YMS Education was founded with a singular focus: bridging the gap between ambitious students in Nepal and the vast educational opportunities in Japan.
                  </p>
                </div>
                <div className="absolute left-[27px] md:left-1/2 w-[54px] h-[54px] rounded-full bg-white border-[6px] border-[#1B2A6B] shadow-xl -translate-x-1/2 z-10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#1B2A6B]">flight_takeoff</span>
                </div>
                <div className="md:w-[45%] order-3 md:order-3"></div>
              </motion.div>

              {/* Milestone 2 */}
              <motion.div 
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="md:w-[45%] order-2 md:order-1"></div>
                <div className="absolute left-[27px] md:left-1/2 w-[54px] h-[54px] rounded-full bg-white border-[6px] border-[#0097A7] shadow-xl -translate-x-1/2 z-10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#0097A7]">handshake</span>
                </div>
                <div className="md:w-[45%] text-left order-3 md:order-3 pl-20 md:pl-12 mt-2 md:mt-0">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#0097A7]/10 text-[#0097A7] font-bold text-sm mb-3">Building Trust</div>
                  <h3 className="text-2xl font-black font-nunito text-[#1B2A6B] mb-3">Forging Relationships</h3>
                  <p className="text-[#334155] font-noto-sans leading-relaxed">
                    Over the years, we built strong relationships with top universities and language schools across Japan, establishing high ethical standards and maintaining an exceptional visa success rate.
                  </p>
                </div>
              </motion.div>

              {/* Milestone 3 */}
              <motion.div 
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="md:w-[45%] text-left md:text-right order-2 md:order-1 pl-20 md:pl-0 mt-2 md:mt-0 md:pr-12">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#E8192C]/10 text-[#E8192C] font-bold text-sm mb-3">Holistic Support</div>
                  <h3 className="text-2xl font-black font-nunito text-[#1B2A6B] mb-3">Beyond Admissions</h3>
                  <p className="text-[#334155] font-noto-sans leading-relaxed">
                    We expanded our services beyond admissions to include JLPT preparation, cultural orientation, and job placement assistance, ensuring every student is prepared.
                  </p>
                </div>
                <div className="absolute left-[27px] md:left-1/2 w-[54px] h-[54px] rounded-full bg-white border-[6px] border-[#E8192C] shadow-xl -translate-x-1/2 z-10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#E8192C]">school</span>
                </div>
                <div className="md:w-[45%] order-3 md:order-3"></div>
              </motion.div>

              {/* Milestone 4 */}
              <motion.div 
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="md:w-[45%] order-2 md:order-1"></div>
                <div className="absolute left-[27px] md:left-1/2 w-[54px] h-[54px] rounded-full bg-[#1B2A6B] border-[6px] border-white shadow-xl -translate-x-1/2 z-10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">workspace_premium</span>
                </div>
                <div className="md:w-[45%] text-left order-3 md:order-3 pl-20 md:pl-12 mt-2 md:mt-0">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#1B2A6B]/10 text-[#1B2A6B] font-bold text-sm mb-3">Today</div>
                  <h3 className="text-2xl font-black font-nunito text-[#1B2A6B] mb-3">Pioneering Success</h3>
                  <p className="text-[#334155] font-noto-sans leading-relaxed">
                    Today, our history is defined by the success stories of our alumni who are thriving professionals and outstanding scholars across Japan.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* --- Section 3: Mission / Vision / Values --- */}
      <SectionWrapper id="mission-vision" bgColor="bg-transparent" className="relative z-10">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8">
          <AnimatedCard delay={0.1} borderColor="border-[#E8192C]" className="p-8 bg-white/80 backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-[#ffdad7] text-[#E8192C] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">flag</span>
            </div>
            <h3 className="text-2xl font-black font-nunito text-[#1B2A6B] mb-4">Our Mission</h3>
            <p className="text-[#334155]">
              To provide transparent, accurate, and ethical counseling to students aspiring to study in Japan, while equipping them with excellent Japanese language skills.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.2} borderColor="border-[#1B2A6B]" className="p-8 bg-white/80 backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-[#a7b5fe]/30 text-[#1B2A6B] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <h3 className="text-2xl font-black font-nunito text-[#1B2A6B] mb-4">Our Vision</h3>
            <p className="text-[#334155]">
              To be the most trusted and preferred educational institution in Nepal, fostering global citizens who bridge the cultural and economic ties between Nepal and Japan.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.3} borderColor="border-[#0097A7]" className="p-8 bg-white/80 backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-[#97f0ff]/50 text-[#0097A7] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">diamond</span>
            </div>
            <h3 className="text-2xl font-black font-nunito text-[#1B2A6B] mb-4">Our Values</h3>
            <ul className="space-y-3 text-[#334155]">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#0097A7]">check_circle</span>
                Integrity & Honesty
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#0097A7]">check_circle</span>
                Student Success First
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#0097A7]">check_circle</span>
                Continuous Excellence
              </li>
            </ul>
          </AnimatedCard>
        </div>
      </SectionWrapper>

      {/* --- Section 4: Meet Our Team --- */}
      <SectionWrapper id="team" bgColor="bg-transparent" className="relative z-10">
        <div className="max-w-[1280px] mx-auto text-center mb-16">
          <TwoToneHeading firstText="Meet Our" secondText="Team" className="text-4xl md:text-5xl" />
        </div>

        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center gap-x-8 gap-y-12">
          {[
            { name: "Bikram Khadka", role: "CEO", img: "/images/team/founder.jpeg" },
            { name: "Dik Bahadur Budhathoki", role: "Director / Japan Coordinator", img: "/images/team/dik-bahadur.jpeg" },
            { name: "Dal Bahadur Karki", role: "Director", img: "/images/team/dal-bahadur-karki.jpeg" },
            { name: "Nabin Bohara", role: "Teacher", img: "/images/team/nabin_bohora.jpeg" },
            { name: "Sujata Raut", role: "Teacher", img: "/images/team/sujata-raut.jpeg" },
            { name: "Priya Bhattarai", role: "Documentation Officer", img: "/images/team/priya-bhattarai-v2.jpeg" },
            { name: "Akrima Thapa", role: "Counselor", img: "/images/team/akrima-thapa.jpeg" },
            { name: "Rikesh Kumar Thapa", role: "Counselor", img: "/images/team/rikesh-kumar-thapa.jpeg" },
            { name: "Sujana Raut", role: "Front Desk", img: "/images/team/sujana-raut.jpeg" },
            { name: "Srijana Adhikari", role: "Assistant", img: "/images/team/srijana-adhikari.jpeg" },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative w-48 h-48 rounded-full p-2 bg-gradient-to-tr from-[#E8192C] via-[#1B2A6B] to-[#0097A7] mb-6 group-hover:rotate-180 transition-transform duration-700">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white group-hover:-rotate-180 transition-transform duration-700">
                  <Image 
                    src={member.img}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <h3 className="font-black font-nunito text-xl text-[#1B2A6B]">{member.name}</h3>
              <p className="font-bold text-[#0097A7]">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* --- Section 5: Partners --- */}
      <section className="py-16 border-t border-gray-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 text-center">
          <p className="text-sm font-bold text-[#1B2A6B] uppercase tracking-widest mb-8">In Partnership With</p>
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto w-full">
            <motion.div 
              className="hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Image src="/images/partners/yamasa-logo.png" alt="YAMASA" width={110} height={55} className="object-contain mix-blend-multiply" />
            </motion.div>
            <motion.div 
              className="hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Image src="/images/partners/egao-logo.png" alt="EGAO" width={110} height={55} className="object-contain mix-blend-multiply" />
            </motion.div>
            <motion.div 
              className="hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Image src="/images/partners/nepal-manpower-logo.png" alt="NEPAL MANPOWER" width={110} height={55} className="object-contain" />
            </motion.div>
            <motion.div 
              className="hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Image src="/images/partners/remnant-logo.png" alt="REMNANT JAPANESE LANGUAGE SCHOOL" width={120} height={55} className="object-contain" />
            </motion.div>
            <motion.div 
              className="hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Image src="/images/partners/kawahara-logo.png" alt="KAWAHARA E-BUSINESS COLLEGE" width={125} height={55} className="object-contain" />
            </motion.div>
            <motion.div 
              className="hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Image src="/images/partners/aichi-logo.png" alt="AICHI INT'L ACADEMY" width={110} height={55} className="object-contain" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
