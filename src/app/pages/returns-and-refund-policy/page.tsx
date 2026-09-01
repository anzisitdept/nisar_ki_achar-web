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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#e60000] uppercase tracking-wide">
            Returns & Refund Policy
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">100% Taste &amp; Transit Guarantee</h2>
            <p>
              At Nisar Achar, customer satisfaction is our top priority. We take immense pride in crafting authentic homemade pickles and preserves. If for any reason your order does not meet your expectations, we are here to make it right through our easy return and refund process.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">1. Damaged or Leaking Jar Replacement</h2>
            <p>
              If your parcel arrives with a broken, cracked, or leaking glass jar, please notify us within <strong>24 hours of delivery</strong> by sending a clear photo or video of the parcel (including the packaging) to our WhatsApp helpline at <strong>051-8300036</strong>. Once verified, we will dispatch a brand-new replacement jar absolutely <strong>free of cost</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">2. Wrong or Missing Item</h2>
            <p>
              If you receive an item different from what you ordered, or if any item is missing from your parcel, contact us within <strong>24 to 48 hours of delivery</strong> with your order number and a photo of the received items. We will arrange a replacement or a full refund for the affected product at no extra cost.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">3. Refund Processing</h2>
            <p>
              Once your claim is approved, refunds are processed via <strong>Bank Transfer, JazzCash, or Easypaisa</strong> within <strong>3 to 5 working days</strong>. You will receive a confirmation once the refund has been initiated.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">4. Non-Returnable Items</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Opened, partially consumed, or tampered products (for hygiene reasons).</li>
              <li>Products damaged due to misuse, improper storage, or mishandling after delivery.</li>
              <li>Order cancellation once the parcel has been dispatched.</li>
              <li>Change-of-mind requests. Please confirm your order carefully before placing it.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">5. How to Submit a Request</h2>
            <p>
              To raise a return or refund request, WhatsApp us at <strong>051-8300036</strong> or email <strong>admin@nisarachar.com</strong> with your order number, name, and supporting photo/video. Our support team will guide you through the process and resolve your issue as quickly as possible.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">6. Change of Mind / Order Cancellation</h2>
            <p>
              You may cancel an order before dispatch by contacting our helpline. Once a parcel has been handed over to the courier, cancellation is no longer possible. Please review your order details before confirming checkout.
            </p>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
