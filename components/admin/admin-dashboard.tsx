"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicationsManager } from "./publications-manager"
import { ResearchManager } from "./research-manager"
import { ScholarSync } from "./scholar-sync"
import { ContentStats } from "./content-stats"
import { SiteSettings } from "./site-settings"
import { PatentsManager } from "./patents-manager"
import { AwardsManager } from "./awards-manager"
import { ExperienceManager } from "./experience-manager"
import { TalksManager } from "./talks-manager"
import { ContactInbox } from "./contact-inbox"
import { FileText, Beaker, Send as Sync, BarChart3 } from "lucide-react"

export function AdminDashboard() {
  const showAdvancedTabs = false
  return (
    <div className="space-y-8">
      <ContentStats />

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="glass w-full overflow-x-auto flex gap-2 md:grid md:grid-cols-10">
          <TabsTrigger value="settings" className="flex items-center space-x-2 shrink-0">
            <BarChart3 className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="publications" className="flex items-center space-x-2 shrink-0">
            <FileText className="h-4 w-4" />
            <span>Publications</span>
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center space-x-2 shrink-0">
            <Beaker className="h-4 w-4" />
            <span>Research</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center space-x-2 shrink-0">
            <FileText className="h-4 w-4" />
            <span>Experience</span>
          </TabsTrigger>
          <TabsTrigger value="patents" className="flex items-center space-x-2 shrink-0">
            <FileText className="h-4 w-4" />
            <span>Patents</span>
          </TabsTrigger>
          <TabsTrigger value="awards" className="flex items-center space-x-2 shrink-0">
            <FileText className="h-4 w-4" />
            <span>Awards</span>
          </TabsTrigger>
          <TabsTrigger value="talks" className="flex items-center space-x-2 shrink-0">
            <FileText className="h-4 w-4" />
            <span>Talks</span>
          </TabsTrigger>
          <TabsTrigger value="inbox" className="flex items-center space-x-2 shrink-0">
            <FileText className="h-4 w-4" />
            <span>Contact Inbox</span>
          </TabsTrigger>
          {showAdvancedTabs && (
            <TabsTrigger value="sync" className="flex items-center space-x-2 shrink-0">
              <Sync className="h-4 w-4" />
              <span>Scholar Sync</span>
            </TabsTrigger>
          )}
          {showAdvancedTabs && (
            <TabsTrigger value="analytics" className="flex items-center space-x-2 shrink-0">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          )}
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

        <TabsContent value="experience">
          <ExperienceManager />
        </TabsContent>

        <TabsContent value="patents">
          <PatentsManager />
        </TabsContent>

        <TabsContent value="awards">
          <AwardsManager />
        </TabsContent>

        <TabsContent value="talks">
          <TalksManager />
        </TabsContent>

        <TabsContent value="inbox">
          <ContactInbox />
        </TabsContent>

        {showAdvancedTabs && (
          <TabsContent value="sync">
            <ScholarSync />
          </TabsContent>
        )}

        {showAdvancedTabs && (
          <TabsContent value="analytics">
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold mb-4">Website Analytics</h3>
              <p className="text-muted-foreground">Analytics integration coming soon...</p>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
