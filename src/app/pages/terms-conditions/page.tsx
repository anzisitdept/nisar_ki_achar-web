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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#e60000] uppercase tracking-wide">
            Terms & Conditions
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <p>Welcome to Nisar Achar. By accessing and using our website, browsing our products, or placing an order, you agree to be bound by the following Terms &amp; Conditions. Please read them carefully before making a purchase.</p>

          <h3 className="font-bold text-gray-900 uppercase">1. General Terms</h3>
          <p>Nisar Achar provides this website and its services for your personal, non-commercial use to purchase authentic homemade pickles and preserves. By using our site, you confirm that you are at least 18 years of age or are ordering with the supervision of a parent or guardian.</p>

          <h3 className="font-bold text-gray-900 uppercase">2. Product Accuracy</h3>
          <p>We strive to accurately display product titles, weights, prices, and imagery. Please note that product images shown are for illustration purposes. All products are weighed by volume (grams) as commonly practiced for pickles and murabbas unless clearly stated otherwise.</p>
          <p>As our items are handcrafted in traditional batches, slight natural variations in color, texture, oil content, or packaging may occur. These variations do not affect the quality or taste of the product and are not considered defects.</p>

          <h3 className="font-bold text-gray-900 uppercase">3. Prices &amp; Availability</h3>
          <p>All prices are listed in Pakistani Rupees (PKR) and are inclusive of applicable taxes. Prices and product availability are subject to change without prior notice. We reserve the right to refuse or cancel any order due to pricing errors, stock unavailability, or suspected fraudulent activity.</p>

          <h3 className="font-bold text-gray-900 uppercase">4. Cash on Delivery Orders</h3>
          <p>Orders placed via Cash on Delivery represent a binding commitment to purchase. Please ensure your contact details, delivery address, and order quantity are correct at the time of checkout. Repeated cancellation or refusal of COD parcels may result in restriction of future orders from the same number or address.</p>

          <h3 className="font-bold text-gray-900 uppercase">5. Order Processing</h3>
          <p>We process and dispatch orders on working days (Monday - Saturday). Orders placed on weekends or public holidays are processed on the next working day. Our team verifies each COD order before dispatch.</p>

          <h3 className="font-bold text-gray-900 uppercase">6. Delivery Policy</h3>
          <p>Delivery timelines and charges are governed by our Shipping &amp; Delivery Policy, which forms part of these Terms &amp; Conditions. We are not responsible for delays caused by courier partners, adverse weather, or force majeure events beyond our reasonable control.</p>

          <h3 className="font-bold text-gray-900 uppercase">7. Returns &amp; Refunds</h3>
          <p>All returns and refunds are governed by our Returns &amp; Refund Policy. No returns or refunds are accepted for opened, partially consumed, or non-defective products. Damaged or leaking jars must be reported within 24 hours of delivery.</p>

          <h3 className="font-bold text-gray-900 uppercase">8. Intellectual Property</h3>
          <p>All content on this website — including text, logos, images, graphics, product descriptions, and the &quot;Nisar Achar&quot; brand name — is the property of Nisar Achar and is protected under copyright and trademark laws. You may not reproduce, copy, or reuse any content without our prior written consent.</p>

          <h3 className="font-bold text-gray-900 uppercase">9. Limitation of Liability</h3>
          <p>To the fullest extent permitted by law, Nisar Achar shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability in any case shall be limited to the amount paid by you for the specific product.</p>

          <h3 className="font-bold text-gray-900 uppercase">10. Privacy &amp; Data Protection</h3>
          <p>Any personal information you provide is handled in accordance with our Privacy Policy. Your details are used solely for order fulfillment and customer service communication and are never sold to third parties.</p>

          <h3 className="font-bold text-gray-900 uppercase">11. Governing Law</h3>
          <p>These Terms &amp; Conditions are governed by the laws of the Islamic Republic of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts of Islamabad, Pakistan.</p>

          <h3 className="font-bold text-gray-900 uppercase">12. Changes to Terms</h3>
          <p>We reserve the right to update or modify these Terms &amp; Conditions at any time without prior notice. Continued use of the website after changes are posted constitutes acceptance of the revised terms.</p>

          <h3 className="font-bold text-gray-900 uppercase">Contact Us</h3>
          <p>If you have any questions regarding these Terms &amp; Conditions, please contact us at <strong>0334-1677114</strong>, WhatsApp <strong>+92 334 1677114</strong>, or email <strong>admin@nisarachar.com</strong>.</p>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
