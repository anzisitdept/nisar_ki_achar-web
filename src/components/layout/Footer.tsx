'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full">
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
      <div className="bg-[#5e0d0c] text-white pt-16 pb-8">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* SHOP */}
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-6 text-red-100">SHOP</h3>
              <ul className="space-y-3 text-xs font-medium">
                <li><Link href="/collections/new-arrivals" className="hover:text-red-200 transition">New Arrivals</Link></li>
                <li><Link href="/collections/pickles" className="hover:text-red-200 transition">Desi Pickles</Link></li>
                <li><Link href="/collections/murabba" className="hover:text-red-200 transition">Authentic Murabbas</Link></li>
                <li><Link href="/collections/chutney" className="hover:text-red-200 transition">Special Chutneys</Link></li>
                <li><Link href="/collections/super-foods" className="hover:text-red-200 transition">Super Foods & Seeds</Link></li>
                <li><Link href="/collections/syrup" className="hover:text-red-200 transition">Organic Syrups</Link></li>
                <li><Link href="/collections/best-selling-pickles" className="hover:text-red-200 transition">Best Selling</Link></li>
                <li><Link href="/collections/bundles" className="hover:text-red-200 transition">Bundle Offers</Link></li>
                <li><Link href="/collections/all-products" className="hover:text-red-200 font-bold underline">All Products</Link></li>
              </ul>
            </div>

            {/* INFORMATION */}
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-6 text-red-100">INFORMATION</h3>
              <ul className="space-y-3 text-xs font-medium">
                <li><Link href="/pages/returns-and-refund-policy" className="hover:text-red-200 transition">Returns & Refund Policy</Link></li>
                <li><Link href="/pages/shipping-policy" className="hover:text-red-200 transition">Shipping Policy</Link></li>
                <li><Link href="/pages/terms-conditions" className="hover:text-red-200 transition">Terms & Conditions</Link></li>
                <li><Link href="/pages/privacy-policy" className="hover:text-red-200 transition">Privacy Policy</Link></li>
                <li><Link href="/pages/frequently-asked-questions" className="hover:text-red-200 transition">Frequently Asked Questions (FAQ)</Link></li>
                <li><Link href="/pages/contact-us" className="hover:text-red-200 transition">Contact Us & Helpline</Link></li>
              </ul>
            </div>

            {/* SIGN UP */}
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-red-100">GET 10% EXTRA DISCOUNT</h3>
              <p className="text-xs mb-4 text-gray-200">Sign up for exclusive updates, new arrivals & VIP discounts.</p>
              <form onSubmit={e => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex mb-6">
                <input 
                  type="email" 
                  required
                  placeholder="Enter Email Address" 
                  className="w-full px-3 py-2.5 bg-white text-[#5e0d0c] text-xs font-semibold focus:outline-none placeholder-gray-400 rounded-l-md"
                />
                <button 
                  type="submit" 
                  className="bg-[#e95144] hover:bg-red-700 text-white font-bold text-xs tracking-wider px-4 py-2.5 rounded-r-md transition"
                >
                  JOIN
                </button>
              </form>
            </div>

            {/* CUSTOMER SERVICE */}
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-6 text-red-100">CUSTOMER SERVICE</h3>
              <ul className="space-y-3 text-xs font-medium text-gray-200">
                <li className="flex items-center"><span className="mr-2">💬</span> WhatsApp: +92 300 0504030</li>
                <li className="flex items-center"><span className="mr-2">📞</span> Helpline: 051-8300036</li>
                <li className="flex items-center"><span className="mr-2">✉</span> Email: support@soghatekhas.com</li>
                <li className="flex items-center"><span className="mr-2">🚚</span> FREE Delivery on orders over Rs. 3,000</li>
                <li className="flex items-center"><span className="mr-2">🛡</span> 100% Cash on Delivery Nationwide</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-300 font-medium">
            <p>Soghat E Khas © 2026. All Rights Reserved.</p>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <span className="text-[11px] text-gray-400 font-semibold">Payment Methods:</span>
              <span className="bg-white/10 px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
