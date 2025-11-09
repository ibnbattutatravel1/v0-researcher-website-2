"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type Settings = {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  cvUrl: string
  contactEmail: string
  showResearch: boolean
  showPatents: boolean
  showAwards: boolean
  showExperience: boolean
  showTalks: boolean
  showContact: boolean
  researchActiveProjects: string
  researchCollaborations: string
  researchFundingRaised: string
  researchPatentsFiled: string
  patentsTotal: string
  patentsGranted: string
  patentsPending: string
  expYearsIndustry: string
  expPhdGPA: string
  expCoursesTaught: string
}

export function SiteSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<Settings>({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    cvUrl: "",
    contactEmail: "",
    showResearch: true,
    showPatents: true,
    showAwards: true,
    showExperience: true,
    showTalks: true,
    showContact: true,
    researchActiveProjects: "15+",
    researchCollaborations: "8",
    researchFundingRaised: "$2.5M",
    researchPatentsFiled: "12",
    patentsTotal: "12",
    patentsGranted: "8",
    patentsPending: "4",
    expYearsIndustry: "5+",
    expPhdGPA: "4.0",
    expCoursesTaught: "15+",
  })

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/site-settings", { cache: "no-store" })
        const data = await res.json()
        setSettings((prev) => ({ ...prev, ...data }))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Card className="glass p-6">Loading settings...</Card>

  return (
    <div className="space-y-6">
      <Card className="glass p-6 space-y-6">
        <h3 className="text-lg font-semibold">Hero Content</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input id="heroTitle" value={settings.heroTitle} onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Input id="heroSubtitle" value={settings.heroSubtitle} onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Input id="heroDescription" value={settings.heroDescription} onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })} className="glass bg-transparent" />
          </div>
        </div>
      </Card>

      <Card className="glass p-6 space-y-6">
        <h3 className="text-lg font-semibold">Research Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="researchActiveProjects">Active Projects</Label>
            <Input id="researchActiveProjects" value={settings.researchActiveProjects} onChange={(e) => setSettings({ ...settings, researchActiveProjects: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="researchCollaborations">Collaborations</Label>
            <Input id="researchCollaborations" value={settings.researchCollaborations} onChange={(e) => setSettings({ ...settings, researchCollaborations: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="researchFundingRaised">Funding Raised</Label>
            <Input id="researchFundingRaised" value={settings.researchFundingRaised} onChange={(e) => setSettings({ ...settings, researchFundingRaised: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="researchPatentsFiled">Patents Filed</Label>
            <Input id="researchPatentsFiled" value={settings.researchPatentsFiled} onChange={(e) => setSettings({ ...settings, researchPatentsFiled: e.target.value })} className="glass bg-transparent" />
          </div>
        </div>
      </Card>

      <Card className="glass p-6 space-y-6">
        <h3 className="text-lg font-semibold">Patents Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patentsTotal">Total Patents</Label>
            <Input id="patentsTotal" value={settings.patentsTotal} onChange={(e) => setSettings({ ...settings, patentsTotal: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patentsGranted">Granted</Label>
            <Input id="patentsGranted" value={settings.patentsGranted} onChange={(e) => setSettings({ ...settings, patentsGranted: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patentsPending">Pending</Label>
            <Input id="patentsPending" value={settings.patentsPending} onChange={(e) => setSettings({ ...settings, patentsPending: e.target.value })} className="glass bg-transparent" />
          </div>
        </div>
      </Card>

      <Card className="glass p-6 space-y-6">
        <h3 className="text-lg font-semibold">Experience Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expYearsIndustry">Years Industry</Label>
            <Input id="expYearsIndustry" value={settings.expYearsIndustry} onChange={(e) => setSettings({ ...settings, expYearsIndustry: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expPhdGPA">PhD GPA</Label>
            <Input id="expPhdGPA" value={settings.expPhdGPA} onChange={(e) => setSettings({ ...settings, expPhdGPA: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expCoursesTaught">Courses Taught</Label>
            <Input id="expCoursesTaught" value={settings.expCoursesTaught} onChange={(e) => setSettings({ ...settings, expCoursesTaught: e.target.value })} className="glass bg-transparent" />
          </div>
        </div>
      </Card>

      <Card className="glass p-6 space-y-6">
        <h3 className="text-lg font-semibold">Links & Contact</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cvUrl">CV URL</Label>
            <Input id="cvUrl" value={settings.cvUrl} onChange={(e) => setSettings({ ...settings, cvUrl: e.target.value })} className="glass bg-transparent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input id="contactEmail" type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} className="glass bg-transparent" />
          </div>
        </div>
      </Card>

      <Card className="glass p-6 space-y-4">
        <h3 className="text-lg font-semibold">Feature Toggles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {([
            ["showResearch", "Research Page"],
            ["showPatents", "Patents Page"],
            ["showAwards", "Awards Page"],
            ["showExperience", "Experience Page"],
            ["showTalks", "Talks Page"],
            ["showContact", "Contact Page"],
          ] as const).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between glass p-3 rounded-md">
              <span>{label}</span>
              <Switch
                checked={settings[key]}
                onCheckedChange={(val) => setSettings({ ...settings, [key]: val } as Settings)}
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="glow-hover">
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
