"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass glow hover:glow-hover rounded-xl border text-foreground",
          "transition-shadow duration-300",
          className
        )}
        {...props}
      />
    )
  }
)

GlassCard.displayName = "GlassCard"
