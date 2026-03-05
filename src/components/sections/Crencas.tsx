import React from 'react';
import { SectionHeader } from '../SectionHeader';
import { Reveal } from '../Reveal';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Crencas = () => (
  <section id="crencas" className="section-padding bg-white">
    <div className="max-w-7xl mx-auto">
      <SectionHeader 
        subtitle="O Filtro da Realidade"
        title="As Histórias que Contamos a Nós Mesmos"
        accent="text-orange-600"
      />
      
      <div className="bento-grid">
        {[
          { title: "Não sou suficiente", axis: "Identidade", desc: "Para ser aceite, nego partes de mim. Acredito que a minha verdade é perigosa e que preciso de ser outro para ser amado.", className: "col-span-1 lg:col-span-2" },
          { title: "Não sou capaz", axis: "Capacidade", desc: "Estou fora do meu lugar. Ao carregar o peso dos que vieram antes, perco a força para realizar o que é meu.", className: "col-span-1 lg:col-span-2" },
          { title: "Não mereço", axis: "Merecimento", desc: "Dificuldade em acolher a abundância. Se julgo o que recebi dos meus pais, sinto-me indigno de prosperar na vida.", className: "col-span-1 lg:col-span-4" }
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
);
