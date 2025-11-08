import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = { params: { id: string } }

export async function PUT(request: Request, { params }: Params) {
  try {
    const id = Number(params.id)
    const body = await request.json().catch(() => ({})) as { read?: boolean }
    const updated = await prisma.contactMessage.update({ where: { id }, data: { read: body.read ?? true } })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}
