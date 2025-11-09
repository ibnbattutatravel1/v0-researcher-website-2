import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { FadeIn, StaggerContainer } from "@/components/motion"

type Work = {
  title: string
  venue: string
  year: number
  citations?: number
  impactFactor?: number | null
  doi?: string | null
  pdfUrl?: string | null
  topic?: string | null
}

export function FeaturedWorksSection({ works }: { works: Work[] }) {
  const featuredWorks = works

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">Featured Research</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Selected high-impact publications showcasing advances in neuromorphic computing, memristor modeling, and
              energy storage systems.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredWorks.map((work, index) => (
              <FadeIn key={index}>
                <GlassCard className="p-6 space-y-4 group">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-balance leading-tight group-hover:text-accent transition-colors">
                        {work.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 ml-2" />
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span className="font-medium text-accent">{work.venue}</span>
                      <span>•</span>
                      <span>{work.year}</span>
                      {work.impactFactor && (
                        <>
                          <span>•</span>
                          <span className="text-accent font-medium">IF: {work.impactFactor}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-muted-foreground">Citations:</span>
                      <span className="font-medium text-accent">{work.citations}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {work.topic && (
                        <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md">
                          {work.topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-accent hover:text-foreground hover:bg-white/5"
                      asChild
                    >
                      <a href={work.pdfUrl || `https://doi.org/${work.doi}`} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-3 w-3" />
                        Read Paper
                      </a>
                    </Button>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </StaggerContainer>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="glow-hover bg-transparent">
              <Link href="/publications">
                View All Publications
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
