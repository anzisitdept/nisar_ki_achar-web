'use client';

import React, { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewCarousel from '@/components/reviews/ReviewCarousel';
import { Product } from '@/types';
import { useStoreData } from '@/context/StoreDataContext';
import { useCart } from '@/hooks/useCart';

/* ─── Sidebar Section Wrapper ────────────────────────── */
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

/* ─── Price Range Slider ─────────────────────────────── */
function PriceSlider({
  min, max, value, onChange,
}: {
  min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void;
}) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div>
      <div style={{ position: 'relative', height: '4px', background: '#ddd', borderRadius: '2px', margin: '16px 4px 20px' }}>
        <div
          style={{
            position: 'absolute',
            left: `${pct(value[0])}%`,
            right: `${100 - pct(value[1])}%`,
            height: '100%',
            background: '#111',
            borderRadius: '2px',
          }}
        />
        <input
          type="range" min={min} max={max} value={value[0]}
          onChange={e => { const v = Number(e.target.value); if (v < value[1]) onChange([v, value[1]]); }}
          style={{ position: 'absolute', width: '100%', opacity: 0, height: '100%', top: 0, cursor: 'pointer', zIndex: 3 }}
        />
        <input
          type="range" min={min} max={max} value={value[1]}
          onChange={e => { const v = Number(e.target.value); if (v > value[0]) onChange([value[0], v]); }}
          style={{ position: 'absolute', width: '100%', opacity: 0, height: '100%', top: 0, cursor: 'pointer', zIndex: 3 }}
        />
        {/* Thumb dots */}
        <div style={{ position: 'absolute', left: `calc(${pct(value[0])}% - 7px)`, top: '-5px', width: '14px', height: '14px', borderRadius: '50%', background: '#111', zIndex: 1 }} />
        <div style={{ position: 'absolute', left: `calc(${pct(value[1])}% - 7px)`, top: '-5px', width: '14px', height: '14px', borderRadius: '50%', background: '#111', zIndex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#333' }}>
        <span>Rs</span>
        <input
          type="number" value={value[0]}
          onChange={e => { const v = Number(e.target.value); if (v >= min && v < value[1]) onChange([v, value[1]]); }}
          style={{ width: '56px', border: '1px solid #ccc', borderRadius: '3px', padding: '3px 6px', fontSize: '12px' }}
        />
        <span>to</span>
        <span>Rs</span>
        <input
          type="number" value={value[1]}
          onChange={e => { const v = Number(e.target.value); if (v <= max && v > value[0]) onChange([value[0], v]); }}
          style={{ width: '56px', border: '1px solid #ccc', borderRadius: '3px', padding: '3px 6px', fontSize: '12px' }}
        />
      </div>
      <button
        style={{ marginTop: '12px', width: '100%', background: '#111', color: '#fff', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', padding: '10px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
      >
        APPLY
      </button>
    </div>
  );
}

/* ─── Single Product Card ────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: 'relative', background: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        {product.discountBadge && (
          <div style={{ background: '#cc0000', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 7px' }}>
            {product.discountBadge}
          </div>
        )}
        {product.isBestSeller && (
          <div style={{ background: '#fac80a', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 7px' }}>
            Best Selling
          </div>
        )}
      </div>

      {/* Image with hover switch */}
      <Link href={`/products/${product.slug}`} style={{ display: 'block', overflow: 'hidden', aspectRatio: '1/1', position: 'relative', flexShrink: 0, background: '#f9f9f9' }}>
        {product.image && product.image.trim() !== '' ? (
          <>
            <img
              src={product.image}
              alt={product.name || 'Product'}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s', opacity: hovered && product.hoverImage ? 0 : 1 }}
            />
            {product.hoverImage && product.hoverImage.trim() !== '' && (
              <img
                src={product.hoverImage}
                alt={product.name || 'Product'}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s', opacity: hovered ? 1 : 0 }}
              />
            )}
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '11px', fontWeight: 500 }}>
            No Image
          </div>
        )}
      </Link>

      {/* Info */}
      <div style={{ padding: '10px 12px 14px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Link
          href={`/products/${product.slug}`}
          style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a', textDecoration: 'none', lineHeight: 1.4 }}
        >
          {product.name}
        </Link>
        <div style={{ color: '#fac80a', fontSize: '13px' }}>{'★'.repeat(Math.round(product.rating))}</div>
        <div style={{ fontSize: '12px', color: '#777', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px' }}>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={{ textDecoration: 'line-through' }}>Rs.{(product.originalPrice || 0).toLocaleString()}.00</span>
          )}
          {product.weights && product.weights.length > 1 && (
            <span style={{ color: '#999' }}>from</span>
          )}
          <span style={{ color: '#e60000', fontWeight: 700 }}>Rs.{(product.price || 0).toLocaleString()}.00</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Grid view mode icon SVGs ───────────────────────── */
function GridIcon({ mode, active }: { mode: string; active: boolean }) {
  const c = active ? '#111' : '#aaa';
  if (mode === 'grid4') return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="7" height="7" fill={c} /><rect x="12" y="1" width="7" height="7" fill={c} />
      <rect x="1" y="12" width="7" height="7" fill={c} /><rect x="12" y="12" width="7" height="7" fill={c} />
    </svg>
  );
  if (mode === 'grid3') return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="4" height="8" fill={c} /><rect x="8" y="1" width="4" height="8" fill={c} /><rect x="15" y="1" width="4" height="8" fill={c} />
      <rect x="1" y="11" width="4" height="8" fill={c} /><rect x="8" y="11" width="4" height="8" fill={c} /><rect x="15" y="11" width="4" height="8" fill={c} />
    </svg>
  );
  if (mode === 'grid2') return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="3" height="8" fill={c} /><rect x="6" y="1" width="3" height="8" fill={c} /><rect x="11" y="1" width="3" height="8" fill={c} /><rect x="16" y="1" width="3" height="8" fill={c} />
      <rect x="1" y="11" width="3" height="8" fill={c} /><rect x="6" y="11" width="3" height="8" fill={c} /><rect x="11" y="11" width="3" height="8" fill={c} /><rect x="16" y="11" width="3" height="8" fill={c} />
    </svg>
  );
  // list
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="2" width="18" height="3" fill={c} />
      <rect x="1" y="8.5" width="18" height="3" fill={c} />
      <rect x="1" y="15" width="18" height="3" fill={c} />
    </svg>
  );
}

