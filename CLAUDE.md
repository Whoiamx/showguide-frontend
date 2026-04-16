# Showguide Frontend

## Que es esto

Aplicacion frontend de Showguide construida con Next.js 14 App Router. Se encarga de toda la experiencia visual del producto y consume la API del backend separado.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS 4
- Motion

## Estado Actual

El frontend ya fue separado correctamente desde la raiz del monorepo y ahora vive en `frontend/`.

Corre en `3000` y depende de rewrites hacia el backend real en `3001`.

### Funcionalidades activas

- Landing page publica
- Seccion de pricing con planes Trial, Plus, Teams y Pro
- Dashboard de proyectos
- Crear proyecto
- Upload de video MP4/WebM
- Screen recorder
- Pantalla de procesamiento automatico
- Pantalla de procesamiento reforzada para procesos largos: reconciliacion de estado, mensajes contextuales y mejor feedback visual del loader sin sacar al usuario de la misma pantalla
- Editor de subtitulos
- Timeline avanzado
- Estilos de subtitulos
- Export UI
- i18n EN/ES/PT
- theme toggle
- toasts, confirm dialogs y undo/redo
- Base Supabase preparada para perfiles y prompts versionados del pipeline, aunque el frontend todavia no los consume directo

### Decision importante reciente

- Se descarto el intento de `cursor overlay` automatico en web.
- Motivo: con `getDisplayMedia()` el navegador entrega el video compartido, pero no expone un track confiable del cursor global ni de clicks fuera de la pestaña/app actual.
- No asumir que existe una feature de cursor agrandado real para uploads o screen recordings web.
- Si en el futuro se retoma, debe encararse como:
  - modo manual/semi-manual en el editor, o
  - app desktop con captura nativa.

## Relacion con el backend

- El frontend sigue llamando rutas `/api/*`.
- En desarrollo y build, Next hace rewrite hacia `NEXT_PUBLIC_API_URL`.
- Configuracion en `next.config.mjs`.
- El frontend debe correr en `3000` y el backend en `3001` para evitar loops de proxy.
- Para requests largas disparadas desde el browser (por ejemplo generacion de subtitulos), el frontend puede usar `NEXT_PUBLIC_API_URL` directo mediante helper para evitar falsos `500` del proxy local.

## Estructura principal

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── exports/
│   │   ├── usage/
│   │   ├── settings/
│   │   └── projects/
│   │       ├── new/page.tsx
│   │       └── [id]/
│   │           ├── page.tsx
│   │           ├── timeline.tsx
│   │           ├── processing-screen.tsx
│   │           └── subtitle-style-panel.tsx
│   ├── db/
│   │   └── schema.ts
│   └── lib/
│       ├── i18n.ts
│       ├── i18n-context.tsx
│       ├── toast-context.tsx
│       ├── confirm-dialog.tsx
│       ├── theme-context.tsx
│       └── use-undo-redo.ts
├── public/
├── package.json
├── tsconfig.json
├── next.config.mjs
└── CLAUDE.md
```

## Rutas UI

- `/`
- `/dashboard`
- `/exports`
- `/usage`
- `/settings`
- `/projects/new`
- `/projects/[id]`

## Archivos clave

- `src/app/page.tsx`: landing
- `src/lib/plans.ts`: catalogo visual de planes y precios del frontend
- `src/app/dashboard/page.tsx`: listado de proyectos
- `src/app/projects/new/page.tsx`: creacion + upload + screen recording simple desde navegador
- `src/app/projects/[id]/page.tsx`: editor principal de proyecto
- `src/app/projects/[id]/timeline.tsx`: timeline avanzado
- `src/app/projects/[id]/processing-screen.tsx`: pipeline visual
- `src/app/projects/[id]/subtitle-style-panel.tsx`: estilos de subtitulos
- `src/db/schema.ts`: tipos compartidos usados por el frontend para proyecto, markers y `videoEdits`
- `src/lib/api.ts`: helper para construir URLs directas al backend desde el cliente
- `src/lib/http.ts`: lectura tolerante de errores HTTP incluso cuando no vuelven en JSON
- `src/lib/i18n.ts`: textos traducidos

## Convenciones

- No debe haber API Routes dentro de `frontend/`.
- La logica de negocio y acceso a DB viven en el backend.
- Mantener el cliente enfocado en UI, estado local y consumo HTTP.
- El flujo de procesamiento debe mantener al usuario en la misma pantalla y llevarlo automaticamente al editor cuando subtitulos/timeline ya esten listos.
- Si un request largo queda incierto en cliente pero el backend siguio trabajando, reconciliar estado antes de mostrar error definitivo.
- La ayuda contextual de videos largos debe quedar como UI secundaria al final de la pantalla de procesamiento para no competir con el progreso principal.
- `videoEdits` hoy cubre trim y deleted sections. No documentar ni reintroducir cursor overlay automatico como si estuviera soportado.
- Sidebar, Settings y landing no deben hardcodear nombres de plan: usar el catalogo central de `src/lib/plans.ts`.

## Comandos

```bash
npm run dev:frontend
npm run build:frontend
npm run start:frontend
```

Puerto esperado del frontend:

```bash
http://localhost:3000
```

Los wrappers de la raiz liberan automaticamente `3000` antes de levantar el frontend.

O directamente por workspace:

```bash
npm run dev --workspace frontend
npm run build --workspace frontend
npm run start --workspace frontend
```

## Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Diagnostico rapido

- Si ves `Route GET:/projects/new not found`, estas entrando al backend en vez del frontend.
- Si ves `socket hang up` en `/api/*`, revisa que no haya una instancia de Next.js ocupando `3001`.
- El rewrite del frontend debe apuntar al backend real, no a otra instancia de Next.
- Si la generacion de subtitulos tarda mucho, la UI ahora debe seguir mostrando progreso, tiempo transcurrido y mensajes de tranquilidad en el idioma activo.
- El helper de procesos largos no debe parecer una alerta principal: usarlo como apoyo sutil debajo de la lista de pasos.
- Si se quiere resaltar el cursor en el futuro, no asumir que se puede leer el mouse global desde browser-only recording.

## Pendientes

- Validacion end-to-end completa del flujo upload -> frames -> subtitulos -> export
- Evaluar si conviene extraer tipos compartidos a un paquete comun cuando el contrato frontend/backend crezca
- Cuando entre auth real, reflejar plan y estado de suscripcion desde `profiles` en vez de usar fallback estatico
- Si el producto necesita cursor visible en videos, definir MVP manual/semi-manual antes de escribir codigo
