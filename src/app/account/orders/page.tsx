'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function OrdersPage() {
  const sampleOrders = [
    {
      id: 'NA-000001',
      date: 'Aug 10, 2026',
      status: 'In Transit',
      items: 'Sarson Da Saag Pickle (1kg), Amla Murabba (500g)',
      total: 1639,
      payment: 'Cash on Delivery (COD)'
    },
    {
      id: 'NA-000002',
      date: 'Jul 24, 2026',
      status: 'Delivered',
      items: 'Special Aloo Bukhara Chutney (500g)',
      total: 799,
      payment: 'Cash on Delivery (COD)'
    }
  ];

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#e60000] uppercase tracking-wide">
            My Orders History
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 min-h-[50vh]">
        <div className="space-y-6">
          {sampleOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-2">
                <div>
                  <span className="font-bold text-sm text-[#e60000]">Order #{order.id}</span>
                  <span className="text-xs text-gray-500 ml-3">Placed on {order.date}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="text-xs text-gray-700 space-y-1">
                <p className="font-semibold">{order.items}</p>
                <p className="text-gray-500">Payment: {order.payment}</p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t text-xs">
                <span className="font-bold text-gray-900">Total: Rs. {order.total}</span>
                <a
                  href={`https://wa.me/923000000000?text=Hi%20Nisar%20Achar,%20please%20update%20status%20for%20order%20${order.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-700 font-bold hover:underline"
                >
                  Track on WhatsApp →
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
