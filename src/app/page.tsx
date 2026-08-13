import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import ProductCarousel from '@/components/home/ProductCarousel';
import VideoCarousel from '@/components/home/VideoCarousel';
import MidBanners from '@/components/home/MidBanners';
import ContactBlock from '@/components/home/ContactBlock';

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <ReviewsWidget />
      
      <main className="flex-1 w-full overflow-hidden">
        {/* 1. Hero Banner Section (Slide Show) */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center group">
          <img 
            src="https://soghatekhas.com/cdn/shop/files/MAINN_WEB.jpg" 
            alt="Hero Banner" 
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
          />
          <img 
            src="https://soghatekhas.com/cdn/shop/files/MAIN.jpg?v=1763724992&width=750" 
            alt="Hero Banner Mobile" 
            className="absolute inset-0 w-full h-full object-cover md:hidden"
          />
          {/* Circular Arrows overlay for Hero Slider */}
          <button className="absolute left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md">
            &lt;
          </button>
          <button className="absolute right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md">
            &gt;
          </button>
        </section>

        {/* 2. Video Influencer Carousel */}
        <VideoCarousel />

        {/* 3. Categories Carousel */}
        <CategoryCarousel />

        {/* 4. Product Block 1 */}
        <ProductCarousel title="Best Sellers" />

        {/* 5. Product Block 2 */}
        <ProductCarousel title="New Arrivals" />

        {/* 6. Image Banner 1 */}
        <MidBanners />

        {/* 7. Product Block 3 */}
        <ProductCarousel title="Bundle Offers" />

        {/* 8. Image Banner 2 */}
        <section className="py-8 bg-[#f8f8f8]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="relative w-full h-[300px] md:h-[400px] bg-gray-200 overflow-hidden group">
              <img 
                src="https://soghatekhas.com/cdn/shop/files/Web_banner_37_4b8a7db5-2237-470a-957b-d1ce5fc8f492.jpg?v=1774275085&width=3840" 
                alt="Banner 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hidden md:block"
              />
              <img 
                src="https://soghatekhas.com/cdn/shop/files/Mob_banner_2_db98b3c4-f009-4d28-8130-70eb47e7f919.jpg?v=1774275104&width=750" 
                alt="Banner 2 Mobile" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 md:hidden"
              />
            </div>
          </div>
        </section>

        {/* 9. Slide Show 2 (Secondary Hero/Promotional) */}
        <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center my-8">
          <img 
            src="https://soghatekhas.com/cdn/shop/files/Web_banner_2_4_2b23b875-3457-4e94-81fb-9792bedcbc97.jpg?v=1774275131&width=750" 
            alt="Secondary Slide Show" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </section>

        {/* 10. Product Block 4 */}
        <ProductCarousel title="Special Items" />

        {/* 11. Product Block 5 */}
        <ProductCarousel title="More to Love" />

        {/* 12. Contact Blocks at Bottom */}
        <ContactBlock />

      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
