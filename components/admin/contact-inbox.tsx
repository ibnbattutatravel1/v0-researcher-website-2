"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: number
  name: string
  email: string
  subject?: string
  message: string
  createdAt: string
  read: boolean
}

export function ContactInbox() {
  const [items, setItems] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/contact-messages", { cache: "no-store" })
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const markRead = async (id: number, read = true) => {
    setUpdatingId(id)
    try {
      await fetch(`/api/contact-messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      })
      await load()
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Contact Inbox</h3>
        <div className="text-sm text-muted-foreground">Unread: {items.filter((m) => !m.read).length}</div>
      </div>

      {loading ? (
        <Card className="glass p-6">Loading messages...</Card>
      ) : items.length === 0 ? (
        <Card className="glass p-6 text-sm text-muted-foreground">No messages yet.</Card>
      ) : (
        <div className="space-y-3">
          {items.map((m) => (
            <Card key={m.id} className="glass p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.email}</div>
                    {!m.read && <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">Unread</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">{m.subject}</div>
                  <div className="text-sm text-foreground whitespace-pre-wrap">{m.message}</div>
                  <div className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  {m.read ? (
                    <Button variant="outline" size="sm" onClick={() => markRead(m.id, false)} disabled={updatingId === m.id}>
                      Mark as Unread
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => markRead(m.id, true)} disabled={updatingId === m.id}>
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
