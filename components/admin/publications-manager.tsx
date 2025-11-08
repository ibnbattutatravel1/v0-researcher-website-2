"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { publications } from "@/data/publications"
import { Edit, Trash2, Plus, Star, ExternalLink } from "lucide-react"

export function PublicationsManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const filteredPublications = publications.filter((pub) => pub.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <Card className="glass p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Publications Management</h3>
          <Button className="glow-hover">
            <Plus className="mr-2 h-4 w-4" />
            Add Publication
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass bg-transparent"
          />

          <div className="space-y-3">
            {filteredPublications.map((publication, index) => (
              <Card key={index} className="glass p-4 space-y-3">
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
                      {publication.citedBy && (
                        <Badge variant="secondary" className="text-xs">
                          {publication.citedBy} citations
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`featured-${index}`} className="text-xs">
                        Featured
                      </Label>
                      <Switch id={`featured-${index}`} checked={publication.featured} size="sm" />
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
        </div>
      </Card>
    </div>
  )
}
