import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { PublicationsHeader } from "@/components/publications/publications-header"
import { PublicationsFilters } from "@/components/publications/publications-filters"
import { PublicationsList } from "@/components/publications/publications-list"
import { PublicationsProvider } from "@/components/publications/publications-context"
import { Suspense } from "react"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Publications - Mohammed E. Fouda",
  description:
    "Complete list of research publications in AI hardware, neuromorphic computing, and hardware-software co-design.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function PublicationsPage() {
  const publications = await prisma.publication.findMany({ orderBy: [{ year: "desc" }, { citations: "desc" }] })
  const serializedPubs = publications.map((p: any) => ({
    ...p,
    authors: Array.isArray(p.authors) ? p.authors.map(String) : [],
    impactFactor: p.impactFactor ? Number(p.impactFactor) : null,
  }))
  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PublicationsHeader />
          <div className="mt-12 space-y-8">
            <PublicationsProvider initialPublications={serializedPubs as any}>
              <PublicationsFilters />
              <Suspense fallback={<div className="text-center py-12">Loading publications...</div>}>
                <PublicationsList />
              </Suspense>
            </PublicationsProvider>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
