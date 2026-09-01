'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, subtotal, removeFromCart, updateQuantity, setIsCheckoutOpen, freeShippingThreshold, amountNeededForFreeShipping } = useCart();
  const [shippingDismissed, setShippingDismissed] = useState(false);

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-6 md:py-10 border-b border-red-100 w-full">
        <div className="mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#e60000] uppercase tracking-wide">
            Shopping Cart ({cart.reduce((a, c) => a + c.quantity, 0)})
          </h1>
        </div>
      </section>

      {/* Shipping Notification Banner */}
      {!shippingDismissed && cart.length > 0 && amountNeededForFreeShipping > 0 && (
        <div className="bg-[#e60000] text-white py-2.5 px-4 w-full relative">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs md:text-sm font-semibold pr-6">
              Add <span className="font-bold">Rs. {amountNeededForFreeShipping}</span> more for <span className="underline">FREE Shipping</span>! Shipping fee is Rs. 200.
            </p>
          </div>
          <button
            onClick={() => setShippingDismissed(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
            aria-label="Close shipping notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="mx-auto px-4 lg:px-8 max-w-5xl py-6 md:py-12 min-h-[50vh] w-full">
        {cart.length === 0 ? (
          <div className="text-center py-12 md:py-16 space-y-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto" />
            <p className="text-gray-600 font-medium text-xs md:text-sm">Your cart is currently empty.</p>
            <Link
              href="/collections/all-products"
              className="inline-block bg-[#e60000] text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-5 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-[#cc0000] transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            <div className="lg:col-span-2 space-y-3 md:space-y-4">
              {cart.map(item => (
                <div key={item.cartId} className="bg-white p-3 md:p-4 rounded-2xl border border-gray-200 shadow-xs flex space-x-3 md:space-x-4 items-center">
                  {item.image && item.image.trim() !== '' ? (
                    <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border border-gray-100 flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-xl border border-gray-100 flex-shrink-0 flex items-center justify-center text-[10px] text-gray-400 font-medium">
                      No Image
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} className="font-bold text-[11px] md:text-xs text-gray-900 hover:text-[#e60000] line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-0.5">Weight: {item.selectedWeight}</p>
                    <div className="flex items-center space-x-2 md:space-x-3 mt-1.5 md:mt-2">
                      <div className="flex items-center border rounded-lg bg-gray-50">
                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="px-2 py-0.5 text-xs">-</button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="px-2 py-0.5 text-xs">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-[10px] md:text-xs text-red-600 font-medium hover:underline">Remove</button>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs md:text-sm text-[#e60000] flex-shrink-0">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 md:p-6 rounded-2xl border border-gray-200 space-y-3 md:space-y-4 h-fit">
              <h3 className="font-bold text-gray-900 text-xs md:text-sm uppercase border-b pb-2">Order Summary</h3>

              {/* Shipping progress bar */}
              {amountNeededForFreeShipping > 0 && (
                <div className="bg-[#fae9e8] p-2.5 rounded-lg text-center">
                  <p className="text-[10px] md:text-xs text-[#e60000] font-semibold">
                    Add <span className="font-bold">Rs. {amountNeededForFreeShipping}</span> more for FREE Shipping
                  </p>
                  <div className="w-full bg-white/70 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-[#e60000] h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              )}

              <div className="flex justify-between text-[11px] md:text-xs font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-[11px] md:text-xs font-medium">
                <span>Shipping</span>
                <span className="font-bold text-green-700">{amountNeededForFreeShipping === 0 ? 'FREE' : 'Rs. 200'}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-extrabold text-[#e60000]">
                <span>Total Payable</span>
                <span>Rs. {subtotal + (amountNeededForFreeShipping === 0 ? 0 : 200)}</span>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#e60000] hover:bg-[#cc0000] text-white font-bold text-[10px] md:text-xs uppercase tracking-widest py-3 md:py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
