import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ReviewsWidget from '@/components/layout/ReviewsWidget';
import HeroSlider from '@/components/home/HeroSlider';
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
        <HeroSlider />

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

        {/* 8. Slide Show 2 (Secondary Hero/Promotional) */}
        <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center my-8">
          <img 
            src="https://soghatekhas.com/cdn/shop/files/Web_banner_2_4_2b23b875-3457-4e94-81fb-9792bedcbc97.jpg?v=1774275131&width=750" 
            alt="Secondary Slide Show" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </section>

        {/* 9. Product Block 4 */}
        <ProductCarousel title="Special Items" />

        {/* 10. Product Block 5 */}
        <ProductCarousel title="More to Love" />

        {/* 11. Contact Blocks at Bottom */}
        <ContactBlock />

      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
