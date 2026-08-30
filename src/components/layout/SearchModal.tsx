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
  const [suggestions, setSuggestions] = useState<string[]>([]);
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
      setSuggestions([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();

    // Filter matching products
    const filtered = PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.urduName.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);

    // Dynamic suggestions based on query
    const baseTerms = [
      'mango',
      'mango pickle',
      'mango murabba',
      'crushed mango pickle',
      'multani mango pickle',
      'mangoes',
      'amla pickle',
      'amla murabba',
      'aloo bukhara chutney',
      'lasoora pickle',
      'moringa pickle',
      'sarson saag pickle',
      'gulkand murabba',
      'apple murabba',
      'chia seeds'
    ];

    const matchedSuggestions = baseTerms.filter(t => t.includes(q) || q.split(' ').some(word => t.includes(word)));
    setSuggestions(matchedSuggestions.length > 0 ? matchedSuggestions.slice(0, 6) : [query]);
  }, [query]);

  // Helper to highlight matching text in search pills
  const highlightMatch = (text: string, match: string) => {
    if (!match.trim()) return text;
    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === match.toLowerCase() ? (
        <mark key={i} style={{ background: '#fef08a', color: '#111', fontWeight: 700, padding: '0 2px', borderRadius: '2px' }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-12 md:pt-16 px-4">
          
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] border border-gray-200"
          >
            {/* Search Input Header */}
            <div className="p-3 md:p-4 bg-[#fdf2f2] border-b border-red-100 flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm md:text-base font-semibold text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 p-1">
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-900"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Suggestions & Results Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-6">
              
              {query.trim() === '' ? (
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                    SUGGESTIONS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['mango', 'pickle', 'murabba', 'chutney', 'sarson saag', 'amla', 'gulkand', 'chia seeds'].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="bg-gray-100 hover:bg-[#fae9e8] hover:text-[#5e0d0c] text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md transition flex items-center gap-1.5"
                      >
                        <Search size={12} className="text-gray-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* SUGGESTIONS PILLS SECTION */}
                  {suggestions.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-3 border-b pb-1 border-gray-100">
                        SUGGESTIONS
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => setQuery(sug)}
                            className="bg-gray-50 hover:bg-[#fae9e8] text-gray-800 text-xs font-medium px-3 py-1.5 rounded-md border border-gray-200 flex items-center gap-1.5 transition"
                          >
                            <Search size={12} className="text-gray-400" />
                            <span>{highlightMatch(sug, query)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRODUCT RESULTS SECTION */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-4 border-b pb-1 border-gray-100">
                      PRODUCT RESULTS
                    </p>

                    {results.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-sm font-semibold">No products found matching "{query}"</p>
                        <p className="text-xs text-gray-400 mt-1">Try searching for "Pickle", "Murabba", "Chutney" or "Amla"</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {results.map(product => (
                          <div
                            key={product.id}
                            className="bg-white border border-gray-100 rounded-lg p-2 hover:border-[#5e0d0c] hover:shadow-md transition flex flex-col justify-between group"
                          >
                            <Link
                              href={`/products/${product.slug}`}
                              onClick={() => setIsSearchOpen(false)}
                              className="block"
                            >
                              <div className="relative aspect-square rounded-md overflow-hidden bg-gray-50 mb-2">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.discountBadge && (
                                  <span className="absolute top-1 left-1 bg-[#e95144] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs">
                                    {product.discountBadge}
                                  </span>
                                )}
                              </div>

                              <p className="font-semibold text-xs text-gray-900 group-hover:text-[#5e0d0c] line-clamp-2 leading-tight mb-1 text-center">
                                {product.name}
                              </p>
                            </Link>

                            <div className="text-center mt-1">
                              <span className="text-xs font-bold text-[#e95144]">
                                Rs.{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-[10px] text-gray-400 line-through ml-1.5">
                                  Rs.{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
