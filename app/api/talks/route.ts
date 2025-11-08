import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const items = await prisma.talk.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json({ error: "Failed to load talks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const created = await prisma.talk.create({ data })
    return NextResponse.json(created)
  } catch (e) {
    return NextResponse.json({ error: "Failed to create talk" }, { status: 500 })
  }
}
