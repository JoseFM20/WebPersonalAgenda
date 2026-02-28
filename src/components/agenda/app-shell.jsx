import { useAgenda } from "@/lib/agenda-store"
import { SidebarNav } from "./sidebar-nav"
import { DashboardView } from "./dashboard-view"
import { CalendarView } from "./calendar-view"
import { TasksView } from "./tasks-view"
import { NotesView } from "./notes-view"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AppShell() {
  const { viewMode } = useAgenda()

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-5xl p-4 pt-16 md:p-8 md:pt-8">
            {viewMode === "dashboard" && <DashboardView />}
            {viewMode === "calendar" && <CalendarView />}
            {viewMode === "tasks" && <TasksView />}
            {viewMode === "notes" && <NotesView />}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
