'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function VideoCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const placeholderVideos = [1, 2, 3, 4, 5];

  return (
    <section className="py-16 overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl md:text-3xl text-center mb-12 font-serif text-[#232323] uppercase tracking-wide">
          See What Our Customers Say
        </h2>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {placeholderVideos.map((item) => (
              <div 
                key={item} 
                className="flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0"
              >
                <div className="relative aspect-[9/16] bg-gray-200 rounded-xl overflow-hidden shadow-md">
                  {/* Placeholder for video */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Video {item}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold text-sm shadow-black">@customer{item}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
