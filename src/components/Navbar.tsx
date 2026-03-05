import React, { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  isScrolled: boolean;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
  activeSection: string;
  scrollYProgress: any;
}

export const Navbar = memo(({ 
  isScrolled, 
  scrollToSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  activeSection, 
  scrollYProgress 
}: NavbarProps) => {
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
      isScrolled ? "bg-paper/80 backdrop-blur-xl py-3 border-ink/5" : "bg-transparent py-6 border-transparent"
    )}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          onClick={() => (window as any).lenis?.scrollTo(0)}
          role="button"
          aria-label="Ir para o topo"
        >
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-full flex items-center justify-center text-paper font-bold shadow-lg group-hover:bg-ink transition-colors duration-500"
          >
            V
          </motion.div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tighter group-hover:text-accent transition-colors duration-500 truncate max-w-[150px] sm:max-w-none">Visão Sistémica</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "text-[10px] font-bold hover:text-accent transition-all duration-300 uppercase tracking-[0.3em] relative py-2",
                activeSection === link.href.replace('#', '') ? "text-accent" : "text-ink/60"
              )}
            >
              {link.name}
              {activeSection === link.href.replace('#', '') && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-paper border-b border-ink/10 p-6 lg:hidden flex flex-col gap-4 shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg font-serif hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
