'use client';

import React, { useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import VideoModal from './VideoModal';
import { ReelItem } from '@/types';
import { useStoreData } from '@/context/StoreDataContext';

export default function VideoCarousel() {
  const { storeContent } = useStoreData();
  const REELS: ReelItem[] = storeContent.reels || [];

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [mutedMap, setMutedMap] = useState<Record<number, boolean>>({});

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  if (!REELS || REELS.length === 0) return null;

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedMap(prev => ({ ...prev, [id]: vid.muted }));
    }
  };

  return (
    <section className="py-10 md:py-12 overflow-hidden bg-white">
      <div className="container mx-auto px-3 md:px-4 max-w-7xl">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-8 md:mb-10 font-serif text-[#232323] uppercase tracking-wide">
          SEE WHAT OUR CUSTOMERS SAY
        </h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 md:gap-6">
            {REELS.map((reel) => (
              <div
                key={reel.id}
                className="flex-[0_0_62%] xs:flex-[0_0_48%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0 cursor-pointer"
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
