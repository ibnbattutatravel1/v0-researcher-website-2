import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Mail } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Mohammed E. Fouda
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-medium">Applied Research Lead at Rain AI</p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
                I design AI accelerators and neuromorphic systems that bridge algorithms and hardware, focusing on
                brain-inspired computing and efficient quantization techniques.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="glow-hover group">
                <Link href="/cv/Mohammed_Fouda_CV.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glow-hover bg-transparent group">
                <Link href="mailto:fouda@mefouda.me">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Mohammed
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground">Researcher in AI hardware & brain-inspired computing</p>
            </div>
          </div>

          <div className="relative">
            {/* Animated node network visualization */}
            <div className="relative h-96 w-full glass rounded-2xl p-8 glow">
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {/* Node network pattern */}
                <svg className="w-full h-full opacity-30" viewBox="0 0 400 300">
                  <defs>
                    <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#42e8e0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#42e8e0" stopOpacity="0.2" />
                    </radialGradient>
                  </defs>

                  {/* Connection lines */}
                  <g stroke="#42e8e0" strokeWidth="1" strokeOpacity="0.3" fill="none">
                    <line x1="80" y1="60" x2="150" y2="120" className="animate-pulse" />
                    <line
                      x1="150"
                      y1="120"
                      x2="250"
                      y2="80"
                      className="animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <line
                      x1="250"
                      y1="80"
                      x2="320"
                      y2="180"
                      className="animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                    <line
                      x1="150"
                      y1="120"
                      x2="200"
                      y2="220"
                      className="animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    />
                    <line
                      x1="80"
                      y1="200"
                      x2="150"
                      y2="120"
                      className="animate-pulse"
                      style={{ animationDelay: "2s" }}
                    />
                  </g>

                  {/* Nodes */}
                  <g>
                    <circle cx="80" cy="60" r="6" fill="url(#nodeGradient)" className="animate-pulse" />
                    <circle
                      cx="150"
                      cy="120"
                      r="8"
                      fill="url(#nodeGradient)"
                      className="animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    />
                    <circle
                      cx="250"
                      cy="80"
                      r="5"
                      fill="url(#nodeGradient)"
                      className="animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    />
                    <circle
                      cx="320"
                      cy="180"
                      r="7"
                      fill="url(#nodeGradient)"
                      className="animate-pulse"
                      style={{ animationDelay: "0.9s" }}
                    />
                    <circle
                      cx="200"
                      cy="220"
                      r="6"
                      fill="url(#nodeGradient)"
                      className="animate-pulse"
                      style={{ animationDelay: "1.2s" }}
                    />
                    <circle
                      cx="80"
                      cy="200"
                      r="5"
                      fill="url(#nodeGradient)"
                      className="animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    />
                  </g>
                </svg>
              </div>

              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-2xl font-mono text-accent">AI ⟷ Hardware</div>
                  <div className="text-sm text-muted-foreground">Bridging algorithms & silicon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
