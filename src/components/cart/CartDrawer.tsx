'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    amountNeededForFreeShipping,
    freeShippingThreshold
  } = useCart();

  // Scroll lock & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#5e0d0c]" />
                <h2 className="font-bold text-gray-900 uppercase text-sm tracking-wide">
                  Your Shopping Cart ({cart.reduce((a, c) => a + c.quantity, 0)})
                </h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-500 hover:text-black rounded-full transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Bar */}
            <div className="bg-[#fae9e8] p-3 text-center border-b border-[#f3d2d0]">
              {amountNeededForFreeShipping > 0 ? (
                <p className="text-xs text-[#5e0d0c] font-semibold">
                  Add <span className="font-bold">Rs. {amountNeededForFreeShipping}</span> more to get <span className="underline">FREE Shipping</span>!
                </p>
              ) : (
                <p className="text-xs text-green-700 font-bold">
                  🎉 Congratulations! You have unlocked FREE Shipping!
                </p>
              )}
              <div className="w-full bg-white/70 h-2 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  className="bg-[#5e0d0c] h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Cart Item List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-gray-100">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
                  <p className="text-gray-500 text-sm font-medium">Your shopping cart is empty</p>
                  <Link
                    href="/collections/all-products"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block bg-[#5e0d0c] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-md hover:bg-[#430807] transition"
                  >
                    Explore Products
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="pt-4 first:pt-0 flex space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-semibold text-xs text-gray-800 hover:text-[#5e0d0c] line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-gray-400 hover:text-red-600 p-1 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="inline-block bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded mt-1 font-medium">
                          Weight: {item.selectedWeight}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-[#e95144] font-bold text-sm">
                            Rs. {item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer & Checkout Action */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-gray-900 font-extrabold text-base">Rs. {subtotal}</span>
                </div>

                <p className="text-[11px] text-gray-500">
                  Taxes and shipping calculated at checkout. Cash on Delivery (COD) available across Pakistan.
                </p>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-all"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  <span>100% Money Back Guarantee & Fresh Desi Taste</span>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
