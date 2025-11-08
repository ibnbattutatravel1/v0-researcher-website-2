import { publicationMetrics } from "@/data/publications"
import { GlassCard } from "@/components/ui/glass-card"
import { FadeIn, StaggerContainer } from "@/components/motion"

export function MetricsSection() {
  const metrics = [
    {
      value: `${publicationMetrics.totalPublications}+`,
      label: "Publications",
      description: "Peer-reviewed papers",
    },
    {
      value: publicationMetrics.hIndex.toString(),
      label: "h-index",
      description: "Citation impact",
    },
    {
      value: `${Math.floor(publicationMetrics.totalCitations / 1000)}K+`,
      label: "Citations",
      description: "Research influence",
    },
  ]

  return (
    <section className="py-16 border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {metrics.map((metric, index) => (
            <FadeIn key={index}>
              <GlassCard className="p-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-accent">{metric.value}</div>
                  <div className="text-lg font-semibold text-foreground">{metric.label}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
