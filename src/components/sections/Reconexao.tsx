import React from 'react';
import { SectionHeader } from '../SectionHeader';
import { Reveal } from '../Reveal';
import { Magnetic } from '../Magnetic';

export const Reconexao = () => (
  <section id="reconexao" className="section-padding bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <SectionHeader 
            subtitle="A Jornada de Cura"
            title="O Regresso ao Seu Lugar"
          />
          
          <div className="space-y-10 mt-12">
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
              <Reveal key={item.step} delay={i * 0.1} x={-20}>
                <div className="group flex gap-8 p-6 rounded-3xl hover:bg-paper transition-colors duration-500">
                  <div className="text-5xl font-serif text-accent/20 group-hover:text-accent transition-colors duration-500 font-light">{item.step}</div>
                  <div>
                    <h4 className="text-2xl font-serif mb-3 italic">{item.title}</h4>
                    <p className="text-muted leading-relaxed text-lg">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5} y={20}>
            <div className="mt-16">
              <Magnetic>
                <a 
                  href="https://wa.me/351912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-6 bg-accent text-paper rounded-full text-sm font-bold uppercase tracking-widest hover:bg-ink transition-all duration-500 shadow-2xl shadow-accent/20"
                >
                  Agendar Sessão de Constelação
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal x={30}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100/50 rounded-full blur-3xl" />
              
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://picsum.photos/seed/serenity/1200/1500" 
                  alt="Natureza e Equilíbrio" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-1000" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-12 right-12 bg-paper/80 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl max-w-xs">
                  <p className="font-serif text-xl italic leading-tight text-ink">
                    "A cura começa quando paramos de lutar contra o que foi."
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
