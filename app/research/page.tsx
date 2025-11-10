import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { ResearchHeader } from "@/components/research/research-header"
import { ResearchBrowser } from "@/components/research/research-browser"
import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Research Projects - Mohammed E. Fouda",
  description:
    "Research projects in neuromorphic hardware, AI accelerators, quantization techniques, and hardware-software co-design.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ResearchPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  if (settings && !settings.showResearch) return notFound()
  const projects = await prisma.researchProject.findMany({ orderBy: { createdAt: "desc" } })
  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ResearchHeader
            activeProjects={settings?.researchActiveProjects || "15+"}
            collaborations={settings?.researchCollaborations || "8"}
            fundingRaised={settings?.researchFundingRaised || "$2.5M"}
            patentsFiled={settings?.researchPatentsFiled || "12"}
          />
          <div className="mt-12 space-y-8">
            <Suspense fallback={<div className="text-center py-12">Loading projects...</div>}>
              <ResearchBrowser projects={projects as any} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
