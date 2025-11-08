import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Building } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/motion"

type AwardItem = {
  title: string
  organization: string
  year: string
  category: string
  amount?: string
  description: string
}

export function AwardsList({ awards }: { awards: AwardItem[] }) {
  return (
    <div className="space-y-8">
      <StaggerContainer className="card-grid">
        {awards.map((award, index) => (
          <StaggerItem key={index}>
            <HoverLift>
              <GlassCard className="glass-primary card-spacing space-y-4 glow-hover">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center glow-cyan">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-headline priority-1 leading-tight">{award.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Building className="h-3 w-3" />
                        <span>{award.organization}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{award.year}</span>
                      </div>
                    </div>
                    <p className="text-body priority-3 leading-relaxed text-pretty">{award.description}</p>
                    {award.category && (
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                          {award.category}
                        </Badge>
                        {award.amount && (
                          <Badge variant="secondary" className="text-xs">
                            {award.amount}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
