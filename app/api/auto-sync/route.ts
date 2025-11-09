import { NextResponse } from "next/server"

// This endpoint can be called by a cron job or webhook
export async function POST() {
  try {
    const SCHOLAR_USER_ID = process.env.SCHOLAR_USER_ID || "1mr8HxoAAAAJ"
    console.log("[v0] Auto-sync triggered - syncing scholar -> DB")

    // Trigger the DB sync
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/sync-scholar-db`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: SCHOLAR_USER_ID }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Sync failed")
    }

    return NextResponse.json({
      message: "Publications DB updated successfully",
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
