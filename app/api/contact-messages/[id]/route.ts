import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: Request, context: Params) {
  try {
    const { id: idStr } = await context.params
    const id = Number(idStr)
    const body = await request.json().catch(() => ({})) as { read?: boolean }
    const updated = await prisma.contactMessage.update({ where: { id }, data: { read: body.read ?? true } })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}
