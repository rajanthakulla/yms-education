'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  borderColor?: string; // e.g. 'border-t-primary'
}

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  borderColor,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`bg-white/80 backdrop-blur-md rounded-[24px] shadow-lg overflow-hidden ${
        borderColor ? `border-t-[4px] ${borderColor}` : ''
      } ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
}
