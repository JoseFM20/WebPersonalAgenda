import {
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  StickyNote,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { useAgenda } from "@/lib/agenda-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Panel", value: "dashboard", icon: LayoutDashboard },
  { label: "Calendario", value: "calendar", icon: CalendarDays },
  { label: "Tareas", value: "tasks", icon: CheckSquare },
  { label: "Notas", value: "notes", icon: StickyNote },
]

export function SidebarNav() {
  const { viewMode, setViewMode } = useAgenda()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-all duration-300 md:static md:translate-x-0",
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
            <CalendarDays className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-sidebar-foreground">Mi Agenda</h1>
            <p className="text-xs text-muted-foreground">Organiza tu día</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1.5" role="list">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = viewMode === item.value
              return (
                <li key={item.value}>
                  <button
                    onClick={() => {
                      setViewMode(item.value)
                      setMobileOpen(false)
                    }}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground hover:scale-[1.01]"
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    <Icon className={cn("h-5 w-5 transition-transform", isActive && "scale-110")} />
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 p-4 border border-accent/20 hover-lift">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <p className="text-xs font-semibold text-sidebar-foreground">💡 Tip del día</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Planifica tu semana los domingos para mantener el control de tus actividades.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
