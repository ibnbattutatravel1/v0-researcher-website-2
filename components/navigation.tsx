"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Research", href: "/research" },
  { name: "Publications", href: "/publications" },
  { name: "Patents", href: "/patents" },
  { name: "Awards", href: "/awards" },
  { name: "Experience", href: "/experience" },
  { name: "Talks", href: "/talks" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">Mohammed E. Fouda</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">Ph.D., SMIEEE</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" size="sm" className="glow-hover bg-transparent">
              <Link href="/cv/Mohammed_Fouda_CV.pdf" target="_blank">
                Download CV
              </Link>
            </Button>
            <Button asChild size="sm" className="glow-hover">
              <Link href="mailto:fouda@mefouda.me">Email</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
