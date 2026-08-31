import React from 'react';

const contactItems = [
  {
    href: 'mailto:admin@nisarachar.com',
    src: '/mail.webp',
    alt: 'Email',
    label: 'Email Us',
  },
  {
    href: 'https://wa.me/923052396699',
    src: '/whatsapp.webp',
    alt: 'WhatsApp',
    label: 'WhatsApp Us',
  },
  {
    href: 'tel:0518300036',
    src: '/phone.webp',
    alt: 'Phone',
    label: 'Call Us',
  },
];

export default function ContactBlock() {
  return (
    <section className="py-12 md:py-16 bg-white w-full">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">We are here to help!</h2>
        <p className="text-gray-700 mb-8 md:mb-10 text-base md:text-lg">Have a question or need assistance? Reach out to us.</p>

        <div className="flex flex-row justify-center items-stretch gap-3 sm:gap-4 md:gap-6">
          {contactItems.map((item) => (
            <a
              key={item.alt}
              href={item.href}
              className="flex-1 min-w-0 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all p-4 md:p-6 rounded-xl flex flex-col items-center justify-center gap-2 md:gap-4 cursor-pointer no-underline"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
              />
              <span className="font-semibold text-gray-800 text-sm md:text-base">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
