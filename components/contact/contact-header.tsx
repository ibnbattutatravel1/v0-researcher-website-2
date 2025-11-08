import { FadeIn } from "@/components/motion"

export function ContactHeader() {
  return (
    <FadeIn>
      <div className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-display text-gradient-accent">Get in Touch</h1>
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-accent via-accent/70 to-transparent glow-cyan" />
          <p className="text-subtitle text-muted-foreground content-max-width text-pretty">
            I'm always interested in discussing research collaborations, industry partnerships, and opportunities
            in AI hardware and neuromorphic computing. Feel free to reach out.
          </p>
        </div>
      </div>
    </FadeIn>
  )
}
