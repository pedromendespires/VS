import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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
  Quote,
  Star,
  Plus,
  Minus,
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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---

const LAWS_DATA = [
  { 
    title: "Pertença", 
    law: "Todos têm o mesmo direito de pertencer.",
    violation: "Exclusão gera compensação: um descendente repete o destino do excluído.",
    color: "text-cyan-600"
  },
  { 
    title: "Ordem", 
    law: "Quem chegou antes tem precedência.",
    violation: "Parentalização: quando o filho tenta salvar os pais, perde a sua força.",
    color: "text-orange-600"
  },
  { 
    title: "Equilíbrio", 
    law: "Trocas justas entre iguais.",
    violation: "Dar em excesso ou recusar receber bloqueia o fluxo da abundância.",
    color: "text-pink-600"
  }
];

// --- Components ---

const Navbar = ({ isScrolled, scrollToSection, isMobileMenuOpen, setIsMobileMenuOpen }: { 
  isScrolled: boolean; 
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
}) => {
  const navLinks = [
    { name: 'Sintoma', href: '#irresponsabilidade' },
    { name: 'Emoção', href: '#vergonha' },
    { name: 'Crenças', href: '#crencas' },
    { name: 'Leis', href: '#leis' },
    { name: 'Síntese', href: '#sintese' },
    { name: 'Reconexão', href: '#reconexao' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-paper/90 backdrop-blur-md py-3 border-ink/10" : "bg-transparent py-6 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-paper font-bold group-hover:bg-ink transition-colors">V</div>
          <span className="font-serif text-xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors">Visão Sistémica</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium hover:text-accent transition-colors uppercase tracking-widest"
            >
              {link.name}
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
            {navLinks.map((link) => (
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLaw, setActiveLaw] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('success');
    setTimeout(() => setNewsletterStatus('idle'), 5000);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-accent/20">
      <Navbar 
        isScrolled={isScrolled} 
        scrollToSection={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
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
          <motion.path
            d="M 0 20 Q 25 10 50 20 T 100 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M 0 50 Q 25 60 50 50 T 100 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          <motion.path
            d="M 0 80 Q 25 70 50 80 T 100 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
        </svg>
      </div>

      {/* Hero Section */}
      <header ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#f5f2ed]">
        <motion.div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200 rounded-full blur-[120px]" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.3em]">
              Perspectiva Sistémica
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl lg:text-[11rem] font-serif leading-[0.85] mb-12 tracking-tighter"
          >
            O Ciclo da <br />
            <span className="italic text-accent">Desconexão</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-muted max-w-2xl mx-auto mb-16 font-light leading-relaxed"
          >
            Partimos do sintoma visível e mergulhamos na sabedoria das leis sistémicas invisíveis, onde a cura se inicia.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <a 
              href="#irresponsabilidade"
              onClick={(e) => scrollToSection(e, '#irresponsabilidade')}
              className="group relative px-12 py-5 bg-accent text-paper rounded-full font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-ink hover:scale-105"
            >
              Iniciar Exploração
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-ink rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/40 to-transparent" />
        </motion.div>
      </header>

      {/* 1. Sintoma */}
      <section id="irresponsabilidade" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="Fase 01: O Sintoma"
            title="A Armadilha da Irresponsabilidade"
            accent="text-red-600"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-red-100">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-serif mb-4">O Problema como Escudo</h3>
              <p className="text-muted leading-relaxed mb-6">
                Muitas vezes, ao afirmarmos <span className="text-ink font-medium italic">"tenho um problema..."</span>, estamos a converter o autoconhecimento numa estratégia de imobilismo. É a nossa "criança interior" que assume o leme, transformando o trauma num refúgio seguro para evitar os riscos e as responsabilidades da vida adulta.
              </p>
            </Card>

            <Card className="border-red-100">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Ghost size={24} />
              </div>
              <h3 className="text-2xl font-serif mb-4">A Fuga à Ação</h3>
              <p className="text-muted leading-relaxed mb-6">
                Se me escondo atrás de um trauma, não assumo responsabilidade. O problema torna-se a minha identidade inteira, impedindo o movimento em direção à vida.
              </p>
              <ul className="space-y-3">
                {[
                  "Digo 'Sou incapaz' para evitar liderar.",
                  "Digo 'A vida é injusta' para não partilhar.",
                  "Digo 'Falta-me algo' para não avançar."
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted">
                    <ChevronRight size={16} className="text-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. Emoção */}
      <section id="vergonha" className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="Fase 02: A Ponte Emocional"
            title="A Emoção da Vergonha"
            accent="text-pink-600"
          />
          
          <div className="bg-white p-12 rounded-[3rem] border border-ink/5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="px-6 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
                O Mecanismo de Defesa
              </div>
              <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-12">
                A vergonha atinge a identidade: é uma emoção que tem na sua génese...
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {[
                  { icon: <AlertCircle />, title: "Medo", desc: "De ser rejeitado ou expulso do grupo por não ser perfeito." },
                  { icon: <Zap />, title: "Raiva", desc: "Pela injustiça de ter de anular a própria essência." },
                  { icon: <CloudRain />, title: "Tristeza", desc: "Pela perda da ligação real às suas próprias raízes." }
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
        </div>
      </section>

      {/* 3. Crenças */}
      <section id="crencas" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="Fase 03: A Narrativa"
            title="Crenças Limitantes"
            accent="text-orange-600"
          />
          
          <div className="bento-grid">
            {[
              { title: "Não sou suficiente", axis: "Identidade", desc: "Para ser aceite, nego partes de mim. Acredito que a minha verdade é perigosa.", className: "col-span-1 md:col-span-2" },
              { title: "Não sou capaz", axis: "Capacidade", desc: "Estou fora do meu lugar. Ao carregar o peso dos antepassados, perco a minha força.", className: "col-span-1 md:col-span-2" },
              { title: "Não mereço", axis: "Merecimento", desc: "Dificuldade em acolher a vida. Se julgo o que recebi, sinto-me indigno de prosperar.", className: "col-span-1 md:col-span-4" }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn("bento-item group", item.className)}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-4">{item.axis}</div>
                <h4 className="text-3xl font-serif mb-4 group-hover:text-orange-600 transition-colors">{item.title}</h4>
                <p className="text-muted leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leis do Amor - Interactive Diagram */}
      <section id="leis" className="section-padding bg-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="Fase 04: A Raiz Sistémica"
            title="As Leis do Amor"
            accent="text-accent"
          />
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
            {/* Interactive Diagram */}
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
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
                        cx={pos.cx} cy={pos.cy} r="18"
                        className="fill-accent/20 blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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
              </svg>

              {/* Icons over circles */}
              <div className="absolute inset-0 pointer-events-none">
                {[
                  { id: 0, icon: <Layers />, top: "20%", left: "50%" },
                  { id: 1, icon: <Scale />, top: "70%", left: "20%" },
                  { id: 2, icon: <Heart />, top: "70%", left: "80%" }
                ].map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                      activeLaw === item.id ? "scale-125 text-accent" : "text-muted"
                    )}
                    style={{ top: item.top, left: item.left }}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Display */}
            <div className="w-full lg:w-1/2 min-h-[400px] flex items-center">
              <AnimatePresence mode="wait">
                {activeLaw !== null ? (
                  <motion.div
                    key={activeLaw}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-12 rounded-[3rem] bg-white shadow-2xl border border-ink/5"
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
                  <div className="text-center w-full p-12 rounded-[3rem] border-2 border-dashed border-ink/10 flex flex-col items-center justify-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                      <ArrowRight size={32} className="animate-pulse" />
                    </div>
                    <p className="text-muted italic text-lg">Selecione uma lei no diagrama para explorar a sua profundidade.</p>
                  </div>
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
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">O Efeito Dominó</h2>
            <p className="text-paper/60 max-w-2xl mx-auto font-light text-lg">
              Como a quebra de uma lei invisível flui através da emoção e se manifesta no bloqueio prático.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Arrows (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-0 w-full justify-around -translate-y-1/2 z-0 opacity-20">
              <ArrowRight size={48} className="text-paper" />
              <ArrowRight size={48} className="text-paper" />
            </div>
            
            {[
              { 
                label: "A Raiz (Lei)", 
                law: "Pertença", 
                desc: "A exclusão de um antepassado...",
                color: "border-cyan-500"
              },
              { 
                label: "O Filtro (Emoção)", 
                law: "Medo", 
                desc: "...gera um medo inconsciente de ser rejeitado...",
                color: "border-orange-500"
              },
              { 
                label: "O Fruto (Sintoma)", 
                law: "Isolamento", 
                desc: "...que se manifesta como isolamento na vida atual.",
                color: "border-pink-500"
              }
            ].map((item, i) => (
              <motion.div 
                key={item.law}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col gap-4"
              >
                <div className={cn("p-10 rounded-[3rem] bg-white/5 border-2 backdrop-blur-sm h-full flex flex-col justify-center text-center", item.color)}>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-6">{item.label}</div>
                  <h4 className="text-3xl font-serif mb-4">{item.law}</h4>
                  <p className="text-paper/60 font-light italic">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Reconexão */}
      <section id="reconexao" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="O Caminho de Volta"
            title="O Processo de Reconexão"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/nature/1000/1000" 
                  alt="Natureza e Equilíbrio" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

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
                <motion.div 
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="flex gap-8"
                >
                  <div className="text-4xl font-serif text-accent/30 font-bold">{item.step}</div>
                  <div>
                    <h4 className="text-2xl font-serif mb-2">{item.title}</h4>
                    <p className="text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
              
              <div className="pt-8">
                <button className="px-10 py-5 bg-ink text-paper rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors">
                  Aprofundar Jornada
                </button>
              </div>
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
            {[
              { 
                name: "Maria Silva", 
                role: "Empresária", 
                text: "A visão sistémica permitiu-me compreender porque é que os meus negócios estagnavam. Ao honrar a ordem, tudo começou a fluir.",
                stars: 5
              },
              { 
                name: "João Pereira", 
                role: "Arquiteto", 
                text: "Recuperei a minha força como homem ao voltar ao meu lugar de filho. A minha relação com o meu pai mudou radicalmente.",
                stars: 5
              },
              { 
                name: "Ana Costa", 
                role: "Psicóloga", 
                text: "Uma ferramenta indispensável para quem quer ir à raiz dos problemas e não apenas tratar os sintomas superficiais.",
                stars: 5
              }
            ].map((item) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-12 rounded-[3rem] bg-white border border-ink/5 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col group"
              >
                <div className="flex gap-1 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-xl font-serif italic leading-relaxed mb-12 group-hover:text-accent transition-colors">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling: O Meu Percurso */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/ocean/800/1200" 
                  alt="Natureza e Mar" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-full flex flex-col items-center justify-center p-8 text-paper text-center font-serif italic shadow-xl">
                <span className="text-sm">"O meu lugar é servir à vida através da sua história."</span>
                <span className="text-[10px] mt-2 not-italic font-sans uppercase tracking-widest opacity-70">Bert Hellinger</span>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 text-accent mb-4">
                <User size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">O Meu Percurso</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif leading-tight">A Intenção por trás do Olhar</h2>
              <p className="text-lg text-muted leading-relaxed">
                Não sou eu quem cura, é a própria vida que encontra o seu caminho quando paramos de lhe resistir. O meu trabalho é facilitar o encontro entre a sua dor e a força dos seus antepassados.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                Após anos de estudo das leis sistémicas, compreendi que cada sintoma é um pedido de amor de alguém que foi esquecido no sistema. Ao darmos lugar a esse alguém, o sintoma pode finalmente partir.
              </p>
              <div className="pt-8">
                <button className="px-10 py-5 bg-accent text-paper rounded-full font-bold uppercase text-xs tracking-widest hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/20">
                  Agendar Consulta
                </button>
              </div>
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
            {[
              { 
                q: "O que é um emaranhado sistémico?", 
                a: "É uma ligação inconsciente a um destino ou trauma de um antepassado. Quando alguém é excluído ou injustiçado no passado, um descendente pode 'repetir' esse padrão para tentar equilibrar o sistema." 
              },
              { 
                q: "Preciso que a minha família esteja presente?", 
                a: "Não. O trabalho sistémico é feito através da sua própria representação interna e campo morfológico. A mudança em si reverbera em todo o sistema, mesmo que os outros não estejam presentes." 
              },
              { 
                q: "Quanto tempo dura uma sessão?", 
                a: "Uma sessão típica dura entre 60 a 90 minutos. O foco não é o tempo, mas sim chegar ao ponto de clareza onde o movimento de cura pode começar." 
              },
              { 
                q: "Como sei se este trabalho é para mim?", 
                a: "Se sente que repete padrões, se tem bloqueios que não consegue explicar racionalmente ou se sente um peso que parece não ser seu, a visão sistémica pode trazer a luz necessária." 
              }
            ].map((item, i) => (
              <div key={item.q} className="border-b border-ink/10">
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
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-paper border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-4">
              <div 
                className="flex items-center gap-2 mb-8 cursor-pointer group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-paper font-bold group-hover:bg-ink transition-colors">V</div>
                <span className="font-serif text-xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors">Visão Sistémica</span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-8">
                Uma análise profunda sobre as forças invisíveis que governam as nossas dinâmicas relacionais.
              </p>
              <div className="flex gap-4">
                <a href="#!" aria-label="Instagram" className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-accent hover:text-paper transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#!" aria-label="Facebook" className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-accent hover:text-paper transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#!" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-accent hover:text-paper transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest mb-8">Navegação</h5>
                <ul className="space-y-4 text-sm text-muted">
                  <li><a href="#irresponsabilidade" onClick={(e) => scrollToSection(e, '#irresponsabilidade')} className="hover:text-accent transition-colors">Sintoma</a></li>
                  <li><a href="#vergonha" onClick={(e) => scrollToSection(e, '#vergonha')} className="hover:text-accent transition-colors">Emoção</a></li>
                  <li><a href="#crencas" onClick={(e) => scrollToSection(e, '#crencas')} className="hover:text-accent transition-colors">Crenças</a></li>
                  <li><a href="#leis" onClick={(e) => scrollToSection(e, '#leis')} className="hover:text-accent transition-colors">Leis</a></li>
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
