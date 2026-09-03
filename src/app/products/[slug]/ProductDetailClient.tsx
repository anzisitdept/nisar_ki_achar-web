'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Share2, MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import CustomerReviewsSection from '@/components/reviews/CustomerReviewsSection';

import { getProductEffectivePrice } from '@/lib/productPrice';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useCart();

  // Dynamic weights from Firestore
  const availableWeights = (product.weights && Array.isArray(product.weights) && product.weights.length > 0)
    ? product.weights
    : ['1kg'];

  // Prioritize 1kg as the default selected weight if available
  const defaultWeight = availableWeights.find(w => w.toLowerCase().replace(/\s+/g, '') === '1kg') || availableWeights[0] || '1kg';
  const [selectedWeight, setSelectedWeight] = useState<string>(defaultWeight);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'benefits'>('description');

  // Dynamic price calculation based on selected weight
  const currentPrice = getProductEffectivePrice(product, selectedWeight);

  const originalPrice = (typeof product.originalPrice === 'number' && product.originalPrice > currentPrice)
    ? product.originalPrice
    : 0;

  const subtotal = currentPrice * quantity;

  const initialImg = (product.image && product.image.trim() !== '') 
    ? product.image 
    : (product.images && product.images[0] && product.images[0].trim() !== '' ? product.images[0] : '');
  const [selectedImage, setSelectedImage] = useState(initialImg);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Sync state when product changes
  useEffect(() => {
    const weights = (product.weights && Array.isArray(product.weights) && product.weights.length > 0)
      ? product.weights
      : ['1kg'];
    const defaultW = weights.find(w => w.toLowerCase().replace(/\s+/g, '') === '1kg') || weights[0] || '1kg';
    setSelectedWeight(defaultW);
    const img = (product.image && product.image.trim() !== '') 
      ? product.image 
      : (product.images && product.images[0] && product.images[0].trim() !== '' ? product.images[0] : '');
    setSelectedImage(img);
  }, [product]);

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
    if (product.inStock === false) {
      alert('This product is currently out of stock.');
      return;
    }
    addToCart(product, selectedWeight, quantity);
  };

  const handleBuyNow = () => {
    if (product.inStock === false) {
      alert('This product is currently out of stock.');
      return;
    }
    addToCart(product, selectedWeight, quantity);
    setIsCheckoutOpen(true);
  };

  const handleBargainClick = () => {
    const message = encodeURIComponent(`Hi! I am looking for a discount on ${product.name} (${selectedWeight}).`);
    window.open(`https://wa.me/923341677114?text=${message}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#222' }}>
      
      {/* Main Grid: Left Gallery | Right Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start px-4 md:px-0">
        
        {/* Left Column: Gallery */}
        <div>
          <div style={{ position: 'relative', width: '100%', minHeight: '300px', borderRadius: '4px', overflow: 'hidden', background: '#f9f9f9', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {selectedImage && selectedImage.trim() !== '' ? (
              <img
                src={selectedImage}
                alt={product.name || 'Product'}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ color: '#aaa', fontSize: '14px', fontWeight: 500, padding: '40px' }}>
                No Image Available
              </div>
            )}
            {/* Badges */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
              {product.inStock === false && (
                <span style={{ background: '#e60000', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                  OUT OF STOCK
                </span>
              )}
              {product.discountBadge && (
                <span style={{ background: '#e60000', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                  {product.discountBadge}
                </span>
              )}
              {product.isBestSeller && (
                <span style={{ background: '#fac80a', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                  Best Selling
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {(() => {
            const validImages = (product.images || []).filter(img => typeof img === 'string' && img.trim() !== '');
            if (validImages.length <= 1) return null;

            return (
              <div className="flex items-center gap-2.5 mt-4 overflow-x-auto pb-1">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 transition flex-shrink-0 cursor-pointer shadow-2xs"
                  onClick={() => {
                    const idx = validImages.indexOf(selectedImage);
                    if (idx > 0) setSelectedImage(validImages[idx - 1]);
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-2.5 overflow-x-auto">
                  {validImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden p-0 cursor-pointer bg-white transition-all duration-200 flex-shrink-0 ${
                        selectedImage === img ? 'ring-2 ring-[#e60000] shadow-xs' : 'border border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 transition flex-shrink-0 cursor-pointer shadow-2xs"
                  onClick={() => {
                    const idx = validImages.indexOf(selectedImage);
                    if (idx < validImages.length - 1) setSelectedImage(validImages[idx + 1]);
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })()}
        </div>

        {/* Right Column: Information & Controls */}
        <div className="w-full md:pl-4 lg:pl-6">
          
          {/* Title */}
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '8px' }}>
            {product.name}
          </h1>

          {/* Rating & Urgency */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
            <span style={{ color: '#e60000', fontSize: '15px' }}>★★★★★</span>
            <span style={{ fontWeight: 600, color: '#333' }}>({product.reviewsCount || 94} reviews)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#e60000', fontWeight: 600, marginBottom: '14px' }}>
            <span>🔥</span> In High Demand
          </div>

          <p style={{ fontSize: '12px', color: '#666', marginBottom: '14px' }}>
            Product type: <span style={{ color: '#333', fontWeight: 500 }}>{product.categoryName || 'Pickle'}</span>
          </p>

          {/* Price Line */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
            {originalPrice > currentPrice && (
              <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '16px' }}>
                Rs.{originalPrice.toLocaleString()}.00
              </span>
            )}
            <span style={{ color: '#e60000', fontSize: '20px', fontWeight: 700 }}>
              Rs.{currentPrice.toLocaleString()}.00
            </span>
          </div>

          {/* Need More Discount ~ Chat with Us! Box */}
          <div className="mb-6">
            <p className="font-serif text-base sm:text-lg font-bold text-gray-900 mb-2.5 flex items-center gap-2">
              Need More Discount ~ Chat with Us! <MessageCircle className="w-5 h-5 text-[#25d366]" />
            </p>
            <button
              onClick={handleBargainClick}
              className="w-full bg-[#25d366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wider py-3.5 px-5 rounded-md transition duration-200 shadow-md shadow-green-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>BARGAIN NOW</span>
              <span className="text-[11px] sm:text-xs opacity-90 font-normal">(رعایت حاصل کریں)</span>
            </button>
          </div>

          {/* Dynamic Weight Selection Grid */}
          <div className="mb-5">
            <p className="text-xs text-gray-600 mb-2">
              Gross Weight: <strong className="text-gray-900 font-bold">{selectedWeight}</strong>
            </p>
            <div className={`grid gap-2.5 ${availableWeights.length === 1 ? 'grid-cols-1 max-w-[200px]' : availableWeights.length === 2 ? 'grid-cols-2' : availableWeights.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
              {availableWeights.map(w => {
                const active = selectedWeight === w;
                const weightPrice = getProductEffectivePrice(product, w);

                return (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`min-h-[46px] rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-0.5 px-3 py-2 active:scale-[0.98] cursor-pointer ${
                      active
                        ? 'bg-red-50/70 border-2 border-[#e60000] text-[#e60000] shadow-xs font-bold'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{w}</span>
                      {active && <span className="font-bold text-xs">✓</span>}
                    </div>
                    {weightPrice > 0 && (
                      <span className={`text-[10px] ${active ? 'text-[#e60000]' : 'text-gray-500'}`}>
                        Rs. {weightPrice.toLocaleString()}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtotal */}
          <p style={{ fontSize: '13px', color: '#333', marginBottom: '14px' }}>
            Subtotal: <strong>Rs.{subtotal.toLocaleString()}.00</strong>
          </p>

          {/* Action Controls: Quantity, Add to Cart, Wishlist, Share */}
          <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 items-stretch md:items-center mb-3">
            
            {/* Top controls on mobile (Quantity + Mobile Auxiliary buttons) / Left on desktop */}
            <div className="flex items-center justify-between md:justify-start gap-2.5">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-white h-[46px] md:h-[48px] px-1 shadow-2xs">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-full flex items-center justify-center text-base text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded transition font-bold cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-9 text-center text-sm font-bold text-gray-900 select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-full flex items-center justify-center text-base text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded transition font-bold cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Mobile-only Wishlist and Share buttons */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-[46px] h-[46px] rounded-lg border flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer ${
                    isInWishlist(product.id)
                      ? 'border-red-300 bg-red-50 text-[#e60000]'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                  aria-label="Save to wishlist"
                  title="Save to wishlist"
                >
                  <Heart size={18} fill={isInWishlist(product.id) ? '#e60000' : 'none'} color={isInWishlist(product.id) ? '#e60000' : 'currentColor'} />
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
                  className="w-[46px] h-[46px] rounded-lg border border-gray-300 bg-white text-gray-600 hover:border-gray-400 flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer"
                  aria-label="Share product"
                  title="Share product"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart Main CTA Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.inStock === false}
              className={`w-full md:flex-1 h-[48px] px-4 rounded-lg font-bold text-xs md:text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition duration-200 shadow-sm active:scale-[0.99] cursor-pointer ${
                product.inStock === false
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#1a1a1a] hover:bg-black text-white shadow-gray-900/10'
              }`}
            >
              {product.inStock === false ? (
                <span>OUT OF STOCK</span>
              ) : (
                <>
                  <span>ADD TO CART</span>
                  <span className="font-normal text-[11px] opacity-90 tracking-normal">(ابھی آرڈر کریں)</span>
                </>
              )}
            </button>

            {/* Desktop/Tablet Wishlist and Share icons */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-[48px] h-[48px] rounded-lg border flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer ${
                  isInWishlist(product.id)
                    ? 'border-red-300 bg-red-50 text-[#e60000]'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                }`}
                aria-label="Save to wishlist"
                title="Save to wishlist"
              >
                <Heart size={18} fill={isInWishlist(product.id) ? '#e60000' : 'none'} color={isInWishlist(product.id) ? '#e60000' : 'currentColor'} />
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
                className="w-[48px] h-[48px] rounded-lg border border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer"
                aria-label="Share product"
                title="Share product"
              >
                <Share2 size={18} />
              </button>
            </div>

          </div>

          {/* Buy It Now Button */}
          <button
            onClick={handleBuyNow}
            disabled={product.inStock === false}
            className={`w-full min-h-[48px] sm:min-h-[50px] px-5 py-3.5 rounded-lg font-bold text-xs sm:text-sm tracking-wider uppercase transition duration-200 shadow-sm active:scale-[0.99] mb-6 flex items-center justify-center gap-2 cursor-pointer ${
              product.inStock === false
                ? 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900'
            }`}
          >
            <span>{product.inStock === false ? 'OUT OF STOCK' : 'BUY IT NOW'}</span>
            {product.inStock !== false && <span className="font-normal text-[11px] sm:text-xs opacity-90 tracking-normal">(ابھی خریدیں)</span>}
          </button>


        </div>
      </div>

      {/* RICH DESCRIPTION CONTENT SECTION BELOW PRODUCT DETAILS */}
      <div className="mt-10 md:mt-16 border-t border-gray-200 pt-8 md:pt-10 overflow-x-hidden">
        
        {/* Description Tabs Header */}
        <div className="flex justify-start gap-2 md:gap-4 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 px-3 md:px-4 font-serif text-base md:text-lg font-bold border-b-2 transition ${
              activeTab === 'description' ? 'border-[#111] text-[#111]' : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Description
          </button>
          {product.ingredients && (
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 px-3 md:px-4 font-serif text-base md:text-lg font-bold border-b-2 transition ${
                activeTab === 'ingredients' ? 'border-[#111] text-[#111]' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Ingredients
            </button>
          )}
          {product.benefits && (
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-3 px-3 md:px-4 font-serif text-base md:text-lg font-bold border-b-2 transition ${
                activeTab === 'benefits' ? 'border-[#111] text-[#111]' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Benefits
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div style={{ maxWidth: '850px', fontSize: '14px', color: '#333', lineHeight: 1.7 }}>
          
          <p style={{ textAlign: 'left', fontWeight: 700, fontSize: '13px', background: '#fafafa', padding: '12px', borderRadius: '4px', border: '1px solid #eee', marginBottom: '28px' }}>
            Note: {product.name} is freshly prepared and available in {availableWeights.join(', ')} packaging options.
          </p>

          {activeTab === 'description' && (
            <div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '14px' }}>
                🍵 Buy {product.name} {product.urduName ? `– ${product.urduName}` : ''} Online in Pakistan | Authentic Desi Flavor
              </h3>
              <p style={{ color: '#555', marginBottom: '20px' }}>
                {product.description || `Our ${product.name} is prepared with the finest handpicked fresh ingredients and traditional spices. This timeless recipe delivers authentic Pakistani flavor with every bite—perfect for enjoying with parathas, rice, and daily meals.`}
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>
                Pure & Natural Ingredients
              </h4>
              <p style={{ color: '#555', marginBottom: '20px' }}>
                {product.ingredients}
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>
                Key Benefits
              </h4>
              <p style={{ color: '#555', marginBottom: '20px' }}>
                {product.benefits}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>100% Pure, Traditional, and Handcrafted</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>Rich in authentic desi taste & aroma</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>Perfect companion for everyday breakfast and meals</strong></span>
            </div>
          </div>

        </div>

      </div>

      {/* Customer Reviews Section */}
      <div id="customer-reviews-section" className="mt-10 md:mt-16 border-t border-gray-200 pt-8 md:pt-10">
        <CustomerReviewsSection productId={product.id} />
      </div>

      {/* Sticky Purchase Bar at Bottom (Desktop & Tablet) */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2.5 md:p-3 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] hidden md:flex justify-between items-center">
          <div className="flex items-center gap-3">
            {selectedImage && (
              <img src={selectedImage} alt={product.name} className="w-10 h-10 object-cover rounded border border-gray-200" />
            )}
            <div>
              <p className="text-xs font-bold text-gray-900 m-0 max-w-md truncate">{product.name}</p>
              <p className="text-[11px] m-0">
                {originalPrice > currentPrice && (
                  <span className="line-through text-gray-400 mr-1.5">Rs.{originalPrice.toLocaleString()}</span>
                )}
                <span className="text-[#e60000] font-bold">Rs.{currentPrice.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {availableWeights.length > 1 && (
              <select
                value={selectedWeight}
                onChange={e => setSelectedWeight(e.target.value)}
                className="border border-gray-300 rounded px-2.5 py-2 text-xs bg-white font-medium cursor-pointer focus:outline-none focus:border-[#e60000]"
              >
                {availableWeights.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.inStock === false}
              className="bg-[#1a1a1a] hover:bg-black text-white font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded disabled:bg-gray-300 disabled:cursor-not-allowed transition cursor-pointer active:scale-95 shadow-xs"
            >
              {product.inStock === false ? 'OUT OF STOCK' : 'ADD TO CART'}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.inStock === false}
              className="bg-[#e60000] hover:bg-[#cc0000] text-white font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded disabled:bg-gray-300 disabled:cursor-not-allowed transition cursor-pointer active:scale-95 shadow-xs"
            >
              BUY NOW
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart Bar */}
      {showStickyBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-gray-900 m-0 truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-[#e60000] font-extrabold">Rs.{currentPrice.toLocaleString()}</span>
                <span className="text-[10px] text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded font-medium">{selectedWeight}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleAddToCart}
                disabled={product.inStock === false}
                className="bg-[#1a1a1a] active:bg-black text-white font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition flex-shrink-0 shadow-sm cursor-pointer"
              >
                {product.inStock === false ? 'OUT OF STOCK' : 'ADD TO CART'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
