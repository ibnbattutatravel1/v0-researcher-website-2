export function ExperienceHeader() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-balance">Experience & CV</h1>
        <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
          Professional journey spanning industry research, academic positions, and teaching roles in AI hardware,
          neuromorphic computing, and electrical engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">5+</div>
          <div className="text-sm text-muted-foreground">Years Industry</div>
        </div>
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">4.0</div>
          <div className="text-sm text-muted-foreground">PhD GPA</div>
        </div>
        <div className="glass rounded-lg p-4 text-center glow-hover">
          <div className="text-2xl font-bold text-accent">15+</div>
          <div className="text-sm text-muted-foreground">Courses Taught</div>
        </div>
      </div>
    </div>
  )
}
