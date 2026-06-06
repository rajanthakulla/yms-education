'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import TwoToneHeading from '@/components/TwoToneHeading';
import AnimatedCard from '@/components/AnimatedCard';

export default function Services() {
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
            <span className="font-noto-sans text-sm text-[#E8192C] font-bold tracking-widest uppercase">Our Expertise</span>
          </motion.div>
          
          <motion.h1 
            className="font-nunito text-[56px] leading-[1.1] mb-8 font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-[#E8192C] relative inline-block">Our
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E8192C]/30" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="4"></path>
              </svg>
            </span>
            <span className="text-[#1B2A6B] ml-4">Services</span>
          </motion.h1>
          
          <motion.p 
            className="font-nunito-sans text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Comprehensive support from your first consultation to your life in Japan.
          </motion.p>
        </div>
      </section>

      <SectionWrapper id="services-grid" bgColor="bg-transparent" className="relative z-10">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Language Preparation",
              desc: "JLPT/NAT training and conversational classes tailored for success.",
              icon: "translate",
              color: "text-[#E8192C]"
            },
            {
              title: "University Placement",
              desc: "School selection, document preparation, and application support.",
              icon: "account_balance",
              color: "text-[#1B2A6B]"
            },
            {
              title: "Visa Processing",
              desc: "Documentation review, COE application, and embassy interview prep.",
              icon: "description",
              color: "text-[#0097A7]"
            },
            {
              title: "Pre-Departure Orientation",
              desc: "Cultural preparation, travel guidance, and what to expect in Japan.",
              icon: "flight_takeoff",
              color: "text-[#E8192C]"
            },
            {
              title: "Post-Arrival Support",
              desc: "Housing assistance, city registration, and bank account setup.",
              icon: "home",
              color: "text-[#1B2A6B]"
            },
            {
              title: "Career Counseling",
              desc: "Employment guidance, part-time job search, and interview preparation.",
              icon: "work",
              color: "text-[#0097A7]"
            }
          ].map((service, index) => (
            <AnimatedCard key={index} delay={index * 0.1} className="p-8 hover:bg-[#1B2A6B] hover:text-white transition-colors group cursor-pointer bg-white/80 backdrop-blur-md">
              <span className={`material-symbols-outlined text-5xl mb-6 block transition-colors group-hover:text-white ${service.color}`}>{service.icon}</span>
              <h3 className="text-2xl font-bold font-nunito mb-4 group-hover:text-white text-[#1B2A6B]">{service.title}</h3>
              <p className="text-[#334155] group-hover:text-gray-300 transition-colors">{service.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      {/* How it works timeline */}
      <SectionWrapper id="process" bgColor="bg-transparent" className="relative z-10">
        <div className="text-center mb-16">
          <TwoToneHeading firstText="The 9-Step" secondText="Journey" className="text-4xl md:text-5xl" />
        </div>
        
        <div className="max-w-[1000px] mx-auto relative py-10">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2"></div>
          
          {[
            { step: 1, title: 'Free Consultation', desc: 'Discuss your goals.' },
            { step: 2, title: 'Assessment', desc: 'Evaluate profile & documents.' },
            { step: 3, title: 'Language Class', desc: 'Begin Japanese study.' },
            { step: 4, title: 'School Selection', desc: 'Choose the right institution.' },
            { step: 5, title: 'Application', desc: 'Submit documents to Japan.' },
            { step: 6, title: 'COE Issuance', desc: 'Certificate of Eligibility received.' },
            { step: 7, title: 'Visa Stamping', desc: 'Apply at Japan Embassy.' },
            { step: 8, title: 'Pre-Departure', desc: 'Final briefings.' },
            { step: 9, title: 'Arrival Support', desc: 'Welcome to Japan!' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className={`relative flex items-center justify-between w-full mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-5/12"></div>
              <div className="z-20">
                <div className="w-10 h-10 rounded-full bg-[#E8192C] shadow-lg border-4 border-white flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
              </div>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <h3 className="text-xl font-bold font-nunito text-[#1B2A6B]">{item.title}</h3>
                <p className="text-sm text-[#334155] mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
