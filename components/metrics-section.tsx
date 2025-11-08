import { Card } from "@/components/ui/card"
import { publicationMetrics } from "@/data/publications"

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="glass glow-hover p-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-accent">{metric.value}</div>
                <div className="text-lg font-semibold text-foreground">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
