import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Providers } from "@/components/providers"
import { PublicationScheduler } from "@/components/publication-scheduler"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mohammed E. Fouda - AI Hardware Researcher",
  description:
    "Applied Research Lead at Rain AI specializing in AI hardware accelerators, neuromorphic computing, and hardware-software co-design.",
  generator: "v0.app",
  keywords: ["AI hardware", "neuromorphic computing", "machine learning", "research", "Rain AI"],
  authors: [{ name: "Mohammed E. Fouda" }],
  openGraph: {
    title: "Mohammed E. Fouda - AI Hardware Researcher",
    description:
      "Applied Research Lead at Rain AI specializing in AI hardware accelerators, neuromorphic computing, and hardware-software co-design.",
    type: "website",
  },
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 noise-texture opacity-30" />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(66,232,224,0.15),transparent_70%)]" />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <PublicationScheduler />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
