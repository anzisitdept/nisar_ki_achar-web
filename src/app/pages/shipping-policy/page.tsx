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
          <p>
            This Shipping &amp; Delivery Policy explains how Nisar Achar packs, dispatches, and delivers your orders anywhere across Pakistan. By placing an order, you agree to the terms described below.
          </p>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">1. Nationwide Delivery Coverage</h2>
            <p>
              Nisar Achar delivers orders to all major cities, towns, and union councils across Pakistan — including Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Multan, Faisalabad, Quetta, and hundreds of other locations — through trusted courier partners such as TCS, Leopards Courier, M&amp;P, and Call Courier.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">2. Delivery Charges &amp; Free Shipping</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Standard flat delivery fee of <strong>Rs. 200</strong> on all orders under Rs. 3,000.</li>
              <li><strong>100% FREE Home Delivery</strong> on all orders totaling Rs. 3,000 or more.</li>
              <li>Special bundle and promotional offers may include free shipping regardless of order value.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">3. Delivery Timelines</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad &amp; Multan: <strong>2 - 3 Working Days</strong></li>
              <li>Other cities &amp; towns across Pakistan: <strong>3 - 4 Working Days</strong></li>
              <li>Remote and far-flung areas may take up to <strong>5 working days</strong> depending on courier network availability.</li>
            </ul>
            <p className="mt-2">Delivery time is counted from the moment your parcel is handed over to the courier, not from the time of ordering. Delays may occur during public holidays, heavy weather, or nationwide courier service disruptions.</p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">4. Order Verification</h2>
            <p>
              Before dispatching your Cash on Delivery (COD) parcel, our customer support team verifies every order to minimize delivery failures. We will contact you via <strong>WhatsApp message or phone call</strong> on the number provided at checkout. Please keep this number reachable, as failed verification may delay dispatch.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">5. Packing &amp; Quality Protection</h2>
            <p>
              Every glass jar is carefully wrapped in heavy-duty bubble wrap and packed inside a reinforced corrugated box to protect the product from leaking, breaking, or damage during transit.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">6. Cash on Delivery (COD) Payment</h2>
            <p>
              We offer Cash on Delivery across all cities in Pakistan. You pay the total amount — in cash — directly to the courier representative only when your parcel is delivered to your doorstep. No advance payment is required for COD orders.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">7. Order Tracking &amp; Support</h2>
            <p>
              Once your parcel is dispatched, you will receive a tracking number on WhatsApp. For any delivery-related query, contact our helpline at <strong>051-8300036</strong> or WhatsApp us at <strong>+92 305 2396699</strong>. Our support team is available Mon - Sat (9:00 AM - 9:00 PM).
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">8. Damaged or Incorrect Delivery</h2>
            <p>
              If you receive a damaged, leaking, or incorrect item, please notify us within <strong>24 hours of delivery</strong> with photo or video evidence on WhatsApp. We will arrange a free replacement or refund in accordance with our Returns &amp; Refund Policy.
            </p>
          </div>

          <p className="pt-2 text-gray-500">
            This policy may be updated from time to time. Please review this page before placing an order.
          </p>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
