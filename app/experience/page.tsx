import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ExperienceHeader } from "@/components/experience/experience-header"
import { ExperienceTimeline } from "@/components/experience/experience-timeline"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Experience & CV - Mohammed E. Fouda",
  description: "Professional experience in AI hardware research, industry roles, and academic positions.",
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ExperienceHeader />
          <div className="mt-12">
            <ExperienceTimeline />
          </div>
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="glow-hover">
              <Link href="/cv/Mohammed_Fouda_CV.pdf" target="_blank">
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
