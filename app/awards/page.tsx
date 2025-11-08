import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AwardsHeader } from "@/components/awards/awards-header"
import { AwardsList } from "@/components/awards/awards-list"

export const metadata = {
  title: "Awards & Honors - Mohammed E. Fouda",
  description: "Recognition for contributions to AI hardware research and neuromorphic computing.",
}

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AwardsHeader />
          <div className="mt-12">
            <AwardsList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
