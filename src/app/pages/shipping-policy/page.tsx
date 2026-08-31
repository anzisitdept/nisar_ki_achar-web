import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function ShippingPolicyPage() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Shipping & Delivery Policy
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
          
          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">1. Nationwide Delivery</h2>
            <p>
              Nisar Achar delivers orders across all major cities and towns in Pakistan through trusted courier partners including TCS, Leopards Courier, and M&P.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">2. Delivery Charges & Free Shipping</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Flat delivery fee of <strong>Rs. 200</strong> on orders under Rs. 3,000.</li>
              <li><strong>100% FREE Delivery</strong> on all orders totaling Rs. 3,000 or more.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">3. Delivery Timelines</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Lahore, Islamabad, Rawalpindi, Karachi: 2 - 3 Working Days</li>
              <li>Other Cities & Towns: 3 - 4 Working Days</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">4. Order Verification</h2>
            <p>
              Before dispatching your Cash on Delivery (COD) parcel, our customer support team will send an automated WhatsApp message or call you on the phone number provided at checkout.
            </p>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
