'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useUIStore } from '../store/useUIStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHome, faBoxOpen, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  return (
    <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible delay-300'}`}>
      
      <div 
        className={`absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeMobileMenu}
      />

      <div className={`absolute top-0 left-0 w-4/5 max-w-sm h-full bg-dark-card border-r border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-heading font-bold text-white">{t('mobile_menu.title')}</h2>
          <button onClick={closeMobileMenu} className="p-2 text-gray-muted hover:text-neon transition">
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        <div className="p-6 pb-0">
             <LanguageSwitcher />
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-4 p-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group">
              <FontAwesomeIcon icon={faHome} className="text-lg text-gray-500 group-hover:text-neon transition-colors" />
              <span className="font-medium tracking-wide">{t('header.home')}</span>
          </Link>
          <Link href="/produtos" onClick={closeMobileMenu} className="flex items-center gap-4 p-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group">
              <FontAwesomeIcon icon={faBoxOpen} className="text-lg text-gray-500 group-hover:text-neon transition-colors" />
              <span className="font-medium tracking-wide">{t('header.products')}</span>
          </Link>
          <Link href="/sobre" onClick={closeMobileMenu} className="flex items-center gap-4 p-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group">
              <FontAwesomeIcon icon={faInfoCircle} className="text-lg text-gray-500 group-hover:text-neon transition-colors" />
              <span className="font-medium tracking-wide">{t('header.about')}</span>
          </Link>
          <Link href="/contato" onClick={closeMobileMenu} className="flex items-center gap-4 p-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group">
              <FontAwesomeIcon icon={faEnvelope} className="text-lg text-gray-500 group-hover:text-neon transition-colors" />
              <span className="font-medium tracking-wide">{t('header.contact')}</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5 bg-dark-lighter/30">
            <p className="text-gray-muted text-sm text-center font-mono opacity-60">
                {t('mobile_menu.footer_text')}
            </p>
        </div>

      </div>
    </div>
  );
}