'use client';

import React, { useRef, useState } from 'react';
import { X, Volume2, VolumeX, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProductBySlug } from '@/data/products';
import { ReelItem } from '@/types';

interface VideoModalProps {
  reel: ReelItem | null;
  onClose: () => void;
}

export default function VideoModal({ reel, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const { addToCart } = useCart();

  if (!reel) return null;

  const product = getProductBySlug(reel.productSlug.replace('/products/', ''));

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-colors z-20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Video Reel Container */}
      <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between">
        
        {/* HTML5 Video */}
        <video
          ref={videoRef}
          src={reel.videoUrl}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top Controls */}
        <div className="relative z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent">
          <div className="text-white font-semibold text-sm drop-shadow-md">
            Nisar Achar Reel
          </div>
          <button 
            onClick={toggleMute} 
            className="text-white bg-black/40 p-2 rounded-full backdrop-blur-sm hover:bg-black/60 transition"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Bottom Overlay Info & Product Card */}
        <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent space-y-3">
          <h3 className="text-white font-bold text-base leading-tight drop-shadow-md">
            {reel.title}
          </h3>

          {product && (
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl flex items-center justify-between space-x-3 shadow-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link 
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="font-bold text-xs text-gray-900 truncate block hover:text-[#5e0d0c]"
                >
                  {product.name}
                </Link>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-[#e95144] font-extrabold">Rs. {product.price}</span>
                  <span className="text-gray-400 line-through text-[10px]">Rs. {product.originalPrice}</span>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-[#5e0d0c] hover:bg-[#430807] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1 flex-shrink-0 transition"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
