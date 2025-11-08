import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 sm:p-12 text-center space-y-6 glow">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">Collaborations Welcome</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Interested in AI hardware research, neuromorphic computing, or hardware-software co-design? Let's explore
              opportunities to work together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glow-hover group">
              <Link href="mailto:fouda@mefouda.me">
                <Mail className="mr-2 h-4 w-4" />
                Email Mohammed
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glow-hover bg-transparent">
              <Link href="/contact">
                View Contact Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
