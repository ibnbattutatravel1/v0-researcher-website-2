"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"

type Award = {
  id?: number
  title: string
  organization: string
  year: string
  category: string
  amount?: string
  description: string
}

export function AwardsManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Award>({
    title: "",
    organization: "",
    year: "2024",
    category: "",
    amount: "",
    description: "",
  })
  const [form, setForm] = useState<Award>({
    title: "",
    organization: "",
    year: "2024",
    category: "",
    amount: "",
    description: "",
  })

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/awards", { cache: "no-store" })
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
    () => items.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery],
  )

  const create = async () => {
    setCreating(true)
    try {
      const res = await fetch("/api/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm({ title: "", organization: "", year: "2024", category: "", amount: "", description: "" })
        await load()
      }
    } finally {
      setCreating(false)
    }
  }

  const remove = async (id?: number) => {
    if (!id) return
    await fetch(`/api/awards/${id}`, { method: "DELETE" })
    await load()
  }

  const startEdit = (a: Award) => {
    setEditingId(a.id ?? null)
    setEditForm({
      title: a.title,
      organization: a.organization,
      year: a.year,
      category: a.category,
      amount: a.amount ?? "",
      description: a.description,
    })
  }

  const saveEdit = async () => {
    if (!editingId) return
    await fetch(`/api/awards/${editingId}`, {
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
        <h3 className="text-lg font-semibold">Awards</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
              <Input type="date" placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <Input placeholder="Amount (optional)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Button onClick={create} disabled={creating} className="glow-hover">
              <Plus className="mr-2 h-4 w-4" />
              {creating ? "Adding..." : "Add Award"}
            </Button>
          </div>

          <div className="space-y-2">
            <Input placeholder="Search awards..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="glass bg-transparent" />
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((a) => (
                  <Card key={a.id} className="glass p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="font-medium">{a.title}</div>
                        <div className="text-sm text-muted-foreground">{a.organization} • {a.year} • {a.category} {a.amount ? `• ${a.amount}` : ""}</div>
                        <div className="text-sm text-muted-foreground">{a.description}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent" onClick={() => startEdit(a)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => remove(a.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {editingId === a.id && (
                      <div className="space-y-2 border-t border-border/40 pt-3">
                        <Input placeholder="Title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Organization" value={editForm.organization} onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })} />
                          <Input type="date" placeholder="Year" value={editForm.year} onChange={(e) => setEditForm({ ...editForm, year: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Category" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} />
                          <Input placeholder="Amount" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} />
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
