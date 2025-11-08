"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Building, GraduationCap, Calendar } from "lucide-react"
import { experiences } from "@/data/experiences"
import { FadeIn, StaggerContainer } from "@/components/motion"

export function ExperienceTimeline() {
  const industryExperiences = experiences.filter((exp) => exp.type === "industry")
  const academicExperiences = experiences.filter((exp) => exp.type === "academic")

  const TimelineSection = ({ title, experiences, icon: Icon }: any) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-accent" />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <StaggerContainer className="space-y-4">
        {experiences.map((exp: any, index: number) => (
          <FadeIn key={index}>
            <GlassCard className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold">{exp.position}</h3>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span className="font-medium text-accent">{exp.organization}</span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{exp.duration}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                {exp.type === "industry" ? "Industry" : "Academic"}
              </Badge>
            </div>

            <p className="text-muted-foreground leading-relaxed text-pretty">{exp.description}</p>

            {exp.achievements && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Key Achievements:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {exp.achievements.map((achievement: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exp.skills && (
              <div className="flex flex-wrap gap-1">
                {exp.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
            </GlassCard>
          </FadeIn>
        ))}
      </StaggerContainer>
    </div>
  )

  return (
    <div className="space-y-12">
      <TimelineSection title="Industry Experience" experiences={industryExperiences} icon={Building} />
      <TimelineSection title="Academic & Teaching" experiences={academicExperiences} icon={GraduationCap} />
    </div>
  )
}
