import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Users } from "lucide-react"
import { FadeIn, StaggerContainer } from "@/components/motion"

type Patent = {
  title: string
  number: string
  status: string
  filedDate: string
  grantedDate?: string
  description: string
  coInventors?: string[]
  categories: string[]
  publicUrl?: string
}

export function PatentsList({ patents }: { patents: Patent[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {patents.length} patents</p>
      </div>

      <StaggerContainer className="space-y-4">
        {patents.map((patent, index) => (
          <FadeIn key={index}>
            <GlassCard className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-balance leading-tight">{patent.title}</h3>
                      <Badge
                        variant={patent.status === "Granted" ? "default" : "secondary"}
                        className={patent.status === "Granted" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {patent.status}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Patent No: {patent.number}</span>
                      <span>•</span>
                      <span>Filed: {patent.filedDate}</span>
                      {patent.grantedDate && (
                        <>
                          <span>•</span>
                          <span>Granted: {patent.grantedDate}</span>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{patent.description}</p>

                    {patent.coInventors && patent.coInventors.length > 0 && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Co-inventors:</span>
                        <span className="text-foreground">{patent.coInventors.join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <div className="flex items-center space-x-2">
                    {patent.publicUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent hover:text-foreground hover:bg-white/5"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View Patent
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {patent.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs bg-transparent">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </StaggerContainer>
    </div>
  )
}
