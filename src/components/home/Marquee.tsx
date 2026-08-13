import React from 'react';

export default function Marquee() {
  const texts = [
    "Freshly Handmade",
    "Loved by Thousands",
    "Pakistan's Most Trusted Pickles",
    "100% Chemical-Free"
  ];

  return (
    <div className="w-full overflow-hidden bg-white py-6 border-b border-gray-200">
      <div className="relative flex overflow-x-hidden group font-serif text-[#5e0d0c] text-xl md:text-2xl whitespace-nowrap tracking-wide">
        <div className="animate-marquee flex items-center space-x-8 px-4">
          {[...Array(4)].map((_, j) => (
            <React.Fragment key={j}>
              {texts.map((text, i) => (
                <div key={`${j}-${i}`} className="flex items-center space-x-8">
                  <span>{text}</span>
                  <span className="text-[#5e0d0c] text-sm">⚡</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 flex items-center space-x-8 px-4">
          {[...Array(4)].map((_, j) => (
            <React.Fragment key={j}>
              {texts.map((text, i) => (
                <div key={`dup-${j}-${i}`} className="flex items-center space-x-8">
                  <span>{text}</span>
                  <span className="text-[#5e0d0c] text-sm">⚡</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
