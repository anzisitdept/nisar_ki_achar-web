import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function BlogPage() {
  const posts = [
    {
      id: 'post-1',
      title: 'Health Benefits of Quince Murabba (Bahii) in Tibb-e-Nabwi',
      date: 'Aug 5, 2026',
      snippet: 'Discover why Quince (Safargal) fruit is celebrated in Sunnah for heart health, anxiety reduction, and stomach soothing.',
      img: 'https://soghatekhas.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg'
    },
    {
      id: 'post-2',
      title: 'Why Pure Cold-Pressed Mustard Oil Makes Pickles Healthy',
      date: 'Jul 28, 2026',
      snippet: 'Learn how traditional mustard oil acts as a natural bio-preservative while boosting digestion and gut microbiota.',
      img: 'https://soghatekhas.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg'
    }
  ];

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Soghat-e-Khas Organic Journal
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mt-2">
            Recipes, Tibb-e-Nabwi insights, and health benefits of traditional Pakistani foods.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12">
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-6 items-center">
              <img src={post.img} alt={post.title} className="w-full md:w-48 h-48 object-cover rounded-2xl flex-shrink-0" />
              <div className="space-y-2">
                <span className="text-[11px] text-[#5e0d0c] font-bold uppercase">{post.date}</span>
                <h2 className="text-lg font-bold text-gray-900 font-serif leading-snug">{post.title}</h2>
                <p className="text-xs text-gray-600 leading-relaxed">{post.snippet}</p>
                <Link href="#" className="inline-block text-xs font-bold text-[#5e0d0c] hover:underline pt-2">
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
