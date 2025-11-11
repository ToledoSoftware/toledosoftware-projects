import Link from 'next/link';
import Image from 'next/image'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="group bg-dark-card rounded-2xl border border-white/5 overflow-hidden hover:border-neon/50 hover:shadow-neon transition-all duration-500">
      
      <Link href={`/produto/${product.slug}`} className="block relative overflow-hidden aspect-[4/5] bg-dark-lighter">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
          className="object-cover w-full h-full group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10"> 
          {product.isNew && (
            <span className="bg-neon text-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
              Novo
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
              Sale
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-heading font-medium text-white text-lg hover:text-neon transition-colors line-clamp-1" title={product.name}>
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-muted text-xs font-mono mt-1 mb-4 opacity-60">ID: {product.id.toUpperCase()}</p>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-gray-500 text-sm line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-neon font-mono">
              {formatPrice(product.price)}
            </span>
          </div>

          <button 
            aria-label="Adicionar ao Carrinho"
            className="bg-dark-lighter text-neon border border-neon/30 w-11 h-11 rounded-full flex items-center justify-center hover:bg-neon hover:text-dark hover:border-neon hover:shadow-neon transition-all duration-300 active:scale-90"
          >
            <FontAwesomeIcon icon={faCartPlus} className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}