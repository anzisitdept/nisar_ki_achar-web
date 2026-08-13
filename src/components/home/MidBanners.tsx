import React from 'react';

export default function MidBanners() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative w-full h-[300px] md:h-[400px] bg-gray-200 overflow-hidden group">
          <img 
            src="https://soghatekhas.com/cdn/shop/files/Web_banner_37_4b8a7db5-2237-470a-957b-d1ce5fc8f492.jpg?v=1774275085&width=3840" 
            alt="Promotional Banner" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hidden md:block"
          />
          <img 
            src="https://soghatekhas.com/cdn/shop/files/Mob_banner_2_db98b3c4-f009-4d28-8130-70eb47e7f919.jpg?v=1774275104&width=750" 
            alt="Promotional Banner Mobile" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 md:hidden"
          />
        </div>
      </div>
    </section>
  );
}
