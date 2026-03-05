import React, { memo } from 'react';
import { AlertCircle, Zap, CloudRain } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { Reveal } from '../Reveal';

export const Vergonha = memo(() => (
  <section id="vergonha" className="section-padding bg-paper">
    <div className="max-w-7xl mx-auto">
      <SectionHeader 
        subtitle="O Mergulho Interno"
        title="O que o Corpo Sente e a Mente Esconde"
        accent="text-pink-600"
      />
      
      <Reveal y={40}>
        <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-ink/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="px-4 md:px-6 py-2 bg-pink-50 text-pink-600 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-8">
              A Emoção da Vergonha
            </div>
            <p className="text-xl md:text-3xl font-serif leading-relaxed mb-8 md:mb-12">
              A vergonha não é sobre o que fez, mas sobre quem acredita ser. É uma bússola que aponta para onde a sua essência foi silenciada.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full">
              {[
                { icon: <AlertCircle />, title: "O Medo", desc: "De ser rejeitado ou expulso do grupo por não ser 'perfeito' o suficiente." },
                { icon: <Zap />, title: "A Raiva", desc: "Pela injustiça silenciosa de ter de anular a sua própria verdade." },
                { icon: <CloudRain />, title: "A Tristeza", desc: "Pela perda da ligação real às suas raízes e à sua força vital." }
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-paper/50">
                  <div className="text-pink-500 mb-3 sm:mb-4">{item.icon}</div>
                  <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
));

Vergonha.displayName = 'Vergonha';
