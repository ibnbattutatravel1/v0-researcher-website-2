import { load } from "cheerio"

export type ScrapedPublication = {
  title: string
  authors: string[]
  venue: string
  year: number
  citations: number
  url?: string
}

const BASE = "https://scholar.google.com/citations"

export async function scrapeScholarPublications(userId: string): Promise<ScrapedPublication[]> {
  const results: ScrapedPublication[] = []
  let start = 1
  const pageSize = 100

  // Paginate until no rows returned
  while (true) {
    const url = `${BASE}?user=${encodeURIComponent(userId)}&cstart=${start}&pagesize=${pageSize}`
    const html = await fetchHtml(url)
    const pubs = parsePublications(html)
    if (pubs.length === 0) break
    results.push(...pubs)
    start += pageSize
  }

  return results
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      // Pretend to be a browser
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
  })
  if (!res.ok) throw new Error(`Failed to fetch Scholar page: ${res.status}`)
  return await res.text()
}

function parsePublications(html: string): ScrapedPublication[] {
  const $ = load(html)
  const rows = $("#gsc_a_t .gsc_a_tr")
  const out: ScrapedPublication[] = []

  rows.each((_i: number, el: any) => {
    const titleEl = $(el).find(".gsc_a_at").first()
    const title = titleEl.text().trim()
    const authorsText = titleEl.parent().find(".gs_gray").first().text().trim()
    const venueText = titleEl.parent().find(".gs_gray").last().text().trim()
    const citationsText = $(el).find(".gsc_a_ac").text().trim() || "0"
    const yearText = $(el).find(".gsc_a_h").text().trim() || "0"
    const href = titleEl.attr("href")

    if (!title) return

    out.push({
      title,
      authors: authorsText ? authorsText.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      venue: venueText,
      citations: Number.parseInt(citationsText || "0"),
      year: Number.parseInt(yearText || "0"),
      url: href ? `https://scholar.google.com${href}` : undefined,
    })
  })

  return out
}
