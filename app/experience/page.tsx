import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { ExperienceHeader } from "@/components/experience/experience-header"
import { ExperienceTimeline } from "@/components/experience/experience-timeline"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Experience & CV - Mohammed E. Fouda",
  description: "Professional experience in AI hardware research, industry roles, and academic positions.",
}

export default async function ExperiencePage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  if (settings && !settings.showExperience) return notFound()
  const experiences = await prisma.experience.findMany({ orderBy: { createdAt: "desc" } })
  const cvUrl = settings?.cvUrl ?? "/cv/Mohammed_Fouda_CV.pdf"
  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ExperienceHeader />
          <div className="mt-12">
            <ExperienceTimeline experiences={experiences as any} />
          </div>
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="glow-hover">
              <Link href={cvUrl} target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download Complete CV
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
