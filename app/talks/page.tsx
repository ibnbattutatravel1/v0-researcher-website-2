import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TalksHeader } from "@/components/talks/talks-header"
import { TalksList } from "@/components/talks/talks-list"

export const metadata = {
  title: "Talks & Media - Mohammed E. Fouda",
  description: "Invited talks, tutorials, and media appearances on AI hardware and neuromorphic computing.",
}

export default function TalksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TalksHeader />
          <div className="mt-12">
            <TalksList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
