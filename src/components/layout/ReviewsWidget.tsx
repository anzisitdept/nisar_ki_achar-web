import React from 'react';

export default function ReviewsWidget() {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
      <div 
        className="bg-[#5e0d0c] text-white font-serif py-3 px-2 flex flex-col items-center cursor-pointer hover:bg-black transition-colors shadow-lg"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="text-lg mb-1">★</span>
        <span className="tracking-widest text-[15px]">Reviews</span>
      </div>
    </div>
  );
}
