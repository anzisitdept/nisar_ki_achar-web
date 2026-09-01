'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import ProductCarousel from '@/components/home/ProductCarousel';
import MidBanners from '@/components/home/MidBanners';
import ContactBlock from '@/components/home/ContactBlock';
import CustomerReviews from '@/components/reviews/ReviewCarousel';
import { useStoreData } from '@/context/StoreDataContext';

export default function Home() {
  const { storeContent } = useStoreData();

  return (
    <>
      {/* 1. TOP BAR */}
      <TopBar />
      <Header />
      <ReviewsWidget />

      <main className="flex-1 w-full overflow-hidden">
        {/* 2. HERO SECTION */}
        <HeroSlider />

        {/* 3. SHOP BY CATEGORY */}
        <CategoryCarousel 
          title={storeContent.shopByCategory?.title || "Shop by Category"}
          categoryIds={storeContent.shopByCategory?.categoryIds}
        />

        {/* 4. Best Sellers */}
        <ProductCarousel 
          title={storeContent.bestSellers?.title || "Best Sellers"} 
          categoryFilter="best-selling"
          productIds={storeContent.bestSellers?.productIds}
        />

        {/* 5. New Arrivals */}
        <ProductCarousel 
          title={storeContent.newArrivals?.title || "New Arrivals"} 
          categoryFilter="new-arrivals"
          productIds={storeContent.newArrivals?.productIds}
        />

        {/* 6. MID BANNER */}
        <MidBanners />

        {/* 7. Bundle Offers */}
        <ProductCarousel 
          title={storeContent.bundleOffers?.title || "Bundle Offers"} 
          categoryFilter="bundles"
          productIds={storeContent.bundleOffers?.productIds}
        />

        {/* 8. Special Items */}
        <ProductCarousel 
          title={storeContent.specialItems?.title || "Special Items"} 
          categoryFilter="special"
          productIds={storeContent.specialItems?.productIds}
        />

        {/* Customer Reviews */}
        <CustomerReviews />

        {/* Contact Block */}
        <ContactBlock />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
