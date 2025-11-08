"use client"

import type React from "react"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import { FadeIn } from "@/components/motion"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Spam protection
  })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic spam protection
    if (formData.honeypot) {
      return
    }

    try {
      setSubmitting(true)
      setStatus(null)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send")
      setStatus({ ok: true, msg: "Message sent successfully." })
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send message"
      setStatus({ ok: false, msg })
    } finally {
      setSubmitting(false)
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      honeypot: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <FadeIn>
      <GlassCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold">Send a Message</h2>

        {/* Honeypot field for spam protection */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="glass bg-transparent"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="glass bg-transparent"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject *</Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="glass bg-transparent"
            placeholder="Research collaboration, speaking opportunity, etc."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="glass bg-transparent resize-none"
            placeholder="Please describe your inquiry, research interests, or collaboration ideas..."
          />
        </div>

        <Button type="submit" size="lg" className="w-full glow-hover" disabled={submitting}>
          <Send className="mr-2 h-4 w-4" />
          {submitting ? "Sending..." : "Send Message"}
        </Button>

        {status && (
          <p className={status.ok ? "text-sm text-green-400" : "text-sm text-destructive"}>{status.msg}</p>
        )}

        <p className="text-xs text-muted-foreground">
          * Required fields. Your information will be kept confidential and used only to respond to your inquiry.
        </p>
        </form>
      </GlassCard>
    </FadeIn>
  )
}
