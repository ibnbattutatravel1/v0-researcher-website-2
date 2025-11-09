import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: Request, context: Params) {
  try {
    const { id: idStr } = await context.params
    const id = Number(idStr)
    const data = await request.json()
    const updated = await prisma.publication.update({ where: { id }, data })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: "Failed to update publication" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: Params) {
  try {
    const { id: idStr } = await context.params
    const id = Number(idStr)
    await prisma.publication.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 })
  }
}
