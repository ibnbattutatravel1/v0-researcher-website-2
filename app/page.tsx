import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { MetricsSection } from "@/components/metrics-section"
import { FeaturedWorksSection } from "@/components/featured-works-section"
import { CTASection } from "@/components/cta-section"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  // Compute publication metrics from DB
  const pubs = await prisma.publication.findMany({ select: { citations: true, title: true, venue: true, year: true, impactFactor: true, url: true, doi: true, topic: true }, orderBy: [{ citations: "desc" }, { year: "desc" }] })
  const totalPublications = pubs.length
  const totalCitations = pubs.reduce((sum, p) => sum + (p.citations || 0), 0)
  // h-index: max i such that citations >= i
  const sortedCites = [...pubs].map((p) => p.citations || 0).sort((a, b) => b - a)
  let hIndex = 0
  for (let i = 0; i < sortedCites.length; i++) {
    if (sortedCites[i] >= i + 1) hIndex = i + 1
    else break
  }
  const featuredWorks = pubs.slice(0, 4).map((p) => ({
    title: p.title,
    venue: p.venue,
    year: p.year,
    citations: p.citations,
    impactFactor: p.impactFactor ?? undefined,
    doi: (p as any).doi ?? undefined,
    pdfUrl: (p as any).url ?? undefined,
    topic: (p as any).topic ?? undefined,
  }))
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
        <MetricsSection totalPublications={totalPublications} hIndex={hIndex} totalCitations={totalCitations} />
        <FeaturedWorksSection works={featuredWorks} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
