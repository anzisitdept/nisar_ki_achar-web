'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

import { Product } from '@/types';
import { useStoreData } from '@/context/StoreDataContext';
import { useCart } from '@/hooks/useCart';

/* ─── Sidebar Wrapper ────────────────────────── */
function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '14px', marginBottom: '14px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px 0' }}
      >
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#111', textTransform: 'uppercase' }}>{title}</span>
        {open ? <ChevronUp size={14} color="#555" /> : <ChevronDown size={14} color="#555" />}
      </button>
      {open && children}
    </div>
  );
}

import { getProductEffectivePrice, getProductEffectiveOriginalPrice, getProductDisplayWeight } from '@/lib/productPrice';

/* ─── Product Card ───────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const primaryImg = (product.image && product.image.trim() !== '') 
    ? product.image 
    : ((product.images && product.images[0] && product.images[0].trim() !== '') ? product.images[0] : '');
  const hoverImg = (product.hoverImage && product.hoverImage.trim() !== '') ? product.hoverImage : primaryImg;
  const img = hovered && hoverImg ? hoverImg : primaryImg;

  const displayPrice = getProductEffectivePrice(product);
  const originalPrice = getProductEffectiveOriginalPrice(product, displayPrice);
  const displayWeight = getProductDisplayWeight(product);
  const hasDiscount = originalPrice > displayPrice;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: '12px', textAlign: 'center', background: '#fff', transition: 'all 0.2s ease', position: 'relative' }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', marginBottom: '12px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {img ? (
          <img
            src={img}
            alt={product.name || 'Product'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          />
        ) : (
          <div style={{ color: '#aaa', fontSize: '11px', fontWeight: 500 }}>
            No Image
          </div>
        )}

        <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', gap: '2px', zIndex: 2 }}>
          {product.discountBadge && (
            <span style={{ background: '#e60000', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px', lineHeight: 1.4 }}>
              {product.discountBadge}
            </span>
          )}
          {product.isBestSeller && (
            <span style={{ background: '#fac80a', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px', lineHeight: 1.4 }}>
              Best Selling
            </span>
          )}
        </div>
      </div>

      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
        <h3 style={{ fontSize: '13px', color: '#1a1a1a', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>
          {product.name}
        </h3>
      </Link>

      <div style={{ fontSize: '12px', color: '#777', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
        {hasDiscount && (
          <span style={{ textDecoration: 'line-through', color: '#999' }}>
            Rs.{originalPrice.toLocaleString()}.00
          </span>
        )}
        {product.weights && product.weights.length > 1 && (
          <span style={{ color: '#666', fontSize: '11px', fontWeight: 500 }}>
            {displayWeight}:
          </span>
        )}
        <span style={{ color: '#e60000', fontWeight: 700 }}>
          Rs.{displayPrice.toLocaleString()}.00
        </span>
      </div>
    </div>
  );
}

export function CategoryInner({ forcedCategory }: { forcedCategory?: string } = {}) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, categories } = useStoreData();

  const categorySlug = forcedCategory || (params?.category as string) || 'all-products';
  const categoryData = categories.find(c => c.slug === categorySlug || c.id === categorySlug);
  const categoryTitle = (categorySlug === 'all' || categorySlug === 'all-products')
    ? 'ALL PRODUCTS'
    : (categoryData ? categoryData.name.split('(')[0].trim().toUpperCase() : categorySlug.replace(/-/g, ' ').toUpperCase());

  // Dynamically filter products by category
  let categoryProducts: Product[] = [];
  if (categorySlug === 'all' || categorySlug === 'all-products') {
    categoryProducts = products.filter(p => p.showInAllProducts !== false);
  } else if (categorySlug === 'best-selling' || categorySlug === 'best-sellers' || categorySlug === 'best-selling-pickles') {
    categoryProducts = products.filter(p => p.isBestSeller);
  } else if (categorySlug === 'new-arrivals') {
    categoryProducts = products.filter(p => p.isNew);
  } else {
    categoryProducts = products.filter(p => p.category.toLowerCase() === categorySlug.toLowerCase());
  }

  const isAllProducts = categorySlug === 'all' || categorySlug === 'all-products';
  const displayProductsList = isAllProducts
    ? categoryProducts
    : (categoryProducts.length > 0 ? categoryProducts : products.filter(p => p.category === categorySlug));

  const defaultSort = isAllProducts ? 'featured' : 'best-selling';
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || defaultSort);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showFilter, setShowFilter] = useState(false);
  const [inStockFilter, setInStockFilter] = useState(false);
  const [outOfStockFilter, setOutOfStockFilter] = useState(false);

  const inStockCount = displayProductsList.filter(p => p.inStock !== false).length;
  const outOfStockCount = displayProductsList.filter(p => p.inStock === false).length;

  let filtered = [...displayProductsList];
  if (inStockFilter && !outOfStockFilter) {
    filtered = filtered.filter(p => p.inStock !== false);
  } else if (!inStockFilter && outOfStockFilter) {
    filtered = filtered.filter(p => p.inStock === false);
  }

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === 'title') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === 'best-selling') filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));

  const displayed = filtered.slice(0, itemsPerPage);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 3);

  const Sidebar = () => (
    <aside className="lg:border-r lg:border-gray-100 lg:pr-5">
      <SideSection title="Categories">
        <div className="flex flex-col gap-2">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              onClick={() => setShowFilter(false)}
              style={{
                fontSize: '12px',
                color: cat.slug === categorySlug ? '#e60000' : '#444',
                fontWeight: cat.slug === categorySlug ? 700 : 400,
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{cat.name.split('(')[0].trim()}</span>
            </Link>
          ))}
        </div>
      </SideSection>

      <SideSection title="Availability">
        <div className="flex flex-col gap-1.5 text-xs text-gray-600">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockFilter}
              onChange={e => setInStockFilter(e.target.checked)}
              className="accent-[#e60000] cursor-pointer"
            />
            <span>In Stock ({inStockCount})</span>
          </label>
          <label className={`flex items-center gap-1.5 cursor-pointer ${outOfStockCount === 0 ? 'opacity-60' : ''}`}>
            <input
              type="checkbox"
              checked={outOfStockFilter}
              onChange={e => setOutOfStockFilter(e.target.checked)}
              className="accent-[#e60000] cursor-pointer"
            />
            <span>Out Of Stock ({outOfStockCount})</span>
          </label>
        </div>
      </SideSection>

      <SideSection title="Bestselling">
        <div className="flex flex-col gap-3.5">
          {bestSellers.map(p => (
            <Link key={p.id} href={`/products/${p.slug}`} className="flex gap-2.5 items-center no-underline">
              <div className="relative w-14 h-14 flex-shrink-0 border border-gray-200 overflow-hidden">
                {p.discountBadge && (
                  <div className="absolute top-0 left-0 bg-[#e60000] text-white text-[8px] font-bold px-1 py-px z-10">
                    {p.discountBadge}
                  </div>
                )}
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[11px] text-gray-800 leading-snug mb-1">{p.name.split('(')[0].trim()}</p>
                <p className="text-[11px]">
                  {p.originalPrice && p.originalPrice > p.price ? (
                    <span className="line-through text-gray-400 mr-1">Rs.{p.originalPrice.toLocaleString()}</span>
                  ) : null}
                  <span className="text-[#e60000] font-bold">Rs.{p.price.toLocaleString()}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SideSection>
    </aside>
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
      {/* Direct Breadcrumb: Home > [Category Name] */}
      <nav className="py-4 text-xs text-gray-500">
        <Link href="/" className="text-gray-500 no-underline">Home</Link>
        <span className="mx-1.5 text-gray-400">{'>'}</span>
        <span className="text-gray-700">{categoryTitle}</span>
      </nav>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-8 pt-2.5 pb-14">
        
        {/* Left Sidebar - hidden on mobile, shown in drawer */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Filter Drawer */}
        {showFilter && (
          <div className="fixed inset-0 z-[105] lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilter(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto p-5 animate-slideUp">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-gray-900 uppercase">Filters</h3>
                <button onClick={() => setShowFilter(false)} className="p-1 text-gray-500 hover:text-gray-900" aria-label="Close filters">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Right Content */}
        <div className="min-w-0">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-5">
            {categoryTitle}
          </h1>

          {/* Control Bar */}
          <div className="flex items-center gap-3 pb-3.5 border-b border-gray-200 mb-5 flex-wrap">

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilter(true)}
              className="lg:hidden flex items-center gap-1.5 border border-gray-300 rounded px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </button>

            <div className="flex-1" />

            {/* Items Per Page */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] font-semibold text-gray-500 uppercase">Items</span>
              <select
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-white cursor-pointer"
              >
                <option value={20}>20</option>
                <option value={40}>40</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] font-semibold text-gray-500 uppercase">Sort</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-white cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Alphabetically, A-Z</option>
              </select>
            </div>

          </div>

          {/* Product Grid - Default 4-Column Layout */}
          {displayed.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999', fontSize: '14px' }}>
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {displayed.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function CategoryCollectionPage({ forcedCategory }: { forcedCategory?: string } = {}) {
  return (
    <>
      <TopBar />
      <Header />
      <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>Loading Category…</div>}>
        <CategoryInner forcedCategory={forcedCategory} />
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
