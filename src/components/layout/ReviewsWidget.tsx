'use client';

import React from 'react';

export default function ReviewsWidget() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: 0,
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
          padding: '14px 7px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.25)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '0.12em',
          fontSize: '14px',
          fontWeight: 700,
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
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
        <span style={{ fontSize: '15px', marginBottom: '6px', lineHeight: 1 }}>★</span>
        <span>Reviews</span>
      </div>
    </div>
  );
}
