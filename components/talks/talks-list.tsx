import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, Calendar, MapPin } from "lucide-react"
import { talks } from "@/data/talks"

export function TalksList() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {talks.map((talk, index) => (
          <Card key={index} className="glass glow-hover p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-semibold text-balance leading-tight">{talk.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{talk.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{talk.venue}</span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={talk.type === "Keynote" ? "default" : "secondary"}
                  className={talk.type === "Keynote" ? "bg-accent text-accent-foreground" : ""}
                >
                  {talk.type}
                </Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed text-pretty">{talk.description}</p>

              {talk.topics && (
                <div className="flex flex-wrap gap-1">
                  {talk.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs bg-transparent">
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <div className="flex items-center space-x-2">
                {talk.videoUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent-foreground hover:bg-accent/10"
                  >
                    <Play className="mr-1 h-3 w-3" />
                    Watch
                  </Button>
                )}
                {talk.slidesUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent-foreground hover:bg-accent/10"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Slides
                  </Button>
                )}
              </div>

              <div className="text-xs text-muted-foreground">{talk.audience}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
