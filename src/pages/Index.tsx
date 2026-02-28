import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FeaturedPujasSection, type FeaturedPuja } from "@/components/home/FeaturedPujasSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TemplesSection, type HomeTemple } from "@/components/home/TemplesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";
import { demoPujas, demoTemples } from "@/lib/demoData";

export default function Index() {
  const featured = demoPujas.filter((p) => p.is_featured).slice(0, 6) as FeaturedPuja[];
  const topTemples = demoTemples.slice(0, 4) as HomeTemple[];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustStrip />
        <FeaturedPujasSection
          pujas={featured}
          isLoading={false}
          isError={false}
        />
        <ServicesSection />
        <TemplesSection
          temples={topTemples}
          isLoading={false}
          isError={false}
        />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
