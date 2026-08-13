import React from 'react';

export default function ContactBlock() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-3xl font-bold text-black mb-4">We are here to help!</h2>
        <p className="text-gray-700 mb-10 text-lg">Have a question or need assistance? Reach out to us.</p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="mailto:info@soghatekhas.com" className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-lg flex flex-col items-center justify-center gap-4">
            <img src="https://soghatekhas.com/cdn/shop/files/mail.png?v=1770069229&width=200" alt="Email" className="w-12 h-12" />
            <span className="font-semibold text-gray-800">Email Us</span>
          </a>
          
          <a href="https://wa.me/923000000000" className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-lg flex flex-col items-center justify-center gap-4">
            <img src="https://soghatekhas.com/cdn/shop/files/whatsapp.png?v=1770069281&width=200" alt="WhatsApp" className="w-12 h-12" />
            <span className="font-semibold text-gray-800">WhatsApp Us</span>
          </a>
          
          <a href="tel:+923000000000" className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-lg flex flex-col items-center justify-center gap-4">
            <img src="https://soghatekhas.com/cdn/shop/files/phone.png?v=1770069404&width=200" alt="Phone" className="w-12 h-12" />
            <span className="font-semibold text-gray-800">Call Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