/* ─── Main content (wrapped in Suspense for useSearchParams) ── */
function AllProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, categories } = useStoreData();

  const paramSort = searchParams.get('sort') || 'featured';
  const paramCategory = searchParams.get('category');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(paramCategory ? [paramCategory] : []);
  const [sortBy, setSortBy] = useState(paramSort);
  const [availability, setAvailability] = useState({ inStock: false, outStock: false });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4989]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [viewMode, setViewMode] = useState<'grid4' | 'grid3' | 'grid2' | 'list'>('grid4');
  const [showFilter, setShowFilter] = useState(false);

  const allPrices = products.map(p => p.price);
  const globalMax = allPrices.length > 0 ? Math.max(...allPrices) : 4989;

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

  let filtered = products.filter(p => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    
    // Dynamic stock availability filter
    if (availability.inStock && p.inStock === false) return false;
    if (availability.outStock && p.inStock !== false) return false;
    
    return true;
  });

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === 'best-selling') filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  else if (sortBy === 'title') filtered.sort((a, b) => a.name.localeCompare(b.name));

  const displayed = filtered.slice(0, itemsPerPage);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 3);

  const inStockCount = products.filter(p => p.inStock !== false).length;
  const outStockCount = products.filter(p => p.inStock === false).length;

  // Responsive grid columns
  const getGridClass = () => {
    if (viewMode === 'list') return 'grid-cols-1';
    if (viewMode === 'grid2') return 'grid-cols-2';
    if (viewMode === 'grid3') return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  const SidebarContent = () => (
    <>
      <SideSection title="Categories">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categories.map(cat => (
            <label
              key={cat.id}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', cursor: 'pointer', fontSize: '12px', color: '#333' }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
                style={{ width: '13px', height: '13px', accentColor: '#e60000', cursor: 'pointer' }}
              />
              {cat.name.split('(')[0].trim()}
            </label>
          ))}
        </div>
      </SideSection>

      <SideSection title="Availability">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#333', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={availability.inStock}
              onChange={() => setAvailability(a => ({ ...a, inStock: !a.inStock }))}
              style={{ accentColor: '#e60000', width: '13px', height: '13px' }}
            />
            In Stock({inStockCount})
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#333', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={availability.outStock}
              onChange={() => setAvailability(a => ({ ...a, outStock: !a.outStock }))}
              style={{ accentColor: '#e60000', width: '13px', height: '13px' }}
            />
            Out Of Stock({outStockCount})
          </label>
        </div>
      </SideSection>

      <SideSection title="Price">
        <PriceSlider min={0} max={globalMax} value={priceRange} onChange={setPriceRange} />
      </SideSection>

      <SideSection title="Bestselling">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {bestSellers.map(p => (
            <Link key={p.id} href={`/products/${p.slug}`} style={{ display: 'flex', gap: '10px', alignItems: 'center', textDecoration: 'none' }} onClick={() => setShowFilter(false)}>
              <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0, border: '1px solid #eee', overflow: 'hidden' }}>
                {p.discountBadge && (
                  <div style={{ position: 'absolute', top: 0, left: 0, background: '#cc0000', color: '#fff', fontSize: '8px', fontWeight: 700, padding: '1px 4px', zIndex: 1, lineHeight: 1.4 }}>
                    {p.discountBadge}
                  </div>
                )}
                {p.isBestSeller && (
                  <div style={{ position: 'absolute', top: p.discountBadge ? '13px' : '0', left: 0, background: '#fac80a', color: '#fff', fontSize: '8px', fontWeight: 700, padding: '1px 4px', zIndex: 1, lineHeight: 1.4 }}>
                    Best Selling
                  </div>
                )}
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#222', lineHeight: 1.3, marginBottom: '4px' }}>{p.name.split('(')[0].trim()}</p>
                <p style={{ fontSize: '11px' }}>
                  <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '4px' }}>Rs.{p.originalPrice.toLocaleString()}.00</span>
                  <span style={{ color: '#e60000', fontWeight: 700 }}>Rs.{p.price.toLocaleString()}.00</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SideSection>
    </>
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
      {/* Breadcrumb */}
      <nav style={{ padding: '12px 0', fontSize: '12px', color: '#555' }}>
        <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 6px', color: '#999' }}>{'>'}</span>
        <span style={{ color: '#333' }}>All Products</span>
      </nav>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-8 pb-14">

        {/* ── Sidebar ── (desktop only) */}
        <aside style={{ paddingTop: '4px' }} className="hidden lg:block">
          <SidebarContent />
        </aside>

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
              <SidebarContent />
            </div>
          </div>
        )}

        {/* ── Right content ── */}
        <div className="min-w-0">
          {/* Section heading */}
          <h1 className="font-serif text-xl md:text-2xl font-normal text-gray-900 mb-4">All Products</h1>

          {/* Controls bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb', marginBottom: '20px', flexWrap: 'wrap' }}>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilter(true)}
              className="lg:hidden flex items-center gap-1.5 border border-gray-300 rounded px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </button>

            {/* View As icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '6px' }}>View As</span>
              {(['grid4', 'grid3', 'grid2', 'list'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', opacity: viewMode === mode ? 1 : 0.4 }}
                >
                  <GridIcon mode={mode} active={viewMode === mode} />
                </button>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Items per page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }} className="hidden sm:inline">Items</span>
              <div style={{ position: 'relative' }}>
                <select
                  value={itemsPerPage}
                  onChange={e => setItemsPerPage(Number(e.target.value))}
                  style={{ border: '1px solid #ccc', borderRadius: '2px', padding: '5px 28px 5px 10px', fontSize: '13px', color: '#333', background: '#fff', appearance: 'none', cursor: 'pointer' }}
                >
                  {[12, 20, 40, 60].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#555' }} />
              </div>
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }} className="hidden sm:inline">Sort</span>
              <div style={{ position: 'relative' }}>
                <select
                  value={sortBy}
                  onChange={e => { setSortBy(e.target.value); updateUrl(selectedCategories, e.target.value); }}
                  style={{ border: '1px solid #ccc', borderRadius: '2px', padding: '5px 28px 5px 10px', fontSize: '13px', color: '#333', background: '#fff', appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="featured">Featured</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title">Alphabetically, A-Z</option>
                </select>
                <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#555' }} />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {displayed.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999', fontSize: '14px' }}>
              No products match your filters.
            </div>
          ) : (
            <div className={`grid ${getGridClass()}`} style={{ gap: '1px', background: '#e5e7eb', border: '1px solid #e5e7eb' }}>
              {displayed.map(product => (
                <div key={product.id} style={{ background: '#fff' }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page export ────────────────────────────────────── */
export default function AllProductsPage() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewCarousel />

      <Suspense fallback={
        <div style={{ padding: '60px', textAlign: 'center', color: '#999', fontSize: '13px' }}>
          Loading Catalog…
        </div>
      }>
        <AllProductsContent />
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
