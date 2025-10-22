// src/components/ContentCarousel.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ContentItem } from '@/types';

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  onShowDetails: (item: ContentItem) => void;
}

export default function ContentCarousel({ title, items, onShowDetails }: ContentCarouselProps) {

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
      <h2 className="text-3xl font-display">{title}</h2>

      <div className="relative group">
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex space-x-4 py-12 -my-12">
            {items.map((item) => (
              <div
                key={item.id}
                className="
                  group/item relative flex-shrink-0 w-[160px] md:w-[200px] aspect-[2/3]
                  transition-transform duration-300 ease-out
                  group-hover/item:scale-125 group-hover/item:z-20
                  group-hover/item:delay-400
                  origin-bottom-left group-hover/item:origin-center
                "
              >
                <div
                  className="
                    absolute inset-0
                    bg-background-light rounded-lg shadow-lg
                    border border-border
                    transition-shadow duration-300 ease-out
                    group-hover/item:shadow-neon-glow
                  "
                />
                <div
                  className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => onShowDetails(item)}
                >
                  <Image
                    src={item.posterUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 160px, 200px"
                    unoptimized
                  />
                </div>
                <div
                  className="
                    absolute bottom-0 left-0 right-0 p-3 space-y-2
                    bg-gradient-to-t from-black/80 to-transparent
                    opacity-0 group-hover/item:opacity-100
                    transition-opacity duration-300 ease-out
                    z-30
                    group-hover/item:delay-400
                    pointer-events-none
                  "
                >
                  <p className="text-white text-sm font-bold truncate">{item.title}</p>
                  <div className="flex justify-between items-center pointer-events-auto">
                    <div className="flex space-x-2">
                      <button className="hover-icon-btn"><Play size={16} fill="white" /></button>
                      <button className="hover-icon-btn"><Plus size={16} /></button>
                      <button className="hover-icon-btn"><ThumbsUp size={16} /></button>
                    </div>
                    <button
                      className="hover-icon-btn"
                      onClick={(e) => { e.stopPropagation(); onShowDetails(item); }}
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {canScrollPrev && (
          <button className="carousel-btn prev-btn" onClick={scrollPrev}>
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}
        {canScrollNext && (
          <button className="carousel-btn next-btn" onClick={scrollNext}>
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>
    </div>
  );
}