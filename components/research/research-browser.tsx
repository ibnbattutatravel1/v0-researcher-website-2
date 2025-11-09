"use client"

import { useMemo, useState } from "react"
import { ResearchFilters } from "@/components/research/research-filters"
import { ProjectsGrid } from "@/components/research/projects-grid"

type Project = {
  title: string
  description: string
  role: string
  status: string
  year: string
  funding?: string
  collaborators?: string[]
  themes?: any
  paperUrl?: string
  codeUrl?: string
  slidesUrl?: string
}

export function ResearchBrowser({ projects }: { projects: Project[] }) {
  const [filters, setFilters] = useState<{ themes: string[]; statuses: string[] }>({ themes: [], statuses: [] })

  // Normalize themes from JSON to string[]
  const normalized = useMemo(() => {
    return projects.map((p) => ({
      ...p,
      themes: Array.isArray(p.themes) ? (p.themes as any[]).map(String) : [],
    }))
  }, [projects])

  const filtered = useMemo(() => {
    return normalized.filter((p) => {
      const themeOk = filters.themes.length === 0 || (p.themes || []).some((t: string) => filters.themes.includes(t))
      const statusOk = filters.statuses.length === 0 || filters.statuses.includes(p.status)
      return themeOk && statusOk
    })
  }, [normalized, filters])

  return (
    <div className="space-y-8">
      <ResearchFilters onChange={setFilters} />
      <ProjectsGrid projects={filtered as any} />
    </div>
  )
}
