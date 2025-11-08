import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PatentsHeader } from "@/components/patents/patents-header"
import { PatentsList } from "@/components/patents/patents-list"

export const metadata = {
  title: "Patents - Mohammed E. Fouda",
  description: "Intellectual property portfolio in AI hardware, neuromorphic computing, and memory technologies.",
}

export default function PatentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PatentsHeader />
          <div className="mt-12">
            <PatentsList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
