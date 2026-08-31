'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function ReviewsWidget() {
  const pathname = usePathname();

  // Hide on cart page to avoid sticky overlay
  if (pathname === '/cart' || pathname === '/checkout') return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: '6px',
        transform: 'translateY(-50%)',
        zIndex: 100,
        pointerEvents: 'auto'
      }}
    >
      <div
        style={{
          background: '#5e0d0c',
          color: '#ffffff',
          fontFamily: 'Georgia, serif',
          padding: '16px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '0.12em',
          fontSize: '14px',
          fontWeight: 700,
          borderRadius: '10px',
          userSelect: 'none',
          transition: 'opacity 0.2s ease'
        }}
        className="hover:opacity-95"
        onClick={() => {
          const el = document.getElementById('customer-reviews-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = '/collections/all-products';
          }
        }}
      >
        <span style={{ fontSize: '15px', lineHeight: 1 }}>★</span>
        <br />
        <span>Reviews</span>
      </div>
    </div>
  );
}