import React from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function ReturnsPolicyPage() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Returns & Refund Policy
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
          
          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">100% Taste & Transit Guarantee</h2>
            <p>
              At Nisar Achar, customer satisfaction is our top priority. We take immense pride in crafting authentic homemade pickles and preserves.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">Damaged or Leaking Jar Replacement</h2>
            <p>
              If your parcel arrives with a broken or leaking glass jar, please notify us within 24 hours of delivery by sending a photo or video of the parcel to our WhatsApp helpline at <strong>051-8300036</strong>. We will dispatch a brand-new replacement jar free of cost!
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">Refund Processing</h2>
            <p>
              Approved refunds are processed via Bank Transfer or JazzCash / Easypaisa within 3 to 5 working days.
            </p>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
