import { Card } from "@/components/ui/card"
import { publications } from "@/data/publications"
import { researchProjects } from "@/data/research-projects"
import { patents } from "@/data/patents"
import { awards } from "@/data/awards"

export function ContentStats() {
  const stats = [
    {
      label: "Publications",
      value: publications.length,
      featured: publications.filter((p) => p.featured).length,
    },
    {
      label: "Research Projects",
      value: researchProjects.length,
      featured: researchProjects.filter((p) => p.status === "Active").length,
    },
    {
      label: "Patents",
      value: patents.length,
      featured: patents.filter((p) => p.status === "Granted").length,
    },
    {
      label: "Awards",
      value: awards.length,
      featured: awards.filter((a) => a.year === "2024").length,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass p-4 text-center glow-hover">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-accent">{stat.value}</div>
            <div className="text-sm font-medium text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground">
              {stat.featured} {stat.label === "Research Projects" ? "active" : "featured"}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
