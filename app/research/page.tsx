import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { ResearchHeader } from "@/components/research/research-header"
import { ResearchFilters } from "@/components/research/research-filters"
import { ProjectsGrid } from "@/components/research/projects-grid"
import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Research Projects - Mohammed E. Fouda",
  description:
    "Research projects in neuromorphic hardware, AI accelerators, quantization techniques, and hardware-software co-design.",
}

export default async function ResearchPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  if (settings && !settings.showResearch) return notFound()
  const projects = await prisma.researchProject.findMany({ orderBy: { createdAt: "desc" } })
  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ResearchHeader />
          <div className="mt-12 space-y-8">
            <ResearchFilters />
            <Suspense fallback={<div className="text-center py-12">Loading projects...</div>}>
              <ProjectsGrid projects={projects as any} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
