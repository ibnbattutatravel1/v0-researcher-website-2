import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { MetricsSection } from "@/components/metrics-section"
import { FeaturedWorksSection } from "@/components/featured-works-section"
import { CTASection } from "@/components/cta-section"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  const hero = {
    title: settings?.heroTitle ?? "Mohammed E. Fouda",
    subtitle: settings?.heroSubtitle ?? "Applied Research Lead at Rain AI",
    description:
      settings?.heroDescription ??
      "I design AI accelerators and neuromorphic systems that bridge algorithms and hardware, focusing on brain-inspired computing and efficient quantization techniques.",
    cvUrl: settings?.cvUrl ?? "/cv/Mohammed_Fouda_CV.pdf",
    contactEmail: settings?.contactEmail ?? "fouda@mefouda.me",
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main>
        <HeroSection {...hero} />
        <MetricsSection />
        <FeaturedWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
