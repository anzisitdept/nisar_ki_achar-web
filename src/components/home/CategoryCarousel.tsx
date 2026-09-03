'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useStoreData } from '@/context/StoreDataContext';
import { Category } from '@/types';

interface CategoryCarouselProps {
  title?: string;
  categoryIds?: string[];
}

export default function CategoryCarousel({ 
  title = "Shop by Category", 
  categoryIds 
}: CategoryCarouselProps) {
  const { categories } = useStoreData();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps'
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onReInit);
    emblaApi.on('resize', onReInit);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onReInit);
      emblaApi.off('resize', onReInit);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (!categories || categories.length === 0) {
    return null;
  }

  let displayedCategories: Category[] = categories;
  if (categoryIds && categoryIds.length > 0) {
    const selected = categoryIds
      .map(id => categories.find(c => c.id === id || c.slug === id))
      .filter((c): c is Category => Boolean(c));
    if (selected.length > 0) {
      displayedCategories = selected;
    }
  }

  return (
    <section className="py-10 md:py-16 w-full">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-8 md:mb-12 font-serif text-[#232323] uppercase tracking-wide px-4">
        {title}
      </h2>

      <div className="overflow-hidden w-full px-4 sm:px-6 md:px-8" ref={emblaRef}>
        <div className="flex gap-3 md:gap-8 max-w-6xl mx-auto">
          {displayedCategories.map((cat, i) => (
            <Link
              href={`/collections/${cat.slug || cat.id}`}
              key={cat.id || i}
              className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] min-w-0 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden mb-4 md:mb-6 border-4 border-transparent group-hover:border-[#e60000] transition-all duration-300 bg-gray-100 flex items-center justify-center">
                {cat.image && cat.image.trim() !== '' ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-gray-400 font-bold text-sm uppercase">{cat.name?.slice(0, 2)}</span>
                )}
              </div>
              <h3 className="font-bold text-[#232323] uppercase tracking-wider text-xs md:text-sm group-hover:text-[#e60000] transition-colors text-center">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Carousel Dots (mobile only, when more than one slide) */}
      {scrollSnaps.length > 1 && (
        <div className="flex md:hidden justify-center gap-2 mt-5">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === i ? 'w-6 bg-[#e60000]' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}