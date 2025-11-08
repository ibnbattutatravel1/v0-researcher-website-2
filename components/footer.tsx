import Link from "next/link"
import { Linkedin, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mohammed E. Fouda</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Applied Research Lead at Rain AI, specializing in AI hardware accelerators and brain-inspired computing
              systems.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/publications"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Publications
              </Link>
              <Link
                href="/research"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Research Projects
              </Link>
              <Link
                href="/experience"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Experience
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://scholar.google.com/citations?user=1mr8HxoAAAAJ"
                target="_blank"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Google Scholar"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/mefouda"
                target="_blank"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://orcid.org/0000-0001-7139-3428"
                target="_blank"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="ORCID"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs text-muted-foreground">ORCID: 0000-0001-7139-3428</p>
              <p className="text-xs text-muted-foreground">
                <Link href="mailto:fouda@mefouda.me" className="hover:text-accent transition-colors">
                  fouda@mefouda.me
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mohammed E. Fouda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
