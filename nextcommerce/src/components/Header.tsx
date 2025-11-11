'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const { getTotalItems, toggleCart } = useCartStore();
  const { openSearch, toggleMobileMenu } = useUIStore();
  const { t } = useTranslation();
  const totalItems = getTotalItems();

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-dark/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-16 h-16 transition-transform group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="NextCommerce Logo" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
            
            <div className="hidden sm:flex flex-col -mt-1">
              <span className="text-xl font-heading font-bold text-gray-text leading-none">
                Next
              </span>
              <span className="text-xl font-heading font-bold text-neon leading-none">
                Commerce
              </span>
            </div>
          </Link>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wider">
          <Link href="/" className="hover:text-neon transition-colors">{t('header.home')}</Link>
          <Link href="/produtos" className="hover:text-neon transition-colors">{t('header.products')}</Link>
          <Link href="/sobre" className="hover:text-neon transition-colors">{t('header.about')}</Link>
          <Link href="/contato" className="hover:text-neon transition-colors">{t('header.contact')}</Link>
        </nav>

        <div className="flex items-center gap-2 text-gray-muted">
          <button aria-label="Buscar" onClick={openSearch} className="hover:text-neon transition-colors p-2 hover:bg-white/5 rounded-full">
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </button>
          
          <Link href="/login" aria-label="Conta" className="hover:text-neon transition-colors p-2 hover:bg-white/5 rounded-full hidden sm:flex items-center justify-center">
             <FontAwesomeIcon icon={faUser} className="text-lg" />
          </Link>
          
          <button 
            aria-label="Carrinho" 
            onClick={toggleCart}
            className="hover:text-neon transition-colors p-2 hover:bg-white/5 rounded-full relative"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-neon text-dark text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce-short">
                {totalItems}
              </span>
            )}
          </button>

          <button aria-label="Menu" onClick={toggleMobileMenu} className="md:hidden hover:text-neon transition-colors p-2 ml-1">
            <FontAwesomeIcon icon={faBars} className="text-lg" />
          </button>
        </div>

      </div>
    </header>
  );
}