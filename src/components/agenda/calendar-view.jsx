import { useState, useMemo } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit2,
  MoreHorizontal,
  Trash2,
} from "lucide-react"
import { useAgenda, CATEGORY_DOT_COLORS, CATEGORY_LABELS } from "@/lib/agenda-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EventFormDialog } from "./event-form-dialog"
import { toast } from "sonner"

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]

const DAY_NAMES = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]

export function CalendarView() {
  const { events, selectedDate, setSelectedDate, deleteEvent } = useAgenda()
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth())
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear())

  const todayStr = new Date().toISOString().split("T")[0]
  const selectedStr = selectedDate.toISOString().split("T")[0]

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const eventsByDate = useMemo(() => {
    const map = {}
    events.forEach((e) => {
      if (!map[e.date]) map[e.date] = []
      map[e.date].push(e)
    })
    return map
  }, [events])

  const selectedEvents = useMemo(() => {
    return (eventsByDate[selectedStr] || []).sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    )
  }, [eventsByDate, selectedStr])

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const goToToday = () => {
    const now = new Date()
    setCurrentMonth(now.getMonth())
    setCurrentYear(now.getFullYear())
    setSelectedDate(now)
  }

  const calendarCells = []
  for (let i = 0; i < firstDay; i++) calendarCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-in">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Calendario
          </h2>
        </div>
        <EventFormDialog defaultDate={selectedStr} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar grid */}
        <Card className="lg:col-span-2 border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
                  <Clock className="h-4 w-4 text-primary-foreground" />
                </div>
                {MONTH_NAMES[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={goToToday} className="text-xs font-semibold hover:bg-primary hover:text-primary-foreground">
                  Hoy
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary" onClick={prevMonth} aria-label="Mes anterior">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary" onClick={nextMonth} aria-label="Mes siguiente">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_NAMES.map((d) => (
                <div
                  key={d}
                  className="py-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} className="aspect-square" />
                }
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const isToday = dateStr === todayStr
                const isSelected = dateStr === selectedStr
                const dayEvents = eventsByDate[dateStr] || []

                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(new Date(dateStr + "T12:00:00"))}
                    className={cn(
                      "group relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-medium transition-all",
                      isSelected
                        ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/30 scale-105"
                        : isToday
                          ? "bg-gradient-to-br from-primary/20 to-primary/10 font-bold text-primary ring-2 ring-primary/30 hover:scale-105"
                          : "text-foreground hover:bg-secondary/80 hover:scale-105 hover:shadow-md"
                    )}
                  >
                    {day}
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1.5 flex gap-0.5">
                        {dayEvents.slice(0, 3).map((ev) => (
                          <div
                            key={ev.id}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full shadow-sm",
                              isSelected ? "bg-primary-foreground/80" : CATEGORY_DOT_COLORS[ev.category]
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected day events */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">
              {selectedDate.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {selectedEvents.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/50">
                  <Clock className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">Sin eventos este día</p>
                <EventFormDialog
                  defaultDate={selectedStr}
                  trigger={
                    <Button variant="default" size="sm" className="mt-2">
                      Agregar evento
                    </Button>
                  }
                />
              </div>
            ) : (
              selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "group flex items-start gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-card to-card/50 p-4 transition-all hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
                    event.completed && "opacity-60"
                  )}
                >
                  <div className={cn("mt-1.5 h-3 w-3 shrink-0 rounded-full shadow-lg", CATEGORY_DOT_COLORS[event.category])} />
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-semibold text-foreground group-hover:text-primary transition-colors", event.completed && "line-through")}>
                      {event.title}
                    </p>
                    {event.description && (
                      <p className="mt-1 text-xs text-muted-foreground truncate">{event.description}</p>
                    )}
                    <p className="mt-1.5 text-xs text-muted-foreground font-medium">
                      {event.startTime} - {event.endTime} &middot; {CATEGORY_LABELS[event.category]}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 hover:bg-secondary">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Opciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <EventFormDialog
                        editEvent={event}
                        trigger={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        }
                      />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => {
                          deleteEvent(event.id)
                          toast.success("Evento eliminado")
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
