"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, Download, Clock, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { useScholarSync } from "@/hooks/use-scholar-sync"
import { scholarProfile, lastSyncTime, publications } from "@/data/publications"

export function SyncDashboard() {
  const { status, syncPublications, checkSyncStatus } = useScholarSync()
  const [lastSync, setLastSync] = useState<string>(lastSyncTime)

  useEffect(() => {
    checkSyncStatus()
  }, [checkSyncStatus])

  const handleSync = async () => {
    try {
      await syncPublications("1mr8HxoAAAAJ") // Dr. Fouda's Scholar ID
      setLastSync(new Date().toISOString())
    } catch (error) {
      console.error("Sync failed:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getTimeSinceSync = (dateString: string) => {
    const now = new Date()
    const syncDate = new Date(dateString)
    const diffHours = Math.floor((now.getTime() - syncDate.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) return "Less than an hour ago"
    if (diffHours < 24) return `${diffHours} hours ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} days ago`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Google Scholar Sync</h2>
          <p className="text-muted-foreground">Automatically sync publications from Google Scholar profile</p>
        </div>
        <Button onClick={handleSync} disabled={status.isLoading} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${status.isLoading ? "animate-spin" : ""}`} />
          {status.isLoading ? "Syncing..." : "Sync Now"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sync Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Sync Status
            </CardTitle>
            <CardDescription>Current synchronization status and last update</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Sync:</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{getTimeSinceSync(lastSync)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Full Date:</span>
              <span className="text-sm text-muted-foreground">{formatDate(lastSync)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto-Sync:</span>
              <Badge variant="secondary">Every 6 hours</Badge>
            </div>

            {status.error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive">{status.error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scholar Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Scholar Profile
            </CardTitle>
            <CardDescription>Current Google Scholar profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Name:</span>
              <span className="text-sm">{scholarProfile.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Affiliation:</span>
              <span className="text-sm">{scholarProfile.affiliation}</span>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{scholarProfile.totalCitations.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Citations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{scholarProfile.hIndex}</div>
                <div className="text-xs text-muted-foreground">h-index</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{scholarProfile.i10Index}</div>
                <div className="text-xs text-muted-foreground">i10-index</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Publications Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Publications Summary
          </CardTitle>
          <CardDescription>Overview of synchronized publications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{publications.length}</div>
              <div className="text-sm text-muted-foreground">Total Publications</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{publications.filter((p) => p.featured).length}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{publications.filter((p) => p.year >= 2020).length}</div>
              <div className="text-sm text-muted-foreground">Since 2020</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {publications.filter((p) => (p.impactFactor || 0) > 4).length}
              </div>
              <div className="text-sm text-muted-foreground">High Impact</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            • <strong>Automatic Sync:</strong> Publications are automatically synchronized every 6 hours via Vercel Cron
            Jobs
          </p>
          <p>
            • <strong>Manual Sync:</strong> Click "Sync Now" to immediately fetch the latest data from Google Scholar
          </p>
          <p>
            • <strong>Data Processing:</strong> Publications are automatically categorized, impact factors estimated,
            and featured papers selected
          </p>
          <p>
            • <strong>Real-time Updates:</strong> The website reflects changes immediately after successful
            synchronization
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
