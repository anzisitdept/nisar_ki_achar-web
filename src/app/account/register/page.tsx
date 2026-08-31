'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Phone, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Create New Account
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mt-2">
            Join Nisar Achar family for fast checkout and special discount offers.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-md py-12 min-h-[50vh]">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
          {isRegistered ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              <h2 className="text-xl font-bold text-gray-900">Account Created!</h2>
              <p className="text-xs text-gray-600">Your account has been created successfully. Welcome to Nisar Achar!</p>
              <Link
                href="/collections/all-products"
                className="inline-block bg-[#5e0d0c] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ali"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Khan"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-md transition"
              >
                <span>CREATE MY ACCOUNT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-4 border-t border-gray-100 text-gray-600 text-xs">
                Already have an account?{' '}
                <Link href="/account/login" className="font-bold text-[#5e0d0c] hover:underline">
                  Sign In Here
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
