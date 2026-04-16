# Frontend Showguide

## Comunicacion

- Comunicar siempre en espanol.
- Explicar paso a paso lo que se modifica en UI o integraciones.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS 4

## Rutas Relevantes

- `src/app/projects/new/page.tsx`: alta de proyecto y upload/recording
- `src/app/projects/[id]/page.tsx`: detalle del proyecto, editor, export y descarga
- `src/lib/http.ts`: lectura de errores HTTP del backend

## Contrato con Backend

- El frontend debe priorizar `downloadUrl` devuelta por `POST /api/projects/:id/export` y no reconstruir manualmente una URL ambigua.
- Los errores del backend pueden llegar con `code`, `message`, `error` y `details`. La UI debe seguir leyendo mensajes sin depender solo de una clave.
- La descarga de export debe identificar exactamente la calidad exportada.

## Estado Actual

- El detalle de proyecto guarda la `downloadUrl` del ultimo export generado y la usa en el boton de descarga.
- El frontend sigue siendo compatible con respuestas viejas porque `readErrorMessage()` soporta `error` y `message`.
