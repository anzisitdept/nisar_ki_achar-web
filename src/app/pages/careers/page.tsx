import React from 'react';
import Link from 'next/link';
import { Briefcase, Send } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function CareersPage() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Careers at Soghat-e-Khas
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mt-2">
            Join Pakistan's premier traditional food and pickle brand.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
          
          <div className="flex items-center space-x-3 text-[#5e0d0c]">
            <Briefcase className="w-6 h-6" />
            <h2 className="text-xl font-bold font-serif uppercase">Open Positions</h2>
          </div>

          <div className="space-y-4 divide-y divide-gray-100">
            <div className="pt-4 first:pt-0 space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">Quality Assurance Manager (Food Safety)</h3>
              <p className="text-gray-500 text-xs">Islamabad Manufacturing Facility • Full Time</p>
            </div>
            <div className="pt-4 space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">Digital Marketing & E-Commerce Specialist</h3>
              <p className="text-gray-500 text-xs">Islamabad HQ • Full Time</p>
            </div>
            <div className="pt-4 space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">Customer Support Executive</h3>
              <p className="text-gray-500 text-xs">Islamabad HQ • Shift Rotational</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border text-center space-y-3">
            <p className="font-semibold text-gray-800">Interested in working with us?</p>
            <p className="text-xs text-gray-500">Send your resume and cover letter to <strong>careers@soghatekhas.com</strong></p>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
