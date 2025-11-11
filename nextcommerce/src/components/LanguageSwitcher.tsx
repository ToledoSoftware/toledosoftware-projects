'use client';

import { useTranslation } from '../hooks/useTranslation';

export default function LanguageSwitcher() {
  const { language, setLanguage, isMounted } = useTranslation();

  if (!isMounted) return <div className="w-16 h-8"></div>; // Placeholder para evitar layout shift

  return (
    <div className="flex items-center bg-dark-card border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1.5 text-xs font-bold transition-colors ${
          language === 'pt' 
            ? 'bg-neon text-dark' 
            : 'text-gray-muted hover:text-white'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-xs font-bold transition-colors ${
          language === 'en' 
            ? 'bg-neon text-dark' 
            : 'text-gray-muted hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}