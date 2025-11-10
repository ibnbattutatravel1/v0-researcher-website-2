"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { usePublications } from "./publications-context"

export function PublicationsFilters() {
  const { filterState, setFilterState, availableYears, availableVenues, availableTopics, availableTypes } = usePublications()

  const toggleFilter = (category: keyof typeof filterState, value: string | boolean) => {
    if (category === "featured") {
      setFilterState({ ...filterState, featured: !filterState.featured })
    } else if (category === "searchQuery") {
      setFilterState({ ...filterState, searchQuery: value as string })
    } else {
      const currentArray = filterState[category] as string[]
      const newArray = currentArray.includes(value as string)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value as string]
      setFilterState({ ...filterState, [category]: newArray })
    }
  }

  const clearAllFilters = () => {
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

  const hasActiveFilters =
    filterState.years.length > 0 ||
    filterState.venues.length > 0 ||
    filterState.topics.length > 0 ||
    filterState.types.length > 0 ||
    filterState.featured ||
    filterState.searchQuery.length > 0

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search publications by title, authors, or keywords..."
          value={filterState.searchQuery}
          onChange={(e) => toggleFilter("searchQuery", e.target.value)}
          className="pl-10 glass bg-transparent"
        />
      </div>

      {/* Filter Categories */}
      <div className="glass rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Filters</span>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              <X className="mr-1 h-3 w-3" />
              Clear All
            </Button>
          )}
        </div>

        {/* Featured Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Show Only</label>
          <div>
            <Button
              variant={filterState.featured ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter("featured", true)}
              className={filterState.featured ? "glow" : "bg-transparent"}
            >
              Featured Publications
            </Button>
          </div>
        </div>

        {/* Year Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Year</label>
          <div className="flex flex-wrap gap-2">
            {availableYears.map((year) => (
              <Button
                key={year}
                variant={filterState.years.includes(year) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("years", year)}
                className={filterState.years.includes(year) ? "glow" : "bg-transparent"}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>

        {/* Venue Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Venue</label>
          <div className="flex flex-wrap gap-2">
            {availableVenues.map((venue) => (
              <Button
                key={venue}
                variant={filterState.venues.includes(venue) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("venues", venue)}
                className={filterState.venues.includes(venue) ? "glow" : "bg-transparent"}
              >
                {venue}
              </Button>
            ))}
          </div>
        </div>

        {/* Topic Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Topic</label>
          <div className="flex flex-wrap gap-2">
            {availableTopics.map((topic) => (
              <Button
                key={topic}
                variant={filterState.topics.includes(topic) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("topics", topic)}
                className={filterState.topics.includes(topic) ? "glow" : "bg-transparent"}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Type</label>
          <div className="flex flex-wrap gap-2">
            {availableTypes.map((type) => (
              <Button
                key={type}
                variant={filterState.types.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("types", type)}
                className={filterState.types.includes(type) ? "glow" : "bg-transparent"}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filterState.searchQuery && (
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              Search: "{filterState.searchQuery}"
              <button onClick={() => toggleFilter("searchQuery", "")} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filterState.featured && (
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              Featured
              <button onClick={() => toggleFilter("featured", false)} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {[...filterState.years, ...filterState.venues, ...filterState.topics, ...filterState.types].map((filter) => (
            <Badge key={filter} variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              {filter}
              <button
                onClick={() => {
                  if (filterState.years.includes(filter)) toggleFilter("years", filter)
                  else if (filterState.venues.includes(filter)) toggleFilter("venues", filter)
                  else if (filterState.topics.includes(filter)) toggleFilter("topics", filter)
                  else if (filterState.types.includes(filter)) toggleFilter("types", filter)
                }}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
