export function PatentsHeader() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-balance">Patents</h1>
        <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
          Intellectual property portfolio covering innovations in AI hardware accelerators, neuromorphic computing
          architectures, and memory technologies. These patents represent practical implementations of research
          breakthroughs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">12</div>
          <div className="text-sm text-muted-foreground">Total Patents</div>
        </div>
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">8</div>
          <div className="text-sm text-muted-foreground">Granted</div>
        </div>
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">4</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
      </div>
    </div>
  )
}
