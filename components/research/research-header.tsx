export function ResearchHeader() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-balance">Research Projects</h1>
        <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
          My work focuses on hardware–software co-design for generative AI, neuromorphic learning rules, and efficient
          quantization. Each project bridges the gap between cutting-edge algorithms and practical hardware
          implementations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">15+</div>
          <div className="text-sm text-muted-foreground">Active Projects</div>
        </div>
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">8</div>
          <div className="text-sm text-muted-foreground">Collaborations</div>
        </div>
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">$2.5M</div>
          <div className="text-sm text-muted-foreground">Funding Secured</div>
        </div>
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">12</div>
          <div className="text-sm text-muted-foreground">Patents Filed</div>
        </div>
      </div>
    </div>
  )
}
