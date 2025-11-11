'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faUsers, faLightbulb, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../hooks/useTranslation';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
          {t('about.title_prefix')} <span className="text-neon">{t('about.title_suffix')}</span>.
        </h1>
        <p className="text-xl text-gray-muted leading-relaxed">
          {t('about.subtitle')}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="bg-dark-card p-8 rounded-2xl border border-white/5 hover:border-neon/30 transition duration-300 group">
          <div className="w-14 h-14 bg-dark-lighter rounded-xl flex items-center justify-center mb-6 group-hover:shadow-neon transition duration-300">
            <FontAwesomeIcon icon={faRocket} className="text-neon text-2xl" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-3">{t('about.val_innovation_title')}</h3>
          <p className="text-gray-muted">
            {t('about.val_innovation_desc')}
          </p>
        </div>
        <div className="bg-dark-card p-8 rounded-2xl border border-white/5 hover:border-neon/30 transition duration-300 group">
          <div className="w-14 h-14 bg-dark-lighter rounded-xl flex items-center justify-center mb-6 group-hover:shadow-neon transition duration-300">
            <FontAwesomeIcon icon={faUsers} className="text-neon text-2xl" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-3">{t('about.val_community_title')}</h3>
          <p className="text-gray-muted">
            {t('about.val_community_desc')}
          </p>
        </div>
        <div className="bg-dark-card p-8 rounded-2xl border border-white/5 hover:border-neon/30 transition duration-300 group">
          <div className="w-14 h-14 bg-dark-lighter rounded-xl flex items-center justify-center mb-6 group-hover:shadow-neon transition duration-300">
            <FontAwesomeIcon icon={faLightbulb} className="text-neon text-2xl" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-3">{t('about.val_design_title')}</h3>
          <p className="text-gray-muted">
            {t('about.val_design_desc')}
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-dark-card to-dark border-y border-white/5 py-16 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">10k+</p>
            <p className="text-neon font-mono text-sm">{t('about.stat_clients')}</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">500+</p>
            <p className="text-neon font-mono text-sm">{t('about.stat_products')}</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">24/7</p>
            <p className="text-neon font-mono text-sm">{t('about.stat_support')}</p>
          </div>
          <div>
             <FontAwesomeIcon icon={faEarthAmericas} className="text-4xl md:text-5xl text-white mb-2 opacity-80" />
            <p className="text-neon font-mono text-sm mt-2">{t('about.stat_shipping')}</p>
          </div>
        </div>
      </section>

    </div>
  );
}