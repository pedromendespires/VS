import React from 'react';
import { Heart, Layers, Scale } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Sintoma', href: '#irresponsabilidade' },
  { name: 'Emoção', href: '#vergonha' },
  { name: 'Crenças', href: '#crencas' },
  { name: 'Leis', href: '#leis' },
  { name: 'Síntese', href: '#sintese' },
  { name: 'Reconexão', href: '#reconexao' },
];

export const LAWS_DATA = [
  { 
    title: "Pertença", 
    law: "Todos têm o mesmo direito de pertencer.",
    violation: "Exclusão gera compensação: um descendente repete o destino do excluído.",
    color: "text-cyan-600",
    icon: Heart
  },
  { 
    title: "Ordem", 
    law: "Quem chegou antes tem precedência.",
    violation: "Parentalização: quando o filho tenta salvar os pais, perde a sua força.",
    color: "text-orange-600",
    icon: Layers
  },
  { 
    title: "Equilíbrio", 
    law: "Trocas justas entre iguais.",
    violation: "Dar em excesso ou recusar receber bloqueia o fluxo da abundância.",
    color: "text-pink-600",
    icon: Scale
  }
];

export const FAQ_DATA = [
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
];

export const TESTIMONIALS_DATA = [
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
];
