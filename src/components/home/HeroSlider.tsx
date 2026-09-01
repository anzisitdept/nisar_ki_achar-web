'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';

export default function HeroSlider() {
  const { storeContent } = useStoreData();
  const rawSlides = storeContent.heroSlides || [];
  const slides = rawSlides.filter(
    s => s && ((s.desktopImage && s.desktopImage.trim() !== '') || (s.mobileImage && s.mobileImage.trim() !== ''))
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    
    // Autoplay logic
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden group bg-gray-100">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, idx) => {
            const desktopImg = (slide.desktopImage && slide.desktopImage.trim() !== '') ? slide.desktopImage : slide.mobileImage;
            const mobileImg = (slide.mobileImage && slide.mobileImage.trim() !== '') ? slide.mobileImage : slide.desktopImage;

            const slideContent = (
              <div className="relative w-full aspect-[16/9] xs:aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9] lg:aspect-[24/9] min-h-[190px] xs:min-h-[230px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[480px] bg-gray-100 overflow-hidden">
                {desktopImg && (
                  <img 
                    src={desktopImg} 
                    alt={slide.alt || `Hero Banner ${idx + 1}`} 
                    referrerPolicy="no-referrer"
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover hidden md:block"
                  />
                )}
                {mobileImg && (
                  <img 
                    src={mobileImg} 
                    alt={slide.alt || `Hero Banner ${idx + 1} Mobile`} 
                    referrerPolicy="no-referrer"
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover md:hidden"
                  />
                )}
              </div>
            );

            return (
              <div key={slide.id || idx} className="relative flex-[0_0_100%] min-w-0">
                {slide.link && slide.link.trim() !== '' ? (
                  <Link href={slide.link} className="block w-full">
                    {slideContent}
                  </Link>
                ) : (
                  slideContent
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {slides.length > 1 && (
        <>
          <button 
            onClick={scrollPrev} 
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-800 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 shadow-lg cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={scrollNext} 
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-800 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 shadow-lg cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, idx) => (
              <button 
                key={idx} 
                className={`h-2 sm:h-2.5 rounded-full transition-all cursor-pointer ${idx === selectedIndex ? 'bg-white w-5 sm:w-6' : 'bg-white/50 w-2 sm:w-2.5'}`}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
