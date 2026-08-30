'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalCount, setIsCartOpen, setIsSearchOpen, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'NEW ARRIVALS', href: '/collections/new-arrivals' },
    { label: 'PICKLES', href: '/collections/pickles' },
    { label: 'MURABBAS', href: '/collections/murabba' },
    { label: 'CHUTNEY', href: '/collections/chutney' },
    { label: 'SUPER FOODS', href: '/collections/super-foods' },
    { label: 'SYRUPS', href: '/collections/syrup' },
    { label: 'BEST SELLING', href: '/collections/best-selling-pickles' },
    { label: 'BUNDLES', href: '/collections/bundles' },
    { label: 'ALL PRODUCTS', href: '/collections/all-products' }
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
      <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5e0d0c]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                src="https://soghatekhas.com/cdn/shop/files/LogoSEK_881f3b7e-fdb5-4f01-b6e5-cfa3726171ec.webp?v=1736533537"
                alt="Soghat e Khas"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right Side Info & Actions */}
          <div className="flex flex-col items-end">
            {/* Customer Service Text */}
            <div className="hidden md:block text-[11px] text-[#5e0d0c] font-semibold text-right mb-2">
              Customer Service<br/>
              WhatsApp & Cell 0518300036
            </div>

            {/* Actions Row: Search, Shopping Cart, Wishlist, Sign in */}
            <div className="flex items-center space-x-3 md:space-x-5 text-sm">
              
              {/* Search Bar Trigger */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center bg-[#fae9e8] text-[#5e0d0c] px-3 md:px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#f5d6d4] transition"
              >
                <Search className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Search products...</span>
              </button>

              {/* Shopping Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-1.5 text-[#5e0d0c] font-bold text-xs hover:opacity-80 transition"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {totalCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#e95144] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold animate-pulse">
                      {totalCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Shopping Cart</span>
              </button>

              {/* Wishlist Link */}
              <Link 
                href="/wishlist" 
                className="flex items-center space-x-1.5 text-[#5e0d0c] font-semibold text-xs hover:opacity-80 transition"
              >
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#5e0d0c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Wishlist</span>
              </Link>

              {/* Sign in Link connected to /account */}
              <Link 
                href="/account" 
                className="flex items-center space-x-1.5 text-[#5e0d0c] font-bold text-xs hover:opacity-80 transition border-l border-gray-200 pl-3 md:pl-4"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Sign in</span>
              </Link>

            </div>
          </div>

        </div>

        {/* Navigation Row - Desktop */}
        <nav className="mt-4 hidden lg:flex justify-between items-center px-2 border-t pt-3 border-gray-100">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[#5e0d0c] font-bold text-xs uppercase tracking-widest hover:text-[#e95144] transition-colors relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5e0d0c] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-3 pb-2 animate-fadeIn">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#5e0d0c] font-bold text-xs tracking-wider uppercase py-2 border-b border-gray-50 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span>→</span>
              </Link>
            ))}
          </nav>
        )}

      </div>
    </header>
  );
}
