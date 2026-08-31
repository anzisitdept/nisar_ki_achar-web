'use client';

import React from 'react';
import Link from 'next/link';
import { useStoreData } from '@/context/StoreDataContext';

export default function MidBanners() {
  const { storeContent } = useStoreData();
  const banners = (storeContent.midBanners || []).filter(b => b && typeof b.image === 'string' && b.image.trim() !== '');

  return (
    <section className="w-full py-3 md:py-4 flex flex-col gap-3 md:gap-4 overflow-hidden px-2 md:px-0">
      {banners.map((banner, idx) => (
        <Link 
          href={banner.link || '/collections/all-products'} 
          key={banner.id || idx} 
          className="w-full block relative bg-gray-100 group cursor-pointer"
        >
          <img 
            src={banner.image} 
            alt={banner.alt || "Promotional Banner"} 
            className="w-full h-auto object-cover group-hover:scale-[1.005] transition-transform duration-700"
          />
        </Link>
      ))}
    </section>
  );
}
