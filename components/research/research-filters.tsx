"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

export function ResearchFilters({
  onChange,
  availableThemes = [],
  availableStatuses = [],
  availableYears = [],
}: {
  onChange?: (filters: { themes: string[]; statuses: string[]; years: string[] }) => void
  availableThemes: string[]
  availableStatuses: string[]
  availableYears?: string[]
}) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) => (prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]))
  }

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const clearAllFilters = () => {
    setSelectedThemes([])
    setSelectedStatuses([])
    setSelectedYears([])
    onChange?.({ themes: [], statuses: [], years: [] })
  }

  const hasActiveFilters = selectedThemes.length > 0 || selectedStatuses.length > 0 || selectedYears.length > 0

  // Notify parent after state updates, not during render/event setState callbacks
  useEffect(() => {
    onChange?.({ themes: selectedThemes, statuses: selectedStatuses, years: selectedYears })
  }, [selectedThemes, selectedStatuses, selectedYears, onChange])

  return (
    <div className="space-y-6">
      <div className="glass rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Filter by Research Theme</span>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              <X className="mr-1 h-3 w-3" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Research Themes</label>
            <div className="flex flex-wrap gap-2">
              {availableThemes.map((theme) => (
                <Button
                  key={theme}
                  variant={selectedThemes.includes(theme) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTheme(theme)}
                  className={selectedThemes.includes(theme) ? "glow" : "bg-transparent"}
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Project Status</label>
            <div className="flex flex-wrap gap-2">
              {availableStatuses.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatuses.includes(status) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleStatus(status)}
                  className={selectedStatuses.includes(status) ? "glow" : "bg-transparent"}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Year</label>
            <div className="flex flex-wrap gap-2">
              {availableYears.map((year) => (
                <Button
                  key={year}
                  variant={selectedYears.includes(year) ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSelectedYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
                  }
                  className={selectedYears.includes(year) ? "glow" : "bg-transparent"}
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {[...selectedThemes, ...selectedStatuses, ...selectedYears].map((filter) => (
            <Badge key={filter} variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              {filter}
              <button
                onClick={() => {
                  if (availableThemes.includes(filter)) toggleTheme(filter)
                  else if (availableStatuses.includes(filter)) toggleStatus(filter)
                  else if (availableYears.includes(filter))
                    setSelectedYears((prev) => prev.filter((y) => y !== filter))
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
