import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: 1,
          heroTitle: "Mohammed E. Fouda",
          heroSubtitle: "Applied Research Lead at Rain AI",
          heroDescription:
            "I design AI accelerators and neuromorphic systems that bridge algorithms and hardware, focusing on brain-inspired computing and efficient quantization techniques.",
          cvUrl: "/cv/Mohammed_Fouda_CV.pdf",
          contactEmail: "fouda@mefouda.me",
        },
      })
    }
    return NextResponse.json(settings)
  } catch (e) {
    console.error("GET /api/admin/site-settings error", e)
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      create: { id: 1, ...body },
      update: { ...body },
    })
    return NextResponse.json(settings)
  } catch (e) {
    console.error("PUT /api/admin/site-settings error", e)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
