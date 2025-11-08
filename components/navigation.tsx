"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { HoverLift, GlowOnHover } from "@/components/motion"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"

type NavProps = {
  cvUrl?: string
  contactEmail?: string
  showResearch?: boolean
  showPatents?: boolean
  showAwards?: boolean
  showExperience?: boolean
  showTalks?: boolean
  showContact?: boolean
}

export function Navigation({
  cvUrl = "/cv/Mohammed_Fouda_CV.pdf",
  contactEmail = "fouda@mefouda.me",
  showResearch = true,
  showPatents = true,
  showAwards = true,
  showExperience = true,
  showTalks = true,
  showContact = true,
}: NavProps) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const navigation = React.useMemo(
    () => [
      { name: "Home", href: "/", show: true },
      { name: "Research", href: "/research", show: showResearch },
      { name: "Publications", href: "/publications", show: true },
      { name: "Patents", href: "/patents", show: showPatents },
      { name: "Awards", href: "/awards", show: showAwards },
      { name: "Experience", href: "/experience", show: showExperience },
      { name: "Talks", href: "/talks", show: showTalks },
      { name: "Contact", href: "/contact", show: showContact },
    ].filter((i) => i.show),
    [showResearch, showPatents, showAwards, showExperience, showTalks, showContact],
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-strong">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <GlowOnHover>
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-gradient-to-br from-accent/20 to-transparent overflow-hidden">
                <span className="absolute inset-0 blur-md opacity-30" style={{ boxShadow: "0 0 24px 8px rgba(66,232,224,0.35)" }} />
                <img src="/brand-logo.svg" alt="MEF Logo" className="relative h-5 w-5 opacity-90 transition-opacity group-hover:opacity-100" />
              </span>
            </GlowOnHover>
            <div className="leading-tight">
              <span className="block text-base sm:text-lg font-bold text-gradient-accent">
                Mohammed E. Fouda
              </span>
              <span className="block text-[11px] sm:text-xs text-muted-foreground">Ph.D., SMIEEE</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-3">
            <div className="md:hidden">
              <IconButton aria-label="Open menu" onClick={() => setOpen(true)} size="small" className="text-foreground">
                <Menu className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <HoverLift>
                <Button asChild variant="outline" size="sm" className="glass-secondary glow-hover">
                  <Link href={cvUrl} target="_blank">
                    Download CV
                  </Link>
                </Button>
              </HoverLift>
              <HoverLift>
                <Button asChild size="sm" className="glass-primary glow-hover">
                  <Link href={`mailto:${contactEmail}`}>Email</Link>
                </Button>
              </HoverLift>
            </div>
          </div>
        </div>
      </div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="w-72 sm:w-80 glass-strong h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
            <span className="text-sm text-muted-foreground">Menu</span>
            <IconButton aria-label="Close menu" onClick={() => setOpen(false)} size="small" className="text-foreground">
              <X className="h-5 w-5" />
            </IconButton>
          </div>
          <List>
            {navigation.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton component={Link} href={item.href} onClick={() => setOpen(false)}>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ className: cn("text-sm", pathname === item.href ? "text-accent" : "text-foreground") }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <div className="p-4 flex gap-2">
            <Button asChild variant="outline" size="sm" className="grow glass-secondary">
              <Link href="/cv/Mohammed_Fouda_CV.pdf" target="_blank">Download CV</Link>
            </Button>
            <Button asChild size="sm" className="grow glass-primary">
              <Link href="mailto:fouda@mefouda.me">Email</Link>
            </Button>
          </div>
        </div>
      </Drawer>
    </header>
  )
}
