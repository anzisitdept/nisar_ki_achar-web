'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import CustomerReviewsSection from '@/components/reviews/CustomerReviewsSection';
import { useStoreData } from '@/context/StoreDataContext';

export default function ReviewsWidget() {
  const pathname = usePathname();
  const { products } = useStoreData();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // Hide on cart page to avoid sticky overlay
  if (pathname === '/cart' || pathname === '/checkout') return null;

  // When on a product page, scope reviews to that product so the
  // popup shows the same dynamic section as the product page itself.
  const productSlug = pathname.startsWith('/products/') ? pathname.split('/')[2] : null;
  const currentProduct = productSlug ? products.find(p => p.slug === productSlug) : null;
  const scopedProductId = currentProduct ? currentProduct.id : undefined;

  return (
    <>
      {/* Floating Tab */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: '0px',
          transform: 'translateY(-50%)',
          zIndex: 35,
          pointerEvents: 'auto'
        }}
      >
        <div
          style={{
            background: '#e60000',
            color: '#ffffff',
            fontFamily: 'Georgia, serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '-2px 2px 10px rgba(0,0,0,0.25)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: '0.1em',
            fontWeight: 700,
            borderRadius: '8px 0 0 8px',
            userSelect: 'none',
            transition: 'all 0.2s ease'
          }}
          className="hover:opacity-95 hover:pl-2.5 active:scale-95 py-3 px-1.5 sm:py-4 sm:px-2 text-xs sm:text-sm"
          onClick={() => setOpen(true)}
        >
          <span className="text-xs sm:text-sm leading-none">★</span>
          <br />
          <span>Reviews</span>
        </div>
      </div>

      {/* Reviews Dialog */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setOpen(false)}
            />

            {/* Dialog Panel — full screen sheet on mobile, centered modal on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full sm:max-w-3xl bg-white shadow-2xl z-10 flex flex-col border sm:border-gray-200 sm:rounded-xl overflow-hidden h-[92vh] sm:h-auto sm:max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 bg-[#fdf2f2] border-b border-red-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#e60000] text-lg leading-none">★</span>
                  <h3 className="font-serif text-base md:text-xl font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close reviews"
                  className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-red-100 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto flex-1 min-h-0 py-6 md:py-8">
                <CustomerReviewsSection productId={scopedProductId} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}