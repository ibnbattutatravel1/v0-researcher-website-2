import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { username?: string; password?: string }
  const user = process.env.ADMIN_USER || "admin"
  const pass = process.env.ADMIN_PASS || "admin123"
  if (body.username === user && body.password === pass) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
