export function AffiliationsSection() {
  const affiliations = [
    { name: "Rain AI", type: "Current" },
    { name: "UC Irvine", type: "Alumni" },
    { name: "IEEE", type: "Member" },
    { name: "KAUST", type: "Collaborator" },
    { name: "Nature", type: "Published" },
    { name: "Proceedings of IEEE", type: "Published" },
  ]

  return (
    <section className="py-16 border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-2xl font-semibold text-muted-foreground">Affiliations & Recognition</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {affiliations.map((affiliation, index) => (
              <div key={index} className="text-center space-y-2 group">
                <div className="h-12 w-full glass rounded-lg flex items-center justify-center glow-hover">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                    {affiliation.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{affiliation.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
