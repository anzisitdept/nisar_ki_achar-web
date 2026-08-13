'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Customer Login
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mt-2">
            Access your order history, saved addresses, and exclusive rewards.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-md py-14 min-h-[50vh]">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
          {isLoggedIn ? (
            <div className="text-center py-6 space-y-4">
              <UserCheck className="w-16 h-16 text-green-600 mx-auto" />
              <h2 className="text-xl font-bold text-gray-900">Welcome Back!</h2>
              <p className="text-xs text-gray-600">You are successfully logged in as <strong className="text-gray-900">{email}</strong>.</p>
              <Link
                href="/account/orders"
                className="inline-block bg-[#5e0d0c] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md"
              >
                View My Orders
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address / Phone Number *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter email or mobile number"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-3.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-gray-700">Password *</label>
                  <a href="#" className="text-gray-400 hover:text-[#5e0d0c] text-[11px]">Forgot?</a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-3.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-md transition"
              >
                <span>SIGN IN</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-4 border-t border-gray-100 text-gray-600 text-xs">
                Don't have an account?{' '}
                <Link href="/account/register" className="font-bold text-[#5e0d0c] hover:underline">
                  Create Account
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
