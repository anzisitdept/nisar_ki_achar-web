import React from 'react';
import Link from 'next/link';
import { Link as LucideLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Trust Badges Section */}
      <div className="bg-white py-8 border-t border-gray-100 flex justify-center items-center space-x-8">
        <div className="flex items-center space-x-2 text-[#00b67a]">
          <span className="text-xl">★★★★★</span>
          <span className="text-sm font-semibold">1726 reviews</span>
        </div>
        <img src="https://cdn.shopify.com/s/files/1/0268/7342/1899/files/judge_me_reviews.png" alt="1726 Verified Reviews" className="h-16" />
        <img src="https://cdn.shopify.com/s/files/1/0268/7342/1899/files/judge_me_monthly.png" alt="Monthly Record 217" className="h-16" />
        <img src="https://cdn.shopify.com/s/files/1/0268/7342/1899/files/judge_me_top5.png" alt="Top 5% Stores" className="h-16" />
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#5e0d0c] text-white pt-16 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* SHOP */}
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-6">SHOP</h3>
              <ul className="space-y-4 text-xs font-semibold">
                <li><Link href="/" className="hover:text-gray-300">New Arrivals</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Pickles</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Murabbas</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Chutney</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Super Foods</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Syrups</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Best Selling</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Bundles</Link></li>
                <li><Link href="/" className="hover:text-gray-300">All Products</Link></li>
              </ul>
            </div>

            {/* INFORMATION */}
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-6">INFORMATION</h3>
              <ul className="space-y-4 text-xs font-semibold">
                <li><Link href="/" className="hover:text-gray-300">Returns And Refund Policy</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Cancellation Policy</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Terms & Conditions</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Shipping Policy</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Privacy Policy</Link></li>
                <li><Link href="/" className="hover:text-gray-300">FAQ's</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Cookie Policy</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Blogs</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Careers</Link></li>
                <li><Link href="/" className="hover:text-gray-300">Contact Us</Link></li>
              </ul>
            </div>

            {/* SIGN UP */}
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-6">SIGN UP AND AVAIL 10% EXTRA DISCOUNT</h3>
              <p className="text-xs mb-6 font-semibold">Sign up for exclusive updates, new arrivals & insider only discounts</p>
              <form className="flex mb-8">
                <input 
                  type="email" 
                  placeholder="Enter Your Email Address" 
                  className="flex-1 px-4 py-3 bg-white text-[#5e0d0c] text-xs font-semibold focus:outline-none placeholder-[#5e0d0c]"
                />
                <button 
                  type="submit" 
                  className="bg-white text-[#5e0d0c] font-bold text-xs tracking-widest px-6 py-3 ml-px hover:bg-gray-100"
                >
                  SUBMIT
                </button>
              </form>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 rounded-full bg-white text-[#5e0d0c] flex items-center justify-center hover:bg-gray-200"><LucideLink className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-white text-[#5e0d0c] flex items-center justify-center hover:bg-gray-200"><LucideLink className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-white text-[#5e0d0c] flex items-center justify-center hover:bg-gray-200"><LucideLink className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-white text-[#5e0d0c] flex items-center justify-center hover:bg-gray-200"><LucideLink className="w-4 h-4" /></a>
              </div>
            </div>

            {/* CUSTOMER SERVICE */}
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-6">CUSTOMER SERVICE</h3>
              <ul className="space-y-4 text-xs font-semibold">
                <li className="flex items-center"><span className="mr-2">📞</span> WhatsApp us on +92 305 2396699</li>
                <li className="flex items-center"><span className="mr-2">📞</span> WhatsApp or ☎ Call us on 0518300036.</li>
                <li className="flex items-center"><span className="mr-2">✉</span> admin@soghatekhas.com</li>
                <li className="flex items-center"><span className="mr-2">🚚</span> Free Shipping Over 2999 PKR Order.</li>
                <li className="flex items-center"><span className="mr-2">📢</span> 7 Days Easy Returns & Exchange Available</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-semibold">
            <p>Soghat E Khas @2025. All Rights Reserved</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="w-10 h-6 bg-[#1a1f71] rounded flex items-center justify-center text-white text-[10px] font-bold italic">VISA</div>
              <div className="w-10 h-6 bg-[#252525] rounded flex items-center justify-center">
                <div className="flex">
                  <div className="w-4 h-4 rounded-full bg-[#eb001b] -mr-1 mix-blend-screen"></div>
                  <div className="w-4 h-4 rounded-full bg-[#f79e1b] mix-blend-screen"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
