import { NextResponse } from "next/server"
import { needsUpdate } from "@/lib/publication-sync"

// This endpoint can be called by a cron job or webhook
export async function POST() {
  try {
    const SCHOLAR_USER_ID = "1mr8HxoAAAAJ" // Dr. Fouda's Scholar ID

    // Check if we need to update
    const { lastSyncTime } = await import("@/data/publications")

    if (!needsUpdate(lastSyncTime, 24)) {
      // Check every 24 hours
      return NextResponse.json({
        message: "No update needed",
        lastSync: lastSyncTime,
      })
    }

    console.log("[v0] Auto-sync triggered - updating publications")

    // Trigger the sync
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/sync-scholar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: SCHOLAR_USER_ID }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Sync failed")
    }

    return NextResponse.json({
      message: "Publications updated successfully",
      ...result,
    })
  } catch (error) {
    console.error("[v0] Auto-sync error:", error)
    return NextResponse.json(
      { error: "Auto-sync failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
