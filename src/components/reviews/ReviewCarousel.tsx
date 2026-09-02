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

const FALLBACK_REVIEW_COUNT = 2200;

export default function ReviewCarousel({ compact = false }: { compact?: boolean }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
    slidesToScroll: 1
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
    <section className="border-b border-gray-200 bg-white overflow-hidden py-10 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">

          {/* ── Left Column: Heading, Rating, Count, Nav ── */}
          <div className="lg:w-[320px] flex-shrink-0 text-center lg:text-left mb-8 lg:mb-0 lg:sticky lg:top-8">
            <p className="font-serif font-bold text-gray-900 leading-tight mb-3 text-2xl md:text-3xl">
              Let customers speak for us
            </p>
            <div className="text-[#e60000] text-2xl md:text-3xl mb-2">★★★★★</div>
            <p className="text-sm text-[#e60000] font-semibold mb-6">from {count} reviews</p>

            {/* Verified badge */}
            <div className="hidden lg:flex items-center gap-2 justify-center lg:justify-start mb-6">
              <span className="bg-[#e60000] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm">
                ✓ Verified Customer
              </span>
            </div>

            {/* Desktop navigation arrows */}
            <div className="hidden lg:flex items-center gap-3 justify-center lg:justify-start">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                className="bg-white border border-gray-300 hover:border-gray-400 shadow-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-default transition"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} color="#333" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                className="bg-white border border-gray-300 hover:border-gray-400 shadow-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-default transition"
                aria-label="Next review"
              >
                <ChevronRight size={20} color="#333" />
              </button>
            </div>
          </div>

          {/* ── Right Column: Carousel ── */}
          <div className="flex-1 min-w-0 relative">
            {/* Mobile/Tablet side arrows */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 sm:p-2 flex-shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-default"
              aria-label="Previous review"
            >
              <ChevronLeft size={22} color="#333" />
            </button>

            {/* Embla viewport */}
            <div className="overflow-hidden px-2" ref={emblaRef}>
              <div className="flex">
                {items.map((r, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] min-w-0 px-2 py-1"
                  >
                    <div className="h-full bg-[#fafafa] border border-gray-100 rounded-lg p-5 flex flex-col">
                      {/* Stars */}
                      <div className="text-[#e60000] text-lg mb-2">
                        {'★'.repeat(r.stars)}{'☆'.repeat(Math.max(0, 5 - r.stars))}
                      </div>
                      {/* Title */}
                      <p className="font-bold text-base text-gray-900 mb-2">{r.title}</p>
                      {/* Body */}
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-4">{r.body}</p>
                      {/* Author + Verified */}
                      <div className="flex items-center gap-2 mt-auto">
                        <p className="text-sm text-gray-700 font-semibold">{r.author}</p>
                        <span className="bg-[#e60000] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                          ✓ Verified Buyer
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet right arrow */}
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 sm:p-2 flex-shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-default"
              aria-label="Next review"
            >
              <ChevronRight size={22} color="#333" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
