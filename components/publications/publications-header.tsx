import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Settings } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/motion"

export function PublicationsHeader() {
  return (
    <FadeIn>
      <div className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-display text-gradient-accent">Publications</h1>
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-accent via-accent/70 to-transparent glow-cyan" />
          <p className="text-subtitle text-muted-foreground content-max-width text-pretty">
            Research contributions in AI hardware accelerators, neuromorphic computing, quantization techniques, and
            hardware-software co-design. Publications are automatically synced from Google Scholar.
          </p>
        </div>

        <div className="cluster-layout">
          <Button asChild variant="outline" className="glass-secondary glow-hover">
            <Link href="https://scholar.google.com/citations?user=1mr8HxoAAAAJ" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Google Scholar Profile
            </Link>
          </Button>
          <Button asChild variant="outline" className="glass-secondary glow-hover">
            <Link href="/api/publications/export" target="_blank">
              <Download className="mr-2 h-4 w-4" />
              Export All BibTeX
            </Link>
          </Button>
          <Button asChild variant="outline" className="glass-secondary glow-hover">
            <Link href="/admin/sync">
              <Settings className="mr-2 h-4 w-4" />
              Sync Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </FadeIn>
  )
}
