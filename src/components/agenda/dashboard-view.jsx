import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  ListChecks,
  StickyNote,
  TrendingUp,
} from "lucide-react"
import { useAgenda, CATEGORY_DOT_COLORS, CATEGORY_LABELS } from "@/lib/agenda-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { EventFormDialog } from "./event-form-dialog"

export function DashboardView() {
  const { events, tasks, notes, setViewMode } = useAgenda()
  const todayStr = new Date().toISOString().split("T")[0]

  const todayEvents = events.filter((e) => e.date === todayStr)
  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  const upcomingEvents = events
    .filter((e) => e.date >= todayStr && !e.completed)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-in">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Buenos días ✨
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <EventFormDialog />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="cursor-pointer group hover-lift border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" onClick={() => setViewMode("calendar")}>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <CalendarDays className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{todayEvents.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Eventos hoy</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer group hover-lift border-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent" onClick={() => setViewMode("tasks")}>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
              <ListChecks className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{pendingTasks.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Tareas pendientes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-chart-4/10 via-chart-4/5 to-transparent">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-chart-4 to-chart-4/80 shadow-lg shadow-chart-4/20">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{completionRate}%</p>
              <p className="text-xs text-muted-foreground font-medium">Completado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer group hover-lift border-0 bg-gradient-to-br from-chart-5/10 via-chart-5/5 to-transparent" onClick={() => setViewMode("notes")}>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-chart-5 to-chart-5/80 shadow-lg shadow-chart-5/20 group-hover:scale-110 transition-transform">
              <StickyNote className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{notes.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Notas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Upcoming events */}
        <Card className="lg:col-span-3 border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
                <Clock className="h-4 w-4 text-primary-foreground" />
              </div>
              Próximos eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {upcomingEvents.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/50">
                  <Clock className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  No tienes eventos próximos
                </p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group flex items-center gap-4 rounded-xl border border-border/50 bg-gradient-to-r from-card to-card/50 p-4 transition-all hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
                >
                  <div className={cn("h-3 w-3 shrink-0 rounded-full shadow-lg", CATEGORY_DOT_COLORS[event.category])} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{event.title}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {event.date === todayStr
                        ? "Hoy"
                        : new Date(event.date + "T12:00:00").toLocaleDateString("es-ES", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                      {" "}
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gradient-to-r from-secondary to-secondary/80 px-3 py-1 text-xs font-medium text-secondary-foreground shadow-sm">
                    {CATEGORY_LABELS[event.category]}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick tasks */}
        <Card className="lg:col-span-2 border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80 shadow-lg shadow-accent/20">
                <ListChecks className="h-4 w-4 text-accent-foreground" />
              </div>
              Tareas pendientes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {pendingTasks.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Todas las tareas completadas ✨
                </p>
              </div>
            ) : (
              pendingTasks.slice(0, 5).map((task) => (
                <TaskQuickItem key={task.id} task={task} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TaskQuickItem({ task }) {
  const { toggleTask } = useAgenda()
  return (
    <button
      onClick={() => toggleTask(task.id)}
      className="group flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-card to-card/50 p-3 text-left transition-all hover:shadow-md hover:border-accent/30 hover:-translate-y-0.5"
    >
      {task.completed ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent group-hover:scale-110 transition-transform" />
      ) : (
        <Circle className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-accent transition-colors" />
      )}
      <span className={cn("text-sm flex-1 font-medium", task.completed && "line-through text-muted-foreground")}>
        {task.title}
      </span>
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm",
          task.priority === "alta" && "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground",
          task.priority === "media" && "bg-gradient-to-r from-chart-4 to-chart-4/90 text-white",
          task.priority === "baja" && "bg-gradient-to-r from-muted to-muted/80 text-muted-foreground"
        )}
      >
        {task.priority === "alta" ? "Alta" : task.priority === "media" ? "Media" : "Baja"}
      </span>
    </button>
  )
}
