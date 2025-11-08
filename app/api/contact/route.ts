import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, subject = "", message, honeypot } = await request.json()

    if (honeypot) return NextResponse.json({ ok: true })
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
    const toEmail = settings?.contactEmail || process.env.SMTP_TO

    // Save to DB first
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    })

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !toEmail) {
      // Email not configured; still return success for UX
      return NextResponse.json({ ok: true, info: "Saved without email (SMTP not configured)" })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const from = process.env.SMTP_FROM || process.env.SMTP_USER!

    await transporter.sendMail({
      from,
      to: toEmail,
      subject: subject ? `[Website Contact] ${subject}` : "New contact form submission",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("POST /api/contact error", e)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
