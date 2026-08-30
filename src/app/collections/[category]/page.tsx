'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import { Product } from '@/types';
import { useStoreData } from '@/context/StoreDataContext';
import { useCart } from '@/hooks/useCart';

/* ─── Review Carousel ────────────────────────────────── */
const REVIEWS = [
  { stars: 5, title: '5 star for taste', body: 'I tried their aloo bhkhara chatni … Its delicious. Will order again inshaAllah', author: 'Anonymous' },
  { stars: 5, title: 'best quality', body: 'best quality, packing, everything.', author: '03161717268' },
  { stars: 5, title: 'Asalam alaikum…', body: 'I got my parcel.. packaging boht hi Allaaa or zaiqa b zabardast JazzakAllah sohhat_te_khaas', author: 'Bin te maryam' },
  { stars: 5, title: 'Amazing product!', body: 'Received quickly and the taste is authentic desi. Highly recommended for everyone.', author: 'Fatima K.' },
  { stars: 5, title: 'Excellent packaging', body: 'Very well packed. Quality is outstanding. Will buy again.', author: 'Ahmed R.' },
];

function ReviewCarousel() {
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const max = REVIEWS.length - visible;

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(max, i + 1));

  return (
    <section style={{ borderBottom: '1px solid #e5e7eb', padding: '32px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Left label */}
        <div style={{ minWidth: '140px', textAlign: 'center', flexShrink: 0 }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '6px' }}>
            Let customers<br />speak for us
          </p>
          <div style={{ color: '#be0000', fontSize: '18px', marginBottom: '2px' }}>★★★★★</div>
          <p style={{ fontSize: '12px', color: '#be0000', fontWeight: 600 }}>from 2200 reviews</p>
        </div>

        {/* Arrow left */}
        <button
          onClick={prev}
          disabled={idx === 0}
          style={{ background: 'none', border: 'none', cursor: idx === 0 ? 'default' : 'pointer', opacity: idx === 0 ? 0.3 : 1, padding: '4px', flexShrink: 0 }}
        >
          <ChevronLeft size={22} color="#333" />
        </button>

        {/* Cards */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', overflow: 'hidden' }}>
          {REVIEWS.slice(idx, idx + visible).map((r, i) => (
            <div key={i} style={{ padding: '0 8px' }}>
              <div style={{ color: '#be0000', fontSize: '16px', marginBottom: '6px' }}>{'★'.repeat(r.stars)}</div>
              <p style={{ fontWeight: 700, fontSize: '13px', color: '#1a1a1a', marginBottom: '6px' }}>{r.title}</p>
              <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5, marginBottom: '12px' }}>{r.body}</p>
              <p style={{ fontSize: '12px', color: '#333', fontWeight: 600 }}>{r.author}</p>
            </div>
          ))}
        </div>

        {/* Arrow right */}
        <button
          onClick={next}
          disabled={idx >= max}
          style={{ background: 'none', border: 'none', cursor: idx >= max ? 'default' : 'pointer', opacity: idx >= max ? 0.3 : 1, padding: '4px', flexShrink: 0 }}
        >
          <ChevronRight size={22} color="#333" />
        </button>
      </div>
    </section>
  );
}

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

