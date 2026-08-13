'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/hooks/useCart';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.urduName.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-16 px-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Search Bar Input */}
            <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-gray-50">
              <Search className="w-5 h-5 text-[#5e0d0c]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products, pickles, murabba, chutney..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-bold text-[#5e0d0c] hover:opacity-75 uppercase tracking-wider border-l pl-3 border-gray-300"
              >
                Close
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1">
              {query.trim() === '' ? (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Sarson Saag Pickle',
                      'Amla Murabba',
                      'Quince Murabba',
                      'Aloo Bukhara Chutney',
                      'Chia Seeds',
                      'Moringa Pickle',
                      'Lahori Lasoora'
                    ].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="bg-gray-100 hover:bg-[#fae9e8] hover:text-[#5e0d0c] text-gray-700 text-xs font-medium px-3.5 py-1.5 rounded-full transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p className="text-sm font-semibold">No products found for "{query}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try searching for "Pickle", "Murabba", or "Chutney"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Found {results.length} Products
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map(product => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 hover:border-[#5e0d0c] hover:shadow-md transition group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="font-bold text-xs text-gray-900 group-hover:text-[#5e0d0c] line-clamp-1 block"
                          >
                            {product.name}
                          </Link>
                          <p className="text-[11px] text-gray-400">{product.urduName}</p>
                          <div className="flex items-center space-x-2 text-xs mt-1">
                            <span className="text-[#e95144] font-extrabold">Rs. {product.price}</span>
                            <span className="text-gray-400 line-through text-[10px]">Rs. {product.originalPrice}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-[#5e0d0c] text-white p-2 rounded-lg hover:bg-[#430807] transition flex-shrink-0"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
