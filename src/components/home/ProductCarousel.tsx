'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useStoreData } from '@/context/StoreDataContext';
import { useCart } from '@/context/CartContext';

interface ProductCarouselProps {
  title?: string;
  categoryFilter?: string;
}

export default function ProductCarousel({ title = "DISCOVER OUR SIGNATURE PICKLES", categoryFilter }: ProductCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps'
  });

  const { addToCart } = useCart();
  const { products } = useStoreData();

  let filteredProducts: Product[] = products;
  if (categoryFilter) {
    if (categoryFilter === 'best-selling') {
      filteredProducts = products.filter(p => p.isBestSeller);
    } else if (categoryFilter === 'new-arrivals') {
      filteredProducts = products.filter(p => p.isNew);
    } else {
      filteredProducts = products.filter(p => p.category === categoryFilter);
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Title Header */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-2xl md:text-3xl text-center font-serif text-[#232323] uppercase tracking-wide">
            {title}
          </h2>
          <div className="w-full h-px bg-gray-200 my-4 relative max-w-3xl">
            <Link 
              href="/collections/all-products" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-[#5e0d0c] transition"
            >
              View All Products
            </Link>
          </div>
        </div>
        
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {filteredProducts.map(product => (
              <div key={product.id} className="flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_24%] min-w-0">
                <div className="bg-white group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
                  
                  {/* Badges */}
                  <div className="absolute top-0 left-0 z-20 flex flex-col items-start rounded-tl-2xl overflow-hidden">
                    {product.discountBadge && (
                      <div className="bg-[#e95144] text-white text-[10px] font-extrabold px-2.5 py-1">
                        {product.discountBadge}
                      </div>
                    )}
                    {product.isBestSeller && (
                      <div className="bg-[#fbb03b] text-white text-[10px] font-extrabold px-2.5 py-1">
                        Best Selling
                      </div>
                    )}
                  </div>

                  {/* Image Container */}
                  <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 z-10" 
                    />
                    <img 
                      src={product.hoverImage || product.image} 
                      alt={`${product.name} Alternate`} 
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0" 
                    />
                  </Link>

                  {/* Quick Add Overlay Button */}
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center space-x-2 transition shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>QUICK ADD</span>
                    </button>
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <Link 
                        href={`/products/${product.slug}`}
                        className="text-xs font-bold text-gray-900 hover:text-[#5e0d0c] transition-colors leading-relaxed line-clamp-2 block mb-1"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
