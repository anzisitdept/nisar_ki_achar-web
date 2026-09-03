'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalCount, setIsCartOpen, setIsSearchOpen, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        // Hide header when scrolling down past the hero, show when near top or scrolling up
        if (y > lastY && y > 120) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll while the drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'NEW ARRIVALS', href: '/collections/new-arrivals' },
    {
      label: 'ACHAR',
      href: '/collections/achar',
      badge: { text: 'NEW ARRIVALS', className: 'bg-[#e60000] text-white' },
    },
    { label: 'CHUTNEY', href: '/collections/chutney' },
    { label: 'BEST SELLING', href: '/collections/best-selling-pickles' },

    { label: 'ALL PRODUCTS', href: '/collections/all-products' },
  ];

  return (
    <>
      <header className={`bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="container mx-auto px-3 md:px-4 lg:px-8 py-3 lg:py-4">

          {/* Top Header Row */}
          <div className="flex items-center justify-between gap-2">

            {/* Mobile Menu Toggle */}
            <button
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#e60000] flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Logo — this wrapper's height is what sizes the header row.
              The <img> itself is absolutely positioned and can be drawn
              larger than the wrapper without stretching the row, since
              absolutely-positioned elements are pulled out of normal flow
              and don't contribute to their parent's height. */}
            <div className="flex-shrink-0 relative h-12 sm:h-14 md:h-14 w-36 sm:w-40 md:w-36">
              <Link
                href="/"
                className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center z-10"
              >
                <img
                  src="/NISAAR.png"
                  alt="Nisar Achar"
                  className="h-24 sm:h-28 md:h-32 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right Side Info & Actions */}
            <div className="flex flex-col items-end min-w-0">
              {/* Customer Service Text */}
              <div className="hidden md:block text-[11px] text-[#e60000] font-semibold text-right mb-2">
                Customer Service<br />
                WhatsApp & Cell 0334-1677114
              </div>

              {/* Actions Row: Search, Shopping Cart, Wishlist, Sign in */}
              <div className="flex items-center space-x-1.5 sm:space-x-3 md:space-x-5 text-sm">

                {/* Search Bar Trigger */}
                <button
                  suppressHydrationWarning
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center bg-[#fae9e8] text-[#e60000] px-2 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-semibold hover:bg-[#f5d6d4] transition"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:mr-2" />
                  <span className="hidden md:inline">Search products...</span>
                </button>

                {/* Shopping Cart Button */}
                <button
                  suppressHydrationWarning
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center space-x-1.5 text-[#e60000] font-bold text-[10px] md:text-xs hover:opacity-80 transition"
                >
                  <div className="relative">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    {mounted && totalCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#e60000] text-white text-[9px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-extrabold animate-pulse">
                        {totalCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">Shopping Cart</span>
                </button>

                {/* Wishlist Link */}
                <Link
                  href="/wishlist"
                  className="flex items-center space-x-1.5 text-[#e60000] font-semibold text-[10px] md:text-xs hover:opacity-80 transition"
                >
                  <div className="relative">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    {mounted && wishlist.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#e60000] text-white text-[9px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-bold">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">Wishlist</span>
                </Link>

                {/* Sign in Link connected to /account */}
                <Link
                  href="/account"
                  className="flex items-center space-x-1.5 text-[#e60000] font-bold text-[10px] md:text-xs hover:opacity-80 transition border-l border-gray-200 pl-1.5 sm:pl-3 md:pl-4"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className="text-[#e60000] font-bold text-xs uppercase tracking-widest relative group py-1 transition-colors"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e60000] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

        </div>
      </header>

      {/* Mobile Off-Canvas Menu (slides in from the left) — portaled to <body> so it
        escapes the header's transform (transformed ancestors turn `fixed` into
        containing-block-relative, which was clipping the drawer to the header's height) */}
      {mounted && createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-[100] ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Drawer Panel */}
          <div
            className={`absolute top-0 left-0 h-full w-[82%] max-w-[340px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            {/* Dark "Menu" header bar */}
            <div className="flex items-center justify-between bg-black px-4 py-4 flex-shrink-0">
              <span className="text-white font-bold text-base">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-1"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-4 border-b border-gray-100 text-[#e60000] font-bold text-sm capitalize"
                >
                  <span className="capitalize">{item.label.charAt(0) + item.label.slice(1).toLowerCase()}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${item.badge.className}`}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}