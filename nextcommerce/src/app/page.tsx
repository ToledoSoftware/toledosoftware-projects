'use client';

import { useState } from 'react';
import ProductCard from "../components/ProductCard";
import { products } from "../data/mockData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBolt, faTruckFast, faShieldHalved, faTag, faCheck } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';
import { toast } from 'sonner';

export default function Home() {
  const { t } = useTranslation();
  const featuredProducts = products.filter(p => p.isFeatured);
  const newProducts = products.filter(p => p.isNew);


  const [isCouponRedeemed, setIsCouponRedeemed] = useState(false);

  const handleCoupon = () => {
    if (isCouponRedeemed) return; 

    setIsCouponRedeemed(true);
    toast.success("Cupom NEON20 aplicado!", {
      description: "20% OFF garantidos na sua compra.",
      icon: '🎟️',
    });
  };

  return (
    <div>
      
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon/10 via-dark to-dark -z-10"></div>
        
        <div className="container mx-auto text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-12 md:mb-0 z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-neon/10 text-neon text-sm font-mono mb-6 border border-neon/20">
              {t('home.hero_badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              {t('home.hero_title_prefix')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-white drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
                {t('home.hero_title_suffix')}
              </span>
            </h1>
            <p className="text-xl text-gray-muted max-w-xl mb-10 leading-relaxed">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/produtos" className="bg-neon text-dark font-bold px-8 py-4 rounded-full hover:bg-neon-dark transition-all duration-300 flex items-center gap-2">
                {t('home.hero_cta_explore')} <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link href="/produtos" className="px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">
                {t('home.hero_cta_lookbook')}
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center relative">
             <div className="w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-neon to-transparent rounded-full opacity-20 blur-3xl absolute animate-pulse"></div>
             <FontAwesomeIcon icon={faBolt} className="text-[150px] md:text-[250px] text-white/5 relative z-10 drop-shadow-[0_0_50px_rgba(167,139,250,0.2)]" />
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-8 bg-dark-lighter/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
                <FontAwesomeIcon icon={faTruckFast} className="text-neon text-2xl" />
                <div>
                    <h4 className="font-bold text-white">{t('home.benefits_shipping')}</h4>
                    <p className="text-sm text-gray-muted">{t('home.benefits_shipping_desc')}</p>
                </div>
            </div>
             <div className="flex items-center justify-center md:justify-start gap-4">
                <FontAwesomeIcon icon={faShieldHalved} className="text-neon text-2xl" />
                <div>
                    <h4 className="font-bold text-white">{t('home.benefits_secure')}</h4>
                    <p className="text-sm text-gray-muted">{t('home.benefits_secure_desc')}</p>
                </div>
            </div>
             <div className="flex items-center justify-center md:justify-start gap-4">
                <FontAwesomeIcon icon={faTag} className="text-neon text-2xl" />
                <div>
                    <h4 className="font-bold text-white">{t('home.benefits_prices')}</h4>
                    <p className="text-sm text-gray-muted">{t('home.benefits_prices_desc')}</p>
                </div>
            </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{t('home.featured_title')}</h2>
            <p className="text-gray-muted">{t('home.featured_subtitle')}</p>
          </div>
          <Link href="/produtos" className="hidden md:flex items-center gap-2 text-neon hover:text-neon-dark transition font-mono text-sm">
            {t('home.view_all')} <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto bg-gradient-to-r from-dark-card to-dark border border-white/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                    {t('home.promo_title')}
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    {t('home.promo_text')}
                </p>
                
                <button 
                  onClick={handleCoupon}
                  disabled={isCouponRedeemed}
                  className={`
                    font-bold px-10 py-4 rounded-full transition-all duration-300 flex items-center gap-2 mx-auto
                    ${isCouponRedeemed 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-default' 
                        : 'bg-white text-dark hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'}
                  `}
                >
                    {isCouponRedeemed ? (
                        <>
                            <FontAwesomeIcon icon={faCheck} /> Cupom Aplicado
                        </>
                    ) : (
                        t('home.promo_btn')
                    )}
                </button>

            </div>
        </div>
      </section>

       <section className="container mx-auto px-4 py-16 mb-20">
        <h2 className="text-3xl font-bold text-white mb-12">{t('home.new_arrivals_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}