import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import HeroCarousel from "@/components/Home/HeroCarousel";
import DiamondSelector from "@/components/Home/DiamondSelector";
import FilterSection from "@/components/Home/FilterSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-hidden">
        {/* Hero doesn't need animation as it's the first element */}
        <HeroCarousel />

        <AnimatedSection delay={0.2}>
          <DiamondSelector />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <FilterSection />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <TestimonialsSection />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
