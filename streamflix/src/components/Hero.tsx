// src/components/Hero.tsx
'use client';

import React from 'react';
import { Play, Info } from 'lucide-react';
import Image from 'next/image';
import { ContentItem } from '@/types';

interface HeroProps {
  item: ContentItem;
  onShowDetails: (item: ContentItem) => void;
}

export default function Hero({ item, onShowDetails }: HeroProps) {
  return (
    <div className="relative h-[100vw] sm:h-[56.25vw] min-h-[400px] max-h-[90vh] pt-20 sm:pt-24 overflow-hidden"> {/* Ajuste altura e padding mobile */}

      <Image
        src={item.backdropUrl}
        alt={item.title}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        fill
        priority
        unoptimized
      />

      {/* Gradientes - Mantidos, mas podem ser ajustados se necessário */}
      <div className="absolute bottom-0 left-0 w-full h-3/5 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-background/60 to-transparent" />
      <div className="absolute top-0 left-0 w-1/3 sm:w-1/5 h-full bg-gradient-to-r from-background/80 to-transparent" /> {/* Gradiente lateral ajustado */}

      {/* Texto e Botões */}
      {/* Ajuste padding e z-index */}
      <div className="container relative mx-auto px-4 sm:px-10 h-full flex flex-col justify-end pb-[25vw] sm:pb-[15vw] md:pb-[10vw] z-20"> 
        {/* Largura ajustada para mobile: w-full sm:w-2/3 md:w-1/2 lg:w-1/3 */}
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 space-y-3 sm:space-y-4 animate-fade-in"> 
          <h1 className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl {/* Tamanho responsivo */}
            font-display text-text shadow-lg opacity-0 animate-fade-in-up animation-delay-300"
          >
            {item.title}
          </h1>
          <p className="
            text-sm sm:text-base md:text-lg {/* Tamanho responsivo */}
            text-text-muted shadow-md 
            line-clamp-2 sm:line-clamp-3 {/* Mais curto em mobile */}
            font-sans opacity-0 animate-fade-in-up animation-delay-500"
          >
            {item.description}
          </p>
          <div className="flex space-x-3 sm:space-x-4 opacity-0 animate-fade-in-up animation-delay-700">
             {/* Botões ajustados para mobile */}
            <button className="flex items-center justify-center bg-white text-black px-4 py-1.5 sm:px-6 sm:py-2 rounded-md text-base sm:text-lg font-bold hover:bg-opacity-80 transition">
              <Play className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" fill="black" />
              Play
            </button>
            <button
              onClick={() => onShowDetails(item)}
              className="
                flex items-center justify-center rounded-md text-base sm:text-lg font-bold px-4 py-1.5 sm:px-6 sm:py-2
                bg-transparent border-2 border-primary text-primary
                transition-all duration-300
                hover:bg-primary hover:text-white hover:shadow-neon-glow
              "
            >
              <Info className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}