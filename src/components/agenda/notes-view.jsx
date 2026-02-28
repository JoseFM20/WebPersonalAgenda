import { useState } from "react"
import { Edit2, Plus, StickyNote, Trash2 } from "lucide-react"
import { useAgenda } from "@/lib/agenda-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export function NotesView() {
  const { notes, addNote, updateNote, deleteNote } = useAgenda()
  const [createOpen, setCreateOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleCreate = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error("El titulo es obligatorio")
      return
    }
    addNote({ title: title.trim(), content: content.trim() })
    toast.success("Nota creada")
    setTitle("")
    setContent("")
    setCreateOpen(false)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (!editingId || !title.trim()) return
    updateNote(editingId, { title: title.trim(), content: content.trim() })
    toast.success("Nota actualizada")
    setEditingId(null)
    setTitle("")
    setContent("")
  }

  const startEdit = (note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setTitle("")
    setContent("")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-in">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Notas
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-medium">{notes.length} notas guardadas</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 shadow-lg">
              <Plus className="h-4 w-4" />
              Nueva Nota
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nueva Nota</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="note-title">Titulo</Label>
                <Input
                  id="note-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titulo de la nota"
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="note-content">Contenido</Label>
                <Textarea
                  id="note-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe aqui..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notes grid */}
      {notes.length === 0 ? (
        <Card className="border-0 shadow-xl">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-chart-5/20 to-chart-5/10">
              <StickyNote className="h-10 w-10 text-chart-5" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">Aún no tienes notas</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => {
            const isEditing = editingId === note.id

            if (isEditing) {
              return (
                <Card key={note.id} className="border-2 border-primary shadow-lg shadow-primary/20 animate-in">
                  <CardContent className="p-5">
                    <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-sm font-semibold"
                        autoFocus
                      />
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="text-sm"
                      />
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
                          Cancelar
                        </Button>
                        <Button type="submit" size="sm">
                          Guardar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )
            }

            return (
              <Card key={note.id} className="group hover-lift border-0 shadow-lg bg-gradient-to-br from-card to-card/95">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{note.title}</h3>
                    <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-secondary"
                        onClick={() => startEdit(note)}
                        aria-label="Editar nota"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          deleteNote(note.id)
                          toast.success("Nota eliminada")
                        }}
                        aria-label="Eliminar nota"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-4">
                    {note.content || "Sin contenido"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70 font-medium">
                    Actualizada:{" "}
                    {new Date(note.updatedAt + "T12:00:00").toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
