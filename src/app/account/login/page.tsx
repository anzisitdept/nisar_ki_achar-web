'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [newsOffers, setNewsOffers] = useState(true);
  const [step, setStep] = useState<'email' | 'code' | 'authenticated'>('email');
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep('code');
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('authenticated');
  };

  const handleShopPayClick = () => {
    if (!email) setEmail('customer@example.com');
    setStep('code');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between items-center py-10 px-4 font-sans text-gray-900">
      
      {/* Top Logo */}
      <div className="pt-4 pb-8 text-center">
        <Link href="/">
          <img
            src="https://soghatekhas.com/cdn/shop/files/LogoSEK_881f3b7e-fdb5-4f01-b6e5-cfa3726171ec.webp?v=1736533537"
            alt="Soghat E Khas"
            className="h-16 md:h-20 w-auto mx-auto object-contain"
          />
        </Link>
      </div>

      {/* Main Centered Sign In Form Card */}
      <div className="w-full max-w-sm mx-auto space-y-6">
        
        {step === 'email' && (
          <>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sign in</h1>
              <p className="text-xs text-gray-500 mt-1">Sign in or create an account</p>
            </div>

            {/* Continue with shop Button */}
            <button
              onClick={handleShopPayClick}
              className="w-full bg-[#5a31f4] hover:bg-[#4a24db] text-white font-semibold text-sm py-3.5 px-4 rounded-xl transition shadow-sm flex items-center justify-center gap-2"
            >
              <span>Continue with shop</span>
            </button>

            {/* Divider OR */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium">or</span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-black transition"
                  title="Submit Email"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Email me news and offers checkbox */}
              <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newsOffers}
                  onChange={e => setNewsOffers(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span>Email me with news and offers</span>
              </label>

              {/* Terms of Service notice */}
              <p className="text-[11px] text-gray-400 text-center pt-2">
                By continuing, you agree to our{' '}
                <Link href="/pages/terms-conditions" className="underline hover:text-gray-700">
                  terms of service
                </Link>
              </p>
            </form>
          </>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Enter 6-digit code</h1>
              <p className="text-xs text-gray-500 mt-1">
                We sent a login code to <strong className="text-gray-800">{email}</strong>.
              </p>
            </div>

            <div className="flex gap-2 justify-center py-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`code-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => {
                    const newCode = [...code];
                    newCode[idx] = e.target.value;
                    setCode(newCode);
                    if (e.target.value && idx < 5) {
                      document.getElementById(`code-${idx + 1}`)?.focus();
                    }
                  }}
                  className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-sm py-3.5 px-4 rounded-xl transition"
            >
              Verify & Sign In
            </button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-xs text-gray-500 hover:text-black text-center block"
            >
              ← Use a different email
            </button>
          </form>
        )}

        {step === 'authenticated' && (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 size={48} className="text-green-600 mx-auto" />
            <h2 className="text-xl font-bold text-gray-900">Signed In Successfully</h2>
            <p className="text-xs text-gray-500">
              Welcome back! You are logged in as <strong className="text-gray-800">{email || 'customer@example.com'}</strong>.
            </p>
            <div className="pt-2 space-y-2">
              <Link
                href="/"
                className="w-full inline-block bg-black text-white font-semibold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Continue Shopping
              </Link>
              <Link
                href="/collections/all-products"
                className="w-full inline-block bg-gray-100 text-gray-800 font-semibold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Privacy Policy Footer */}
      <div className="pt-12 pb-4 text-center">
        <Link href="/pages/privacy-policy" className="text-xs text-gray-400 hover:text-gray-600 transition">
          Privacy policy
        </Link>
      </div>

    </div>
  );
}
