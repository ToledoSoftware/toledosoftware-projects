'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from '../../hooks/useTranslation';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-heading font-bold text-white mb-2">
            <FontAwesomeIcon icon={faStore} className="text-neon" />
            NextCommerce
          </Link>
          <p className="text-gray-muted">{t('login.welcome_back')}</p>
        </div>

        <div className="bg-dark-card p-8 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">{t('login.title')}</h2>
          
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 bg-white text-dark font-bold py-3 px-4 rounded-xl hover:scale-[1.02] transition">
              <FontAwesomeIcon icon={faGoogle} className="text-lg" />
              {t('login.btn_google')}
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-[#24292e] text-white font-bold py-3 px-4 rounded-xl border border-white/10 hover:scale-[1.02] transition">
              <FontAwesomeIcon icon={faGithub} className="text-lg" />
              {t('login.btn_github')}
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <hr className="w-full border-white/10" />
            <span className="absolute bg-dark-card px-4 text-xs text-gray-500 uppercase tracking-wider">{t('login.divider')}</span>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">{t('login.email_label')}</label>
              <input type="email" placeholder="voce@exemplo.com" className="w-full bg-dark-lighter border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors" />
            </div>
            <div>
               <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-sm font-medium text-gray-300">{t('login.password_label')}</label>
                <Link href="#" className="text-xs text-neon hover:underline">{t('login.forgot_password')}</Link>
               </div>
              <input type="password" placeholder="••••••••" className="w-full bg-dark-lighter border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors" />
            </div>
            <Link href="/" className="w-full bg-neon hover:bg-neon-dark text-dark font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-6">
              {t('login.btn_enter')} <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </form>
        </div>

        <p className="text-center text-gray-muted mt-8">
          {t('login.no_account')} <Link href="#" className="text-neon font-bold hover:underline">{t('login.register')}</Link>
        </p>

      </div>
    </div>
  );
}