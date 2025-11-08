import { type NextRequest, NextResponse } from "next/server"
import { syncPublicationsFromScholar } from "@/lib/publication-sync"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    console.log("[v0] Starting Scholar sync API call")

    // Sync publications from Google Scholar
    const syncResult = await syncPublicationsFromScholar(userId)

    // Update the publications data file
    const publicationsData = `// Auto-generated from Google Scholar sync
// Last updated: ${syncResult.syncTime}
// Profile: ${syncResult.profile.name}
// Total Citations: ${syncResult.profile.totalCitations}
// H-Index: ${syncResult.profile.hIndex}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'workshop' | 'patent' | 'preprint';
  topic: 'neuromorphic-computing' | 'memristive-devices' | 'fractional-order-circuits' | 'ai-hardware' | 'other';
  citations: number;
  impactFactor?: number;
  featured: boolean;
  url?: string;
  abstract?: string;
}

export const scholarProfile = ${JSON.stringify(syncResult.profile, null, 2)};

export const publications: Publication[] = ${JSON.stringify(syncResult.publications, null, 2)};

export const lastSyncTime = "${syncResult.syncTime}";
`

    // Write to the data file
    const filePath = join(process.cwd(), "data", "publications.ts")
    await writeFile(filePath, publicationsData, "utf8")

    console.log("[v0] Successfully updated publications data file")

    return NextResponse.json({
      success: true,
      publicationsCount: syncResult.publications.length,
      profile: syncResult.profile,
      syncTime: syncResult.syncTime,
    })
  } catch (error) {
    console.error("[v0] Error in Scholar sync API:", error)
    return NextResponse.json(
      { error: "Failed to sync publications", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Return current sync status
    const { publications, scholarProfile, lastSyncTime } = await import("@/data/publications")

    return NextResponse.json({
      publicationsCount: publications.length,
      profile: scholarProfile,
      lastSync: lastSyncTime,
      needsUpdate: false, // You could implement the needsUpdate logic here
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get sync status" }, { status: 500 })
  }
}
