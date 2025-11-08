import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Building } from "lucide-react"
import { awards } from "@/data/awards"
import { FadeIn, StaggerContainer } from "@/components/motion"

export function AwardsList() {
  return (
    <div className="space-y-6">
      <StaggerContainer className="grid grid-cols-1 gap-6">
        {awards.map((award, index) => (
          <FadeIn key={index}>
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-balance leading-tight">{award.title}</h3>
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
                  <p className="text-muted-foreground leading-relaxed text-pretty">{award.description}</p>
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
          </FadeIn>
        ))}
      </StaggerContainer>
    </div>
  )
}
