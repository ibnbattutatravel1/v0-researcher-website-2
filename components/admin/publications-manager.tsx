"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, Plus, Star, ExternalLink, Send as Sync } from "lucide-react"

type Publication = {
  id: number
  title: string
  authors: string[]
  venue: string
  year: number
  type: string
  topic: string
  citations: number
  impactFactor?: number | null
  featured: boolean
  url?: string | null
  abstract?: string | null
  doi?: string | null
  pdfUrl?: string | null
  bibtex?: string | null
}

export function PublicationsManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/publications", { cache: "no-store" })
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filteredPublications = useMemo(
    () => items.filter((pub) => pub.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery],
  )

  const syncNow = async () => {
    setSyncing(true)
    try {
      await fetch("/api/sync-scholar-db", { method: "POST", headers: { "Content-Type": "application/json" } })
      await load()
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="glass p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Publications Management</h3>
          <div className="flex items-center gap-2">
            <Button className="glow-hover" variant="outline" onClick={syncNow} disabled={syncing}>
              <Sync className={`mr-2 h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing..." : "Sync from Scholar"}
            </Button>
            <Button className="glow-hover">
              <Plus className="mr-2 h-4 w-4" />
              Add Publication
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass bg-transparent"
          />

          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : (
            <div className="space-y-3">
              {filteredPublications.map((publication) => (
                <Card key={publication.id} className="glass p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        {publication.featured && <Star className="h-4 w-4 text-accent fill-current" />}
                        <h4 className="font-medium text-balance">{publication.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{publication.authors.join(", ")}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {publication.venue}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {publication.year}
                        </Badge>
                        {publication.citations && (
                          <Badge variant="secondary" className="text-xs">
                            {publication.citations} citations
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`featured-${publication.id}`} className="text-xs">
                          Featured
                        </Label>
                        <Switch id={`featured-${publication.id}`} checked={publication.featured} size="sm" />
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>Type: {publication.type}</span>
                      {publication.impactFactor && <span>IF: {publication.impactFactor}</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                      {publication.doi && (
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
