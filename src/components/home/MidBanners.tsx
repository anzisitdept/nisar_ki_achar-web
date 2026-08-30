import React from 'react';

export default function MidBanners() {
  return (
    <section className="w-full py-4 overflow-hidden">
      <div className="w-full relative bg-gray-100 group">
        {/* Desktop Banner */}
        <img 
          src="https://soghatekhas.com/cdn/shop/files/Web_banner_37_4b8a7db5-2237-470a-957b-d1ce5fc8f492.jpg?v=1774275085&width=3840" 
          alt="Promotional Banner" 
          className="w-full h-auto object-cover hidden md:block group-hover:scale-[1.01] transition-transform duration-700"
        />
        {/* Mobile Banner */}
        <img 
          src="https://soghatekhas.com/cdn/shop/files/Mob_banner_2_db98b3c4-f009-4d28-8130-70eb47e7f919.jpg?v=1774275104&width=750" 
          alt="Promotional Banner Mobile" 
          className="w-full h-auto object-cover md:hidden group-hover:scale-[1.01] transition-transform duration-700"
        />
      </div>
    </section>
  );
}
