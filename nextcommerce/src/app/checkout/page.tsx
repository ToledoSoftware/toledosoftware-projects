'use client';

import { useCartStore } from '../../store/useCartStore';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && items.length === 0) {
      router.push('/produtos');
    }
  }, [isMounted, items, router]);

  if (!isMounted || items.length === 0) return null;

  const subtotal = getSubtotal();
  const shipping = 0; 
  const total = subtotal + shipping;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Processando pagamento...');
    
    setTimeout(() => {
      clearCart(); 
      router.push('/checkout/success');
      toast.dismiss(); 
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-white mb-8 flex items-center gap-3">
        <FontAwesomeIcon icon={faLock} className="text-neon" /> {t('checkout.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-dark-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <FontAwesomeIcon icon={faTruckFast} className="text-neon" /> {t('checkout.shipping_title')}
            </h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('checkout.label_name')}</label>
                  <input type="text" required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('checkout.label_email')}</label>
                  <input type="email" required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('checkout.label_address')}</label>
                <input type="text" required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon focus:outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('checkout.label_city')}</label>
                  <input type="text" required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('checkout.label_zip')}</label>
                  <input type="text" required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon focus:outline-none transition-colors" />
                </div>
              </div>
            </form>
          </div>

          <div className="bg-dark-card p-6 md:p-8 rounded-2xl border border-white/10 opacity-75">
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <FontAwesomeIcon icon={faLock} className="text-neon" /> {t('checkout.payment_title')}
            </h2>
            <div className="space-y-5 pointer-events-none"> 
               <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('checkout.payment_card_number')}</label>
                  <input type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white" disabled />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('checkout.payment_expiry')}</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('checkout.payment_cvc')}</label>
                    <input type="text" placeholder="CVC" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white" disabled />
                  </div>
                </div>
            </div>
          </div>

        </div>

        <div className="lg:col-span-5">
          <div className="bg-dark-card p-6 md:p-8 rounded-2xl border border-white/10 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">{t('checkout.summary_title')}</h2>
            
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 py-4 border-b border-white/5 last:border-0">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                    <Image 
                      src={item.product.colors?.find(c => c.name === item.selectedColor)?.image || item.product.images[0]} 
                      alt={item.product.name} 
                      fill className="object-cover" sizes="64px" 
                    />
                    <span className="absolute -top-2 -right-2 bg-dark-lighter text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-white/20">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm line-clamp-2">{item.product.name}</h4>
                    <p className="text-gray-500 text-xs mt-1">
                      {item.selectedColor} {item.selectedSize && ` / ${item.selectedSize}`}
                    </p>
                  </div>
                  <div className="text-white font-mono text-sm">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-4 border-t border-white/10">
              <div className="flex justify-between text-gray-muted">
                <span>{t('cart.subtotal')}</span>
                <span className="font-mono text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-muted">
                <span>{t('checkout.summary_shipping')}</span>
                <span className="font-mono text-neon">Grátis</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-white py-4 border-t border-white/10">
              <span>{t('checkout.summary_total')}</span>
              <span className="font-mono text-xl">{formatPrice(total)}</span>
            </div>

            <button 
              type="submit"
              form="checkout-form" 
              className="w-full bg-neon hover:bg-neon-dark text-dark font-heading font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-neon mt-6"
            >
              {t('checkout.btn_place_order')}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}