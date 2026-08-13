import React from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function PrivacyPolicyPage() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Privacy Policy
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <p>Soghat-e-Khas respects your privacy and is committed to protecting your personal data.</p>
          <h3 className="font-bold text-gray-900 uppercase">Information Collection</h3>
          <p>We only collect personal information necessary to fulfill your orders, including your name, phone number, delivery address, and email address.</p>
          <h3 className="font-bold text-gray-900 uppercase">Data Security</h3>
          <p>Your details are strictly used for shipping and customer service communication. We never sell or share your personal data with third-party advertisers.</p>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
