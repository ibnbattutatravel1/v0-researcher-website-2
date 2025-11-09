import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { scrapeScholarPublications } from "@/lib/google-scholar-scraper"

function classifyType(venue: string): string {
  const v = venue.toLowerCase()
  if (v.includes("conference") || v.includes("proc") || v.includes("symposium")) return "conference"
  if (v.includes("workshop")) return "workshop"
  if (v.includes("patent")) return "patent"
  return "journal"
}

function classifyTopic(title: string): string {
  const t = title.toLowerCase()
  if (t.includes("neuromorphic") || t.includes("spiking") || t.includes("neural")) return "neuromorphic-computing"
  if (t.includes("memristor") || t.includes("resistive")) return "memristive-devices"
  if (t.includes("fractional") || t.includes("circuit")) return "fractional-order-circuits"
  if (t.includes("ai") || t.includes("machine learning") || t.includes("deep learning")) return "ai-hardware"
  return "other"
}

export async function POST(request: Request) {
  try {
    const { userId } = await request.json().catch(() => ({})) as { userId?: string }
    const scholarId = userId || process.env.SCHOLAR_USER_ID
    if (!scholarId) {
      return NextResponse.json({ error: "SCHOLAR_USER_ID missing" }, { status: 400 })
    }

    const scraped = await scrapeScholarPublications(scholarId)

    let created = 0
    let updated = 0

    for (const pub of scraped) {
      const existing = await prisma.publication.findFirst({ where: { title: pub.title, year: pub.year } })
      const data = {
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
        type: classifyType(pub.venue),
        topic: classifyTopic(pub.title),
        citations: pub.citations || 0,
        url: pub.url || "",
      }
      if (existing) {
        await prisma.publication.update({ where: { id: existing.id }, data })
        updated++
      } else {
        await prisma.publication.create({ data })
        created++
      }
    }

    return NextResponse.json({ ok: true, created, updated, total: scraped.length })
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to sync publications", details: e?.message }, { status: 500 })
  }
}
