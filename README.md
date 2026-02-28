# Web Personal Agenda

Una aplicación web moderna de agenda personal construida con React, que te permite organizar tus eventos, tareas y notas de manera eficiente. Toda la información se almacena localmente en tu navegador mediante IndexedDB.

## Características

- **Vista de Calendario**: Visualiza y gestiona tus eventos de forma intuitiva
- **Gestor de Tareas**: Organiza y completa tus tareas pendientes
- **Notas**: Crea y guarda notas importantes
- **Dashboard**: Panel de control con resumen de tu agenda
- **Almacenamiento Local**: Toda tu información se guarda en tu navegador (IndexedDB)
- **Interfaz Moderna**: Diseñada con Tailwind CSS y componentes Radix UI
- **PWA**: Instalable como aplicación progresiva

## Tecnologías

- **React 19** - Framework de interfaz de usuario
- **Vite** - Build tool y servidor de desarrollo
- **Tailwind CSS 4** - Framework de estilos
- **Radix UI** - Componentes de interfaz accesibles
- **IndexedDB** - Base de datos local del navegador
- **Lucide React** - Iconos
- **date-fns** - Manejo de fechas
- **Zod** - Validación de esquemas
- **React Hook Form** - Gestión de formularios

## Inicio Rápido

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm (gestor de paquetes)

### Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/JoseFM20/WebPersonalAgenda.git
cd WebPersonalAgenda
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

4. **Abre tu navegador**

La aplicación estará disponible en `http://localhost:3000`

## Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la versión de producción
```

## Estructura del Proyecto

```
PersonalAgenda2/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── agenda/     # Componentes de la agenda
│   │   └── ui/         # Componentes de interfaz reutilizables
│   ├── hooks/          # React hooks personalizados
│   ├── lib/            # Utilidades y stores
│   ├── App.jsx         # Componente principal
│   ├── db.js           # Configuración de IndexedDB
│   └── main.jsx        # Punto de entrada
├── package.json
└── vite.config.js
```

## Uso

1. **Eventos**: Crea eventos desde la vista de calendario especificando título, fecha y hora
2. **Tareas**: Añade tareas con prioridad y fecha de vencimiento
3. **Notas**: Guarda notas rápidas e ideas importantes
4. **Dashboard**: Visualiza un resumen de toda tu información

## Privacidad

Todos tus datos se almacenan localmente en tu navegador. No se envía ninguna información a servidores externos.

## Licencia

Este proyecto es de código privado.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

---

Desarrollado usando React y Vite
