'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const categories = [
  { name: 'All Pickles', image: 'https://nisarachar.com/cdn/shop/files/6_1_900x.png' },
  { name: 'Mango Pickles', image: 'https://nisarachar.com/cdn/shop/files/2_2_900x.png' },
  { name: 'Mixed Pickles', image: 'https://nisarachar.com/cdn/shop/files/3_2_900x.png' },
  { name: 'Lemon Pickles', image: 'https://nisarachar.com/cdn/shop/files/1_f5d5b353-617f-4ca6-ae85-3da84d1e4f8e_900x.png' }
];

export default function CategoryCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps'
  });

  return (
    // Full-bleed section — no `container` class here. A constrained container
    // (which usually has its own max-width + fixed side padding) was narrower
    // than the actual viewport on some screens, and Embla's `overflow-hidden`
    // wrapper clipped the circles to that narrower box, giving the half-cut
    // "invisible edge" look instead of running edge-to-edge.
    <section className="py-10 md:py-16 w-full">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-8 md:mb-12 font-serif text-[#232323] uppercase tracking-wide px-4">
        Shop by Category
      </h2>

      {/* Padding lives here now, on the actual overflow boundary, so the
          Embla viewport always matches the real screen width. */}
      <div className="overflow-hidden w-full px-4 sm:px-6 md:px-8" ref={emblaRef}>
        <div className="flex gap-3 md:gap-8 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] min-w-0 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden mb-4 md:mb-6 border-4 border-transparent group-hover:border-[#e95144] transition-all duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-[#232323] uppercase tracking-wider text-xs md:text-sm group-hover:text-[#e95144] transition-colors text-center">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}