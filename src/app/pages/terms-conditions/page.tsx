import React from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function TermsPage() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Terms & Conditions
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <p>Welcome to Nisar Achar. By accessing and using our website, you agree to comply with our Terms & Conditions.</p>
          <h3 className="font-bold text-gray-900 uppercase">Product Accuracy</h3>
          <p>We strive to accurately display product titles, weights, prices, and imagery. As our items are handcrafted in traditional batches, slight natural variations in color or texture may occur.</p>
          <h3 className="font-bold text-gray-900 uppercase">Cash on Delivery Orders</h3>
          <p>Orders placed via Cash on Delivery represent a binding commitment. Please ensure correct contact details and address during checkout.</p>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
