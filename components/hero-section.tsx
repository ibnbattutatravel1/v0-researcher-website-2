import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Mail } from "lucide-react"
import { FadeIn, SlideUp, FloatAnimation, PulseGlow } from "@/components/motion"
import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden section-spacing">
      {/* Animated background gradient + noise */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 noise-texture"
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="content-grid lg:grid-cols-2 items-center">
          <FadeIn className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-display text-gradient-accent">
                Mohammed E. Fouda
              </h1>
              <p className="text-headline text-gradient-subtle">Applied Research Lead at Rain AI</p>
              <p className="text-body text-muted-foreground max-w-2xl">
                I design AI accelerators and neuromorphic systems that bridge algorithms and hardware, focusing on
                brain-inspired computing and efficient quantization techniques.
              </p>
            </div>

            <div className="cluster-layout">
              <PulseGlow>
                <Button asChild size="lg" className="glass-primary glow-hover group">
                  <Link href="/cv/Mohammed_Fouda_CV.pdf" target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </PulseGlow>
              <Button asChild variant="outline" size="lg" className="glass-secondary glow-hover group">
                <Link href="mailto:fouda@mefouda.me">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Mohammed
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-caption text-muted-foreground">Researcher in AI hardware & brain-inspired computing</p>
            </div>
          </FadeIn>

          <SlideUp className="relative">
            {/* Enhanced animated node network visualization */}
            <FloatAnimation amplitude={15} duration={4}>
              <GlassCard className="glass-strong relative h-96 w-full rounded-2xl card-spacing glow-cyan">
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {/* Enhanced node network pattern */}
                  <svg className="w-full h-full opacity-40" viewBox="0 0 400 300">
                    <defs>
                      <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#42e8e0" stopOpacity="1" />
                        <stop offset="50%" stopColor="#6cf3ed" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#42e8e0" stopOpacity="0.3" />
                      </radialGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Enhanced connection lines */}
                    <g stroke="url(#gradient-primary)" strokeWidth="2" strokeOpacity="0.6" fill="none">
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

                    {/* Enhanced nodes */}
                    <g filter="url(#glow)">
                      <circle cx="80" cy="60" r="8" fill="url(#nodeGradient)" className="animate-pulse" />
                      <circle
                        cx="150"
                        cy="120"
                        r="12"
                        fill="url(#nodeGradient)"
                        className="animate-pulse"
                        style={{ animationDelay: "0.3s" }}
                      />
                      <circle
                        cx="250"
                        cy="80"
                        r="6"
                        fill="url(#nodeGradient)"
                        className="animate-pulse"
                        style={{ animationDelay: "0.6s" }}
                      />
                      <circle
                        cx="320"
                        cy="180"
                        r="10"
                        fill="url(#nodeGradient)"
                        className="animate-pulse"
                        style={{ animationDelay: "0.9s" }}
                      />
                      <circle
                        cx="200"
                        cy="220"
                        r="8"
                        fill="url(#nodeGradient)"
                        className="animate-pulse"
                        style={{ animationDelay: "1.2s" }}
                      />
                      <circle
                        cx="80"
                        cy="200"
                        r="6"
                        fill="url(#nodeGradient)"
                        className="animate-pulse"
                        style={{ animationDelay: "1.5s" }}
                      />
                    </g>
                  </svg>
                </div>

                <div className="relative z-10 h-full center-layout">
                  <div className="text-center space-y-4">
                    <div className="text-3xl font-mono text-gradient-accent font-bold">AI ⟷ Hardware</div>
                    <div className="text-subtitle text-muted-foreground">Bridging algorithms & silicon</div>
                  </div>
                </div>
              </GlassCard>
            </FloatAnimation>
          </SlideUp>
        </div>
      </div>
    </section>
  )
}
