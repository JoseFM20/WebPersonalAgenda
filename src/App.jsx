import { useEffect } from 'react'
import { AgendaProvider } from '@/lib/agenda-store'
import { AppShell } from '@/components/agenda/app-shell'
import { Toaster, toast } from 'sonner'

export default function App() {
  useEffect(() => {
    // Listen for offline status
    const handleOffline = () => {
      toast.warning('Sin conexión a internet', {
        description: 'Tus datos se guardan localmente',
        duration: 2000,
      })
    }

    // Listen for online status
    const handleOnline = () => {
      toast.success('Conexión restaurada', {
        description: 'Ya estás en línea',
        duration: 2000,
      })
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    // Cleanup
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  return (
    <AgendaProvider>
      <AppShell />
      <Toaster richColors position="top-right" />
    </AgendaProvider>
  )
}
