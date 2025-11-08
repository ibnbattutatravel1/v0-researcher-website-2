"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Spam protection
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic spam protection
    if (formData.honeypot) {
      return
    }

    // TODO: Implement form submission logic
    console.log("Form submitted:", formData)

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
    <Card className="glass p-6">
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

        <Button type="submit" size="lg" className="w-full glow-hover">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>

        <p className="text-xs text-muted-foreground">
          * Required fields. Your information will be kept confidential and used only to respond to your inquiry.
        </p>
      </form>
    </Card>
  )
}
