# Web Personal Agenda

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)]()

Una aplicación web moderna de agenda personal construida con React, que te permite organizar tus eventos, tareas y notas de manera eficiente. Toda la información se almacena localmente en tu navegador mediante IndexedDB.

---

## Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Inicio Rápido](#inicio-rápido)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Privacidad](#privacidad)

## Características

<table>
<tr>
<td width="25%"><b>Calendario</b></td>
<td>Visualiza y gestiona tus eventos de forma intuitiva</td>
</tr>
<tr>
<td><b>Gestor de Tareas</b></td>
<td>Organiza y completa tus tareas pendientes con prioridades</td>
</tr>
<tr>
<td><b>Notas</b></td>
<td>Crea y guarda notas importantes</td>
</tr>
<tr>
<td><b>Dashboard</b></td>
<td>Panel de control con resumen de tu agenda</td>
</tr>
<tr>
<td><b>Almacenamiento Local</b></td>
<td>Toda tu información se guarda en tu navegador (IndexedDB)</td>
</tr>
<tr>
<td><b>Interfaz Moderna</b></td>
<td>Diseñada con Tailwind CSS y componentes Radix UI</td>
</tr>
<tr>
<td><b>PWA</b></td>
<td>Instalable como aplicación progresiva en tu dispositivo</td>
</tr>
</table>

## Tecnologías

<table>
<tr>
<td width="25%"><b>React 19</b></td>
<td>Framework de interfaz de usuario</td>
</tr>
<tr>
<td><b>Vite</b></td>
<td>Build tool y servidor de desarrollo</td>
</tr>
<tr>
<td><b>Tailwind CSS 4</b></td>
<td>Framework de estilos basado en utilidades</td>
</tr>
<tr>
<td><b>Radix UI</b></td>
<td>Componentes de interfaz accesibles</td>
</tr>
<tr>
<td><b>IndexedDB</b></td>
<td>Base de datos local del navegador</td>
</tr>
<tr>
<td><b>Lucide React</b></td>
<td>Iconos modernos</td>
</tr>
<tr>
<td><b>date-fns</b></td>
<td>Manejo de fechas y horas</td>
</tr>
<tr>
<td><b>Zod</b></td>
<td>Validación de esquemas</td>
</tr>
<tr>
<td><b>React Hook Form</b></td>
<td>Gestión de formularios eficiente</td>
</tr>
</table>

## Inicio Rápido

### Prerrequisitos

- **Node.js** versión 16 o superior
- **npm** o **pnpm** (gestor de paquetes)

---

### Instalación

<details open>
<summary><b>Pasos de instalación</b></summary>

**Paso 1: Clona el repositorio**
```bash
git clone https://github.com/JoseFM20/WebPersonalAgenda.git
cd WebPersonalAgenda
```

**Paso 2: Instala las dependencias**
```bash
npm install
```

**Paso 3: Inicia el servidor de desarrollo**
```bash
npm run dev
```

**Paso 4: Abre en tu navegador**
```
http://localhost:3000
```

> La aplicación se abrirá automáticamente en tu navegador predeterminado.

</details>

## Scripts Disponibles

<table>
<tr>
<td width="25%"><b>npm run dev</b></td>
<td>Inicia el servidor de desarrollo en puerto 3000</td>
</tr>
<tr>
<td><b>npm run build</b></td>
<td>Construye la aplicación optimizada para producción</td>
</tr>
<tr>
<td><b>npm run preview</b></td>
<td>Previsualiza la versión de producción localmente</td>
</tr>
</table>

## Estructura del Proyecto

```
WebPersonalAgenda/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/         # Componentes React reutilizables
│   │   ├── agenda/        # Componentes específicos de la agenda
│   │   │   ├── app-shell.jsx
│   │   │   ├── calendar-view.jsx
│   │   │   ├── dashboard-view.jsx
│   │   │   ├── event-form-dialog.jsx
│   │   │   ├── notes-view.jsx
│   │   │   ├── sidebar-nav.jsx
│   │   │   └── tasks-view.jsx
│   │   └── ui/             # Componentes base de interfaz
│   ├── hooks/              # React hooks personalizados
│   ├── lib/                # Utilidades y stores
│   │   ├── agenda-store.jsx
│   │   └── utils.js
│   ├── App.jsx             # Componente principal
│   ├── db.js               # Configuración de IndexedDB
│   └── main.jsx            # Punto de entrada
├── package.json
├── vite.config.js
└── README.md
```

## Uso

### Gestión de Eventos
Crea eventos desde la vista de calendario especificando título, fecha y hora. Los eventos se guardan automáticamente en tu navegador.

### Organizador de Tareas
Añade tareas con prioridad y fecha de vencimiento. Marca las tareas como completadas según avances.

### Notas Rápidas
Guarda notas rápidas e ideas importantes de forma segura en tu dispositivo.

### Dashboard
Visualiza un resumen de toda tu información de un vistazo con el panel de control.

---

## Privacidad

> Tu privacidad es importante para nosotros. Todos tus datos se almacenan **localmente en tu navegador**. No se envía ninguna información a servidores externos ni a terceros.

## Licencia

Este proyecto es de código privado.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

---

Desarrollado con React y Vite | Última actualización: Febrero 2026
