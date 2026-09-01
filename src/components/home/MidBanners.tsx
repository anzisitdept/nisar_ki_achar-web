'use client';

import React from 'react';
import Link from 'next/link';
import { useStoreData } from '@/context/StoreDataContext';

export default function MidBanners() {
  const { storeContent } = useStoreData();
  const banners = (storeContent.midBanners || []).filter(
    b => b && typeof b.image === 'string' && b.image.trim() !== ''
  );

  if (banners.length === 0) return null;

  return (
    <section className="w-full py-4 md:py-8 flex flex-col gap-4 md:gap-6 overflow-hidden">
      {banners.map((banner, idx) => (
        <Link
          href={banner.link || '/collections/all-products'}
          key={banner.id || idx}
          className="w-full block relative bg-gray-50 group cursor-pointer overflow-hidden"
        >
          <img
            src={banner.image}
            alt={banner.alt || "Promotional Banner"}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto md:h-full md:min-h-[120px] object-contain md:object-cover block transition-transform duration-500 group-hover:scale-[1.005]"
          />
        </Link>
      ))}
    </section>
  );
}