/* ─── Product Card ───────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const img = hovered && product.hoverImage ? product.hoverImage : product.image;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: '12px', textAlign: 'center', background: '#fff', transition: 'all 0.2s ease', position: 'relative' }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', marginBottom: '12px', background: '#f9f9f9' }}>
        <img
          src={img}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />

        <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', gap: '2px', zIndex: 2 }}>
          {product.discountBadge && (
            <span style={{ background: '#e95144', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px', lineHeight: 1.4 }}>
              {product.discountBadge}
            </span>
          )}
          {product.isBestSeller && (
            <span style={{ background: '#f39c12', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px', lineHeight: 1.4 }}>
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

      <div style={{ fontSize: '12px', color: '#777', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
        <span style={{ textDecoration: 'line-through' }}>Rs.{product.originalPrice.toLocaleString()}.00</span>
        <span style={{ color: '#888' }}>from</span>
        <span style={{ color: '#e95144', fontWeight: 700 }}>Rs.{product.price.toLocaleString()}.00</span>
      </div>
    </div>
  );
}

function CategoryInner() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, categories } = useStoreData();

  const categorySlug = (params?.category as string) || 'murabba';
  const categoryData = categories.find(c => c.slug === categorySlug || c.id === categorySlug);
  const categoryTitle = categoryData ? categoryData.name.split('(')[0].trim() : categorySlug.replace(/-/g, ' ').toUpperCase();

  // Dynamically filter products by category
  let categoryProducts: Product[] = [];
  if (categorySlug === 'all' || categorySlug === 'all-products') {
    categoryProducts = products;
  } else if (categorySlug === 'best-selling' || categorySlug === 'best-sellers' || categorySlug === 'best-selling-pickles') {
    categoryProducts = products.filter(p => p.isBestSeller);
  } else if (categorySlug === 'new-arrivals') {
    categoryProducts = products.filter(p => p.isNew);
  } else {
    categoryProducts = products.filter(p => p.category.toLowerCase() === categorySlug.toLowerCase());
  }

  const displayProductsList = categoryProducts.length > 0 ? categoryProducts : products.filter(p => p.category === categorySlug);

  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'best-selling');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [viewMode, setViewMode] = useState<'grid4' | 'grid3' | 'grid2' | 'list'>('grid4');

  let sorted = [...displayProductsList];
  if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
  else if (sortBy === 'title') sorted.sort((a, b) => a.name.localeCompare(b.name));

  const gridCols = viewMode === 'grid4' ? 4 : viewMode === 'grid3' ? 3 : viewMode === 'grid2' ? 2 : 1;
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 3);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
      {/* Direct Breadcrumb: Home > [Category Name] */}
      <nav style={{ padding: '16px 0', fontSize: '12px', color: '#555' }}>
        <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 6px', color: '#999' }}>{'>'}</span>
        <span style={{ color: '#333' }}>{categoryTitle}</span>
      </nav>

      {/* Main 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', paddingTop: '10px', paddingBottom: '60px' }}>
        
        {/* Left Sidebar */}
        <aside style={{ borderRight: '1px solid #f0f0f0', paddingRight: '20px' }}>
          
          <SideSection title="Categories">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  style={{
                    fontSize: '12px',
                    color: cat.slug === categorySlug ? '#be0000' : '#444',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#444' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>In Stock ({displayProductsList.length})</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', opacity: 0.6 }}>
                <input type="checkbox" />
                <span>Out Of Stock (0)</span>
              </label>
            </div>
          </SideSection>

          <SideSection title="Bestselling">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {bestSellers.map(p => (
                <Link key={p.id} href={`/products/${p.slug}`} style={{ display: 'flex', gap: '10px', alignItems: 'center', textDecoration: 'none' }}>
                  <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0, border: '1px solid #eee', overflow: 'hidden' }}>
                    {p.discountBadge && (
                      <div style={{ position: 'absolute', top: 0, left: 0, background: '#e95144', color: '#fff', fontSize: '8px', fontWeight: 700, padding: '1px 4px', zIndex: 1 }}>
                        {p.discountBadge}
                      </div>
                    )}
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#222', lineHeight: 1.3, marginBottom: '4px' }}>{p.name.split('(')[0].trim()}</p>
                    <p style={{ fontSize: '11px' }}>
                      <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '4px' }}>Rs.{p.originalPrice.toLocaleString()}</span>
                      <span style={{ color: '#e95144', fontWeight: 700 }}>Rs.{p.price.toLocaleString()}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </SideSection>

        </aside>

        {/* Right Content */}
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 700, color: '#111', marginBottom: '20px' }}>
            {categoryTitle}
          </h1>

          {/* Control Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb', marginBottom: '20px', flexWrap: 'wrap' }}>
            
            {/* View As */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '6px' }}>View As</span>
              {(['grid4', 'grid3', 'grid2', 'list'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', opacity: viewMode === mode ? 1 : 0.4 }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700 }}>{mode === 'grid4' ? '田' : mode === 'grid3' ? '≡' : mode === 'grid2' ? '⌸' : '☰'}</span>
                </button>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Items Per Page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase' }}>Items Per Page</span>
              <select
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
                style={{ border: '1px solid #ccc', borderRadius: '2px', padding: '4px 10px', fontSize: '12px', background: '#fff' }}
              >
                <option value={20}>20</option>
                <option value={40}>40</option>
              </select>
            </div>

            {/* Sort By */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase' }}>Sort By</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ border: '1px solid #ccc', borderRadius: '2px', padding: '4px 10px', fontSize: '12px', background: '#fff' }}
              >
                <option value="best-selling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Alphabetically, A-Z</option>
              </select>
            </div>

          </div>

          {/* Product Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gap: '16px'
          }}>
            {sorted.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function CategoryCollectionPage() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewCarousel />

      <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>Loading Category…</div>}>
        <CategoryInner />
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
