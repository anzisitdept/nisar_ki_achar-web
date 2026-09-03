'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, Category, StoreContent } from '@/types';
import {
  subscribeProducts,
  subscribeCategories,
  subscribeStoreContent
} from '@/lib/firestoreServices';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';

const DEFAULT_STORE_CONTENT: StoreContent = {
  topBarMessages: [
    'GET 5% OFF ON ORDERS WITH ADVANCE PAYMENT.',
    '⚡ FREE NATIONWIDE SHIPPING ON ORDERS OVER RS. 2,999',
    '🎁 100% PURE & HOMEMADE DESI QUALITY GUARANTEED'
  ],
  heroSlides: [
    {
      id: 'slide-1',
      desktopImage: 'https://nisarachar.com/cdn/shop/files/MAINN_WEB.jpg?v=1763724941&width=3840',
      mobileImage: 'https://nisarachar.com/cdn/shop/files/MAIN.jpg?v=1763724992&width=750',
      alt: 'Nisar Achar Hero'
    },
    {
      id: 'slide-2',
      desktopImage: 'https://nisarachar.com/cdn/shop/files/Banner-01.jpg?v=1776446341&width=3840',
      mobileImage: 'https://nisarachar.com/cdn/shop/files/Mobile_banner-01.jpg?v=1776446397&width=750',
      alt: 'Premium Desi Pickles'
    },
    {
      id: 'slide-3',
      desktopImage: 'https://nisarachar.com/cdn/shop/files/Banner-02_1.jpg?v=1786468968&width=3840',
      mobileImage: 'https://nisarachar.com/cdn/shop/files/Mobile_banner-02_4.jpg?v=1786468989&width=750',
      alt: 'Authentic Traditional Taste'
    }
  ],
  shopByCategory: {
    title: 'Shop by Category',
    categoryIds: []
  },
  bestSellers: {
    title: 'Best Sellers',
    productIds: []
  },
  newArrivals: {
    title: 'New Arrivals',
    productIds: []
  },
  midBanners: [
    {
      id: 'mid-1',
      image: 'https://nisarachar.com/cdn/shop/files/Web_banner_37_4b8a7db5-2237-470a-957b-d1ce5fc8f492.jpg?v=1774275085&width=3840',
      link: '/collections/all-products',
      alt: 'Promotional Mid Banner 1'
    }
  ],
  bundleOffers: {
    title: 'Bundle Offers',
    productIds: []
  },
  specialItems: {
    title: 'Special Items',
    productIds: []
  },
  reels: []
};

import { normalizeProduct } from '@/lib/productPrice';

interface StoreDataContextType {
  products: Product[];
  categories: Category[];
  storeContent: StoreContent;
  isLoading: boolean;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

export function StoreDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [storeContent, setStoreContent] = useState<StoreContent>(DEFAULT_STORE_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Subscribe to dynamic products collection in Firestore
    const unsubProducts = subscribeProducts((dynamicProducts) => {
      if (dynamicProducts && dynamicProducts.length > 0) {
        // Map products, normalize prices from weightPrices, and preserve defaults
        const mapped = dynamicProducts.map(p => normalizeProduct({
          ...p,
          inStock: p.inStock !== false // Default to true if not specified
        }));
        setProducts(mapped);
      } else {
        setProducts(PRODUCTS.map(normalizeProduct));
      }
    });

    // 2. Subscribe to dynamic categories collection in Firestore
    const unsubCategories = subscribeCategories((dynamicCategories) => {
      if (dynamicCategories && dynamicCategories.length > 0) {
        setCategories(dynamicCategories);
      } else {
        setCategories(CATEGORIES);
      }
    });

    // 3. Subscribe to store_content/homepage document for Announcements, Hero Slides, Banners, and Sections
    const unsubStoreContent = subscribeStoreContent((dynamicContent) => {
      if (dynamicContent) {
        setStoreContent({
          topBarMessages: dynamicContent.topBarMessages && dynamicContent.topBarMessages.length > 0 
            ? dynamicContent.topBarMessages 
            : DEFAULT_STORE_CONTENT.topBarMessages,
          heroSlides: dynamicContent.heroSlides && dynamicContent.heroSlides.length > 0 
            ? dynamicContent.heroSlides 
            : DEFAULT_STORE_CONTENT.heroSlides,
          shopByCategory: {
            title: dynamicContent.shopByCategory?.title || DEFAULT_STORE_CONTENT.shopByCategory.title,
            categoryIds: Array.isArray(dynamicContent.shopByCategory?.categoryIds) 
              ? dynamicContent.shopByCategory.categoryIds 
              : DEFAULT_STORE_CONTENT.shopByCategory.categoryIds
          },
          bestSellers: {
            title: dynamicContent.bestSellers?.title || DEFAULT_STORE_CONTENT.bestSellers.title,
            productIds: Array.isArray(dynamicContent.bestSellers?.productIds) 
              ? dynamicContent.bestSellers.productIds 
              : DEFAULT_STORE_CONTENT.bestSellers.productIds
          },
          newArrivals: {
            title: dynamicContent.newArrivals?.title || DEFAULT_STORE_CONTENT.newArrivals.title,
            productIds: Array.isArray(dynamicContent.newArrivals?.productIds) 
              ? dynamicContent.newArrivals.productIds 
              : DEFAULT_STORE_CONTENT.newArrivals.productIds
          },
          midBanners: dynamicContent.midBanners && dynamicContent.midBanners.length > 0 
            ? dynamicContent.midBanners 
            : DEFAULT_STORE_CONTENT.midBanners,
          bundleOffers: {
            title: dynamicContent.bundleOffers?.title || DEFAULT_STORE_CONTENT.bundleOffers.title,
            productIds: Array.isArray(dynamicContent.bundleOffers?.productIds) 
              ? dynamicContent.bundleOffers.productIds 
              : DEFAULT_STORE_CONTENT.bundleOffers.productIds
          },
          specialItems: {
            title: dynamicContent.specialItems?.title || DEFAULT_STORE_CONTENT.specialItems.title,
            productIds: Array.isArray(dynamicContent.specialItems?.productIds) 
              ? dynamicContent.specialItems.productIds 
              : DEFAULT_STORE_CONTENT.specialItems.productIds
          },
          reels: dynamicContent.reels && dynamicContent.reels.length > 0 
            ? dynamicContent.reels 
            : [],
        });
      } else {
        setStoreContent(DEFAULT_STORE_CONTENT);
      }
      setIsLoading(false);
    });

    return () => {
      unsubProducts();
      unsubCategories();
      unsubStoreContent();
    };
  }, []);

  return (
    <StoreDataContext.Provider value={{ products, categories, storeContent, isLoading }}>
      {children}
    </StoreDataContext.Provider>
  );
}

export function useStoreData() {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
}
