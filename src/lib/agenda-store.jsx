import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { saveData, getAllData, STORES } from "@/db"

export const CATEGORY_COLORS = {
  trabajo: "bg-chart-1 text-primary-foreground",
  personal: "bg-chart-2 text-primary-foreground",
  salud: "bg-accent text-accent-foreground",
  estudio: "bg-chart-4 text-primary-foreground",
  otro: "bg-muted-foreground text-primary-foreground",
}

export const CATEGORY_DOT_COLORS = {
  trabajo: "bg-chart-1",
  personal: "bg-chart-2",
  salud: "bg-accent",
  estudio: "bg-chart-4",
  otro: "bg-muted-foreground",
}

export const CATEGORY_LABELS = {
  trabajo: "Trabajo",
  personal: "Personal",
  salud: "Salud",
  estudio: "Estudio",
  otro: "Otro",
}

export const PRIORITY_LABELS = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
}

const AgendaContext = createContext(null)

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// IndexedDB utilities
const loadFromIndexedDB = async (storeName) => {
  try {
    const data = await getAllData(storeName)
    return data || []
  } catch (error) {
    console.error(`Error loading from IndexedDB ${storeName}:`, error)
    return []
  }
}

const saveToIndexedDB = async (storeName, data) => {
  try {
    await saveData(storeName, data)
  } catch (error) {
    console.error(`Error saving to IndexedDB ${storeName}:`, error)
  }
}

export function AgendaProvider({ children }) {
  const [events, setEvents] = useState([])
  const [tasks, setTasks] = useState([])
  const [notes, setNotes] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("dashboard")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from IndexedDB on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedEvents, loadedTasks, loadedNotes] = await Promise.all([
          loadFromIndexedDB(STORES.events),
          loadFromIndexedDB(STORES.tasks),
          loadFromIndexedDB(STORES.notes),
        ])

        setEvents(loadedEvents)
        setTasks(loadedTasks)
        setNotes(loadedNotes)
      } catch (error) {
        console.error("Error loading data from IndexedDB:", error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadData()
  }, [])

  // Save events to IndexedDB whenever they change
  useEffect(() => {
    if (isLoaded && events.length > 0) {
      saveToIndexedDB(STORES.events, events)
    }
  }, [events, isLoaded])

  // Save tasks to IndexedDB whenever they change
  useEffect(() => {
    if (isLoaded && tasks.length > 0) {
      saveToIndexedDB(STORES.tasks, tasks)
    }
  }, [tasks, isLoaded])

  // Save notes to IndexedDB whenever they change
  useEffect(() => {
    if (isLoaded && notes.length > 0) {
      saveToIndexedDB(STORES.notes, notes)
    }
  }, [notes, isLoaded])

  const addEvent = useCallback((event) => {
    setEvents((prev) => [...prev, { ...event, id: generateId(), completed: false }])
  }, [])

  const updateEvent = useCallback((id, update) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...update } : e)))
  }, [])

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const toggleEventComplete = useCallback((id) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)))
  }, [])

  const addTask = useCallback((task) => {
    setTasks((prev) => [...prev, { ...task, id: generateId(), completed: false }])
  }, [])

  const updateTask = useCallback((id, update) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...update } : t)))
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }, [])

  const addNote = useCallback((note) => {
    const now = new Date().toISOString().split("T")[0]
    setNotes((prev) => [...prev, { ...note, id: generateId(), createdAt: now, updatedAt: now }])
  }, [])

  const updateNote = useCallback((id, update) => {
    const now = new Date().toISOString().split("T")[0]
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...update, updatedAt: now } : n)))
  }, [])

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return (
    <AgendaContext.Provider
      value={{
        events,
        tasks,
        notes,
        selectedDate,
        viewMode,
        setSelectedDate,
        setViewMode,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleEventComplete,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </AgendaContext.Provider>
  )
}

export function useAgenda() {
  const context = useContext(AgendaContext)
  if (!context) {
    throw new Error("useAgenda must be used within an AgendaProvider")
  }
  return context
}
