import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import Lenis from '@studio-freight/lenis';

// Hooks
import { useActiveSection } from './hooks/useActiveSection';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

// Sections
import { Hero } from './components/sections/Hero';
import { Sintoma } from './components/sections/Sintoma';
import { Vergonha } from './components/sections/Vergonha';
import { Crencas } from './components/sections/Crencas';
import { Leis } from './components/sections/Leis';
import { Sintese } from './components/sections/Sintese';
import { Reconexao } from './components/sections/Reconexao';

// Constants
import { NAV_LINKS } from './constants';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  const sectionIds = useMemo(() => 
    NAV_LINKS.map(l => l.href.replace('#', '')).concat(['percurso', 'sintese']), 
  []);
  
  const activeSection = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  // Loading Progress Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('success');
    setTimeout(() => setNewsletterStatus('idle'), 5000);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement> | null, href: string) => {
    if (e) e.preventDefault();
    const targetId = href.replace('#', '');
    const lenis = (window as any).lenis;
    
    if (lenis) {
      lenis.scrollTo(`#${targetId}`, {
        offset: -80,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        const offset = 80;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="min-h-screen selection:bg-accent/20 bg-paper text-ink font-sans antialiased">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              y: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] bg-paper flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Grain Overlay for Loader */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[-1]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-12">
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border border-accent/20 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-3xl font-light text-accent">V</span>
                </div>
              </div>
              
              <div className="overflow-hidden mb-4">
                <motion.span 
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  className="block font-serif text-3xl tracking-tighter italic"
                >
                  Visão Sistémica
                </motion.span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-48 h-[1px] bg-ink/5 relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    className="absolute inset-0 bg-accent"
                  />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {Math.round(loadingProgress)}%
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar 
        isScrolled={isScrolled} 
        scrollToSection={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activeSection={activeSection}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Back to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => (window as any).lenis?.scrollTo(0)}
            className="fixed bottom-28 right-8 z-50 w-12 h-12 bg-white border border-ink/10 rounded-full flex items-center justify-center shadow-xl hover:bg-accent hover:text-paper transition-all group"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Floating Contact Button */}
      <motion.a
        href="https://wa.me/351912345678"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar via WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-accent text-paper rounded-full flex items-center justify-center shadow-2xl hover:bg-accent/90 transition-all duration-300"
      >
        <MessageCircle size={28} />
      </motion.a>

      {/* Decorative Background Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[20, 50, 80].map((y, i) => (
            <motion.path
              key={y}
              d={`M 0 ${y} Q 25 ${y + (i % 2 === 0 ? -10 : 10)} 50 ${y} T 100 ${y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 5 + i, repeat: Infinity, repeatType: "reverse", delay: i }}
            />
          ))}
        </svg>
      </div>

      <main>
        <Hero />
        <Sintoma />
        <Vergonha />
        <Crencas />
        <Leis />
        <Sintese />
        <Reconexao />
      </main>

      <Footer 
        newsletterStatus={newsletterStatus}
        handleNewsletterSubmit={handleNewsletterSubmit}
      />
    </div>
  );
}
