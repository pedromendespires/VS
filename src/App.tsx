import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import Lenis from '@studio-freight/lenis';

// Hooks
import { useActiveSection } from './hooks/useActiveSection';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

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

    // Store lenis in window for global access if needed
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
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
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-paper flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-paper font-bold text-2xl mb-6 shadow-2xl">V</div>
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="block font-serif text-2xl tracking-tighter"
                >
                  Visão Sistémica
                </motion.span>
              </div>
              <div className="mt-8 w-48 h-[1px] bg-ink/5 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-accent"
                />
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
