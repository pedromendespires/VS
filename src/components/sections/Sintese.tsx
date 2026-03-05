import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Ghost } from 'lucide-react';
import { Reveal } from '../Reveal';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sintese = () => (
  <section id="sintese" className="section-padding bg-ink text-paper relative overflow-hidden">
    {/* Animated Background Flow */}
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M 0 50 Q 50 0 100 50" 
          fill="none" stroke="white" strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </svg>
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <Reveal y={-20}>
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-serif mb-6">A Teia da Vida</h2>
          <p className="text-paper/60 max-w-2xl mx-auto font-light text-lg">
            Nada acontece isolado. Um desequilíbrio na raiz reverbera em cada escolha que faz hoje, até que a ordem seja restabelecida.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 relative">
        {/* Connecting Arrows (Desktop) */}
        <div className="hidden lg:flex absolute top-1/2 left-0 w-full justify-around -translate-y-1/2 z-0 opacity-10">
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight size={64} className="text-paper" />
          </motion.div>
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <ArrowRight size={64} className="text-paper" />
          </motion.div>
        </div>
        
        {[
          { 
            label: "A Raiz (Lei)", 
            law: "Pertença", 
            desc: "A exclusão de um antepassado...",
            color: "border-cyan-500/30 bg-cyan-500/5",
            icon: <Shield className="text-cyan-400 mb-4 md:mb-6" size={32} />
          },
          { 
            label: "O Filtro (Emoção)", 
            law: "Medo", 
            desc: "...gera um medo inconsciente de ser rejeitado...",
            color: "border-orange-500/30 bg-orange-500/5",
            icon: <Zap className="text-orange-400 mb-4 md:mb-6" size={32} />
          },
          { 
            label: "O Fruto (Sintoma)", 
            law: "Isolamento", 
            desc: "...que se manifesta como isolamento na vida atual.",
            color: "border-pink-500/30 bg-pink-500/5",
            icon: <Ghost className="text-pink-400 mb-4 md:mb-6" size={32} />
          }
        ].map((item, i) => (
          <Reveal key={item.law} delay={i * 0.2} y={40}>
            <div className={cn("p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border-2 backdrop-blur-sm h-full flex flex-col items-center text-center group hover:border-paper/20 transition-all duration-500", item.color)}>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper/40 mb-6 md:mb-8">{item.label}</div>
              {item.icon}
              <h4 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6">{item.law}</h4>
              <p className="text-paper/60 leading-relaxed font-light text-sm md:text-base">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
