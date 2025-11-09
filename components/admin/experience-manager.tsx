"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"

type Experience = {
  id?: number
  position: string
  organization: string
  location: string
  duration: string
  type: string
  description: string
  achievements?: string[]
  skills?: string[]
}

export function ExperienceManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<Experience>({
    position: "",
    organization: "",
    location: "",
    duration: "",
    type: "industry",
    description: "",
    achievements: [],
    skills: [],
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Experience>({
    position: "",
    organization: "",
    location: "",
    duration: "",
    type: "industry",
    description: "",
    achievements: [],
    skills: [],
  })

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/experience", { cache: "no-store" })
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(
    () => items.filter((e) => e.position.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery],
  )

  const create = async () => {
    setCreating(true)
    try {
      const res = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          achievements: form.achievements ?? [],
          skills: form.skills ?? [],
        }),
      })
      if (res.ok) {
        setForm({ position: "", organization: "", location: "", duration: "", type: "industry", description: "", achievements: [], skills: [] })
        await load()
      }
    } finally {
      setCreating(false)
    }
  }

  const remove = async (id?: number) => {
    if (!id) return
    await fetch(`/api/experience/${id}`, { method: "DELETE" })
    await load()
  }

  const startEdit = (e: Experience) => {
    setEditingId(e.id ?? null)
    setEditForm({
      position: e.position,
      organization: e.organization,
      location: e.location,
      duration: e.duration,
      type: e.type,
      description: e.description,
      achievements: e.achievements ?? [],
      skills: e.skills ?? [],
    })
  }

  const saveEdit = async () => {
    if (!editingId) return
    await fetch(`/api/experience/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
    setEditingId(null)
    await load()
  }

  return (
    <div className="space-y-6">
      <Card className="glass p-6 space-y-4">
        <h3 className="text-lg font-semibold">Experience</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
              <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              <select
                className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="industry">Industry</option>
                <option value="academic">Academic & Teaching</option>
              </select>
            </div>
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Achievements (comma separated)" value={(form.achievements ?? []).join(", ")} onChange={(e) => setForm({ ...form, achievements: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
            <Input placeholder="Skills (comma separated)" value={(form.skills ?? []).join(", ")} onChange={(e) => setForm({ ...form, skills: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
            <Button onClick={create} disabled={creating} className="glow-hover">
              <Plus className="mr-2 h-4 w-4" />
              {creating ? "Adding..." : "Add Experience"}
            </Button>
          </div>

          <div className="space-y-2">
            <Input placeholder="Search experience..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="glass bg-transparent" />
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((e) => (
                  <Card key={e.id} className="glass p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="font-medium">{e.position}</div>
                        <div className="text-sm text-muted-foreground">{e.organization} • {e.location} • {e.duration} • {e.type}</div>
                        <div className="text-sm text-muted-foreground">{e.description}</div>
                        <div className="flex flex-wrap gap-1">
                          {(e.skills ?? []).map((s) => (
                            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent" onClick={() => startEdit(e)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => remove(e.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {editingId === e.id && (
                      <div className="space-y-2 border-t border-border/40 pt-3">
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Position" value={editForm.position} onChange={(ev) => setEditForm({ ...editForm, position: ev.target.value })} />
                          <Input placeholder="Organization" value={editForm.organization} onChange={(ev) => setEditForm({ ...editForm, organization: ev.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Location" value={editForm.location} onChange={(ev) => setEditForm({ ...editForm, location: ev.target.value })} />
                          <Input placeholder="Duration" value={editForm.duration} onChange={(ev) => setEditForm({ ...editForm, duration: ev.target.value })} />
                        </div>
                        <select
                          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
                          value={editForm.type}
                          onChange={(ev) => setEditForm({ ...editForm, type: ev.target.value })}
                        >
                          <option value="industry">Industry</option>
                          <option value="academic">Academic & Teaching</option>
                        </select>
                        <Textarea placeholder="Description" value={editForm.description} onChange={(ev) => setEditForm({ ...editForm, description: ev.target.value })} />
                        <Input placeholder="Achievements (comma separated)" value={(editForm.achievements ?? []).join(", ")} onChange={(ev) => setEditForm({ ...editForm, achievements: ev.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
                        <Input placeholder="Skills (comma separated)" value={(editForm.skills ?? []).join(", ")} onChange={(ev) => setEditForm({ ...editForm, skills: ev.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={saveEdit}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
