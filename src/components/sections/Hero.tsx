import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '../Reveal';

export const Hero = () => {
  const heroRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, 300]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -100]);
  const heroSubtextY = useTransform(heroProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1]);

  return (
    <header ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f5f2ed] pt-20 pb-12">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/10 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-100 rounded-full blur-[100px] md:blur-[150px]" />
      </motion.div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl w-full">
        <motion.div style={{ y: heroTextY }}>
          <Reveal delay={2.4} y={40}>
            <h1 className="text-4xl sm:text-6xl md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-serif leading-[0.9] md:leading-[0.8] mb-10 md:mb-16 tracking-tighter">
              A Visão <br />
              <span className="italic text-accent">Sistémica</span>
            </h1>
          </Reveal>
        </motion.div>
        
        <motion.div style={{ y: heroSubtextY }}>
          <Reveal delay={2.8}>
            <p className="text-lg sm:text-xl md:text-3xl text-muted max-w-3xl mx-auto mb-0 font-light leading-relaxed">
              O lugar onde a sua história ganha sentido. Descubra as forças invisíveis que moldam o seu caminho e recupere a liberdade de ser quem é.
            </p>
          </Reveal>
        </motion.div>
      </div>
    </header>
  );
};
