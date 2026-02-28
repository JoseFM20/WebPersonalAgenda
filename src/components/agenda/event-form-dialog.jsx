import { useEffect, useState } from "react"
import { useAgenda, CATEGORY_LABELS } from "@/lib/agenda-store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Plus } from "lucide-react"

export function EventFormDialog({ editEvent, trigger, defaultDate, onClose }) {
  const { addEvent, updateEvent } = useAgenda()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(editEvent?.title ?? "")
  const [description, setDescription] = useState(editEvent?.description ?? "")
  const [date, setDate] = useState(editEvent?.date ?? defaultDate ?? new Date().toISOString().split("T")[0])
  const [startTime, setStartTime] = useState(editEvent?.startTime ?? "09:00")
  const [endTime, setEndTime] = useState(editEvent?.endTime ?? "10:00")
  const [category, setCategory] = useState(editEvent?.category ?? "personal")

  useEffect(() => {
    if (!open) return
    if (editEvent) {
      setTitle(editEvent.title ?? "")
      setDescription(editEvent.description ?? "")
      setDate(editEvent.date ?? new Date().toISOString().split("T")[0])
      setStartTime(editEvent.startTime ?? "09:00")
      setEndTime(editEvent.endTime ?? "10:00")
      setCategory(editEvent.category ?? "personal")
      return
    }

    setDate(defaultDate ?? new Date().toISOString().split("T")[0])
  }, [open, editEvent, defaultDate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error("El titulo es obligatorio")
      return
    }

    if (editEvent) {
      updateEvent(editEvent.id, { title, description, date, startTime, endTime, category })
      toast.success("Evento actualizado")
    } else {
      addEvent({ title, description, date, startTime, endTime, category })
      toast.success("Evento creado")
    }

    setOpen(false)
    onClose?.()
    if (!editEvent) {
      setTitle("")
      setDescription("")
      setDate(defaultDate ?? new Date().toISOString().split("T")[0])
      setStartTime("09:00")
      setEndTime("10:00")
      setCategory("personal")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Nuevo Evento
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editEvent ? "Editar Evento" : "Nuevo Evento"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-title">Titulo</Label>
            <Input
              id="event-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre del evento"
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-desc">Descripcion</Label>
            <Textarea
              id="event-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles del evento"
              rows={2}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-date">Fecha</Label>
            <Input
              id="event-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-start">Inicio</Label>
              <Input
                id="event-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-end">Fin</Label>
              <Input
                id="event-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-cat">Categoria</Label>
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger id="event-cat">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{editEvent ? "Guardar" : "Crear"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
