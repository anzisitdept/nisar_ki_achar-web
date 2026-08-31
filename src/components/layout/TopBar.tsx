'use client';

import React, { useState, useEffect } from 'react';
import { useStoreData } from '@/context/StoreDataContext';

export default function TopBar() {
  const { storeContent } = useStoreData();
  const messages = storeContent.topBarMessages;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div className="bg-[#5e0d0c] text-white text-xs md:text-[13px] font-bold py-2 md:py-2.5 px-4 flex items-center justify-center select-none overflow-hidden">
      <div className="flex-1 text-center truncate px-1 md:px-2">
        <span
          key={currentIndex}
          className="inline-block tracking-wider uppercase animate-slideIn text-[10px] md:text-[13px]"
        >
          {messages[currentIndex % messages.length]}
        </span>
      </div>
    </div>
  );
}
