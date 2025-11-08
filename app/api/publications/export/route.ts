import { publications } from "@/data/publications"
import { NextResponse } from "next/server"

export async function GET() {
  const allBibTeX = publications
    .filter((pub) => pub.bibtex) // Only include publications with bibtex
    .map((pub) => pub.bibtex)
    .join("\n\n")

  return new NextResponse(allBibTeX, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": "attachment; filename=fouda_publications.bib",
    },
  })
}
