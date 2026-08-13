'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, ShoppingBag, Star, Heart } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import { PRODUCTS, Product } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { useCart } from '@/hooks/useCart';

function AllProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const paramSort = searchParams.get('sort') || 'featured';
  const paramCategory = searchParams.get('category');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    paramCategory ? [paramCategory] : []
  );
  const [sortBy, setSortBy] = useState(paramSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state changes to URL
  const updateUrl = (cats: string[], sortVal: string) => {
    const params = new URLSearchParams();
    if (sortVal && sortVal !== 'featured') params.set('sort', sortVal);
    if (cats.length > 0) params.set('category', cats[0]);
    router.replace(`/collections/all-products?${params.toString()}`, { scroll: false });
  };

  const handleCategoryToggle = (catId: string) => {
    const updated = selectedCategories.includes(catId)
      ? selectedCategories.filter(c => c !== catId)
      : [...selectedCategories, catId];
    setSelectedCategories(updated);
    updateUrl(updated, sortBy);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateUrl(selectedCategories, newSort);
  };

  let filtered = PRODUCTS.filter(p => {
    if (selectedCategories.length > 0) {
      return selectedCategories.includes(p.category);
    }
    return true;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'best-selling') {
    filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  } else if (sortBy === 'title') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-10">
      
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-gray-200 gap-4 mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-600">
          <span>Showing <strong className="text-gray-900">{filtered.length}</strong> Products</span>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg text-xs font-bold text-[#5e0d0c]"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => handleSortChange(e.target.value)}
              className="bg-white border border-gray-300 text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5e0d0c]"
            >
              <option value="featured">Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Alphabetically, A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filter */}
        <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 bg-white p-5 rounded-2xl border border-gray-100 h-fit shadow-xs`}>
          
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-sm text-[#5e0d0c] uppercase tracking-wider flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Categories</span>
            </h3>
            {selectedCategories.length > 0 && (
              <button
                onClick={() => { setSelectedCategories([]); updateUrl([], sortBy); }}
                className="text-[11px] text-red-600 hover:underline font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {CATEGORIES.map(cat => (
              <label
                key={cat.id}
                className="flex items-center justify-between cursor-pointer group text-xs hover:text-[#5e0d0c]"
              >
                <div className="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => handleCategoryToggle(cat.id)}
                    className="rounded text-[#5e0d0c] focus:ring-[#5e0d0c] w-4 h-4"
                  />
                  <span className="font-medium text-gray-700 group-hover:text-[#5e0d0c]">
                    {cat.name}
                  </span>
                </div>
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {cat.itemCount}
                </span>
              </label>
            ))}
          </div>

          {/* Quality Guarantee Box */}
          <div className="bg-[#fae9e8] p-4 rounded-xl text-center space-y-2 border border-red-100">
            <h4 className="font-bold text-xs text-[#5e0d0c] uppercase">100% Pure Desi Recipe</h4>
            <p className="text-[11px] text-gray-600">
              Prepared with organic oil and traditional spices. No artificial preservatives.
            </p>
          </div>

        </aside>

        {/* Right Product Cards Grid */}
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium text-sm">No products match your selected filter.</p>
              <button
                onClick={() => { setSelectedCategories([]); updateUrl([], sortBy); }}
                className="mt-4 bg-[#5e0d0c] text-white text-xs font-bold px-5 py-2.5 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map(product => (
                <div 
                  key={product.id}
                  className="bg-white group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
                >
                  
                  {/* Badges & Wishlist */}
                  <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-2">
                    <div className="flex flex-col items-start">
                      {product.discountBadge && (
                        <div className="bg-[#e95144] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-br">
                          {product.discountBadge}
                        </div>
                      )}
                      {product.isBestSeller && (
                        <div className="bg-[#fbb03b] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-br">
                          Best Seller
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition ${
                        isInWishlist(product.id) ? 'bg-red-50 text-red-600' : 'bg-white/80 text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Image */}
                  <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                    <img
                      src={product.hoverImage || product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                  </Link>

                  {/* Quick Add */}
                  <div className="px-3 pt-3 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center space-x-2 transition shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>QUICK ADD</span>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-xs font-bold text-gray-900 hover:text-[#5e0d0c] line-clamp-2 block mb-1"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[11px] text-gray-400 font-medium mb-2">{product.urduName}</p>
                    </div>

                    <div>
                      <div className="flex justify-center items-center space-x-1 text-yellow-400 text-xs mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400" />
                        ))}
                        <span className="text-[10px] text-gray-500 ml-1">({product.reviewsCount})</span>
                      </div>

                      <div className="flex justify-center items-center space-x-2 text-xs">
                        <span className="text-gray-400 line-through">Rs. {product.originalPrice}</span>
                        <span className="text-[#e95144] font-extrabold text-sm">Rs. {product.price}</span>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default function AllProductsPage() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      {/* Collection Hero Header */}
      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <nav className="text-xs text-[#5e0d0c]/70 font-semibold mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5e0d0c]">All Products</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            All Products & Signature Collections
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto mt-2">
            Explore 100% authentic homemade pickles, Tibb-e-Nabwi murabbas, sweet chutneys, and organic super foods.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-20 text-center text-gray-500 text-xs font-semibold">Loading Catalog...</div>}>
        <AllProductsContent />
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
