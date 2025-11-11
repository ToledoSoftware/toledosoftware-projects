// CORREÇÃO: Caminhos relativos em vez de @/
import { useLanguageStore } from '../store/useLanguageStore';
import { pt } from '../i18n/pt';
import { en } from '../i18n/en';
import { useEffect, useState } from 'react';

type TranslationKeys = 
  | keyof typeof pt.header
  | `header.${keyof typeof pt.header}`
  | `home.${keyof typeof pt.home}`
  | `products.${keyof typeof pt.products}`
  | `product_details.${keyof typeof pt.product_details}`
  | `cart.${keyof typeof pt.cart}`
  | `search.${keyof typeof pt.search}`
  | `footer.${keyof typeof pt.footer}`;

export function useTranslation() {
  const { language, setLanguage } = useLanguageStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    useLanguageStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  const dict = language === 'en' ? en : pt;

  const t = (key: string, params?: { [key: string]: string | number }) => {
    if (!isMounted) return '';

    const keys = key.split('.');
    let value: any = dict;

    for (const k of keys) {
      value = value?.[k as keyof typeof value];
    }

    if (typeof value !== 'string') return key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(`{${paramKey}}`, String(paramValue));
      });
    }

    return value;
  };

  return { t, language, setLanguage, isMounted };
}