'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductCardClient({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  return (
    <div className="bg-white group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
      
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
  );
}
