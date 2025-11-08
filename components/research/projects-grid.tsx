import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Github, Play } from "lucide-react"
import { researchProjects } from "@/data/research-projects"

export function ProjectsGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {researchProjects.length} research projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {researchProjects.map((project, index) => (
          <Card key={index} className="glass glow-hover p-6 space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-semibold text-balance leading-tight group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-pretty">{project.description}</p>
                </div>
                <Badge
                  variant={project.status === "Active" ? "default" : "secondary"}
                  className={project.status === "Active" ? "bg-accent text-accent-foreground" : ""}
                >
                  {project.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Role:</span>{" "}
                  <span className="text-foreground font-medium">{project.role}</span>
                </div>
                {project.funding && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Funding:</span>{" "}
                    <span className="text-foreground font-medium">{project.funding}</span>
                  </div>
                )}
                {project.collaborators && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Collaborators:</span>{" "}
                    <span className="text-foreground">{project.collaborators.join(", ")}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {project.themes.map((theme) => (
                  <Badge key={theme} variant="outline" className="text-xs bg-transparent">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <div className="flex items-center space-x-2">
                {project.paperUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent-foreground hover:bg-accent/10"
                  >
                    <FileText className="mr-1 h-3 w-3" />
                    Paper
                  </Button>
                )}
                {project.codeUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent-foreground hover:bg-accent/10"
                  >
                    <Github className="mr-1 h-3 w-3" />
                    Code
                  </Button>
                )}
                {project.slidesUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent-foreground hover:bg-accent/10"
                  >
                    <Play className="mr-1 h-3 w-3" />
                    Slides
                  </Button>
                )}
              </div>

              <div className="text-xs text-muted-foreground">{project.year}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
