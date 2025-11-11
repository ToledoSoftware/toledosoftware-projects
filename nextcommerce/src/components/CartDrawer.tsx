'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faMinus, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';
import Image from 'next/image';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
      
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={closeCart}
      />

      <div className={`absolute top-0 right-0 w-full max-w-md h-full bg-dark-card border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-500 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-heading font-bold text-white">{t('cart.title')}</h2>
          <button onClick={closeCart} className="text-gray-muted hover:text-neon transition p-2">
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-muted py-12 flex flex-col items-center">
               <div className="text-6xl mb-4 opacity-20">🛒</div>
              <p>{t('cart.empty_msg')}</p>
              <button onClick={closeCart} className="mt-4 text-neon hover:underline">
                {t('cart.continue_shopping')}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4">
                <div className="w-24 h-24 flex-shrink-0 bg-dark-lighter rounded-lg overflow-hidden border border-white/5 relative">
                  <Image
                    src={item.product.colors?.find(c => c.name === item.selectedColor)?.image || item.product.images[0]} 
                    alt={item.product.name} 
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-medium line-clamp-2">{item.product.name}</h3>
                    <p className="text-sm text-gray-muted mt-1">
                      {item.selectedColor && <span>{item.selectedColor}</span>}
                      {item.selectedSize && <span> / {item.selectedSize}</span>}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-dark rounded-lg px-2 py-1 border border-white/5">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                        className="text-gray-muted hover:text-neon px-2 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} className="text-xs" />
                      </button>
                      <span className="text-white text-sm font-mono w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                        className="text-gray-muted hover:text-neon px-2"
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-xs" />
                      </button>
                    </div>
                    <span className="text-white font-mono">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
                 <button 
                    onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                    className="text-gray-600 hover:text-red-500 transition self-start p-1"
                  >
                   <FontAwesomeIcon icon={faTrash} className="text-sm" />
                 </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-dark-lighter/30">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-muted">{t('cart.subtotal')}</span>
              <span className="text-2xl font-bold text-white font-mono">{formatPrice(getSubtotal())}</span>
            </div>
            <Link 
                href="/checkout" 
                onClick={closeCart}
                className="w-full bg-neon text-dark font-heading font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neon-dark transition-all hover:shadow-neon"
            >
                {t('cart.checkout_btn')} <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}