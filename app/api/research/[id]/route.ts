import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = { params: { id: string } }

export async function PUT(request: Request, { params }: Params) {
  try {
    const id = Number(params.id)
    const data = await request.json()
    const updated = await prisma.researchProject.update({ where: { id }, data })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: "Failed to update research" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const id = Number(params.id)
    await prisma.researchProject.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete research" }, { status: 500 })
  }
}
