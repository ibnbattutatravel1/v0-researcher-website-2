import { NavigationServer } from "@/components/navigation-server"
import { Footer } from "@/components/footer"
import { ContactHeader } from "@/components/contact/contact-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Contact - Mohammed E. Fouda",
  description: "Get in touch for research collaborations, speaking opportunities, or professional inquiries.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  if (settings && !settings.showContact) return notFound()
  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <main className="py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ContactHeader />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
