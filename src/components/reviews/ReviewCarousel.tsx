'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Review } from '@/types';
import { subscribeAllApprovedReviews } from '@/lib/firestoreServices';

interface ReviewCard {
  stars: number;
  title: string;
  body: string;
  author: string;
}

const STATIC_REVIEWS: ReviewCard[] = [
  { stars: 5, title: '5 star for taste', body: 'I tried their aloo bhkhara chatni … Its delicious. Will order again inshaAllah', author: 'Anonymous' },
  { stars: 5, title: 'best quality', body: 'best quality, packing, everything.', author: '03161717268' },
  { stars: 5, title: 'Amazing product!', body: 'Received quickly and the taste is authentic desi. Highly recommended for everyone.', author: 'Fatima K.' },
  { stars: 5, title: 'Excellent packaging', body: 'Very well packed. Quality is outstanding. Will buy again.', author: 'Ahmed R.' }
];

// Fallback count shown when live reviews haven't loaded yet / none exist
const FALLBACK_REVIEW_COUNT = 2200;

export default function ReviewCarousel({ compact = false }: { compact?: boolean }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const unsub = subscribeAllApprovedReviews((rs) => {
      setReviews(rs);
      setLoaded(true);
    });
    return () => { if (unsub) unsub(); };
  }, []);

  const hasDynamic = loaded && reviews.length > 0;

  const items: ReviewCard[] = hasDynamic
    ? reviews.map(r => ({
      stars: typeof r.rating === 'number' ? r.rating : 5,
      title: r.title || '',
      body: r.body || '',
      author: r.author || 'Anonymous'
    }))
    : STATIC_REVIEWS;

  // Show the real count when we have live reviews, otherwise a sensible fallback
  // instead of "0"
  const count = hasDynamic ? reviews.length : FALLBACK_REVIEW_COUNT;

  const updateNav = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => updateNav();
    updateNav();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, updateNav, reviews.length]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, items.length]);

  return (
    <section className={`border-b border-gray-200 bg-white overflow-hidden ${compact ? 'py-6 md:py-8' : 'py-10 md:py-16'}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Header label */}
        <div className="text-center md:text-left mb-6 md:mb-10">
          <p className={`font-serif font-bold text-gray-900 leading-tight mb-2 ${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
            Let customers speak for us
          </p>
          <div className="text-[#e60000] text-xl md:text-2xl mb-1.5">★★★★★</div>
          <p className="text-sm text-[#e60000] font-semibold">from {count} reviews</p>
        </div>

        {/* Carousel with overlaid side arrows */}
        <div className="relative">
          {/* Arrow left — stuck to left edge, vertically centered */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 sm:p-2 flex-shrink-0 cursor-pointer opacity-100 disabled:opacity-30 disabled:cursor-default"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} color="#333" />
          </button>

          {/* Cards */}
          <div className="min-w-0 overflow-hidden px-8 sm:px-10" ref={emblaRef}>
            <div className="flex">
              {items.map((r, i) => (
                <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3 py-1">
                  <div className="h-full">
                    <div className="text-[#e60000] text-lg mb-2">
                      {'★'.repeat(r.stars)}{'☆'.repeat(Math.max(0, 5 - r.stars))}
                    </div>
                    <p className="font-bold text-base text-gray-900 mb-2">{r.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-4">{r.body}</p>
                    <p className="text-sm text-gray-700 font-semibold">{r.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow right — stuck to right edge, vertically centered */}
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 sm:p-2 flex-shrink-0 cursor-pointer opacity-100 disabled:opacity-30 disabled:cursor-default"
            aria-label="Next review"
          >
            <ChevronRight size={24} color="#333" />
          </button>
        </div>
      </div>
    </section>
  );
}