'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from '../../hooks/useTranslation';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      
      <div className="flex flex-col lg:flex-row gap-16">
        
        <div className="lg:w-5/12">
          <h1 className="text-4xl font-heading font-bold text-white mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-gray-muted text-lg mb-12">
            {t('contact.subtitle')}
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-dark-card p-3 rounded-lg border border-white/10">
                <FontAwesomeIcon icon={faEnvelope} className="text-neon text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">{t('contact.email_title')}</h3>
                <p className="text-gray-muted">suporte@nextcommerce.dev</p>
                <p className="text-gray-muted">parcerias@nextcommerce.dev</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-dark-card p-3 rounded-lg border border-white/10">
                <FontAwesomeIcon icon={faPhone} className="text-neon text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">{t('contact.phone_title')}</h3>
                <p className="text-gray-muted">+55 (11) 99999-9999</p>
                <p className="text-sm text-gray-500 mt-1">Seg-Sex, 9h às 18h</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-dark-card p-3 rounded-lg border border-white/10">
                <FontAwesomeIcon icon={faLocationDot} className="text-neon text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">{t('contact.hq_title')}</h3>
                <p className="text-gray-muted">Av. Paulista, 1000 - São Paulo, SP</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5">
            <h4 className="text-white font-bold mb-4">{t('contact.community_title')}</h4>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg transition font-medium">
                <FontAwesomeIcon icon={faDiscord} /> Discord
              </button>
              <button className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg transition font-medium">
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-7/12 bg-dark-card p-8 md:p-10 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-heading font-bold text-white mb-8">{t('contact.form_title')}</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form_name')}</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                  placeholder="João Silva"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form_email')}</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                  placeholder="joao@exemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form_subject')}</label>
              <select 
                id="subject" 
                className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors appearance-none"
              >
                <option>{t('contact.subject_order')}</option>
                <option>{t('contact.subject_feedback')}</option>
                <option>{t('contact.subject_partnership')}</option>
                <option>{t('contact.subject_other')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form_message')}</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors resize-none"
                placeholder="..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-neon hover:bg-neon-dark text-dark font-heading font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-neon"
            >
              {t('contact.form_btn')} <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}