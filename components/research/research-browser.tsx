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
  const [filters, setFilters] = useState<{ themes: string[]; statuses: string[]; years: string[] }>({ themes: [], statuses: [], years: [] })

  // Normalize themes from JSON to string[]
  const normalized = useMemo(() => {
    return projects.map((p) => ({
      ...p,
      themes: Array.isArray(p.themes) ? (p.themes as any[]).map(String) : [],
    }))
  }, [projects])

  // Derive available filter options from real data
  const availableThemes = useMemo(() => {
    const set = new Set<string>()
    for (const p of normalized) {
      for (const t of (p as any).themes || []) set.add(String(t))
    }
    const arr = Array.from(set)
    if (arr.length === 0) {
      return [
        "Neuromorphic Hardware",
        "In-memory Computing",
        "Associative Computing",
        "AI Hardware",
        "SNN",
        "Quantization",
        "Quantum Computing",
      ]
    }
    return arr
  }, [normalized])

  const availableStatuses = useMemo(() => {
    const set = new Set<string>()
    for (const p of normalized) set.add(String((p as any).status))
    const arr = Array.from(set)
    if (arr.length === 0) {
      return ["Active", "Completed", "Ongoing", "Planned"]
    }
    return arr
  }, [normalized])

  const availableYears = useMemo(() => {
    const set = new Set<string>()
    for (const p of normalized) {
      const y = String((p as any).year || "").trim()
      if (!y) continue
      const matches = y.match(/\d{4}/g)
      if (matches && matches.length > 0) {
        for (const m of matches) set.add(m)
      } else {
        set.add(y)
      }
    }
    // Sort desc if numeric, otherwise leave as entered
    const arr = Array.from(set).sort((a, b) => Number(b) - Number(a))
    if (arr.length === 0) {
      const now = new Date().getFullYear()
      return Array.from({ length: 10 }, (_, i) => String(now - i))
    }
    return arr
  }, [normalized])

  const filtered = useMemo(() => {
    return normalized.filter((p) => {
      const themeOk = filters.themes.length === 0 || (p.themes || []).some((t: string) => filters.themes.includes(t))
      const statusOk = filters.statuses.length === 0 || filters.statuses.includes(p.status)
      const yearsOk =
        filters.years.length === 0 || filters.years.includes(p.year) || filters.years.some((y) => String(p.year).includes(y))
      return themeOk && statusOk && yearsOk
    })
  }, [normalized, filters])

  return (
    <div className="space-y-8">
      <ResearchFilters onChange={setFilters} availableThemes={availableThemes} availableStatuses={availableStatuses} availableYears={availableYears} />
      <ProjectsGrid projects={filtered as any} />
    </div>
  )
}
