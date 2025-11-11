'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useEffect } from 'react';
import confetti from 'canvas-confetti'; 

export default function SuccessPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
      <div className="bg-dark-card p-8 md:p-12 rounded-3xl border border-neon/20 shadow-neon/10 text-center max-w-md w-full relative overflow-hidden">
        
        <div className="absolute inset-0 bg-neon/5 blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
            <FontAwesomeIcon icon={faCheckCircle} className="text-neon text-7xl mb-6 animate-bounce-short" />
            
            <h1 className="text-3xl font-heading font-bold text-white mb-3">
            {t('success.title')}
            </h1>
            <p className="text-gray-muted text-lg mb-8">
            {t('success.subtitle')}
            </p>

            <div className="bg-dark-lighter p-4 rounded-xl border border-white/5 mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{t('success.order_number')}</p>
            <p className="text-2xl font-mono font-bold text-white">#{orderNumber}</p>
            </div>

            <p className="text-gray-muted text-sm mb-8">
            {t('success.email_confirmation')}
            </p>

            <Link 
            href="/" 
            className="w-full bg-white text-dark font-bold py-4 rounded-xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
            >
            {t('success.btn_back_home')} <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
      </div>
    </div>
  );
}