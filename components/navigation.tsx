"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"

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
  const [open, setOpen] = React.useState(false)

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
            <div className="md:hidden">
              <IconButton aria-label="Open menu" onClick={() => setOpen(true)} size="small" className="text-foreground">
                <Menu className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="hidden md:flex items-center space-x-3">
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
      </div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="w-72 sm:w-80 glass h-full">
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
            <Button asChild variant="outline" size="sm" className="grow">
              <Link href="/cv/Mohammed_Fouda_CV.pdf" target="_blank">Download CV</Link>
            </Button>
            <Button asChild size="sm" className="grow">
              <Link href="mailto:fouda@mefouda.me">Email</Link>
            </Button>
          </div>
        </div>
      </Drawer>
    </header>
  )
}
