"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"

type Patent = {
  id?: number
  title: string
  number: string
  status: string
  filedDate: string
  grantedDate?: string
  description: string
  coInventors?: string[]
  categories: string[]
  publicUrl?: string
}

export function PatentsManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<Patent[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Patent>({
    title: "",
    number: "",
    status: "Filed",
    filedDate: "",
    grantedDate: "",
    description: "",
    coInventors: [],
    categories: [],
    publicUrl: "",
  })
  const [form, setForm] = useState<Patent>({
    title: "",
    number: "",
    status: "Filed",
    filedDate: "",
    grantedDate: "",
    description: "",
    coInventors: [],
    categories: [],
    publicUrl: "",
  })

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/patents", { cache: "no-store" })
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
      const res = await fetch("/api/patents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          coInventors: form.coInventors ?? [],
          categories: form.categories ?? [],
        }),
      })
      if (res.ok) {
        setForm({ title: "", number: "", status: "Filed", filedDate: "", grantedDate: "", description: "", coInventors: [], categories: [], publicUrl: "" })
        await load()
      }
    } finally {
      setCreating(false)
    }
  }

  const remove = async (id?: number) => {
    if (!id) return
    await fetch(`/api/patents/${id}`, { method: "DELETE" })
    await load()
  }

  const startEdit = (p: Patent) => {
    setEditingId(p.id ?? null)
    setEditForm({
      title: p.title,
      number: p.number,
      status: p.status,
      filedDate: p.filedDate,
      grantedDate: p.grantedDate ?? "",
      description: p.description,
      coInventors: p.coInventors ?? [],
      categories: p.categories ?? [],
      publicUrl: p.publicUrl ?? "",
    })
  }

  const saveEdit = async () => {
    if (!editingId) return
    await fetch(`/api/patents/${editingId}`, {
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
        <h3 className="text-lg font-semibold">Patents</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Number" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
              <Input placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Filed Date" value={form.filedDate} onChange={(e) => setForm({ ...form, filedDate: e.target.value })} />
              <Input placeholder="Granted Date" value={form.grantedDate} onChange={(e) => setForm({ ...form, grantedDate: e.target.value })} />
            </div>
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Co-inventors (comma separated)" value={(form.coInventors ?? []).join(", ")} onChange={(e) => setForm({ ...form, coInventors: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
            <Input placeholder="Categories (comma separated)" value={(form.categories ?? []).join(", ")} onChange={(e) => setForm({ ...form, categories: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
            <Input placeholder="Public URL" value={form.publicUrl} onChange={(e) => setForm({ ...form, publicUrl: e.target.value })} />
            <Button onClick={create} disabled={creating} className="glow-hover">
              <Plus className="mr-2 h-4 w-4" />
              {creating ? "Adding..." : "Add Patent"}
            </Button>
          </div>

          <div className="space-y-2">
            <Input placeholder="Search patents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="glass bg-transparent" />
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((p) => (
                  <Card key={p.id} className="glass p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="font-medium">{p.title}</div>
                        <div className="text-sm text-muted-foreground">{p.number} • {p.status} • Filed: {p.filedDate}{p.grantedDate ? ` • Granted: ${p.grantedDate}` : ""}</div>
                        <div className="text-sm text-muted-foreground">{p.description}</div>
                        <div className="flex flex-wrap gap-1">
                          {(p.categories ?? []).map((c) => (
                            <Badge key={c} variant="outline" className="text-xs bg-transparent">{c}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent" onClick={() => startEdit(p)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => remove(p.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {editingId === p.id && (
                      <div className="space-y-2 border-t border-border/40 pt-3">
                        <Input placeholder="Title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Number" value={editForm.number} onChange={(e) => setEditForm({ ...editForm, number: e.target.value })} />
                          <Input placeholder="Status" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Filed Date" value={editForm.filedDate} onChange={(e) => setEditForm({ ...editForm, filedDate: e.target.value })} />
                          <Input placeholder="Granted Date" value={editForm.grantedDate} onChange={(e) => setEditForm({ ...editForm, grantedDate: e.target.value })} />
                        </div>
                        <Textarea placeholder="Description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                        <Input placeholder="Co-inventors (comma separated)" value={(editForm.coInventors ?? []).join(", ")} onChange={(e) => setEditForm({ ...editForm, coInventors: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
                        <Input placeholder="Categories (comma separated)" value={(editForm.categories ?? []).join(", ")} onChange={(e) => setEditForm({ ...editForm, categories: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} />
                        <Input placeholder="Public URL" value={editForm.publicUrl} onChange={(e) => setEditForm({ ...editForm, publicUrl: e.target.value })} />
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
