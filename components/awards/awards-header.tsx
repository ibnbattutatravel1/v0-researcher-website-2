import { FadeIn } from "@/components/motion"

export function AwardsHeader() {
  return (
    <FadeIn>
      <div className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-display text-gradient-accent">Awards & Honors</h1>
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-accent via-accent/70 to-transparent glow-cyan" />
          <p className="text-subtitle text-muted-foreground content-max-width text-pretty">
            Recognition for contributions to AI hardware research, neuromorphic computing, and academic excellence
            throughout my career in both industry and academia.
          </p>
        </div>
      </div>
    </FadeIn>
  )
}
