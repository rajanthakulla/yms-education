'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Counter({ 
  from = 0, 
  to, 
  isFloat = false, 
  duration = 2, 
  className = "" 
}: { 
  from?: number; 
  to: number; 
  isFloat?: boolean; 
  duration?: number;
  className?: string;
}) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => 
    isFloat ? latest.toFixed(1) : Math.round(latest)
  );
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, to, duration]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
