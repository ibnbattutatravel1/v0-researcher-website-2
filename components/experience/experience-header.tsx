import { FadeIn } from "@/components/motion"

export function ExperienceHeader({ yearsIndustry, phdGPA, coursesTaught }: { yearsIndustry: string; phdGPA: string; coursesTaught: string }) {
  return (
    <FadeIn>
      <div className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-display text-gradient-accent">Experience</h1>
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-accent via-accent/70 to-transparent glow-cyan" />
          <p className="text-subtitle text-muted-foreground content-max-width text-pretty">
            My journey in AI hardware research spans academic institutions and industry leaders, focusing on
            neuromorphic computing, hardware acceleration, and brain-inspired systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-primary rounded-xl p-6 text-center glow-hover hover-lift">
            <div className="text-3xl font-bold text-gradient-accent">{yearsIndustry}</div>
            <div className="text-sm text-muted-foreground">Years Industry</div>
          </div>
          <div className="glass-primary rounded-xl p-6 text-center glow-hover hover-lift">
            <div className="text-3xl font-bold text-gradient-accent">{phdGPA}</div>
            <div className="text-sm text-muted-foreground">PhD GPA</div>
          </div>
          <div className="glass-primary rounded-xl p-6 text-center glow-hover hover-lift">
            <div className="text-3xl font-bold text-gradient-accent">{coursesTaught}</div>
            <div className="text-sm text-muted-foreground">Courses Taught</div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
