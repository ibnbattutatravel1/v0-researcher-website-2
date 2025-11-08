import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SyncDashboard } from "@/components/admin/sync-dashboard"

export const metadata = {
  title: "Sync Dashboard - Mohammed E. Fouda",
  description: "Google Scholar synchronization dashboard for publications management.",
}

export default function SyncDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SyncDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
