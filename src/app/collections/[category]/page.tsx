import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import ProductCarousel from '@/components/home/ProductCarousel';
import { getCategoryBySlug, CATEGORIES } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import ProductCardClient from './ProductCardClient';

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryCollectionPage({ params }: PageProps) {
  const { category } = await params;
  
  const categoryData = getCategoryBySlug(category);
  const products = getProductsByCategory(category);

  // If not found in specific categories, but valid products exist, construct fallback meta
  const title = categoryData ? categoryData.name : category.replace(/-/g, ' ').toUpperCase();
  const urduName = categoryData ? categoryData.urduName : '';
  const description = categoryData
    ? categoryData.description
    : 'Discover authentic homemade Soghat-e-Khas products prepared with fresh ingredients.';

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      {/* Category Hero Header */}
      <section className="bg-[#fae9e8] py-12 border-b border-red-100 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
          <nav className="text-xs text-[#5e0d0c]/70 font-semibold mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections/all-products" className="hover:underline">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5e0d0c] font-bold">{title}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            {title}
          </h1>
          {urduName && (
            <p className="text-lg md:text-2xl text-[#5e0d0c]/80 font-bold mt-1 font-sans">
              {urduName}
            </p>
          )}
          <p className="text-xs md:text-sm text-gray-700 max-w-2xl mx-auto mt-3 leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Collection Grid */}
      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-12">
        <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
          <span className="text-xs font-semibold text-gray-600">
            Showing <strong className="text-gray-900">{products.length}</strong> items in {title}
          </span>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-500">Categories:</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <Link
                  key={c.id}
                  href={`/collections/${c.slug}`}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                    c.slug === category
                      ? 'bg-[#5e0d0c] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-[#fae9e8]'
                  }`}
                >
                  {c.name.split(' ')[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium">No items found in this category.</p>
            <Link
              href="/collections/all-products"
              className="inline-block mt-4 bg-[#5e0d0c] text-white text-xs font-bold px-6 py-3 rounded-lg"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCardClient key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Explore Other Collections */}
        <section className="mt-16 border-t pt-12">
          <ProductCarousel title="YOU MAY ALSO LIKE" categoryFilter="best-selling" />
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
