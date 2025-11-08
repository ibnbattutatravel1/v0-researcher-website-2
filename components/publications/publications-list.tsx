"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileText, Star, Quote, ChevronDown, Loader2 } from "lucide-react"
import { usePublications } from "./publications-context"

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
    <div className="space-y-6">
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
            className="mt-4 bg-transparent"
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
        <div className="space-y-4">
          {displayedPublications.map((publication, index) => (
            <Card key={index} className="glass glow-hover p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      {publication.featured && (
                        <Star className="h-4 w-4 text-accent fill-current" aria-label="Featured publication" />
                      )}
                      <h3 className="text-lg font-semibold text-balance leading-tight">{publication.title}</h3>
                    </div>

                    <p className="text-sm text-muted-foreground">{publication.authors.join(", ")}</p>

                    <div className="flex items-center space-x-2 text-sm">
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        {publication.venue}
                      </Badge>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{publication.year}</span>
                      {publication.citedBy && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Cited by {publication.citedBy}</span>
                        </>
                      )}
                    </div>

                    {publication.topics && (
                      <div className="flex flex-wrap gap-1">
                        {publication.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {publication.award && (
                      <Badge variant="default" className="bg-accent text-accent-foreground">
                        {publication.award}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    {publication.pdfUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent hover:text-accent-foreground hover:bg-accent/10"
                      >
                        <FileText className="mr-1 h-3 w-3" />
                        PDF
                      </Button>
                    )}
                    {publication.doi && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent hover:text-accent-foreground hover:bg-accent/10"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        DOI
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyBibTeX(publication.bibtex)}
                      className="text-muted-foreground hover:text-accent"
                    >
                      <Quote className="mr-1 h-3 w-3" />
                      BibTeX
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {publication.type} • Impact Factor: {publication.impactFactor || "N/A"}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredPublications.length > 0 && hasMore && (
        <div className="text-center py-8">
          <Button variant="outline" className="glow-hover bg-transparent" onClick={loadMore} disabled={isLoading}>
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
