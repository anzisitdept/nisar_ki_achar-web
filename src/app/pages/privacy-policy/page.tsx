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
          <p>Nisar Achar respects your privacy and is committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your information.</p>

          <h3 className="font-bold text-gray-900 uppercase">Information Collection</h3>
          <p>We only collect personal information necessary to fulfill your orders, including your name, phone number, delivery address, and email address. For Cash on Delivery orders, we do not collect any payment card details.</p>

          <h3 className="font-bold text-gray-900 uppercase">How We Use Your Information</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>To process and deliver your orders.</li>
            <li>To verify orders before dispatch (via WhatsApp or phone call).</li>
            <li>To provide customer support and respond to your inquiries.</li>
            <li>To send order status and delivery updates.</li>
          </ul>

          <h3 className="font-bold text-gray-900 uppercase">Data Security</h3>
          <p>Your details are strictly used for shipping and customer service communication. We never sell or share your personal data with third-party advertisers. Access to your data is limited to authorized staff and our trusted courier partners who need it to deliver your order.</p>

          <h3 className="font-bold text-gray-900 uppercase">Cookies &amp; Browsing Data</h3>
          <p>Our website may use cookies and similar technologies to improve your browsing experience, remember your cart, and analyze site performance. You can disable cookies in your browser settings; however, some site features may not function properly.</p>

          <h3 className="font-bold text-gray-900 uppercase">Third-Party Services</h3>
          <p>We use trusted third-party services, such as courier companies and payment processors, solely to fulfill orders. These parties are bound by their own privacy policies and we only share the minimum information required to complete the service.</p>

          <h3 className="font-bold text-gray-900 uppercase">Data Retention</h3>
          <p>We retain your order-related data only as long as necessary to fulfill your order, provide customer support, and comply with legal and accounting obligations.</p>

          <h3 className="font-bold text-gray-900 uppercase">Your Rights</h3>
          <p>You may request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us using the details below.</p>

          <h3 className="font-bold text-gray-900 uppercase">Contact Us</h3>
          <p>If you have any questions about this Privacy Policy or how your data is handled, please contact us at <strong>051-8300036</strong>, WhatsApp <strong>+92 305 2396699</strong>, or email <strong>admin@nisarachar.com</strong>.</p>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
