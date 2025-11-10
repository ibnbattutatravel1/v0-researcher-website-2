"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileText, Star, Quote, ChevronDown, Loader2 } from "lucide-react"
import { usePublications } from "./publications-context"
import { HoverLift } from "@/components/motion"

export function PublicationsList() {
  const {
    filteredPublications,
    displayedPublications,
    totalCount,
    filterState,
    setFilterState,
    hasMore,
    isLoading,
    loadMore,
  } = usePublications()

  const copyBibTeX = (bibtex: string) => {
    navigator.clipboard.writeText(bibtex)
    // TODO: Add toast notification
  }

  const handleSortChange = () => {
    const sortOptions = ["latest", "oldest", "citations", "title"] as const
    const currentIndex = sortOptions.indexOf(filterState.sortBy)
    const nextIndex = (currentIndex + 1) % sortOptions.length
    setFilterState({ ...filterState, sortBy: sortOptions[nextIndex] })
  }

  const getSortLabel = () => {
    switch (filterState.sortBy) {
      case "latest":
        return "Latest First"
      case "oldest":
        return "Oldest First"
      case "citations":
        return "Most Cited"
      case "title":
        return "Title A-Z"
      default:
        return "Latest First"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {displayedPublications.length} of {filteredPublications.length} publications ({totalCount} total) •
          Last updated from Google Scholar
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSortChange}
          className="text-muted-foreground hover:text-foreground"
        >
          Sort by: {getSortLabel()}
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </div>

      {filteredPublications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No publications match your current filters.</p>
          <Button
            variant="outline"
            className="mt-4 glass-secondary"
            onClick={() =>
              setFilterState({
                searchQuery: "",
                years: [],
                venues: [],
                topics: [],
                types: [],
                featured: false,
                sortBy: "latest",
              })
            }
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="card-grid">
          {displayedPublications.map((publication) => (
            <div key={publication.id ?? `${publication.title}-${publication.year}`}>
              <HoverLift>
                <GlassCard className="glass-primary card-spacing space-y-4 glow-hover">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          {publication.featured && (
                            <Star className="h-4 w-4 text-accent fill-current" aria-label="Featured publication" />
                          )}
                          <h3 className="text-xl sm:text-2xl font-semibold leading-snug">{publication.title}</h3>
                        </div>

                        <p className="text-sm text-muted-foreground">{publication.authors.join(", ")}</p>

                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 text-[11px] sm:text-xs">
                            {publication.venue}
                          </Badge>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{publication.year}</span>
                          {publication.citations && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">Cited by {publication.citations}</span>
                            </>
                          )}
                        </div>

                        {publication.topic && (
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary" className="text-xs">{publication.topic}</Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-body priority-3 leading-relaxed text-pretty">{publication.abstract}</p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        {publication.pdfUrl && (
                          <Button asChild variant="ghost" size="sm" className="glass-secondary text-accent hover:text-foreground">
                            <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                              <FileText className="mr-1 h-3 w-3" />
                              PDF
                            </a>
                          </Button>
                        )}
                        {publication.doi && (
                          <Button asChild variant="ghost" size="sm" className="glass-secondary text-accent hover:text-foreground">
                            <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              DOI
                            </a>
                          </Button>
                        )}
                        {publication.url && (
                          <Button asChild variant="ghost" size="sm" className="glass-secondary text-accent hover:text-foreground">
                            <a href={publication.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              Link
                            </a>
                          </Button>
                        )}
                        {publication.bibtex && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyBibTeX(publication.bibtex!)}
                            className="glass-secondary text-muted-foreground hover:text-accent"
                          >
                            <Quote className="mr-1 h-3 w-3" />
                            BibTeX
                          </Button>
                        )}
                      </div>

                      <div className="text-[11px] sm:text-xs text-muted-foreground">
                        {publication.type}
                        {publication.impactFactor != null && (
                          <>
                            <span className="mx-1 text-muted-foreground">•</span>
                            <span>Impact Factor: {Number(publication.impactFactor).toFixed(2)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </HoverLift>
            </div>
          ))}
        </div>
      )}

      {filteredPublications.length > 0 && hasMore && (
        <div className="text-center py-8">
          <Button variant="outline" className="glass-secondary glow-hover" onClick={loadMore} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Publications"
            )}
          </Button>
        </div>
      )}

      {filteredPublications.length > 0 && !hasMore && displayedPublications.length > 10 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">All {filteredPublications.length} publications loaded</p>
        </div>
      )}
    </div>
  )
}
