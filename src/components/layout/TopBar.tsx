'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { subscribeTopBarMessages } from '@/lib/firestoreServices';

export default function TopBar() {
  const [messages, setMessages] = useState<string[]>([
    'GET 5% OFF ON ORDERS WITH ADVANCE PAYMENT.',
    '⚡ FREE NATIONWIDE SHIPPING ON ORDERS OVER RS. 2,999',
    '🎁 100% PURE & HOMEMADE DESI QUALITY GUARANTEED'
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsub = subscribeTopBarMessages((dynamicMsgs) => {
      if (dynamicMsgs && dynamicMsgs.length > 0) {
        setMessages(dynamicMsgs);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [messages]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <div className="bg-[#5e0d0c] text-white text-xs md:text-[13px] font-bold py-2.5 px-4 relative flex items-center justify-between select-none overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="opacity-70 hover:opacity-100 transition-opacity p-1 text-white flex-shrink-0 z-10"
        aria-label="Previous announcement"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Message Text with smooth fade-in transition */}
      <div className="flex-1 text-center truncate px-2">
        <span
          key={currentIndex}
          className="inline-block tracking-wider uppercase transition-all duration-500 animate-fadeIn"
        >
          {messages[currentIndex % messages.length]}
        </span>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="opacity-70 hover:opacity-100 transition-opacity p-1 text-white flex-shrink-0 z-10"
        aria-label="Next announcement"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
