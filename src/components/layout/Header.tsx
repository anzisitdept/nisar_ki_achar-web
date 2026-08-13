import React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 mb-4 lg:mb-0">
            <Link href="/">
              <img
                src="https://soghatekhas.com/cdn/shop/files/LogoSEK_881f3b7e-fdb5-4f01-b6e5-cfa3726171ec.webp?v=1736533537"
                alt="Soghat e Khas"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right Side Info & Actions */}
          <div className="flex flex-col items-end">
            {/* Customer Service Text */}
            <div className="text-[11px] text-[#5e0d0c] font-semibold text-right mb-2">
              Customer Service<br/>
              WhatsApp & Cell 0518300036
            </div>

            {/* Actions Row */}
            <div className="flex items-center space-x-6 text-sm">
              {/* Search Bar */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-[#fae9e8] text-[#5e0d0c] placeholder-[#5e0d0c] text-xs px-4 py-2 w-48 focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5e0d0c]">
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Shopping Cart */}
              <Link href="/cart" className="flex items-center space-x-2 text-[#5e0d0c] font-semibold text-xs">
                <ShoppingBag className="w-4 h-4" />
                <span>Shopping cart</span>
                <span className="bg-[#5e0d0c] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="flex items-center space-x-2 text-[#5e0d0c] font-semibold text-xs">
                <Heart className="w-4 h-4" />
                <span>My wish list</span>
              </Link>

              {/* Sign In */}
              <Link href="/account/login" className="text-[#5e0d0c] font-semibold text-xs">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Row */}
        <nav className="mt-6 hidden lg:flex justify-between items-center px-4">
          {['NEW ARRIVALS', 'PICKLES', 'MURABBAS', 'CHUTNEY', 'SUPER FOODS', 'SYRUPS', 'BEST SELLING', 'BUNDLES', 'ALL PRODUCTS'].map((item) => (
            <Link 
              key={item} 
              href={`/collections/${item.toLowerCase().replace(/ /g, '-')}`} 
              className="text-[#5e0d0c] font-bold text-sm tracking-widest hover:opacity-70 transition-opacity"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
