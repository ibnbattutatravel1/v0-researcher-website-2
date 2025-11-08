import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { MetricsSection } from "@/components/metrics-section"
import { FeaturedWorksSection } from "@/components/featured-works-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <MetricsSection />
        <FeaturedWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
