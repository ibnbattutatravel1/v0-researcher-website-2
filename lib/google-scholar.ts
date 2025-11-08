// Google Scholar data fetching and parsing utilities
export interface ScholarPublication {
  title: string
  authors: string[]
  venue: string
  year: number
  citations: number
  url?: string
  abstract?: string
}

export interface ScholarProfile {
  name: string
  affiliation: string
  totalCitations: number
  hIndex: number
  i10Index: number
  publications: ScholarPublication[]
}

// Since Google Scholar doesn't have an official API, we'll use a proxy service
// or implement a scraping solution that respects rate limits
export async function fetchScholarProfile(userId: string): Promise<ScholarProfile> {
  try {
    // Using a CORS proxy to fetch the Google Scholar page
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://scholar.google.com/citations?user=${userId}&hl=en&oi=ao`,
    )}`

    const response = await fetch(proxyUrl)
    const data = await response.json()

    if (!data.contents) {
      throw new Error("Failed to fetch Scholar data")
    }

    return parseScholarHTML(data.contents)
  } catch (error) {
    console.error("Error fetching Scholar profile:", error)
    throw error
  }
}

function parseScholarHTML(html: string): ScholarProfile {
  // Create a DOM parser to extract data from the HTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")

  // Extract profile information
  const name = doc.querySelector("#gsc_prf_in")?.textContent || ""
  const affiliation = doc.querySelector("#gsc_prf_inw+ .gsc_prf_il")?.textContent || ""

  // Extract citation metrics
  const citationElements = doc.querySelectorAll("#gsc_rsb_st .gsc_rsb_std")
  const totalCitations = Number.parseInt(citationElements[0]?.textContent || "0")
  const hIndex = Number.parseInt(citationElements[2]?.textContent || "0")
  const i10Index = Number.parseInt(citationElements[4]?.textContent || "0")

  // Extract publications
  const publications: ScholarPublication[] = []
  const pubRows = doc.querySelectorAll("#gsc_a_t .gsc_a_tr")

  pubRows.forEach((row) => {
    const titleElement = row.querySelector(".gsc_a_at")
    const authorsElement = row.querySelector(".gsc_a_at + .gs_gray")
    const venueElement = row.querySelector(".gs_gray:last-child")
    const citationsElement = row.querySelector(".gsc_a_ac")
    const yearElement = row.querySelector(".gsc_a_h")

    if (titleElement) {
      const title = titleElement.textContent || ""
      const authors = authorsElement?.textContent?.split(",").map((a) => a.trim()) || []
      const venue = venueElement?.textContent || ""
      const citations = Number.parseInt(citationsElement?.textContent || "0")
      const year = Number.parseInt(yearElement?.textContent || "0")
      const url = titleElement.getAttribute("href")
        ? `https://scholar.google.com${titleElement.getAttribute("href")}`
        : undefined

      publications.push({
        title,
        authors,
        venue,
        year,
        citations,
        url,
      })
    }
  })

  return {
    name,
    affiliation,
    totalCitations,
    hIndex,
    i10Index,
    publications,
  }
}

// Alternative approach using a more reliable service
export async function fetchScholarProfileAlternative(userId: string): Promise<ScholarProfile> {
  try {
    // Using Serpapi or similar service (requires API key)
    const apiKey = process.env.SERPAPI_KEY
    if (!apiKey) {
      throw new Error("SERPAPI_KEY not configured")
    }

    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${userId}&api_key=${apiKey}`,
    )

    const data = await response.json()

    return {
      name: data.author?.name || "",
      affiliation: data.author?.affiliations?.[0] || "",
      totalCitations: data.cited_by?.table?.[0]?.citations?.all || 0,
      hIndex: data.cited_by?.table?.[1]?.h_index?.all || 0,
      i10Index: data.cited_by?.table?.[2]?.i10_index?.all || 0,
      publications:
        data.articles?.map((article: any) => ({
          title: article.title,
          authors: article.authors?.split(",").map((a: string) => a.trim()) || [],
          venue: article.publication,
          year: article.year,
          citations: article.cited_by?.value || 0,
          url: article.link,
        })) || [],
    }
  } catch (error) {
    console.error("Error fetching Scholar profile via API:", error)
    throw error
  }
}
