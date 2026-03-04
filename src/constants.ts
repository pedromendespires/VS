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
    law: "Ninguém pode ser deixado para trás.",
    violation: "Quando alguém é esquecido ou excluído, o sistema 'chama' um descendente para repetir esse destino, até que o lugar dessa pessoa seja honrado.",
    color: "text-cyan-600",
    icon: Heart
  },
  { 
    title: "Ordem", 
    law: "A vida flui de quem veio antes para quem vem depois.",
    violation: "Tentar 'salvar' os pais ou carregar o peso deles retira-nos a força para viver a nossa própria história. O amor que adoece é o que tenta inverter esta ordem.",
    color: "text-orange-600",
    icon: Layers
  },
  { 
    title: "Equilíbrio", 
    law: "O dar e o receber em harmonia.",
    violation: "Relações saudáveis nutrem-se de trocas equilibradas. Quando damos em excesso ou nos recusamos a receber, criamos dívidas emocionais que bloqueiam a nossa prosperidade.",
    color: "text-pink-600",
    icon: Scale
  }
];

export const FAQ_DATA = [
  { 
    q: "O que é, afinal, um emaranhado sistémico?", 
    a: "Imagine um fio invisível que o prende a uma dor que não é sua. É uma lealdade inconsciente a um antepassado que sofreu. O trabalho sistémico ajuda a identificar esse fio e a soltá-lo com amor, para que possa caminhar livre." 
  },
  { 
    q: "A minha família precisa de participar na sessão?", 
    a: "Não é necessário. O trabalho foca-se na sua imagem interna da família. Quando a sua perceção muda e encontra o seu lugar, todo o sistema ao seu redor começa a reorganizar-se naturalmente." 
  },
  { 
    q: "Quanto tempo demora até sentir resultados?", 
    a: "Cada processo é único. Alguns sentem um alívio imediato, como se um peso saísse dos ombros. Para outros, a mudança é como uma semente que cresce silenciosamente nos dias seguintes à sessão." 
  },
  { 
    q: "Como sei se este é o momento certo para mim?", 
    a: "Se sente que está a 'patinar' no mesmo lugar, se as suas relações repetem sempre o mesmo guião ou se carrega uma tristeza que não sabe de onde vem, o seu sistema está a pedir para ser visto." 
  }
];

export const TESTIMONIALS_DATA = [
  { 
    name: "Maria Silva", 
    role: "Empreendedora", 
    text: "Sempre senti que o sucesso me fugia por entre os dedos. Só quando olhei para a história da minha avó é que percebi que não me dava permissão para brilhar. Hoje, o meu negócio flui com uma leveza que nunca julguei possível.",
    stars: 5
  },
  { 
    name: "João Pereira", 
    role: "Arquiteto", 
    text: "A minha relação com o meu pai era um campo de batalha. Através da visão sistémica, deixei de ser o juiz dele para ser apenas o filho. Essa mudança devolveu-me a paz e a força que me faltavam.",
    stars: 5
  },
  { 
    name: "Ana Costa", 
    role: "Psicóloga", 
    text: "Trabalho com pessoas há anos, mas esta abordagem trouxe-me a clareza que faltava. É ir direto à alma do problema, sem rodeios, mas com uma compaixão profunda por tudo o que foi.",
    stars: 5
  }
];
