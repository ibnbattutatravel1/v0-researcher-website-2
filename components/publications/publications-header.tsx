import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Settings } from "lucide-react"
import Link from "next/link"

export function PublicationsHeader() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-balance">Publications</h1>
        <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
          Research contributions in AI hardware accelerators, neuromorphic computing, quantization techniques, and
          hardware-software co-design. Publications are automatically synced from Google Scholar.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline" className="glow-hover bg-transparent">
          <Link href="https://scholar.google.com/citations?user=1mr8HxoAAAAJ" target="_blank">
            <ExternalLink className="mr-2 h-4 w-4" />
            Google Scholar Profile
          </Link>
        </Button>
        <Button asChild variant="outline" className="glow-hover bg-transparent">
          <Link href="/api/publications/export" target="_blank">
            <Download className="mr-2 h-4 w-4" />
            Export All BibTeX
          </Link>
        </Button>
        <Button asChild variant="outline" className="glow-hover bg-transparent">
          <Link href="/admin/sync">
            <Settings className="mr-2 h-4 w-4" />
            Sync Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
