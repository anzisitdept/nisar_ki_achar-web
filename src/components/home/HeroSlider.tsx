'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  { desktop: 'https://soghatekhas.com/cdn/shop/files/MAINN_WEB.jpg?v=1763724941&width=3840', mobile: 'https://soghatekhas.com/cdn/shop/files/MAIN.jpg?v=1763724992&width=750' },
  { desktop: 'https://soghatekhas.com/cdn/shop/files/Banner-01.jpg?v=1776446341&width=3840', mobile: 'https://soghatekhas.com/cdn/shop/files/Mobile_banner-01.jpg?v=1776446397&width=750' },
  { desktop: 'https://soghatekhas.com/cdn/shop/files/Banner-02_1.jpg?v=1786468968&width=3840', mobile: 'https://soghatekhas.com/cdn/shop/files/Mobile_banner-02_4.jpg?v=1786468989&width=750' },
];

export default function HeroSlider() {
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

  return (
    <section className="relative w-full overflow-hidden group bg-gray-100">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {heroImages.map((img, idx) => (
            <div key={idx} className="relative flex-[0_0_100%] min-w-0 h-[50vh] md:h-[80vh]">
              <img 
                src={img.desktop} 
                alt={`Hero Banner ${idx + 1}`} 
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
              />
              <img 
                src={img.mobile} 
                alt={`Hero Banner ${idx + 1} Mobile`} 
                className="absolute inset-0 w-full h-full object-cover md:hidden"
              />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={scrollPrev} 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={scrollNext} 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, idx) => (
          <button 
            key={idx} 
            className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === selectedIndex ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
          />
        ))}
      </div>
    </section>
  );
}
