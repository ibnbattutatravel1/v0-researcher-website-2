"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Send as Sync, Download, AlertCircle, CheckCircle, Clock } from "lucide-react"

export function ScholarSync() {
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")
  const [syncProgress, setSyncProgress] = useState(0)
  const [lastSync, setLastSync] = useState("2024-01-15 10:30 AM")

  const handleSync = async () => {
    setSyncStatus("syncing")
    setSyncProgress(0)

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setSyncStatus("success")
          setLastSync(new Date().toLocaleString())
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting publications data...")
  }

  return (
    <div className="space-y-6">
      <Card className="glass p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Google Scholar Integration</h3>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Scholar ID: 1mr8HxoAAAAJ
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">170+</div>
              <div className="text-sm text-muted-foreground">Publications</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">3,500+</div>
              <div className="text-sm text-muted-foreground">Citations</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">33</div>
              <div className="text-sm text-muted-foreground">h-index</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Sync Publications</p>
                <p className="text-sm text-muted-foreground">Last sync: {lastSync}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleSync}
                  disabled={syncStatus === "syncing"}
                  className="glow-hover"
                  variant={syncStatus === "success" ? "outline" : "default"}
                >
                  <Sync className={`mr-2 h-4 w-4 ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
                  {syncStatus === "syncing" ? "Syncing..." : "Sync Now"}
                </Button>
                <Button onClick={handleExport} variant="outline" className="glow-hover bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {syncStatus === "syncing" && (
              <div className="space-y-2">
                <Progress value={syncProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">Fetching publications from Google Scholar...</p>
              </div>
            )}

            {syncStatus === "success" && (
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>Successfully synced publications</span>
              </div>
            )}

            {syncStatus === "error" && (
              <div className="flex items-center space-x-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>Failed to sync publications. Please try again.</span>
              </div>
            )}
          </div>

          <div className="border-t border-border/40 pt-4">
            <h4 className="font-medium mb-3">Sync Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-sync</p>
                  <p className="text-xs text-muted-foreground">Automatically sync publications daily</p>
                </div>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Update metrics</p>
                  <p className="text-xs text-muted-foreground">Update citation counts and h-index</p>
                </div>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Notification</p>
                  <p className="text-xs text-muted-foreground">Email notifications for new citations</p>
                </div>
                <Badge variant="outline">Disabled</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="glass p-6">
        <h4 className="font-medium mb-4">Recent Sync Activity</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm">Publications synced successfully</p>
              <p className="text-xs text-muted-foreground">January 15, 2024 at 10:30 AM</p>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              Success
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm">Citation metrics updated</p>
              <p className="text-xs text-muted-foreground">January 14, 2024 at 6:00 AM</p>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              Success
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm">New publication detected</p>
              <p className="text-xs text-muted-foreground">January 12, 2024 at 2:15 PM</p>
            </div>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              New
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}
