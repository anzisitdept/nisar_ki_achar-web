'use client';

import React, { useState } from 'react';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Check, MessageSquare } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.image);
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0] || '500g');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'benefits' | 'usage'>('description');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const currentPrice = product.weightPrices[selectedWeight] || product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="space-y-12">
      
      {/* Top Product Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-md group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.discountBadge && (
              <span className="absolute top-4 left-4 bg-[#e95144] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                {product.discountBadge}
              </span>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImage === img ? 'border-[#5e0d0c] shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Purchase Form */}
        <div className="space-y-6">
          
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#5e0d0c] font-bold uppercase tracking-wider mb-2">
              <span>{product.categoryName}</span>
              <span>•</span>
              <span className="text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">In Stock (Fresh Batch)</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg md:text-xl font-bold text-[#5e0d0c] mt-1 font-sans">
              {product.urduName}
            </p>

            {/* Star Rating Header */}
            <div className="flex items-center space-x-2 mt-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">{product.rating} / 5.0</span>
              <span className="text-xs text-gray-500">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#fae9e8] p-4 rounded-xl flex items-center justify-between border border-red-100">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl md:text-3xl font-extrabold text-[#e95144]">
                  Rs. {currentPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.originalPrice}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 mt-0.5">Price inclusive of all taxes. Free shipping on orders over Rs. 3,000.</p>
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-full border transition ${
                isInWishlist(product.id)
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-white text-gray-400 border-gray-200 hover:text-red-500'
              }`}
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Weight Selection Options */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Select Jar Weight / Size:
            </label>
            <div className="flex flex-wrap gap-3">
              {product.weights.map(weight => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
                    selectedWeight === weight
                      ? 'bg-[#5e0d0c] text-white border-[#5e0d0c] shadow-md'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-[#5e0d0c]'
                  }`}
                >
                  {weight} {product.weightPrices[weight] && `(Rs. ${product.weightPrices[weight]})`}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-gray-700 uppercase">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-gray-600 hover:bg-gray-200 rounded-l-xl text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-gray-600 hover:bg-gray-200 rounded-r-xl text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#e95144] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition"
              >
                BUY IT NOW (COD)
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-6 text-center text-[11px] text-gray-600 font-medium">
            <div className="flex flex-col items-center space-y-1">
              <Truck className="w-5 h-5 text-[#5e0d0c]" />
              <span>Nationwide COD</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#5e0d0c]" />
              <span>100% Fresh Ingredients</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RotateCcw className="w-5 h-5 text-[#5e0d0c]" />
              <span>Taste Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* Middle Section: Tabbed Information */}
      <section className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200 shadow-xs">
        
        {/* Tab Headers */}
        <div className="flex border-b border-gray-300 space-x-6 overflow-x-auto pb-2">
          {[
            { id: 'description', label: 'DESCRIPTION' },
            { id: 'ingredients', label: 'INGREDIENTS' },
            { id: 'benefits', label: 'HEALTH BENEFITS' },
            { id: 'usage', label: 'STORAGE & USAGE' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`font-bold text-xs uppercase tracking-wider pb-3 border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#5e0d0c] text-[#5e0d0c]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="py-6 text-xs md:text-sm text-gray-700 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="text-gray-800 font-medium">{product.description}</p>
              <p>
                Our <strong>{product.name}</strong> is crafted according to traditional home recipes using hand-picked fresh ingredients, cold-pressed mustard oil, and authentic aromatic spices. Prepared in small hygienic batches without artificial colors or synthetic preservatives.
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 uppercase">Natural Ingredients:</h4>
              <p className="bg-white p-4 rounded-xl border border-gray-200 font-medium text-gray-800">
                {product.ingredients}
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 uppercase">Key Wellness Benefits:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {product.benefits.split('.').filter(Boolean).map((benefit, i) => (
                  <li key={i} className="font-medium">{benefit.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-3 text-gray-700">
              <h4 className="font-bold text-gray-900 uppercase">Storage & Shelf Life Instructions:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Keep jar in a cool, dry place away from direct sunlight.</li>
                <li>Always use a clean, completely dry spoon when serving.</li>
                <li>Do not add water or moisture to the jar to preserve fresh taste.</li>
                <li>Shelf Life: 12 Months from packing date.</li>
              </ul>
            </div>
          )}
        </div>

      </section>

      {/* Customer Reviews Section */}
      <section className="bg-white p-6 md:p-10 rounded-3xl border border-gray-200 space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <h3 className="text-xl font-bold font-serif text-gray-900 uppercase tracking-wide">
              Customer Reviews ({product.reviewsCount})
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">{product.rating} out of 5 based on customer ratings</span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-[#5e0d0c] hover:bg-[#430807] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form Drawer */}
        {showReviewForm && (
          <form onSubmit={e => { e.preventDefault(); alert('Thank you! Your review has been submitted for approval.'); setShowReviewForm(false); }} className="bg-gray-50 p-6 rounded-2xl border space-y-4 text-xs">
            <h4 className="font-bold text-sm text-gray-900">Write Your Verified Customer Review</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" required placeholder="Your Name" className="p-3 border rounded-xl bg-white" />
              <input type="email" required placeholder="Your Email Address" className="p-3 border rounded-xl bg-white" />
            </div>
            <div>
              <label className="block font-bold mb-1">Rating:</label>
              <select className="p-3 border rounded-xl bg-white w-full sm:w-48">
                <option>★★★★★ (5/5 Excellent)</option>
                <option>★★★★☆ (4/5 Very Good)</option>
                <option>★★★☆☆ (3/5 Good)</option>
              </select>
            </div>
            <textarea rows={3} required placeholder="Write your feedback about taste, quality, packaging, and delivery..." className="w-full p-3 border rounded-xl bg-white" />
            <button type="submit" className="bg-[#5e0d0c] text-white font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider">
              Submit Review
            </button>
          </form>
        )}

        {/* Review Cards */}
        <div className="space-y-4 divide-y divide-gray-100">
          {[
            {
              name: 'Dr. Tariq Mahmood (Islamabad)',
              rating: 5,
              date: '2 days ago',
              comment: 'Authentic taste just like homemade! Packed very securely in glass jar without any oil leakage. Will order again!'
            },
            {
              name: 'Fatima Zafar (Lahore)',
              rating: 5,
              date: '1 week ago',
              comment: 'Great quality and fast delivery. Sarson saag pickle had pure desi mustard oil aroma. Highly recommended!'
            },
            {
              name: 'Usman Ghani (Karachi)',
              rating: 5,
              date: '2 weeks ago',
              comment: 'Best quality pickles in Pakistan. Delivery was super fast via COD.'
            }
          ].map((rev, idx) => (
            <div key={idx} className="pt-4 first:pt-0 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">{rev.name}</span>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </span>
                </div>
                <span className="text-gray-400">{rev.date}</span>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">{rev.comment}</p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
