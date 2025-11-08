"use client"

import { useEffect } from "react"
import { publicationScheduler } from "@/lib/scheduler"

export function PublicationScheduler() {
  useEffect(() => {
    publicationScheduler.requestNotificationPermission()
    publicationScheduler.start()

    // Cleanup on unmount
    return () => {
      publicationScheduler.stop()
    }
  }, [])

  return null // This component doesn't render anything
}
