import React from 'react';
import { Shield, Ghost, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { Card } from '../Card';
import { Reveal } from '../Reveal';

export const Sintoma = () => (
  <section id="irresponsabilidade" className="pt-8 pb-32 px-6 md:px-12 lg:px-24 bg-white">
    <div className="max-w-7xl mx-auto">
      <SectionHeader 
        subtitle="O Ponto de Partida"
        title="Quando o Problema se Torna um Refúgio"
        accent="text-red-600"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <Reveal x={-20}>
          <Card className="border-red-100 h-full">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 text-red-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-6">
              <Shield size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-serif mb-4">A Proteção Inconsciente</h3>
            <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">
              Dizer <span className="text-ink font-medium italic">"eu tenho um problema"</span> pode ser, secretamente, uma forma de não mudar. A nossa criança interior usa a dor como um escudo para não enfrentar os riscos de crescer e assumir o leme da própria vida adulta.
            </p>
          </Card>
        </Reveal>

        <Reveal x={20}>
          <Card className="border-red-100 h-full">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 text-red-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-6">
              <Ghost size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-serif mb-4">O Labirinto da Inércia</h3>
            <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">
              Identificar-se com o trauma é uma forma de parar no tempo. Enquanto o problema for a sua identidade, a vida adulta e as suas infinitas possibilidades ficam à espera do lado de fora.
            </p>
            <ul className="space-y-3">
              {[
                "Uso a minha dor para não ter de agir.",
                "Culpo o passado para não construir o futuro.",
                "Mantenho o sintoma para continuar a pertencer."
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-xs md:text-sm text-muted">
                  <ChevronRight size={16} className="text-red-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </div>
  </section>
);
