import React, { memo } from 'react';
import { SectionHeader } from '../SectionHeader';
import { Reveal } from '../Reveal';

export const Reconexao = memo(() => (
  <section id="reconexao" className="section-padding bg-white">
    <div className="max-w-7xl mx-auto">
      <SectionHeader 
        subtitle="A Jornada de Cura"
        title="O Regresso ao Seu Lugar"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <Reveal x={-30}>
          <div className="relative">
            <div className="aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
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
        </div>
      </div>
    </div>
  </section>
));

Reconexao.displayName = 'Reconexao';
