import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const items = await prisma.researchProject.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json({ error: "Failed to load research" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const created = await prisma.researchProject.create({ data })
    return NextResponse.json(created)
  } catch (e) {
    return NextResponse.json({ error: "Failed to create research" }, { status: 500 })
  }
}
