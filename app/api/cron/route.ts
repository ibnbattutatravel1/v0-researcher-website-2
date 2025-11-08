import { NextResponse } from "next/server"

// This endpoint can be called by Vercel Cron Jobs
// Add to vercel.json: { "cron": [{ "path": "/api/cron", "schedule": "0 */6 * * *" }] }
export async function GET() {
  try {
    console.log("[v0] Cron job triggered for Scholar sync")

    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    // Call the auto-sync endpoint
    const response = await fetch(`${baseUrl}/api/auto-sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CRON_SECRET || "dev-secret"}`,
      },
    })

    const result = await response.json()

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    })
  } catch (error) {
    console.error("[v0] Cron job error:", error)
    return NextResponse.json(
      { error: "Cron job failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
