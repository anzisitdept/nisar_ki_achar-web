'use client';

import React, { useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import VideoModal, { ReelItem } from './VideoModal';

export const REELS: ReelItem[] = [
  {
    id: 1,
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/5892667feeb640d5b1dd37ee31c2dd4b.mp4',
    title: 'AlooBukhara Chutney آلو بخاراکی چٹنی',
    productSlug: 'aloo-bukhara-chutney'
  },
  {
    id: 2,
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/2fdd9ac2f1eb4193bdc06635a50ebeed.mp4',
    title: 'Multani Mango Pickle ملتانی آم کا اچار',
    productSlug: 'sarson-da-saag-pickle'
  },
  {
    id: 3,
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/d669c30a7cc04b9f91282fd661348214.mp4',
    title: 'Hyderabad Mix Pickle حیدرآباد مکس اچار',
    productSlug: 'hyderabad-mix-pickle'
  },
  {
    id: 4,
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/e3bec111972c4a6498065024b02b6dfe.mp4',
    title: 'Quince Murabba بہی کا مربہ',
    productSlug: 'quince-murabba'
  },
  {
    id: 5,
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/298d941936ed4723b0874a4dc0206af4.mp4',
    title: 'Amla Murabba آملہ مربہ',
    productSlug: 'aamla-murabba'
  },
  {
    id: 6,
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/f5c0ad4174a4428ba98da110909d29a4.mp4',
    title: 'Aamla Pickle آملہ کا اچار',
    productSlug: 'aamla-pickle'
  }
];

export default function VideoCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [mutedMap, setMutedMap] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: true, 4: true, 5: true, 6: true
  });

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedMap(prev => ({ ...prev, [id]: vid.muted }));
    }
  };

  return (
    <section className="py-12 overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl md:text-3xl text-center mb-10 font-serif text-[#232323] uppercase tracking-wide">
          SEE WHAT OUR CUSTOMERS SAY
        </h2>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {REELS.map((reel) => (
              <div 
                key={reel.id} 
                className="flex-[0_0_70%] sm:flex-[0_0_40%] lg:flex-[0_0_22%] min-w-0 cursor-pointer"
                onClick={() => setActiveReel(reel)}
              >
                <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-lg group border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                  
                  {/* HTML5 Streaming Video */}
                  <video
                    ref={el => { videoRefs.current[reel.id] = el; }}
                    src={reel.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Bar Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-white/20">
                      Customer Reel
                    </span>
                    <button 
                      onClick={(e) => toggleMute(reel.id, e)}
                      className="bg-black/60 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/80 transition"
                    >
                      {mutedMap[reel.id] ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Play Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 transform scale-90 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                    <p className="font-bold text-xs line-clamp-2 leading-snug drop-shadow">
                      {reel.title}
                    </p>
                    <span className="text-[11px] text-yellow-400 font-medium mt-1 inline-block">
                      ★ 4.9 Verified Review
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      <VideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </section>
  );
}
