"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicationsManager } from "./publications-manager"
import { ResearchManager } from "./research-manager"
import { ScholarSync } from "./scholar-sync"
import { ContentStats } from "./content-stats"
import { SiteSettings } from "./site-settings"
import { FileText, Beaker, Send as Sync, BarChart3 } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <ContentStats />

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 glass">
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="publications" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Publications</span>
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center space-x-2">
            <Beaker className="h-4 w-4" />
            <span>Research</span>
          </TabsTrigger>
          <TabsTrigger value="sync" className="flex items-center space-x-2">
            <Sync className="h-4 w-4" />
            <span>Scholar Sync</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <SiteSettings />
        </TabsContent>

        <TabsContent value="publications">
          <PublicationsManager />
        </TabsContent>

        <TabsContent value="research">
          <ResearchManager />
        </TabsContent>

        <TabsContent value="sync">
          <ScholarSync />
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="glass p-6">
            <h3 className="text-lg font-semibold mb-4">Website Analytics</h3>
            <p className="text-muted-foreground">Analytics integration coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
