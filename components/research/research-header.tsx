import { FadeIn } from "@/components/motion"

export function ResearchHeader() {
  return (
    <FadeIn>
      <div className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-display text-gradient-accent">Research Projects</h1>
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-accent via-accent/70 to-transparent glow-cyan" />
          <p className="text-subtitle text-muted-foreground content-max-width text-pretty">
            My work focuses on hardware–software co-design for generative AI, neuromorphic learning rules, and efficient
            quantization. Each project bridges the gap between cutting-edge algorithms and practical hardware
            implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-primary rounded-xl p-6 text-center glow-hover hover-lift">
            <div className="text-3xl font-bold text-gradient-accent">15+</div>
            <div className="text-sm text-muted-foreground">Active Projects</div>
          </div>
          <div className="glass-primary rounded-xl p-6 text-center glow-hover hover-lift">
            <div className="text-3xl font-bold text-gradient-accent">8</div>
            <div className="text-sm text-muted-foreground">Collaborations</div>
          </div>
          <div className="glass-primary rounded-xl p-6 text-center glow-hover hover-lift">
            <div className="text-3xl font-bold text-gradient-accent">$2.5M</div>
            <div className="text-sm text-muted-foreground">Funding Raised</div>
          </div>
          <div className="glass-primary rounded-xl p-6 text-center glow-hover hover-lift">
            <div className="text-3xl font-bold text-gradient-accent">12</div>
            <div className="text-sm text-muted-foreground">Patents Filed</div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
