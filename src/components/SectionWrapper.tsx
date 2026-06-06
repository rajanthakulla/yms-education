'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bgColor?: string;
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  bgColor = 'bg-transparent',
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`py-20 px-4 md:px-12 lg:px-24 w-full ${bgColor} ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
