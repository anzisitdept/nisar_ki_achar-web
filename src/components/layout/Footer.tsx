'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

/* ─── Collapsible Footer Section (dropdown on mobile, always open on desktop) ─── */
function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:block">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="lg:cursor-default w-full flex items-center justify-between lg:justify-start text-left"
      >
        <h3 className="font-bold text-xs tracking-widest uppercase mb-0 lg:mb-5 text-white font-sans">
          {title}
        </h3>
        <span className="lg:hidden text-white/80 transition-transform duration-300">
          <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <div className={`${open ? 'block' : 'hidden'} lg:block mt-3 lg:mt-0`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Professional SVG Social Icons ─────────────────── */
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.11V9.3a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.57a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-3.04-1.12c-.44-.36-.78-.83-1-1.35V6.69z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full font-sans">
      {/* Trust Badges Section */}
      <div className="bg-white py-8 border-t border-gray-100 flex flex-wrap justify-center items-center gap-6 md:gap-12 px-4 text-center">
        <div className="flex items-center space-x-2 text-[#00b67a]">
          <span className="text-xl">★★★★★</span>
          <span className="text-sm font-bold">1726 reviews</span>
        </div>
        <img src="https://cdn.shopify.com/s/files/1/0268/7342/1899/files/judge_me_reviews.png" alt="1726 Verified Reviews" className="h-14 w-auto" />
        <img src="https://cdn.shopify.com/s/files/1/0268/7342/1899/files/judge_me_monthly.png" alt="Monthly Record 217" className="h-14 w-auto" />
        <img src="https://cdn.shopify.com/s/files/1/0268/7342/1899/files/judge_me_top5.png" alt="Top 5% Stores" className="h-14 w-auto" />
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#4a0808] text-white pt-14 pb-8">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1320px]">

          {/* 4-Column Grid matching official layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* Column 1: SHOP */}
            <div>
              <FooterSection title="SHOP">
                <ul className="space-y-2.5 text-xs font-normal text-gray-200">
                  <li><Link href="/collections/new-arrivals" className="hover:underline">New Arrivals</Link></li>
                  <li><Link href="/collections/pickles" className="hover:underline">Pickles</Link></li>
                  <li><Link href="/collections/murabba" className="hover:underline">Murabbas</Link></li>
                  <li><Link href="/collections/chutney" className="hover:underline">Chutney</Link></li>
                  <li><Link href="/collections/super-foods" className="hover:underline">Super Foods</Link></li>
                  <li><Link href="/collections/syrup" className="hover:underline">Syrups</Link></li>
                  <li><Link href="/collections/best-selling-pickles" className="hover:underline">Best Selling</Link></li>
                  <li><Link href="/collections/bundles" className="hover:underline">Bundles</Link></li>
                  <li><Link href="/collections/all-products" className="hover:underline">All Products</Link></li>
                </ul>
              </FooterSection>
            </div>

            {/* Column 2: INFORMATION */}
            <div>
              <FooterSection title="INFORMATION">
                <ul className="space-y-2.5 text-xs font-normal text-gray-200">
                  <li><Link href="/pages/returns-and-refund-policy" className="hover:underline">Returns And Refund Policy</Link></li>
                  <li><Link href="/pages/cancellation-policy" className="hover:underline">Cancellation Policy</Link></li>
                  <li><Link href="/pages/terms-conditions" className="hover:underline">Terms & Conditions</Link></li>
                  <li><Link href="/pages/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
                  <li><Link href="/pages/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                  <li><Link href="/pages/frequently-asked-questions" className="hover:underline">FAQ's</Link></li>
                  <li><Link href="/pages/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
                  <li><Link href="/pages/contact-us" className="hover:underline">Contact Us</Link></li>
                </ul>
              </FooterSection>
            </div>

            {/* Column 3: SIGN UP AND AVAIL 10% EXTRA DISCOUNT */}
            <div>
              <h3 className="font-bold text-xs tracking-wider uppercase mb-3 text-white leading-snug">
                SIGN UP AND AVAIL 10% EXTRA DISCOUNT
              </h3>
              <p className="text-xs mb-4 text-gray-200 leading-relaxed">
                Sign up for exclusive updates, new arrivals & insider only discounts
              </p>

              {/* Form Input + Submit Button */}
              <form onSubmit={e => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex gap-2 mb-5">
                <input
                  type="email"
                  required
                  placeholder="Enter Your Email Address"
                  className="w-full px-3 py-2.5 bg-white text-[#4a0808] text-xs font-medium focus:outline-none placeholder-gray-500 rounded-none"
                />
                <button
                  type="submit"
                  className="bg-white text-[#4a0808] font-bold text-xs tracking-wider uppercase px-4 py-2.5 hover:bg-gray-100 transition rounded-none flex-shrink-0"
                >
                  SUBMIT
                </button>
              </form>

              {/* 4 Professional White Circle Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white text-[#4a0808] flex items-center justify-center transition-all duration-200 hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white"
                  title="Facebook"
                >
                  <FacebookIcon />
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white text-[#4a0808] flex items-center justify-center transition-all duration-200 hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white"
                  title="Instagram"
                >
                  <InstagramIcon />
                </a>
                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white text-[#4a0808] flex items-center justify-center transition-all duration-200 hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white"
                  title="TikTok"
                >
                  <TiktokIcon />
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white text-[#4a0808] flex items-center justify-center transition-all duration-200 hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white"
                  title="YouTube"
                >
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* Column 4: CUSTOMER SERVICE */}
            <div>
              <h3 className="font-bold text-xs tracking-widest uppercase mb-5 text-white font-sans">CUSTOMER SERVICE</h3>
              <ul className="space-y-3 text-xs font-normal text-gray-200 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span>📞</span>
                  <span>WhatsApp us on <strong>+92 305 2396699</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📞</span>
                  <span>WhatsApp or ☎ Call us on <strong>0518300036</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✉</span>
                  <span>admin@nisarachar.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🚚</span>
                  <span>Free Shipping Over 2999 PKR Order.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📣</span>
                  <span>7 Days Easy Returns & Exchange Available</span>
                </li>
              </ul>

              {/* Developed By ANZI & Co. watermark */}
              <div className="mt-6 pt-5 border-t border-white/20">
                <p className="text-[10px] text-gray-300/70 mb-2">Developed By</p>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#e6b800] text-[#4a0808] flex items-center justify-center font-bold text-sm">A</span>
                  <span className="font-bold tracking-wide text-[#e6b800]">ANZI &amp; Co.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Visa / Mastercard Logos without white container background */}
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-sm md:text-base text-gray-100 font-medium gap-4">
            <p>Nisar Achar @2025. All Rights Reserved</p>

            {/* Payment Method Images rendered side by side directly */}
            <div className="flex items-center gap-3">
              <img
                src="/Visa.png"
                alt="Visa"
                className="h-10 w-auto object-contain rounded-sm"
              />
              <img
                src="/mastercard.jpg"
                alt="Mastercard"
                className="h-10 w-auto object-contain rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
