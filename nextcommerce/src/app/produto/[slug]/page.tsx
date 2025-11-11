'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { products } from "../../../data/mockData";
import { useCartStore } from '../../../store/useCartStore';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faTruckFast, faShieldHalved, faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../../hooks/useTranslation';

import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export default function ProductPage() {
  const params = useParams();
  const slugStr = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';
  const product = products.find(p => p.slug === slugStr);

  const { t } = useTranslation();
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addItem: addItemToCart, openCart } = useCartStore();

  useEffect(() => {
    if (product) {
        document.title = `${product.name} | NextCommerce`;
    }

    if (product) {
      const initialImage = product.colors && product.colors.length > 0 
        ? product.colors[0].image 
        : product.images[0];

      setMainImage(initialImage);
      if (product.sizes) setSelectedSize(product.sizes[0]);
      if (product.colors) setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  if (!product && typeof window !== 'undefined') {
  }

  if (!product && slugStr) {
      notFound();
      return null;
  }
  if (!product) return null; 

  const handleColorClick = (colorName: string, colorImage: string) => {
      setSelectedColor(colorName);
      setMainImage(colorImage);
  };

  const handleAddToCart = () => {
    addItemToCart(product, 1, selectedColor, selectedSize);
    openCart();
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/produtos" className="inline-flex items-center gap-2 text-gray-muted hover:text-neon transition mb-8">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('product_details.back_link')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-dark-card rounded-2xl overflow-hidden border border-white/5 relative group">
            {mainImage && (
              <Image
                key={mainImage}
                src={mainImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-500 group-hover:scale-105 animate-fadeIn"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(167,139,250,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
          </div>
          {product.images.length > 1 && !product.colors && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 relative transition-all ${mainImage === img ? 'border-neon shadow-neon' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`View ${index + 1}`} fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-6">
            {product.isNew && <span className="bg-neon/20 text-neon text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">{t('product_details.new_badge')}</span>}
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-neon flex">
                {[1,2,3,4,5].map(i => <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />)}
              </div>
              <span className="text-gray-muted text-sm">(128 {t('product_details.reviews')})</span>
            </div>
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-bold text-neon font-mono">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through font-mono mb-1">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="space-y-8 mb-10">
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    {t('product_details.color_label')}: <span className="text-neon">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(variant => (
                    <button
                      key={variant.name}
                      onClick={() => handleColorClick(variant.name, variant.image)}
                      className={`h-10 px-4 rounded-lg border-2 flex items-center gap-2 transition-all ${selectedColor === variant.name ? 'border-neon bg-neon/10 text-white' : 'border-white/10 bg-dark-card text-gray-muted hover:border-white/30'}`}
                    >
                      {variant.hex && (
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: variant.hex }}></span>
                      )}
                      <span className="font-medium">{variant.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    {t('product_details.size_label')}: <span className="text-neon">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all font-mono font-bold ${selectedSize === size ? 'border-neon bg-neon text-dark shadow-neon' : 'border-white/10 bg-dark-card text-gray-muted hover:border-neon/50 hover:text-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mb-12">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-neon text-dark font-heading font-bold text-lg py-4 px-8 rounded-xl hover:bg-neon-dark hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-neon"
            >
              <FontAwesomeIcon icon={faCartPlus} />
              {t('product_details.add_to_cart')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 text-gray-300">
              <FontAwesomeIcon icon={faTruckFast} className="text-neon text-xl" />
              <span>{t('product_details.free_shipping')}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FontAwesomeIcon icon={faShieldHalved} className="text-neon text-xl" />
              <span>{t('product_details.warranty')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}