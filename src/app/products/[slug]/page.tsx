'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import ProductCarousel from '@/components/home/ProductCarousel';
import { useStoreData } from '@/context/StoreDataContext';
import ProductDetailClient from './ProductDetailClient';

export default function ProductDetailPage({ params }: { params?: Promise<{ slug: string }> }) {
  const routeParams = useParams();
  // Support both Next.js route params and promise params
  const unwrappedParams = params ? use(params) : null;
  const rawSlug = (unwrappedParams?.slug || routeParams?.slug || '') as string;
  const decodedSlug = decodeURIComponent(rawSlug).trim();

  const { products, categories, isLoading } = useStoreData();

  // Find product by slug or id (case-insensitive matching)
  const product = products.find(
    p => p.slug === decodedSlug || 
         p.id === decodedSlug || 
         p.slug.toLowerCase() === decodedSlug.toLowerCase() || 
         p.id.toLowerCase() === decodedSlug.toLowerCase()
  );

  if (isLoading && !product) {
    return (
      <>
        <TopBar />
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#e60000]"></div>
          <p className="text-gray-400 text-xs tracking-wider uppercase font-medium">Loading Product...</p>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <TopBar />
        <Header />
        <div className="container mx-auto px-4 py-24 text-center max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-500 text-xs md:text-sm mb-6">
            The product <span className="font-semibold text-gray-700">"{decodedSlug}"</span> does not exist or has been removed.
          </p>
          <Link
            href="/collections/all-products"
            className="inline-block bg-[#e60000] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#cc0000] transition shadow-xs"
          >
            Explore All Products
          </Link>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  const categoryObj = categories.find(
    c => c.id === product.category || 
         c.slug === product.category ||
         c.id.toLowerCase() === product.category.toLowerCase() ||
         c.slug.toLowerCase() === product.category.toLowerCase()
  );
  const categoryDisplayName = categoryObj?.name || product.categoryName || product.category;

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#e60000]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections/all-products" className="hover:text-[#e60000]">Collections</Link>
            <span className="mx-2">/</span>
            <Link href={`/collections/${categoryObj?.slug || product.category}`} className="hover:text-[#e60000] capitalize">
              {categoryDisplayName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#e60000] font-bold">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-10">
        {/* Interactive Client Product Section */}
        <ProductDetailClient product={product} />

        {/* Related Products Carousel */}
        <section className="mt-16 border-t pt-12">
          <ProductCarousel title="YOU MAY ALSO LIKE" categoryFilter={product.category} />
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
