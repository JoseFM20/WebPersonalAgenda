import { useState } from "react"
import {
  CheckCircle2,
  Circle,
  Edit2,
  Filter,
  Plus,
  Trash2,
} from "lucide-react"
import { useAgenda, PRIORITY_LABELS } from "@/lib/agenda-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function TasksView() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useAgenda()
  const [filter, setFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [newPriority, setNewPriority] = useState("media")
  const [newDueDate, setNewDueDate] = useState("")

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.completed
    if (filter === "completed") return t.completed
    return true
  })

  const pendingCount = tasks.filter((t) => !t.completed).length
  const completedCount = tasks.filter((t) => t.completed).length

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) {
      toast.error("El titulo es obligatorio")
      return
    }
    if (editingTask) {
      updateTask(editingTask.id, {
        title: newTitle.trim(),
        priority: newPriority,
        dueDate: newDueDate || null,
      })
      toast.success("Tarea actualizada")
    } else {
      addTask({
        title: newTitle.trim(),
        priority: newPriority,
        dueDate: newDueDate || null,
      })
      toast.success("Tarea creada")
    }
    setNewTitle("")
    setNewPriority("media")
    setNewDueDate("")
    setEditingTask(null)
    setDialogOpen(false)
  }

  const startNewTask = () => {
    setEditingTask(null)
    setNewTitle("")
    setNewPriority("media")
    setNewDueDate("")
    setDialogOpen(true)
  }

  const startEditTask = (task) => {
    setEditingTask(task)
    setNewTitle(task.title ?? "")
    setNewPriority(task.priority ?? "media")
    setNewDueDate(task.dueDate ?? "")
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-in">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Tareas
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            {pendingCount} pendientes · {completedCount} completadas
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 shadow-lg" onClick={startNewTask}>
              <Plus className="h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTask ? "Editar Tarea" : "Nueva Tarea"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTask} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="task-title">Titulo</Label>
                <Input
                  id="task-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Que necesitas hacer?"
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="task-priority">Prioridad</Label>
                <Select value={newPriority} onValueChange={(v) => setNewPriority(v)}>
                  <SelectTrigger id="task-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="task-due">Fecha limite (opcional)</Label>
                <Input
                  id="task-due"
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingTask ? "Guardar" : "Crear"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/10">
          <Filter className="h-4 w-4 text-accent" />
        </div>
        {["all", "pending", "completed"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
            className="text-xs font-semibold"
          >
            {f === "all" ? "Todas" : f === "pending" ? "Pendientes" : "Completadas"}
          </Button>
        ))}
      </div>

      {/* Task list */}
      <Card className="border-0 shadow-xl">
        <CardContent className="p-0">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {filter === "completed" ? "No hay tareas completadas" : "No hay tareas pendientes"}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border/50" role="list">
              {filteredTasks.map((task) => (
                <li key={task.id} className="group flex items-center gap-4 px-5 py-4 transition-all hover:bg-gradient-to-r hover:from-secondary/80 hover:to-secondary/40">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="shrink-0 group-hover:scale-110 transition-transform"
                    aria-label={task.completed ? "Marcar como pendiente" : "Completar tarea"}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-semibold", task.completed && "line-through text-muted-foreground")}>
                      {task.title}
                    </p>
                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground font-medium mt-1">
                        Vence:{" "}
                        {new Date(task.dueDate + "T12:00:00").toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    )}
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
                      task.priority === "alta" && "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground",
                      task.priority === "media" && "bg-gradient-to-r from-chart-4 to-chart-4/90 text-white",
                      task.priority === "baja" && "bg-gradient-to-r from-muted to-muted/80 text-muted-foreground"
                    )}
                  >
                    {PRIORITY_LABELS[task.priority]}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => startEditTask(task)}
                    aria-label="Editar tarea"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      deleteTask(task.id)
                      toast.success("Tarea eliminada")
                    }}
                    aria-label="Eliminar tarea"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
