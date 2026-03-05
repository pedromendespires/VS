import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from 'motion/react';
import { 
  ArrowDown, 
  Shield, 
  Heart, 
  Scale, 
  Layers, 
  ChevronRight, 
  CloudRain,
  AlertCircle,
  CheckCircle2,
  Menu,
  X,
  Zap,
  Ghost,
  MessageCircle,
  Send,
  Star,
  ChevronDown,
  ArrowRight,
  User,
  Instagram,
  Facebook,
  Linkedin,
  ArrowUp
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NAV_LINKS, LAWS_DATA, FAQ_DATA, TESTIMONIALS_DATA } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
  key?: string | number;
}

const Reveal = ({ children, delay = 0, x = 0, y = 20, className }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = ({ isScrolled, scrollToSection, isMobileMenuOpen, setIsMobileMenuOpen, activeSection, scrollYProgress }: { 
  isScrolled: boolean; 
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
  activeSection: string;
  scrollYProgress: any;
}) => {
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
      
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          aria-label="Ir para o topo"
        >
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-paper font-bold shadow-lg group-hover:bg-ink transition-colors duration-500"
          >
            V
          </motion.div>
          <span className="font-serif text-2xl font-bold tracking-tighter group-hover:text-accent transition-colors duration-500">Visão Sistémica</span>
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
};

const SectionHeader = ({ title, subtitle, accent }: { title: string, subtitle: string, accent?: string }) => (
  <div className="max-w-3xl mb-24">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn("text-[10px] font-bold uppercase tracking-[0.5em] mb-6", accent || "text-accent")}
    >
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tighter"
    >
      {title}
    </motion.h2>
  </div>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn("bg-white p-8 rounded-3xl border border-ink/5 shadow-sm hover:shadow-md transition-shadow", className)}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLaw, setActiveLaw] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');
  const [activeSection, setActiveSection] = useState('');

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, 300]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -100]);
  const heroSubtextY = useTransform(heroProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1]);

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('success');
    setTimeout(() => setNewsletterStatus('idle'), 5000);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Active section detection using IntersectionObserver
    const sections = NAV_LINKS.map(l => l.href.replace('#', '')).concat(['percurso', 'sintese']);
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });

      // Special case for bottom of page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection('percurso');
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-accent/20">
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

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />

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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-28 right-8 z-50 w-12 h-12 bg-white border border-ink/10 rounded-full flex items-center justify-center shadow-xl hover:bg-accent hover:text-paper transition-all"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={20} />
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

      {/* Hero Section */}
      <header ref={heroRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-[#f5f2ed]">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[150px]" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div style={{ y: heroTextY }}>
            <Reveal delay={2.4} y={40}>
              <h1 className="text-8xl md:text-[10rem] lg:text-[13rem] font-serif leading-[0.8] mb-16 tracking-tighter">
                A Visão <br />
                <span className="italic text-accent">Sistémica</span>
              </h1>
            </Reveal>
          </motion.div>
          
          <motion.div style={{ y: heroSubtextY }}>
            <Reveal delay={2.8}>
              <p className="text-xl md:text-3xl text-muted max-w-3xl mx-auto mb-20 font-light leading-relaxed">
                Onde a sua história encontra o seu lugar. Descubra as forças invisíveis que moldam a sua vida e recupere a sua liberdade de ser.
              </p>
            </Reveal>
          </motion.div>
          
          {/* Removed "Começar a Jornada" button as requested */}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/40 to-transparent" />
        </motion.div>
      </header>

      {/* 1. Sintoma */}
      <section id="irresponsabilidade" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="O Ponto de Partida"
            title="Quando o Problema se Torna um Refúgio"
            accent="text-red-600"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Reveal x={-20}>
              <Card className="border-red-100 h-full">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-serif mb-4">A Proteção Inconsciente</h3>
                <p className="text-muted leading-relaxed mb-6">
                  Dizer <span className="text-ink font-medium italic">"eu tenho um problema"</span> pode ser, secretamente, uma forma de não mudar. A nossa criança interior usa a dor como um escudo para não enfrentar os riscos de crescer e assumir o leme da própria vida adulta.
                </p>
              </Card>
            </Reveal>
 
            <Reveal x={20}>
              <Card className="border-red-100 h-full">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                  <Ghost size={24} />
                </div>
                <h3 className="text-2xl font-serif mb-4">O Labirinto da Inércia</h3>
                <p className="text-muted leading-relaxed mb-6">
                  Identificar-se com o trauma é uma forma de parar no tempo. Enquanto o problema for a sua identidade, a vida adulta e as suas infinitas possibilidades ficam à espera do lado de fora.
                </p>
                <ul className="space-y-3">
                  {[
                    "Uso a minha dor para não ter de agir.",
                    "Culpo o passado para não construir o futuro.",
                    "Mantenho o sintoma para continuar a pertencer."
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <ChevronRight size={16} className="text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Emoção */}
      <section id="vergonha" className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="O Mergulho Interno"
            title="O que o Corpo Sente e a Mente Esconde"
            accent="text-pink-600"
          />
          
          <Reveal y={40}>
            <div className="bg-white p-12 rounded-[3rem] border border-ink/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
              
              <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                <div className="px-6 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
                  A Emoção da Vergonha
                </div>
                <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-12">
                  A vergonha não é sobre o que fez, mas sobre quem acredita ser. É uma bússola que aponta para onde a sua essência foi silenciada.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {[
                    { icon: <AlertCircle />, title: "O Medo", desc: "De ser rejeitado ou expulso do grupo por não ser 'perfeito' o suficiente." },
                    { icon: <Zap />, title: "A Raiva", desc: "Pela injustiça silenciosa de ter de anular a sua própria verdade." },
                    { icon: <CloudRain />, title: "A Tristeza", desc: "Pela perda da ligação real às suas raízes e à sua força vital." }
                  ].map((item) => (
                    <div key={item.title} className="flex flex-col items-center p-6 rounded-2xl bg-paper/50">
                      <div className="text-pink-500 mb-4">{item.icon}</div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Crenças */}
      <section id="crencas" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="O Filtro da Realidade"
            title="As Histórias que Contamos a Nós Mesmos"
            accent="text-orange-600"
          />
          
          <div className="bento-grid">
            {[
              { title: "Não sou suficiente", axis: "Identidade", desc: "Para ser aceite, nego partes de mim. Acredito que a minha verdade é perigosa e que preciso de ser outro para ser amado.", className: "col-span-1 md:col-span-2" },
              { title: "Não sou capaz", axis: "Capacidade", desc: "Estou fora do meu lugar. Ao carregar o peso dos que vieram antes, perco a força para realizar o que é meu.", className: "col-span-1 md:col-span-2" },
              { title: "Não mereço", axis: "Merecimento", desc: "Dificuldade em acolher a abundância. Se julgo o que recebi dos meus pais, sinto-me indigno de prosperar na vida.", className: "col-span-1 md:col-span-4" }
            ].map((item, i) => (
              <Reveal key={item.title} delay={item.title === "Não mereço" ? 0.3 : i * 0.1} y={30}>
                <div className={cn("bento-item group h-full", item.className)}>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-4">{item.axis}</div>
                  <h4 className="text-3xl font-serif mb-4 group-hover:text-orange-600 transition-colors">{item.title}</h4>
                  <p className="text-muted leading-relaxed text-lg">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leis do Amor - Interactive Diagram */}
      <section id="leis" className="section-padding bg-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="A Ordem que Liberta"
            title="O Fluxo Invisível da Vida"
            accent="text-accent"
          />
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
            {/* Interactive Diagram */}
            <Reveal x={-30} className="w-full lg:w-1/2">
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
                            "cursor-pointer transition-all duration-500", 
                            activeLaw === pos.id ? "fill-accent/10 stroke-accent" : "fill-white stroke-ink/10"
                          )}
                          strokeWidth="0.5"
                          onClick={() => setActiveLaw(pos.id)}
                          onMouseEnter={() => setActiveLaw(pos.id)}
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
            <div className="w-full lg:w-1/2 min-h-[400px] flex items-center">
              <AnimatePresence mode="wait">
                {activeLaw !== null ? (
                  <motion.div
                    key={activeLaw}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-12 rounded-[3rem] bg-white shadow-2xl border border-ink/5 w-full"
                  >
                    {(() => {
                      const item = LAWS_DATA[activeLaw];
                      return (
                        <div>
                          <h3 className={cn("text-4xl font-serif mb-8", item.color)}>{item.title}</h3>
                          <div className="space-y-8">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3">A Lei Sagrada</div>
                              <p className="text-xl font-medium leading-relaxed">{item.law}</p>
                            </div>
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3">A Consequência da Violação</div>
                              <p className="text-muted leading-relaxed text-lg">{item.violation}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <Reveal x={20} className="w-full">
                    <div className="text-center w-full p-12 rounded-[3rem] border-2 border-dashed border-ink/10 flex flex-col items-center justify-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                        <ArrowRight size={32} className="animate-pulse" />
                      </div>
                      <p className="text-muted italic text-lg">Selecione uma lei no diagrama para explorar a sua profundidade.</p>
                    </div>
                  </Reveal>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Síntese: O Efeito Dominó */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Arrows (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-0 w-full justify-around -translate-y-1/2 z-0 opacity-10">
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
                icon: <Shield className="text-cyan-400 mb-6" size={32} />
              },
              { 
                label: "O Filtro (Emoção)", 
                law: "Medo", 
                desc: "...gera um medo inconsciente de ser rejeitado...",
                color: "border-orange-500/30 bg-orange-500/5",
                icon: <Zap className="text-orange-400 mb-6" size={32} />
              },
              { 
                label: "O Fruto (Sintoma)", 
                law: "Isolamento", 
                desc: "...que se manifesta como isolamento na vida atual.",
                color: "border-pink-500/30 bg-pink-500/5",
                icon: <Ghost className="text-pink-400 mb-6" size={32} />
              }
            ].map((item, i) => (
              <Reveal key={item.law} delay={i * 0.2} y={40}>
                <div className={cn("p-12 rounded-[3rem] border-2 backdrop-blur-sm h-full flex flex-col items-center text-center group hover:border-paper/20 transition-all duration-500", item.color)}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper/40 mb-8">{item.label}</div>
                  {item.icon}
                  <h4 className="text-3xl font-serif mb-6">{item.law}</h4>
                  <p className="text-paper/60 leading-relaxed font-light">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Reconexão */}
      <section id="reconexao" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="A Jornada de Cura"
            title="O Regresso ao Seu Lugar"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal x={-30}>
              <div className="relative">
                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/nature/1000/1000" 
                    alt="Natureza e Equilíbrio" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>

            <div className="space-y-12">
              {[
                { 
                  step: "01", 
                  title: "Reintegrar", 
                  desc: "Incluir no coração todos os que foram julgados, devolvendo-lhes o seu direito de pertencer sem condições." 
                },
                { 
                  step: "02", 
                  title: "Descer", 
                  desc: "Voltar ao lugar de 'pequeno' diante dos pais, curvando-se ao destino deles sem tentar alterá-lo ou salvá-los." 
                },
                { 
                  step: "03", 
                  title: "Acolher", 
                  desc: "Tomar a vida como ela é, honrando o fluxo que veio antes, e agir como um adulto responsável no presente." 
                }
              ].map((item, i) => (
                <Reveal key={item.step} delay={i * 0.1} x={20}>
                  <div className="flex gap-8">
                    <div className="text-4xl font-serif text-accent/30 font-bold">{item.step}</div>
                    <div>
                      <h4 className="text-2xl font-serif mb-2">{item.title}</h4>
                      <p className="text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              
              <Reveal delay={0.4} y={20}>
                <div className="pt-8">
                  <button className="px-10 py-5 bg-ink text-paper rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors shadow-lg">
                    Aprofundar Jornada
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-paper overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="Impacto Real"
            title="Vozes de Transformação"
            accent="text-accent"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1} y={30}>
                <div className="p-12 rounded-[3rem] bg-white border border-ink/5 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col group h-full">
                  <div className="flex gap-1 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} size={14} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-xl font-serif italic leading-relaxed mb-12 group-hover:text-accent transition-colors flex-grow">
                    "{item.text}"
                  </p>
                  <div className="mt-auto pt-8 border-t border-ink/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm uppercase tracking-widest">{item.name}</h5>
                      <p className="text-[10px] text-muted uppercase tracking-widest font-medium">{item.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling: O Meu Percurso */}
      <section id="percurso" className="section-padding bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal x={-50}>
              <div className="relative">
                <div className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/ocean/800/1200" 
                    alt="Natureza e Mar" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-full flex flex-col items-center justify-center p-8 text-paper text-center font-serif italic shadow-xl">
                  <span className="text-sm">"O meu lugar é servir à vida através da sua história."</span>
                  <span className="text-[10px] mt-2 not-italic font-sans uppercase tracking-widest opacity-70">Bert Hellinger</span>
                </div>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal y={20}>
                <div className="inline-flex items-center gap-3 text-accent mb-4">
                  <User size={20} />
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">O Meu Percurso</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif leading-tight">Guiando Almas ao seu Lugar</h2>
                <p className="text-lg text-muted leading-relaxed">
                  Acredito que cada pessoa carrega em si a semente da sua própria cura. O meu papel é apenas preparar o terreno, removendo as pedras sistémicas que impedem o seu crescimento natural.
                </p>
                <p className="text-lg text-muted leading-relaxed">
                  Não sou eu quem cura, é a própria vida que encontra o seu caminho quando paramos de lhe resistir. O meu trabalho é facilitar o encontro entre a sua dor e a força dos seus antepassados.
                </p>
                <div className="pt-8">
                  <button className="px-10 py-5 bg-accent text-paper rounded-full font-bold uppercase text-xs tracking-widest hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/20">
                    Agendar Consulta
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-paper">
        <div className="max-w-3xl mx-auto">
          <SectionHeader 
            subtitle="Dúvidas Comuns"
            title="Esclarecer o Caminho"
            accent="text-accent"
          />
          
          <div className="space-y-4">
            {FAQ_DATA.map((item, i) => (
              <Reveal key={i} delay={i * 0.1} y={10}>
                <div className="border-b border-ink/10">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full py-8 flex items-center justify-between text-left group"
                  >
                    <span className={cn("text-xl font-serif transition-colors", openFaq === i ? "text-accent" : "group-hover:text-accent")}>{item.q}</span>
                    <div className={cn("w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500", 
                      openFaq === i ? "rotate-180 bg-accent border-accent text-paper" : "border-ink/10 text-muted group-hover:border-accent group-hover:text-accent")}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-muted leading-relaxed text-lg">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-paper border-t border-ink/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-4">
              <div 
                className="flex items-center gap-2 mb-8 cursor-pointer group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                role="button"
                aria-label="Ir para o topo"
              >
                <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-paper font-bold group-hover:bg-ink transition-colors">V</div>
                <span className="font-serif text-xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors">Visão Sistémica</span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-8">
                Uma análise profunda sobre as forças invisíveis que governam as nossas dinâmicas relacionais.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#!" 
                    aria-label="Social Link"
                    whileHover={{ y: -5 }}
                    className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-accent hover:text-paper transition-all"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest mb-8">Navegação</h5>
                <ul className="space-y-4 text-sm text-muted">
                  {NAV_LINKS.map(link => (
                    <li key={link.name}>
                      <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-accent transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest mb-8">Conceitos</h5>
                <ul className="space-y-4 text-sm text-muted">
                  <li><a href="#sintese" onClick={(e) => scrollToSection(e, '#sintese')} className="hover:text-accent transition-colors">Efeito Dominó</a></li>
                  <li><a href="#reconexao" onClick={(e) => scrollToSection(e, '#reconexao')} className="hover:text-accent transition-colors">Reconexão</a></li>
                  <li><a href="#percurso" onClick={(e) => scrollToSection(e, '#percurso')} className="hover:text-accent transition-colors">O Meu Percurso</a></li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-8">Newsletter</h5>
              <p className="text-sm text-muted mb-6">Receba insights semanais sobre visão sistémica.</p>
              <AnimatePresence mode="wait">
                {newsletterStatus === 'idle' ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative" 
                    onSubmit={handleNewsletterSubmit}
                  >
                    <label htmlFor="newsletter-email" className="sr-only">Endereço de e-mail</label>
                    <input 
                      id="newsletter-email"
                      type="email" 
                      placeholder="O seu e-mail" 
                      className="w-full bg-white border border-ink/10 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-accent transition-colors"
                      required
                    />
                    <button 
                      type="submit"
                      aria-label="Subscrever newsletter"
                      className="absolute right-2 top-2 w-10 h-10 bg-accent text-paper rounded-full flex items-center justify-center hover:bg-accent/90 transition-all"
                    >
                      <Send size={16} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-accent/10 border border-accent/20 rounded-2xl p-4 flex items-center gap-3 text-accent"
                  >
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-medium">Obrigado! Inscrição confirmada.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="pt-12 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-muted uppercase tracking-[0.2em]">
            <p>© 2026 Visão Sistémica. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#!" className="hover:text-accent transition-colors">Política de Privacidade</a>
              <a href="#!" className="hover:text-accent transition-colors">Termos de Utilização</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
