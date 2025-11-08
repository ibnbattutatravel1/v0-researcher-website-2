import { fetchScholarProfile, type ScholarProfile, type ScholarPublication } from "./google-scholar"
import type { Publication } from "@/data/publications"

// Convert Scholar publication to our internal format
export function convertScholarToPublication(scholarPub: ScholarPublication): Publication {
  // Determine publication type based on venue
  const venue = scholarPub.venue.toLowerCase()
  let type: Publication["type"] = "journal"

  if (venue.includes("conference") || venue.includes("proc") || venue.includes("symposium")) {
    type = "conference"
  } else if (venue.includes("workshop")) {
    type = "workshop"
  } else if (venue.includes("patent")) {
    type = "patent"
  }

  // Determine topic based on title and venue
  const title = scholarPub.title.toLowerCase()
  let topic: Publication["topic"] = "other"

  if (title.includes("neural") || title.includes("neuromorphic") || title.includes("spiking")) {
    topic = "neuromorphic-computing"
  } else if (title.includes("memristor") || title.includes("resistive")) {
    topic = "memristive-devices"
  } else if (title.includes("fractional") || title.includes("circuit")) {
    topic = "fractional-order-circuits"
  } else if (title.includes("ai") || title.includes("machine learning") || title.includes("deep learning")) {
    topic = "ai-hardware"
  }

  // Estimate impact factor based on venue (this would need a real database)
  const impactFactor = estimateImpactFactor(scholarPub.venue)

  return {
    id: generatePublicationId(scholarPub.title),
    title: scholarPub.title,
    authors: scholarPub.authors,
    venue: scholarPub.venue,
    year: scholarPub.year,
    type,
    topic,
    citations: scholarPub.citations,
    impactFactor,
    featured: scholarPub.citations > 50 || impactFactor > 4, // Auto-feature high-impact papers
    url: scholarPub.url,
    abstract: scholarPub.abstract,
  }
}

function generatePublicationId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50)
}

function estimateImpactFactor(venue: string): number {
  // This is a simplified mapping - in production, you'd use a real database
  const venueMap: Record<string, number> = {
    nature: 49.962,
    science: 47.728,
    "ieee transactions on neural networks and learning systems": 8.793,
    "ieee transactions on circuits and systems": 4.14,
    "frontiers in neuroscience": 4.677,
    "neural networks": 6.0,
    "ieee access": 3.367,
    "scientific reports": 4.379,
    "plos one": 3.24,
  }

  const venueLower = venue.toLowerCase()
  for (const [key, factor] of Object.entries(venueMap)) {
    if (venueLower.includes(key)) {
      return factor
    }
  }

  // Default impact factor estimation
  if (venueLower.includes("ieee")) return 3.5
  if (venueLower.includes("nature") || venueLower.includes("science")) return 10.0
  if (venueLower.includes("frontiers")) return 3.0

  return 2.0 // Default
}

// Sync publications from Google Scholar
export async function syncPublicationsFromScholar(userId: string): Promise<{
  publications: Publication[]
  profile: ScholarProfile
  syncTime: string
}> {
  try {
    console.log("[v0] Starting Scholar sync for user:", userId)

    const scholarProfile = await fetchScholarProfile(userId)
    console.log("[v0] Fetched Scholar profile:", scholarProfile.name)

    const publications = scholarProfile.publications.map(convertScholarToPublication)
    console.log("[v0] Converted publications:", publications.length)

    const syncTime = new Date().toISOString()

    return {
      publications,
      profile: scholarProfile,
      syncTime,
    }
  } catch (error) {
    console.error("[v0] Error syncing publications:", error)
    throw error
  }
}

// Check if publications need updating
export function needsUpdate(lastSync: string, intervalHours = 24): boolean {
  const lastSyncTime = new Date(lastSync)
  const now = new Date()
  const hoursSinceSync = (now.getTime() - lastSyncTime.getTime()) / (1000 * 60 * 60)

  return hoursSinceSync >= intervalHours
}
