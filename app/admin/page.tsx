import { Navigation } from "@/components/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Suspense } from "react"

export const metadata = {
  title: "Admin Dashboard - Mohammed E. Fouda",
  description: "Content management interface for publications, research projects, and website data.",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Manage publications, research projects, and website content.
              </p>
            </div>
            <Suspense fallback={<div className="text-center py-12">Loading dashboard...</div>}>
              <AdminDashboard />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
