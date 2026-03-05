import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  accent?: string;
}

export const SectionHeader = ({ title, subtitle, accent }: SectionHeaderProps) => (
  <div className="max-w-3xl mb-12 md:mb-24">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn("text-[10px] font-bold uppercase tracking-[0.5em] mb-4 md:mb-6", accent || "text-accent")}
    >
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] md:leading-[0.9] tracking-tighter"
    >
      {title}
    </motion.h2>
  </div>
);
