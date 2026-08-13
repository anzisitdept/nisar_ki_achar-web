'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, subtotal, removeFromCart, updateQuantity, setIsCheckoutOpen, freeShippingThreshold, amountNeededForFreeShipping } = useCart();

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Shopping Cart ({cart.reduce((a, c) => a + c.quantity, 0)})
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-5xl py-12 min-h-[50vh]">
        {cart.length === 0 ? (
          <div className="text-center py-16 space-y-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
            <p className="text-gray-600 font-medium text-sm">Your cart is currently empty.</p>
            <Link
              href="/collections/all-products"
              className="inline-block bg-[#5e0d0c] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#430807] transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.cartId} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex space-x-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-gray-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} className="font-bold text-xs text-gray-900 hover:text-[#5e0d0c] line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-[11px] text-gray-500 font-medium mt-0.5">Weight: {item.selectedWeight}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center border rounded-lg bg-gray-50">
                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="px-2 py-0.5 text-xs">-</button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="px-2 py-0.5 text-xs">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-xs text-red-600 font-medium hover:underline">Remove</button>
                    </div>
                  </div>
                  <span className="font-extrabold text-sm text-[#e95144]">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4 h-fit">
              <h3 className="font-bold text-gray-900 text-sm uppercase border-b pb-2">Order Summary</h3>
              <div className="flex justify-between text-xs font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span>Shipping</span>
                <span className="font-bold text-green-700">{amountNeededForFreeShipping === 0 ? 'FREE' : 'Rs. 200'}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-extrabold text-[#5e0d0c]">
                <span>Total Payable</span>
                <span>Rs. {subtotal + (amountNeededForFreeShipping === 0 ? 0 : 200)}</span>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
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
