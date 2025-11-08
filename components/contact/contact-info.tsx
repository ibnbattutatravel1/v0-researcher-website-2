import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, ExternalLink, MapPin, Building } from "lucide-react"
import { FadeIn, StaggerContainer } from "@/components/motion"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <FadeIn>
        <GlassCard className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Get in Touch</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-accent" />
            <div>
              <p className="font-medium">Email</p>
              <Link
                href="mailto:fouda@mefouda.me"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                fouda@mefouda.me
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Building className="h-5 w-5 text-accent" />
            <div>
              <p className="font-medium">Current Position</p>
              <p className="text-muted-foreground">Applied Research Lead at Rain AI</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-accent" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-muted-foreground">United States</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6">
          <h3 className="font-medium mb-4">Professional Profiles</h3>
          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start bg-transparent glow-hover">
              <Link href="https://scholar.google.com/citations?user=1mr8HxoAAAAJ" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Google Scholar
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent glow-hover">
              <Link href="https://linkedin.com/in/mefouda" target="_blank">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent glow-hover">
              <Link href="https://orcid.org/0000-0001-7139-3428" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                ORCID
              </Link>
            </Button>
          </div>
        </div>
        </GlassCard>
      </FadeIn>

      <FadeIn>
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-medium">Research Interests</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• AI hardware accelerators</p>
            <p>• Hardware–software co-design/optimization</p>
            <p>• Brain-inspired (neuromorphic) computing</p>
            <p>• Quantization & compression techniques</p>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  )
}
