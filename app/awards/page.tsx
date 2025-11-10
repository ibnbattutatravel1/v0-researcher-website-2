import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { AwardsHeader } from "@/components/awards/awards-header"
import { AwardsList } from "@/components/awards/awards-list"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Awards & Honors - Mohammed E. Fouda",
  description: "Recognition for contributions to AI hardware research and neuromorphic computing.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AwardsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  if (settings && !settings.showAwards) return notFound()
  const awards = await prisma.award.findMany({ orderBy: { year: "desc" } })
  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AwardsHeader />
          <div className="mt-12">
            <AwardsList awards={awards as any} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
