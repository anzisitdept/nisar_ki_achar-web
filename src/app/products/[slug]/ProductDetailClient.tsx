'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Share2, Eye, Truck, MessageCircle, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useCart();

  const defaultWeights = product.weights && product.weights.length > 0 ? product.weights : ['4000g', '2000g', '1200g', '800g'];
  const [selectedWeight, setSelectedWeight] = useState(defaultWeights[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'benefits'>('description');

  const currentPrice = (product.weightPrices && product.weightPrices[selectedWeight])
    ? product.weightPrices[selectedWeight]
    : product.price;

  const originalPrice = product.originalPrice || Math.round(currentPrice * 1.4);
  const subtotal = currentPrice * quantity;

  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.image);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    setIsCheckoutOpen(true);
  };

  const handleBargainClick = () => {
    const message = encodeURIComponent(`Hi! I am looking for a discount on ${product.name} (${selectedWeight}).`);
    window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#222' }}>
      
      {/* Main Grid: Left Gallery | Right Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'start' }}>
        
        {/* Left Column: Gallery */}
        <div>
          <div style={{ position: 'relative', width: '100%', borderRadius: '4px', overflow: 'hidden', background: '#f9f9f9', border: '1px solid #eee' }}>
            <img
              src={selectedImage}
              alt={product.name}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
            {/* Badges */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
              {product.discountBadge && (
                <span style={{ background: '#e95144', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                  {product.discountBadge}
                </span>
              )}
              {product.isBestSeller && (
                <span style={{ background: '#f39c12', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                  Best Selling
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', overflowX: 'auto' }}>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', opacity: 0.6 }} onClick={() => {
                const idx = product.images.indexOf(selectedImage);
                if (idx > 0) setSelectedImage(product.images[idx - 1]);
              }}>
                <ChevronLeft size={20} />
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '80px',
                      height: '80px',
                      border: selectedImage === img ? '2px solid #5e0d0c' : '1px solid #ddd',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      padding: 0,
                      cursor: 'pointer',
                      background: '#fff'
                    }}
                  >
                    <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>

              <button style={{ border: 'none', background: 'none', cursor: 'pointer', opacity: 0.6 }} onClick={() => {
                const idx = product.images.indexOf(selectedImage);
                if (idx < product.images.length - 1) setSelectedImage(product.images[idx + 1]);
              }}>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Information & Controls */}
        <div style={{ paddingLeft: '10px' }}>
          
          {/* Title */}
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '8px' }}>
            {product.name}
          </h1>

          {/* Rating & Urgency */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
            <span style={{ color: '#be0000', fontSize: '15px' }}>★★★★★</span>
            <span style={{ fontWeight: 600, color: '#333' }}>94 reviews</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#e95144', fontWeight: 600, marginBottom: '14px' }}>
            <span>🔥</span> 6 sold in last 17 hours
          </div>

          <p style={{ fontSize: '12px', color: '#666', marginBottom: '14px' }}>
            Product type: <span style={{ color: '#333', fontWeight: 500 }}>{product.categoryName || 'Pickle'}</span>
          </p>

          {/* Price Line */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
            <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '16px' }}>
              Rs.{originalPrice.toLocaleString()}.00
            </span>
            <span style={{ color: '#e95144', fontSize: '20px', fontWeight: 700 }}>
              Rs.{currentPrice.toLocaleString()}.00
            </span>
          </div>

          {/* Need More Discount ~ Chat with Us! Box */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Need More Discount ~ Chat with Us! <MessageCircle size={20} />
            </p>
            <button
              onClick={handleBargainClick}
              style={{
                width: '100%',
                background: '#25d366',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.08em',
                padding: '14px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 6px rgba(37, 211, 102, 0.3)'
              }}
            >
              BARGAIN NOW
            </button>
          </div>

          {/* Weight Selection Grid */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '12px', color: '#555', marginBottom: '8px' }}>
              Gross Weight: <strong style={{ color: '#111' }}>{selectedWeight}</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {defaultWeights.map(w => {
                const active = selectedWeight === w;
                return (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    style={{
                      background: active ? '#fff5f5' : '#fff',
                      border: active ? '2px solid #be0000' : '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '14px 10px',
                      fontSize: '13px',
                      fontWeight: active ? 700 : 500,
                      color: active ? '#be0000' : '#333',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {w} {active && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtotal */}
          <p style={{ fontSize: '13px', color: '#333', marginBottom: '14px' }}>
            Subtotal: <strong>Rs.{subtotal.toLocaleString()}.00</strong>
          </p>

          {/* Quantity + Add to Cart + Icons Row */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ padding: '8px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', color: '#333' }}
              >
                -
              </button>
              <span style={{ padding: '0 10px', fontSize: '14px', fontWeight: 600 }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{ padding: '8px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', color: '#333' }}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                background: '#1a1a1a',
                color: '#fff',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.1em',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>ADD TO CART</span>
              <span style={{ fontFamily: 'sans-serif', fontSize: '11px', opacity: 0.9 }}>ابھی آرڈر کریں</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid #ccc',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Heart size={18} fill={isInWishlist(product.id) ? '#be0000' : 'none'} color={isInWishlist(product.id) ? '#be0000' : '#555'} />
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.name, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid #ccc',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Share2 size={18} color="#555" />
            </button>
          </div>

          {/* Buy It Now Button */}
          <button
            onClick={handleBuyNow}
            style={{
              width: '100%',
              background: '#fff',
              color: '#111',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.1em',
              padding: '14px 20px',
              border: '1px solid #111',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}
          >
            BUY IT NOW
          </button>

          {/* Delivery & Live Counter Card */}
          <div style={{ background: '#fdfbfb', border: '1px solid #f0e6e6', borderRadius: '6px', padding: '16px', fontSize: '12px', color: '#444', lineHeight: 1.6, marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <Truck size={18} color="#111" style={{ flexShrink: 0 }} />
              <div>
                <strong>Delivery Time:</strong> Place your order within the next <strong>2 hours 33 minutes</strong> to get it soon! Your package is expected to arrive between <span style={{ textDecoration: 'underline' }}>Friday, 28 Aug</span> and <span style={{ textDecoration: 'underline' }}>Tuesday, 01 Sep</span>.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
              <Eye size={16} color="#666" />
              <span><strong>125 customers</strong> are viewing this product</span>
            </div>
          </div>

        </div>
      </div>

      {/* RICH DESCRIPTION CONTENT SECTION BELOW PRODUCT DETAILS (MATCHING OFFICIAL SITE) */}
      <div style={{ marginTop: '60px', borderTop: '1px solid #e5e7eb', paddingTop: '40px' }}>
        
        {/* Description Tab Header */}
        <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            fontWeight: 700,
            color: '#111',
            paddingBottom: '12px',
            display: 'inline-block',
            borderBottom: '2px solid #111'
          }}>
            Description
          </span>
        </div>

        {/* Description Body Content */}
        <div style={{ maxWidth: '850px', margin: '0 auto', fontSize: '14px', color: '#333', lineHeight: 1.7 }}>
          
          <p style={{ textAlign: 'center', fontWeight: 700, fontSize: '13px', background: '#fafafa', padding: '12px', borderRadius: '4px', border: '1px solid #eee', marginBottom: '28px' }}>
            Note: {product.name} 400G is Available in a Pouch, While 800G and 1200G are Available In Jars.
          </p>

          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '14px' }}>
            🍵 Buy {product.name} {product.urduName ? `– ${product.urduName}` : ''} Online in Pakistan | A Sweet & Tangy Desi Treat
          </h3>

          <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#111', marginTop: '24px', marginBottom: '8px' }}>
            What is {product.name}?
          </h4>
          <p style={{ color: '#555', marginBottom: '20px' }}>
            Our <strong>{product.name}</strong> is a sweet, tangy delicacy made from the finest handpicked fresh ingredients and a traditional blend of natural sweeteners and warming spices. This timeless preserve delivers a burst of authentic flavor with every bite—perfect for enjoying as a standalone treat or a complement to your daily meals.
          </p>

          <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#111', marginTop: '24px', marginBottom: '12px' }}>
            Why It's Loved
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>Rich in Natural Antioxidants & Vitamins</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>Sweet, tangy, and full of authentic Pakistani desi flavor</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>Perfect as a daily healthy snack or side dish</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>A rejuvenating jar of tradition, crafted for everyday health</strong></span>
            </div>
          </div>

          <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#111', marginTop: '24px', marginBottom: '12px' }}>
            Best Enjoyed With
          </h4>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Paratha or roti for a classic breakfast pairing</li>
            <li>As a side with traditional desi thalis or festive meals</li>
          </ul>

        </div>

      </div>

      {/* Customer Reviews Section */}
      <div id="customer-reviews-section" style={{ marginTop: '60px', borderTop: '1px solid #e5e7eb', paddingTop: '40px' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 700, textAlign: 'center', marginBottom: '24px' }}>
          Customer Reviews
        </h2>

        {/* Breakdown bar box */}
        <div style={{ maxWidth: '600px', margin: '0 auto 40px auto', textAlign: 'center' }}>
          <div style={{ color: '#be0000', fontSize: '20px', marginBottom: '4px' }}>★★★★★</div>
          <p style={{ fontSize: '13px', color: '#333', fontWeight: 600, marginBottom: '16px' }}>
            4.87 out of 5 based on 94 reviews
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
            {[
              { stars: '★★★★★', count: 83, pct: 88 },
              { stars: '★★★★☆', count: 10, pct: 10 },
              { stars: '★★★☆☆', count: 1, pct: 2 },
              { stars: '★★☆☆☆', count: 0, pct: 0 },
              { stars: '★☆☆☆☆', count: 0, pct: 0 },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                <span style={{ color: '#be0000', width: '60px', textAlign: 'right' }}>{row.stars}</span>
                <div style={{ flex: 1, height: '10px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${row.pct}%`, height: '100%', background: '#5e0d0c' }} />
                </div>
                <span style={{ width: '20px', color: '#777', textAlign: 'left' }}>{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews list */}
        <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            {
              author: 'Faizan Ali',
              date: '07/18/2026',
              title: 'Good taste and maza a gia thanks for sughat and',
              body: 'Good taste and maza a gia thanks for sughat and TCS first service received just 2 days working'
            },
            {
              author: 'Naveed iqbal khan Khan',
              date: '07/13/2026',
              title: 'Good in',
              body: 'Good in taste'
            },
            {
              author: 'Naveed Taj Ghauri',
              date: '07/09/2026',
              title: 'Excellent by all means',
              body: 'Excellent by all means. 10/10'
            }
          ].map((rev, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ color: '#be0000', fontSize: '14px' }}>★★★★★</div>
                <span style={{ fontSize: '11px', color: '#999' }}>{rev.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, fontSize: '13px', color: '#111' }}>{rev.author}</span>
                <span style={{ background: '#5e0d0c', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '2px' }}>
                  ✓ Verified
                </span>
              </div>
              <p style={{ fontWeight: 700, fontSize: '13px', color: '#222', marginBottom: '4px' }}>{rev.title}</p>
              <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>{rev.body}</p>
            </div>
          ))}

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '13px', color: '#be0000', fontWeight: 700, marginTop: '10px' }}>
            <span style={{ color: '#111', cursor: 'default' }}>1</span>
            <span style={{ cursor: 'pointer' }}>2</span>
            <span style={{ cursor: 'pointer' }}>3</span>
            <span style={{ cursor: 'pointer' }}>&gt;</span>
            <span style={{ cursor: 'pointer' }}>&raquo;</span>
          </div>
        </div>
      </div>

      {/* Sticky Purchase Bar at Bottom */}
      {showStickyBar && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          borderTop: '1px solid #ddd',
          padding: '10px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 999,
          boxShadow: '0 -4px 12px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={selectedImage} alt={product.name} style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px' }} />
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#111', margin: 0 }}>{product.name}</p>
              <p style={{ fontSize: '11px', margin: 0 }}>
                <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '6px' }}>Rs.{originalPrice.toLocaleString()}.00</span>
                <span style={{ color: '#be0000', fontWeight: 700 }}>Rs.{currentPrice.toLocaleString()}.00</span>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select
              value={selectedWeight}
              onChange={e => setSelectedWeight(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', background: '#fff' }}
            >
              {defaultWeights.map(w => <option key={w} value={w}>{w}</option>)}
            </select>

            <button
              onClick={handleAddToCart}
              style={{
                background: '#1a1a1a',
                color: '#fff',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.08em',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              ADD TO CART ابھی آرڈر کریں
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
