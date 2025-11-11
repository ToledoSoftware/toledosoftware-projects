'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faEnvelope, faArrowRight, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from '../hooks/useTranslation';
import { toast } from 'sonner';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark-card/30 backdrop-blur-md border-t border-white/5 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="text-2xl font-heading font-bold text-white flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center group-hover:bg-neon/20 transition-colors border border-neon/20">
                 <FontAwesomeIcon icon={faStore} className="text-neon transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              </div>
              NextCommerce
            </Link>
            <p className="text-gray-muted leading-relaxed max-w-md">
              {t('footer.about_text')}
            </p>
            
            <div className="flex gap-3 pt-4">
              <a href="https://github.com/ToledoSoftware" target="_blank" rel="noopener noreferrer" title="GitHub" className="w-10 h-10 flex items-center justify-center text-gray-muted hover:text-neon hover:scale-110 transition-all duration-300 bg-dark-lighter rounded-lg border border-white/5 hover:border-neon/30 hover:shadow-neon">
                <FontAwesomeIcon icon={faGithub} className="text-lg" />
              </a>
              <a href="https://www.linkedin.com/in/emmanuellucastoledo" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-10 h-10 flex items-center justify-center text-gray-muted hover:text-neon hover:scale-110 transition-all duration-300 bg-dark-lighter rounded-lg border border-white/5 hover:border-neon/30 hover:shadow-neon">
                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
              </a>
              <a href="https://wa.me/5511921014001" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-10 h-10 flex items-center justify-center text-gray-muted hover:text-neon hover:scale-110 transition-all duration-300 bg-dark-lighter rounded-lg border border-white/5 hover:border-neon/30 hover:shadow-neon">
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-heading font-semibold mb-6 tracking-wider flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 bg-neon rounded-full inline-block shadow-[0_0_8px_rgba(167,139,250,0.8)]"></span> {t('footer.nav_title')}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-muted hover:text-white transition-colors flex items-center gap-2 group"><FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-neon opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" /> {t('header.home')}</Link></li>
              <li><Link href="/produtos" className="text-gray-muted hover:text-white transition-colors flex items-center gap-2 group"><FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-neon opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" /> {t('header.products')}</Link></li>
              <li><Link href="/sobre" className="text-gray-muted hover:text-white transition-colors flex items-center gap-2 group"><FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-neon opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" /> {t('header.about')}</Link></li>
              <li><Link href="/contato" className="text-gray-muted hover:text-white transition-colors flex items-center gap-2 group"><FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-neon opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" /> {t('header.contact')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-white font-heading font-semibold mb-6 tracking-wider flex items-center gap-2 text-sm">
               <span className="w-1.5 h-1.5 bg-neon rounded-full inline-block shadow-[0_0_8px_rgba(167,139,250,0.8)]"></span> {t('footer.newsletter_title')}
            </h3>
            <p className="text-gray-muted text-sm mb-4">
              {t('footer.newsletter_text')}
            </p>
            <form className="flex gap-2" onSubmit={(e) => { 
                e.preventDefault(); 
                toast.success('Inscrição realizada!', {
                    description: 'Bem-vindo à elite tech.',
                });
            }}>
                          <div className="relative flex-grow">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input 
                  type="email" 
                  placeholder={t('footer.newsletter_placeholder')} 
                  required
                  className="w-full bg-dark-lighter border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon/50 transition-colors"
                />
              </div>
              <button type="submit" className="bg-neon hover:bg-neon-dark text-dark font-bold p-2.5 rounded-lg transition-all duration-300 hover:shadow-neon flex-shrink-0" aria-label="Inscrever">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-muted text-sm">
          <p>© 2025 NextCommerce. {t('footer.developed_by')} <a href="https://github.com/ToledoSoftware" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">Emmanuel Toledo</a>.</p>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-neon transition-colors text-xs">{t('footer.support_terms')}</Link>
            <Link href="#" className="hover:text-neon transition-colors text-xs">{t('footer.support_privacy')}</Link>
            
            <div className="flex items-center gap-1.5 font-mono text-[10px] opacity-50 bg-white/5 px-2 py-1 rounded-md border border-white/5">
              <FontAwesomeIcon icon={faCodeBranch} />
              <span>v1.2.0-beta</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}