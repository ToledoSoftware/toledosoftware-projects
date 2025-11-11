'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from "../../components/ProductCard";
import { products, categories } from "../../data/mockData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../hooks/useTranslation';

export default function ProdutosPage() {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileFilters ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [showMobileFilters]);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(product => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryId)) return false;
        if (product.price > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'name-asc': return a.name.localeCompare(b.name);
          default: return 0;
        }
      });
  }, [selectedCategories, maxPrice, sortOption]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 w-full overflow-x-hidden">
      
      <div className="flex flex-col gap-4 mb-6 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2">
            {t('products.title')}
          </h1>
          <p className="text-gray-muted text-sm md:text-base">
            {t('products.showing_results', { count: filteredAndSortedProducts.length })}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:flex md:w-auto">
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-dark-card border border-white/10 py-2.5 px-4 rounded-xl text-sm font-medium hover:border-neon/50 transition text-white active:bg-white/5"
          >
            <FontAwesomeIcon icon={faFilter} className="text-neon" /> {t('products.filter_btn')}
          </button>

          <div className="relative col-span-1 md:w-48">
            <FontAwesomeIcon icon={faSort} className="absolute left-3 top-1/2 -translate-y-1/2 text-neon pointer-events-none text-sm" />
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full appearance-none bg-dark-card border border-white/10 py-2.5 pl-9 pr-8 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-neon transition cursor-pointer"
            >
              <option value="default">{t('products.sort_relevance')}</option>
              <option value="price-asc">{t('products.sort_price_asc')}</option>
              <option value="price-desc">{t('products.sort_price_desc')}</option>
              <option value="name-asc">{t('products.sort_name_asc')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 relative">
        
        <aside className={`
            fixed inset-0 z-[150] bg-dark flex flex-col transition-transform duration-300 ease-in-out
            lg:static lg:z-auto lg:bg-transparent lg:w-64 lg:flex-shrink-0 lg:block lg:translate-y-0
            ${showMobileFilters ? 'translate-y-0' : 'translate-y-[110%] lg:translate-y-0'}
        `}>
          <div className="flex lg:hidden items-center justify-between p-4 border-b border-white/10 bg-dark-card/50 backdrop-blur-md sticky top-0 z-10">
             <h2 className="text-lg font-heading font-bold text-white">{t('products.filters_title')}</h2>
             <button onClick={() => setShowMobileFilters(false)} className="p-2 text-gray-400 hover:text-white bg-dark-card rounded-full w-8 h-8 flex items-center justify-center">
               <FontAwesomeIcon icon={faTimes} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 lg:p-0">
            <div className="lg:sticky lg:top-24 space-y-6 pb-20 lg:pb-0">
              
              <div className="bg-dark-card p-5 rounded-2xl border border-white/5">
                <h3 className="font-heading font-semibold text-white mb-4">{t('products.filter_category')}</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <label className="flex items-center justify-between p-2 rounded-lg cursor-pointer group hover:bg-white/5 transition">
                        <span className={`transition-colors ${selectedCategories.includes(category.id) ? 'text-neon font-medium' : 'text-gray-muted group-hover:text-white'}`}>
                          {category.name}
                        </span>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(category.id) ? 'bg-neon border-neon' : 'border-white/20'}`}>
                          {selectedCategories.includes(category.id) && <FontAwesomeIcon icon={faCheck} className="text-dark text-[10px]" />}
                        </div>
                        <input type="checkbox" className="hidden" checked={selectedCategories.includes(category.id)} onChange={() => toggleCategory(category.id)} />
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-dark-card p-5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-heading font-semibold text-white">{t('products.filter_price')}</h3>
                    <span className="text-neon font-mono font-bold">{formatPrice(maxPrice)}</span>
                </div>
                <input 
                  type="range" min="0" max="1000" step="50" value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-dark-lighter rounded-lg appearance-none cursor-pointer accent-neon"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-3 font-mono">
                  <span>R$ 0</span><span>R$ 1000+</span>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:hidden p-4 border-t border-white/10 bg-dark-card flex gap-3 sticky bottom-0 z-10 pb-8">
             <button 
                  onClick={() => { setSelectedCategories([]); setMaxPrice(1000); }}
                  className="flex-1 py-3.5 text-sm font-bold text-gray-400 border border-white/10 rounded-xl hover:text-white transition active:scale-95"
              >
                  {t('products.filter_clear')}
              </button>
              <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-[2] py-3.5 text-sm font-bold bg-neon text-dark rounded-xl hover:bg-neon-dark transition active:scale-95 shadow-neon"
              >
                  {t('products.filter_view_results', { count: filteredAndSortedProducts.length })}
              </button>
          </div>
        </aside>

        <div className="flex-grow w-full">
            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredAndSortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 text-gray-muted border border-white/5 rounded-2xl bg-dark-card/50 flex flex-col items-center mx-4 md:mx-0">
                    <FontAwesomeIcon icon={faFilter} className="text-5xl mb-6 opacity-20" />
                    <p className="text-xl mb-2 font-medium text-white">{t('products.no_results')}</p>
                    <p className="text-sm mb-6 max-w-xs mx-auto">{t('products.no_results_desc')}</p>
                    <button onClick={() => { setSelectedCategories([]); setMaxPrice(1000); }} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition">
                        {t('products.clear_all_filters')}
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}