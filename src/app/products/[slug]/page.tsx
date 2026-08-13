import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import ProductCarousel from '@/components/home/ProductCarousel';
import { getProductBySlug, PRODUCTS } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#5e0d0c]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections/all-products" className="hover:text-[#5e0d0c]">Collections</Link>
            <span className="mx-2">/</span>
            <Link href={`/collections/${product.category}`} className="hover:text-[#5e0d0c] capitalize">
              {product.categoryName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#5e0d0c] font-bold">{product.name}</span>
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
