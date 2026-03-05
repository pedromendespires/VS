import React from 'react';
import { Instagram, Facebook, Linkedin, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  newsletterStatus: 'idle' | 'success';
  handleNewsletterSubmit: (e: React.FormEvent) => void;
}

export const Footer = ({ newsletterStatus, handleNewsletterSubmit }: FooterProps) => (
  <footer className="bg-paper border-t border-ink/5 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 lg:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-paper font-bold">V</div>
            <span className="font-serif text-2xl font-bold tracking-tighter">Visão Sistémica</span>
          </div>
          <p className="text-muted max-w-md mb-8 leading-relaxed">
            Acompanhamos pessoas e sistemas na descoberta da sua ordem natural, promovendo a cura através do reconhecimento e da inclusão de tudo o que foi.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-accent hover:text-paper hover:border-accent transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-xs">Newsletter</h4>
          <p className="text-sm text-muted mb-6">Receba reflexões sistémicas e novidades sobre workshops.</p>
          <form onSubmit={handleNewsletterSubmit} className="relative">
            <input 
              type="email" 
              placeholder="O seu e-mail" 
              required
              className="w-full bg-white border border-ink/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button 
              type="submit" 
              className="absolute right-1 top-1 bottom-1 w-10 h-10 bg-accent text-paper rounded-full flex items-center justify-center hover:bg-ink transition-colors"
            >
              {newsletterStatus === 'success' ? <CheckCircle2 size={18} /> : <Send size={18} />}
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p className="text-[10px] text-emerald-600 mt-2 font-medium">Subscrição efectuada com sucesso!</p>
          )}
        </div>

        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-xs">Contacto</h4>
          <ul className="space-y-4 text-sm text-muted">
            <li>Lisboa, Portugal</li>
            <li>geral@visaosistemica.pt</li>
            <li>+351 912 345 678</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t border-ink/5 flex flex-col md:row justify-between items-center gap-4 text-[10px] text-muted uppercase tracking-widest">
        <p>© 2024 Visão Sistémica. Todos os direitos reservados.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">Privacidade</a>
          <a href="#" className="hover:text-accent transition-colors">Termos</a>
        </div>
      </div>
    </div>
  </footer>
);
