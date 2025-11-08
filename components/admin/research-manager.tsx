"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Plus } from "lucide-react"

type Project = {
  id?: number
  title: string
  description: string
  role: string
  status: string
  year: string
  themes?: string[]
  funding?: string
}

export function ResearchManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<Project>({ title: "", description: "", role: "", status: "Active", year: "2024" })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Project>({ title: "", description: "", role: "", status: "Active", year: "2024" })

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/research", { cache: "no-store" })
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
    () => items.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery],
  )

  const create = async () => {
    setCreating(true)
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, themes: form.themes ?? [] }),
      })
      if (res.ok) {
        setForm({ title: "", description: "", role: "", status: "Active", year: "2024" })
        await load()
      }
    } finally {
      setCreating(false)
    }
  }

  const remove = async (id?: number) => {
    if (!id) return
    await fetch(`/api/research/${id}`, { method: "DELETE" })
    await load()
  }

  const startEdit = (p: Project) => {
    setEditingId(p.id ?? null)
    setEditForm({
      title: p.title,
      description: p.description,
      role: p.role,
      status: p.status,
      year: p.year,
      themes: p.themes ?? [],
      funding: p.funding ?? "",
    })
  }

  const saveEdit = async () => {
    if (!editingId) return
    await fetch(`/api/research/${editingId}`, {
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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Research Projects</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
              <Input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </div>
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Button onClick={create} disabled={creating} className="glow-hover">
              <Plus className="mr-2 h-4 w-4" />
              {creating ? "Adding..." : "Add Project"}
            </Button>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Search research projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass bg-transparent"
            />
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((project) => (
                  <Card key={project.id} className="glass p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h4 className="font-medium text-balance">{project.title}</h4>
                        <p className="text-sm text-muted-foreground text-pretty">{project.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={project.status === "Active" ? "default" : "secondary"}>{project.status}</Badge>
                          <Badge variant="secondary" className="text-xs">
                            {project.year}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {project.role}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent" onClick={() => startEdit(project)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => remove(project.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {editingId === project.id && (
                      <div className="space-y-2 border-t border-border/40 pt-3">
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                          <Input placeholder="Role" value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Status" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} />
                          <Input placeholder="Year" value={editForm.year} onChange={(e) => setEditForm({ ...editForm, year: e.target.value })} />
                        </div>
                        <Textarea placeholder="Description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
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
