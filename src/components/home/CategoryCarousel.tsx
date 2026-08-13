'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const categories = [
  { name: 'All Pickles', image: 'https://soghatekhas.com/cdn/shop/files/6_1_900x.png' },
  { name: 'Mango Pickles', image: 'https://soghatekhas.com/cdn/shop/files/2_2_900x.png' },
  { name: 'Mixed Pickles', image: 'https://soghatekhas.com/cdn/shop/files/3_2_900x.png' },
  { name: 'Lemon Pickles', image: 'https://soghatekhas.com/cdn/shop/files/1_f5d5b353-617f-4ca6-ae85-3da84d1e4f8e_900x.png' }
];

export default function CategoryCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps'
  });

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl text-center mb-12 font-serif text-[#232323] uppercase tracking-wide">
        Shop by Category
      </h2>
      <div className="overflow-hidden max-w-5xl mx-auto" ref={emblaRef}>
        <div className="flex gap-4 md:gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] min-w-0 flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 border-transparent group-hover:border-[#e95144] transition-all duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-[#232323] uppercase tracking-wider text-sm group-hover:text-[#e95144] transition-colors">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
