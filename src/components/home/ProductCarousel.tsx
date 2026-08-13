'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const products = [
  { 
    id: 1, 
    name: 'Sarson Da Saag Pickle (Sarson Da Saag Achar)', 
    originalPrice: 'Rs.850.00', 
    price: 'Rs.589.00', 
    image: 'https://soghatekhas.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg',
    hoverImage: 'https://soghatekhas.com/cdn/shop/files/1_f5d5b353-617f-4ca6-ae85-3da84d1e4f8e_533x.jpg'
  },
  { 
    id: 2, 
    name: 'Amla Pickle (Amla Achar)', 
    originalPrice: 'Rs.850.00', 
    price: 'Rs.629.00', 
    image: 'https://soghatekhas.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg',
    hoverImage: 'https://soghatekhas.com/cdn/shop/files/2_2_533x.jpg'
  },
  { 
    id: 3, 
    name: 'Lahori Lasoora Pickle (Lahori Lasoora Achar)', 
    originalPrice: 'Rs.750.00', 
    price: 'Rs.589.00', 
    image: 'https://soghatekhas.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg',
    hoverImage: 'https://soghatekhas.com/cdn/shop/files/3_2_533x.jpg'
  },
  { 
    id: 4, 
    name: 'Moringa Pickle (Moringa Achar)', 
    originalPrice: 'Rs.985.00', 
    price: 'Rs.689.00', 
    image: 'https://soghatekhas.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg',
    hoverImage: 'https://soghatekhas.com/cdn/shop/files/6_1_533x.png'
  }
];

export default function ProductCarousel({ title = "DISCOVER OUR 20+ SIGNATURE PICKLES" }: { title?: string }) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps'
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-3xl text-center font-serif text-[#232323] uppercase tracking-wide">
            {title}
          </h2>
          <div className="w-full h-px bg-gray-300 my-4 relative max-w-3xl">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-[#5e0d0c] cursor-pointer">
                View All
             </div>
          </div>
        </div>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map(product => (
              <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0">
                <div className="bg-white group cursor-pointer border border-gray-200 rounded-[20px] overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col relative">
                  
                  {/* Badges */}
                  <div className="absolute top-0 left-0 z-20 flex flex-col items-start rounded-tl-[20px] overflow-hidden">
                    <div className="bg-[#e95144] text-white text-[11px] font-bold px-2 py-1">-30%</div>
                    <div className="bg-[#fbb03b] text-white text-[11px] font-bold px-2 py-1">Best Selling</div>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 z-10" 
                    />
                    <img 
                      src={product.hoverImage} 
                      alt={`${product.name} Alternate`} 
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 z-0" 
                    />
                    
                    {/* Quick Add Button sliding up */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20">
                      <button className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-3 hover:bg-black hover:text-white transition-colors shadow-lg">
                        QUICK ADD
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-5 text-center flex-1 flex flex-col justify-start">
                    <h3 className="text-[13px] font-medium mb-3 text-gray-800 hover:text-[#5e0d0c] transition-colors leading-relaxed line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-auto flex justify-center items-center space-x-3 text-sm">
                      <span className="text-gray-400 line-through font-medium">{product.originalPrice}</span>
                      <span className="text-[#e95144] font-semibold">from</span>
                      <span className="text-[#e95144] font-bold">{product.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
