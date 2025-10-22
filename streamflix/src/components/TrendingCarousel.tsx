// src/components/TrendingCarousel.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { ContentItem } from '@/types';

interface TrendingCarouselProps {
  title: string;
  items: ContentItem[];
  onShowDetails: (item: ContentItem) => void;
}

export default function TrendingCarousel({ title, items, onShowDetails }: TrendingCarouselProps) {

  const options: EmblaOptionsType = {
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
    dragFree: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const scrollPrev = useCallback(() => { emblaApi?.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { emblaApi?.scrollNext(); }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = (api: EmblaCarouselType) => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect(emblaApi);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-display mb-6">{title}</h2>

      <div className="relative group">
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex space-x-6">

            {items.map((item, index) => (
              <div
                key={item.id}
                className="group/item relative flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer"
                onClick={() => onShowDetails(item)}
              >
                <div className="flex items-end">
                  <div
                    className="
                      text-[160px] font-extrabold text-background-lighter/50
                      leading-none -mr-8 z-0
                      transition-transform duration-300 ease-out
                      group-hover/item:scale-110
                    "
                  >
                    {index + 1}
                  </div>

                  <div
                    className="
                      relative aspect-video w-full flex-shrink-0
                      rounded-lg overflow-hidden shadow-lg
                      transition-all duration-300 ease-out
                      group-hover/item:scale-110 z-10
                      group-hover/item:shadow-neon-glow
                      border border-border
                      bg-background-light
                    "
                  >
                    <Image
                      src={item.backdropUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 280px, 320px"
                      unoptimized
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-20">
                      <h3 className="text-lg font-bold text-text truncate">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {canScrollPrev && (
          <button
            className="carousel-btn prev-btn"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}
        {canScrollNext && (
          <button
            className="carousel-btn next-btn"
            onClick={scrollNext}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>
    </div>
  );
}