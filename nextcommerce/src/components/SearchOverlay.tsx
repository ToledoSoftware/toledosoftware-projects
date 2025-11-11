'use client';

import { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../store/useUIStore';
import { products } from '../data/mockData';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../hooks/useTranslation';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeSearch]);

  const filteredProducts = searchTerm.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 sm:pt-32">
      
      <div 
        className="absolute inset-0 bg-dark/80 backdrop-blur-md animate-fadeIn"
        onClick={closeSearch}
      />

      <div className="relative w-full max-w-2xl mx-4 bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slideDown">
        
        <div className="flex items-center border-b border-white/10 p-4">
          <FontAwesomeIcon icon={faSearch} className="text-gray-muted text-xl ml-2" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder={t('search.placeholder')}
            className="flex-1 bg-transparent border-none outline-none text-white text-lg px-4 placeholder:text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={closeSearch} className="text-gray-muted hover:text-white transition px-2">
            <span className="text-sm font-mono border border-white/20 rounded px-1.5 py-0.5 hidden sm:inline-block">ESC</span>
            <FontAwesomeIcon icon={faTimes} className="sm:hidden text-xl" />
          </button>
        </div>

        {(searchTerm !== '' || filteredProducts.length > 0) && (
          <div className="p-2 max-h-[60vh] overflow-y-auto">
            {filteredProducts.length > 0 ? (
              <ul className="space-y-1">
                {filteredProducts.map(product => (
                  <li key={product.id}>
                    <Link 
                      href={`/produto/${product.slug}`} 
                      onClick={closeSearch}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition group"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-white/5">
                        <Image 
                            src={product.images[0]} 
                            alt={product.name} 
                            fill
                            className="object-cover"
                            sizes="48px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium group-hover:text-neon transition">{product.name}</h4>
                        <p className="text-sm text-gray-muted line-clamp-1">{product.description}</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRight} className="text-gray-700 group-hover:text-neon opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              searchTerm !== '' && (
                <div className="p-8 text-center text-gray-muted">
                  <p>{t('search.no_results')} "<span className="text-white">{searchTerm}</span>"</p>
                </div>
              )
            )}
          </div>
        )}

        <div className="bg-dark-lighter/50 p-3 text-xs text-gray-600 flex justify-between px-6 border-t border-white/5 font-mono">
             <span>{t('search.footer_tip')}</span>
             <span>{t('search.footer_version')}</span>
        </div>

      </div>
    </div>
  );
}