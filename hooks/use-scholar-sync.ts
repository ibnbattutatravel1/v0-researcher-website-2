"use client"

import { useState, useCallback } from "react"

interface SyncStatus {
  isLoading: boolean
  error: string | null
  lastSync: string | null
  publicationsCount: number
}

export function useScholarSync() {
  const [status, setStatus] = useState<SyncStatus>({
    isLoading: false,
    error: null,
    lastSync: null,
    publicationsCount: 0,
  })

  const syncPublications = useCallback(async (userId: string) => {
    setStatus((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch("/api/sync-scholar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Sync failed")
      }

      setStatus({
        isLoading: false,
        error: null,
        lastSync: result.syncTime,
        publicationsCount: result.publicationsCount,
      })

      // Reload the page to reflect new data
      window.location.reload()

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setStatus((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [])

  const checkSyncStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/sync-scholar")
      const result = await response.json()

      if (response.ok) {
        setStatus((prev) => ({
          ...prev,
          lastSync: result.lastSync,
          publicationsCount: result.publicationsCount,
        }))
      }
    } catch (error) {
      console.error("Failed to check sync status:", error)
    }
  }, [])

  return {
    status,
    syncPublications,
    checkSyncStatus,
  }
}
