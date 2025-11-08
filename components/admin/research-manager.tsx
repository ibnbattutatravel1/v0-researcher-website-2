"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { researchProjects } from "@/data/research-projects"
import { Edit, Trash2, Plus } from "lucide-react"

export function ResearchManager() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = researchProjects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card className="glass p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Research Projects Management</h3>
          <Button className="glow-hover">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Search research projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass bg-transparent"
          />

          <div className="space-y-3">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="glass p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <h4 className="font-medium text-balance">{project.title}</h4>
                    <p className="text-sm text-muted-foreground text-pretty">{project.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={project.status === "Active" ? "default" : "secondary"}
                        className={project.status === "Active" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {project.status}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {project.year}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {project.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.themes.map((theme) => (
                    <Badge key={theme} variant="outline" className="text-xs bg-transparent">
                      {theme}
                    </Badge>
                  ))}
                </div>

                {project.funding && <div className="text-xs text-muted-foreground">Funding: {project.funding}</div>}
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
