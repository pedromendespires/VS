import React, { memo } from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
  key?: string | number;
}

export const Reveal = memo(({ children, delay = 0, x = 0, y = 20, className }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
));

Reveal.displayName = 'Reveal';
