"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

export function ContentStats() {
  const [stats, setStats] = useState<
    { label: string; value: number; featured: number; featuredLabel?: string }[]
  >([
    { label: "Publications", value: 0, featured: 0 },
    { label: "Research Projects", value: 0, featured: 0, featuredLabel: "active" },
    { label: "Patents", value: 0, featured: 0 },
    { label: "Awards", value: 0, featured: 0 },
  ])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [pubRes, resRes, patRes, awdRes] = await Promise.all([
          fetch("/api/publications", { cache: "no-store" }),
          fetch("/api/research", { cache: "no-store" }),
          fetch("/api/patents", { cache: "no-store" }),
          fetch("/api/awards", { cache: "no-store" }),
        ])
        const [pubs, research, pats, awds] = await Promise.all([
          pubRes.ok ? pubRes.json() : Promise.resolve([]),
          resRes.ok ? resRes.json() : Promise.resolve([]),
          patRes.ok ? patRes.json() : Promise.resolve([]),
          awdRes.ok ? awdRes.json() : Promise.resolve([]),
        ])

        if (!mounted) return

        const currentYear = String(new Date().getFullYear())
        const nextStats = [
          {
            label: "Publications",
            value: Array.isArray(pubs) ? pubs.length : 0,
            featured: Array.isArray(pubs) ? pubs.filter((p: any) => !!p.featured).length : 0,
          },
          {
            label: "Research Projects",
            value: Array.isArray(research) ? research.length : 0,
            featured: Array.isArray(research)
              ? research.filter((p: any) => String(p.status).toLowerCase() === "active").length
              : 0,
            featuredLabel: "active",
          },
          {
            label: "Patents",
            value: Array.isArray(pats) ? pats.length : 0,
            featured: Array.isArray(pats)
              ? pats.filter((p: any) => String(p.status).toLowerCase().includes("grant")).length
              : 0,
          },
          {
            label: "Awards",
            value: Array.isArray(awds) ? awds.length : 0,
            featured: Array.isArray(awds)
              ? awds.filter((a: any) => (String(a.year || "").match(/\d{4}/)?.[0] ?? "") === currentYear).length
              : 0,
          },
        ]
        setStats(nextStats)
      } catch {
        // keep defaults on error
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass p-4 text-center glow-hover">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-accent">{stat.value}</div>
            <div className="text-sm font-medium text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground">
              {stat.featured} {stat.featuredLabel ?? (stat.label === "Research Projects" ? "active" : "featured")}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
