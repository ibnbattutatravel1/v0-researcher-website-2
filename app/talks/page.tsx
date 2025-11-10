import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { TalksHeader } from "@/components/talks/talks-header"
import { TalksList } from "@/components/talks/talks-list"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Talks & Media - Mohammed E. Fouda",
  description: "Invited talks, tutorials, and media appearances on AI hardware and neuromorphic computing.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function TalksPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  if (settings && !settings.showTalks) return notFound()
  const talks = await prisma.talk.findMany({ orderBy: { createdAt: "desc" } })
  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TalksHeader />
          <div className="mt-12">
            <TalksList talks={talks as any} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
