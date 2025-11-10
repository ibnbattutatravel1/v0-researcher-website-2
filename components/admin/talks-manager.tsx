"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"

type Talk = {
  id?: number
  title: string
  venue: string
  date: string
  type: string
  audience?: string
  description: string
  topics?: string[]
  videoUrl?: string
  slidesUrl?: string
}

export function TalksManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<Talk[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Talk>({
    title: "",
    venue: "",
    date: "",
    type: "Invited Talk",
    audience: "",
    description: "",
    topics: [],
    videoUrl: "",
    slidesUrl: "",
  })
  const [form, setForm] = useState<Talk>({
    title: "",
    venue: "",
    date: "",
    type: "Invited Talk",
    audience: "",
    description: "",
    topics: [],
    videoUrl: "",
    slidesUrl: "",
  })

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/talks", { cache: "no-store" })
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
    () => items.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery],
  )

  const create = async () => {
    setCreating(true)
    try {
      const res = await fetch("/api/talks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          topics: form.topics ?? [],
        }),
      })
      if (res.ok) {
        setForm({ title: "", venue: "", date: "", type: "Invited Talk", audience: "", description: "", topics: [], videoUrl: "", slidesUrl: "" })
        await load()
      }
    } finally {
      setCreating(false)
    }
  }

  const remove = async (id?: number) => {
    if (!id) return
    await fetch(`/api/talks/${id}`, { method: "DELETE" })
    await load()
  }

  const startEdit = (t: Talk) => {
    setEditingId(t.id ?? null)
    setEditForm({
      title: t.title,
      venue: t.venue,
      date: t.date,
      type: t.type,
      audience: t.audience ?? "",
      description: t.description,
      topics: t.topics ?? [],
      videoUrl: t.videoUrl ?? "",
      slidesUrl: t.slidesUrl ?? "",
    })
  }

  const saveEdit = async () => {
    if (!editingId) return
    await fetch(`/api/talks/${editingId}`, {
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
        <h3 className="text-lg font-semibold">Talks</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
              <Input type="date" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              <Input placeholder="Audience (optional)" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} />
            </div>
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Topics (comma separated)" value={(form.topics ?? []).join(", ")} onChange={(e) => setForm({ ...form, topics: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Video URL (optional)" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
              <Input placeholder="Slides URL (optional)" value={form.slidesUrl} onChange={(e) => setForm({ ...form, slidesUrl: e.target.value })} />
            </div>
            <Button onClick={create} disabled={creating} className="glow-hover">
              <Plus className="mr-2 h-4 w-4" />
              {creating ? "Adding..." : "Add Talk"}
            </Button>
          </div>

          <div className="space-y-2">
            <Input placeholder="Search talks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="glass bg-transparent" />
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((t) => (
                  <Card key={t.id} className="glass p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="font-medium">{t.title}</div>
                        <div className="text-sm text-muted-foreground">{t.venue} • {t.date} • {t.type}</div>
                        <div className="text-sm text-muted-foreground">{t.description}</div>
                        <div className="flex flex-wrap gap-1">
                          {(t.topics ?? []).map((s) => (
                            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent" onClick={() => startEdit(t)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => remove(t.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {editingId === t.id && (
                      <div className="space-y-2 border-top border-border/40 pt-3">
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                          <Input placeholder="Venue" value={editForm.venue} onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="date" placeholder="Date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                          <Input placeholder="Type" value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} />
                        </div>
                        <Input placeholder="Audience" value={editForm.audience} onChange={(e) => setEditForm({ ...editForm, audience: e.target.value })} />
                        <Textarea placeholder="Description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                        <Input placeholder="Topics (comma separated)" value={(editForm.topics ?? []).join(", ")} onChange={(e) => setEditForm({ ...editForm, topics: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Video URL" value={editForm.videoUrl} onChange={(e) => setEditForm({ ...editForm, videoUrl: e.target.value })} />
                          <Input placeholder="Slides URL" value={editForm.slidesUrl} onChange={(e) => setEditForm({ ...editForm, slidesUrl: e.target.value })} />
                        </div>
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
