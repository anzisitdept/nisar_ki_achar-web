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
      desktopImage: 'https://soghatekhas.com/cdn/shop/files/MAINN_WEB.jpg?v=1763724941&width=3840',
      mobileImage: 'https://soghatekhas.com/cdn/shop/files/MAIN.jpg?v=1763724992&width=750',
      alt: 'Soghat e Khas Hero'
    },
    {
      id: 'slide-2',
      desktopImage: 'https://soghatekhas.com/cdn/shop/files/Banner-01.jpg?v=1776446341&width=3840',
      mobileImage: 'https://soghatekhas.com/cdn/shop/files/Mobile_banner-01.jpg?v=1776446397&width=750',
      alt: 'Premium Desi Pickles'
    },
    {
      id: 'slide-3',
      desktopImage: 'https://soghatekhas.com/cdn/shop/files/Banner-02_1.jpg?v=1786468968&width=3840',
      mobileImage: 'https://soghatekhas.com/cdn/shop/files/Mobile_banner-02_4.jpg?v=1786468989&width=750',
      alt: 'Authentic Traditional Taste'
    }
  ],
  midBanners: [
    {
      id: 'mid-1',
      image: 'https://soghatekhas.com/cdn/shop/files/Web_banner_37_4b8a7db5-2237-470a-957b-d1ce5fc8f492.jpg?v=1774275085&width=3840',
      link: '/collections/all-products',
      alt: 'Promotional Mid Banner 1'
    }
  ]
};

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
        // Map products and preserve defaults
        const mapped = dynamicProducts.map(p => ({
          ...p,
          inStock: p.inStock !== false // Default to true if not specified
        }));
        setProducts(mapped);
      } else {
        setProducts(PRODUCTS);
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

    // 3. Subscribe to store_content/homepage document for Announcements, Hero Slides, and Mid Banners
    const unsubStoreContent = subscribeStoreContent((dynamicContent) => {
      if (dynamicContent) {
        setStoreContent({
          topBarMessages: dynamicContent.topBarMessages && dynamicContent.topBarMessages.length > 0 
            ? dynamicContent.topBarMessages 
            : DEFAULT_STORE_CONTENT.topBarMessages,
          heroSlides: dynamicContent.heroSlides && dynamicContent.heroSlides.length > 0 
            ? dynamicContent.heroSlides 
            : DEFAULT_STORE_CONTENT.heroSlides,
          midBanners: dynamicContent.midBanners && dynamicContent.midBanners.length > 0 
            ? dynamicContent.midBanners 
            : DEFAULT_STORE_CONTENT.midBanners,
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
