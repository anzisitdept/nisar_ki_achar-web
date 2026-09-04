'use client';

import React, { Suspense } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { CategoryInner } from '../[category]/page';

export default function AllProductsPage() {
  return (
    <>
      <TopBar />
      <Header />
      <Suspense
        fallback={
          <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>
            Loading All Products…
          </div>
        }
      >
        <CategoryInner forcedCategory="all-products" />
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
