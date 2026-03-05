import React, { useState, memo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { Reveal } from '../Reveal';
import { LAWS_DATA } from '../../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Leis = memo(() => {
  const [activeLaw, setActiveLaw] = useState<number | null>(null);

  return (
    <section id="leis" className="section-padding bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          subtitle="A Ordem que Liberta"
          title="O Fluxo Invisível da Vida"
          accent="text-accent"
        />
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Interactive Diagram */}
          <Reveal x={-30} className="w-full lg:w-1/2 max-w-md lg:max-w-none">
            <div className="relative w-full aspect-square flex items-center justify-center">
              <AnimatePresence>
                {activeLaw === null && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  >
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20 text-[10px] uppercase tracking-widest font-bold text-accent animate-pulse">
                      Clique para explorar
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <LayoutGroup>
                  {/* Connection Lines */}
                  <motion.circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-accent/20" />
                  
                  {[
                    { id: 0, cx: 50, cy: 20, label: "Lei da Pertença" },
                    { id: 1, cx: 20, cy: 70, label: "Lei da Ordem" },
                    { id: 2, cx: 80, cy: 70, label: "Lei do Equilíbrio" }
                  ].map((pos) => (
                    <g key={pos.id}>
                      {activeLaw === pos.id && (
                        <motion.circle 
                          layoutId="glow"
                          cx={pos.cx} cy={pos.cy} r="22"
                          className="fill-accent/10 blur-xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        />
                      )}
                      <motion.circle 
                        cx={pos.cx} cy={pos.cy} r="15"
                        className={cn(
                          "cursor-pointer transition-all duration-500 outline-none", 
                          activeLaw === pos.id ? "fill-accent/10 stroke-accent" : "fill-white stroke-ink/10"
                        )}
                        strokeWidth="0.5"
                        onClick={() => setActiveLaw(pos.id)}
                        onMouseEnter={() => setActiveLaw(pos.id)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setActiveLaw(pos.id);
                          }
                        }}
                        aria-label={pos.label}
                        role="button"
                      />
                    </g>
                  ))}
                </LayoutGroup>
              </svg>

              {/* Icons over circles */}
              <div className="absolute inset-0 pointer-events-none">
                {LAWS_DATA.map((item, idx) => {
                  const Icon = item.icon;
                  const positions = [
                    { top: "20%", left: "50%" },
                    { top: "70%", left: "20%" },
                    { top: "70%", left: "80%" }
                  ];
                  return (
                    <div 
                      key={idx}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                        activeLaw === idx ? "scale-125 text-accent" : "text-muted"
                      )}
                      style={{ top: positions[idx].top, left: positions[idx].left }}
                    >
                      <Icon size={24} />
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Content Display */}
          <div className="w-full lg:w-1/2 min-h-[300px] md:min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              {activeLaw !== null ? (
                <motion.div
                  key={activeLaw}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-white shadow-2xl border border-ink/5 w-full"
                >
                  {(() => {
                    const item = LAWS_DATA[activeLaw];
                    return (
                      <div>
                        <h3 className={cn("text-3xl md:text-4xl font-serif mb-6 md:mb-8", item.color)}>{item.title}</h3>
                        <div className="space-y-6 md:space-y-8">
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2 md:mb-3">A Lei Sagrada</div>
                            <p className="text-lg md:text-xl font-medium leading-relaxed">{item.law}</p>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2 md:mb-3">A Consequência da Violação</div>
                            <p className="text-muted leading-relaxed text-base md:text-lg">{item.violation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              ) : (
                <Reveal x={20} className="w-full">
                  <div className="text-center w-full p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-ink/10 flex flex-col items-center justify-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                      <ArrowRight size={24} className="md:size-32 animate-pulse" />
                    </div>
                    <p className="text-muted italic text-base md:text-lg">Selecione uma lei no diagrama para explorar a sua profundidade.</p>
                  </div>
                </Reveal>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

Leis.displayName = 'Leis';
