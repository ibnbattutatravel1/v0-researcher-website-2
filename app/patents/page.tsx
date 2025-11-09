import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { PatentsHeader } from "@/components/patents/patents-header"
import { PatentsList } from "@/components/patents/patents-list"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Patents - Mohammed E. Fouda",
  description: "Intellectual property portfolio in AI hardware, neuromorphic computing, and memory technologies.",
}

export default async function PatentsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  if (settings && !settings.showPatents) return notFound()
  const patents = await prisma.patent.findMany({ orderBy: { createdAt: "desc" } })
  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PatentsHeader
            total={settings?.patentsTotal || `${patents.length}`}
            granted={settings?.patentsGranted || `${patents.filter((p) => p.status?.toLowerCase() === "granted").length}`}
            pending={settings?.patentsPending || `${patents.filter((p) => p.status?.toLowerCase() !== "granted").length}`}
          />
          <div className="mt-12">
            <PatentsList patents={patents as any} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
