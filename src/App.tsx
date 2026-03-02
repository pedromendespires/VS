import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Ghost
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sintoma', href: '#irresponsabilidade' },
    { name: 'Emoção', href: '#vergonha' },
    { name: 'Crenças', href: '#crencas' },
    { name: 'Leis', href: '#leis' },
    { name: 'Síntese', href: '#sintese' },
    { name: 'Reconexão', href: '#reconexao' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80; // Height of the fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elemRect = elem.getBoundingClientRect().top;
      const elemPosition = elemRect - bodyRect;
      const offsetPosition = elemPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-paper/90 backdrop-blur-md py-3 border-ink/10" : "bg-transparent py-6 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-paper font-bold">V</div>
          <span className="font-serif text-xl font-bold tracking-tight uppercase">Visão Sistémica</span>
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
  <div className="max-w-3xl mb-16">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-4", accent || "text-accent")}
    >
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
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
  return (
    <div className="min-h-screen selection:bg-accent/20">
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#f5f2ed]">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
              Perspectiva Sistémica
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] mb-8 tracking-tighter"
          >
            O Ciclo da <br />
            <span className="italic text-accent">Desconexão</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Partimos do sintoma visível e mergulhamos na sabedoria das leis sistémicas invisíveis, onde a cura se inicia.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#irresponsabilidade"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-paper rounded-full font-medium transition-all hover:bg-accent/90"
            >
              Iniciar Exploração
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ArrowDown size={32} />
        </div>
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
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted">
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
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-paper/50">
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
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { title: "Não sou suficiente", axis: "Identidade", desc: "Para ser aceite, nego partes de mim. Acredito que a minha verdade é perigosa." },
              { title: "Não sou capaz", axis: "Capacidade", desc: "Estou fora do meu lugar. Ao carregar o peso dos antepassados, perco a minha força." },
              { title: "Não mereço", axis: "Merecimento", desc: "Dificuldade em acolher a vida. Se julgo o que recebi, sinto-me indigno de prosperar." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-ink/5 hover:border-orange-200 transition-colors group bg-paper/30"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-2">{item.axis}</div>
                <h4 className="text-2xl font-serif mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h4>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leis do Amor */}
      <section id="leis" className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="Fase 04: A Raiz Sistémica"
            title="As Leis do Amor"
            accent="text-cyan-600"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Layers />, 
                title: "Pertença", 
                color: "text-cyan-600", 
                bg: "bg-cyan-50",
                law: "Todos têm o mesmo direito de pertencer.",
                violation: "Exclusão gera compensação: um descendente repete o destino do excluído."
              },
              { 
                icon: <Scale />, 
                title: "Ordem", 
                color: "text-orange-600", 
                bg: "bg-orange-50",
                law: "Quem chegou antes tem precedência.",
                violation: "Parentalização: quando o filho tenta salvar os pais, perde a sua força."
              },
              { 
                icon: <Heart />, 
                title: "Equilíbrio", 
                color: "text-pink-600", 
                bg: "bg-pink-50",
                law: "Trocas justas entre iguais.",
                violation: "Dar em excesso ou recusar receber bloqueia o fluxo da abundância."
              }
            ].map((item, i) => (
              <Card key={i} className="flex flex-col h-full">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8", item.bg, item.color)}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif mb-6">{item.title}</h3>
                <div className="space-y-6 flex-grow">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">A Lei</div>
                    <p className="text-sm font-medium">{item.law}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">A Violação</div>
                    <p className="text-sm text-muted leading-relaxed">{item.violation}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Síntese: O Efeito Dominó */}
      <section id="sintese" className="section-padding bg-ink text-paper">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">O Efeito Dominó</h2>
            <p className="text-paper/60 max-w-2xl mx-auto font-light text-lg">
              Como a quebra de uma lei invisível flui através da emoção e se manifesta no bloqueio prático.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Lines (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-paper/10 -translate-y-1/2 z-0" />
            
            {[
              { 
                label: "Identidade", 
                law: "Pertença", 
                emotion: "Medo", 
                belief: "Não sou suficiente", 
                result: "Fuga e Isolamento",
                color: "border-cyan-500"
              },
              { 
                label: "Capacidade", 
                law: "Ordem", 
                emotion: "Tristeza", 
                belief: "Não sou capaz", 
                result: "A Eterna Criança",
                color: "border-orange-500"
              },
              { 
                label: "Merecimento", 
                law: "Equilíbrio", 
                emotion: "Raiva", 
                belief: "Não mereço", 
                result: "Injustiça Paralisante",
                color: "border-pink-500"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col gap-4"
              >
                <div className={cn("p-8 rounded-[2rem] bg-white/5 border-2 backdrop-blur-sm", item.color)}>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-6">{item.label}</div>
                  
                  <div className="space-y-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs opacity-40">A Raiz</span>
                      <span className="text-xl font-serif">{item.law}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs opacity-40">A Emoção</span>
                      <span className="text-xl font-serif">{item.emotion}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs opacity-40">A Crença</span>
                      <span className="text-xl font-serif italic">"{item.belief}"</span>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-accent">O Bloqueio</span>
                      <p className="mt-2 text-sm opacity-80">{item.result}</p>
                    </div>
                  </div>
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
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-full flex flex-col items-center justify-center p-8 text-paper text-center font-serif italic shadow-2xl">
                <span className="text-lg">"Sofrer é mais fácil do que agir."</span>
                <span className="text-[10px] mt-2 not-italic font-sans uppercase tracking-widest opacity-70">Bert Hellinger</span>
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
                <div key={i} className="flex gap-8">
                  <div className="text-4xl font-serif text-accent/30 font-bold">{item.step}</div>
                  <div>
                    <h4 className="text-2xl font-serif mb-2">{item.title}</h4>
                    <p className="text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
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

      {/* Footer */}
      <footer className="py-24 bg-paper border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-paper font-bold">V</div>
              <span className="font-serif text-xl font-bold tracking-tight uppercase">Visão Sistémica</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Uma análise profunda sobre as forças invisíveis que governam as nossas dinâmicas relacionais.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Navegação</h5>
              <ul className="space-y-4 text-sm text-muted">
                <li><a href="#irresponsabilidade" className="hover:text-accent">Sintoma</a></li>
                <li><a href="#vergonha" className="hover:text-accent">Emoção</a></li>
                <li><a href="#crencas" className="hover:text-accent">Crenças</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Conceitos</h5>
              <ul className="space-y-4 text-sm text-muted">
                <li><a href="#leis" className="hover:text-accent">Leis do Amor</a></li>
                <li><a href="#sintese" className="hover:text-accent">Efeito Dominó</a></li>
                <li><a href="#reconexao" className="hover:text-accent">Cura</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Contacto</h5>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-ink/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          <span>© 2026 Visão Sistémica</span>
          <span>Desenvolvido com Consciência</span>
        </div>
      </footer>
    </div>
  );
}
