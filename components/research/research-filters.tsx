"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

const themes = [
  "Neuromorphic Hardware",
  "In-memory Computing",
  "Associative Computing",
  "Quantization",
  "SNN",
  "Quantum Computing",
  "EDA-adjacent",
]

const statuses = ["Active", "Completed", "Ongoing", "Planned"]

export function ResearchFilters() {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) => (prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]))
  }

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const clearAllFilters = () => {
    setSelectedThemes([])
    setSelectedStatuses([])
  }

  const hasActiveFilters = selectedThemes.length > 0 || selectedStatuses.length > 0

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
              {themes.map((theme) => (
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
              {statuses.map((status) => (
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
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {[...selectedThemes, ...selectedStatuses].map((filter) => (
            <Badge key={filter} variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              {filter}
              <button
                onClick={() => {
                  if (themes.includes(filter)) toggleTheme(filter)
                  else if (statuses.includes(filter)) toggleStatus(filter)
                }}
                className="ml-1 hover:text-accent-foreground"
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
