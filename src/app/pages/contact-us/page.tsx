'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />

      <section className="bg-[#fae9e8] py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5e0d0c] uppercase tracking-wide">
            Contact Us & Customer Support
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mt-2">
            We are here to help you with order inquiries, wholesale distribution, and product feedback.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Form */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <h2 className="text-xl font-bold font-serif text-gray-900 uppercase">
              Send Us A Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-200 space-y-3">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">Message Received!</h3>
                <p className="text-xs text-gray-600">
                  Thank you for reaching out to Nisar Achar. Our customer support representative will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#5e0d0c] text-white text-xs font-bold px-6 py-2.5 rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hassan Ahmed"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Phone / WhatsApp Number *</label>
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
                    <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none bg-white"
                  >
                    <option value="General Inquiry">General Order Inquiry</option>
                    <option value="Delivery Tracking">Delivery Tracking & Status</option>
                    <option value="Wholesale / Bulk">Wholesale & Bulk Orders</option>
                    <option value="Feedback">Product Quality Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write details about your question or order..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-md transition"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details */}
          <div className="space-y-6">
            <div className="bg-[#fae9e8] p-8 rounded-3xl border border-red-100 space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#5e0d0c] uppercase">
                Direct Contact Helpline
              </h3>

              <div className="space-y-4 text-xs text-gray-800">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl text-[#5e0d0c] shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase">Customer Support Helpline</h4>
                    <p className="font-bold text-sm text-[#5e0d0c] mt-0.5">051-8300036 / 0300-0504030</p>
                    <p className="text-gray-500 text-[11px]">Available Mon - Sat (9:00 AM - 9:00 PM)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl text-green-600 shadow-xs">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase">WhatsApp Instant Support</h4>
                    <a
                      href="https://wa.me/923052396699"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-sm text-green-700 underline mt-0.5 block hover:text-green-800"
                    >
                      Click to chat on WhatsApp (+92 305 2396699)
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl text-[#5e0d0c] shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase">Email Support</h4>
                    <p className="font-semibold text-gray-800">support@nisarachar.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl text-[#5e0d0c] shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase">Head Office Address</h4>
                    <p className="font-medium text-gray-700 leading-relaxed">
                      Nisar Achar Headquarters, Sector I-9/3, Industrial Area, Islamabad, Pakistan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pakistan Coverage Banner */}
            <div className="bg-gray-900 text-white p-6 rounded-3xl text-center space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-wider text-yellow-400">Nationwide Cash on Delivery</h4>
              <p className="text-xs text-gray-300">
                Delivering fresh home-style pickles and murabbas to Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Multan, Quetta, and all 300+ cities in Pakistan.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
