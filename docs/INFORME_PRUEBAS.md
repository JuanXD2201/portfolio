# Informe de pruebas

Fecha: 2026-11-06. Entorno: Windows 10, Node 25.9, Chrome 64 bits, Next.js 15.3.8.

## Qué se ejecutó

| Comprobación | Comando | Resultado |
|---|---|---|
| Tipos | `npx tsc --noEmit` | 0 errores |
| Compilación estática | `npx next build` | 13 páginas generadas, 113 kB de JS inicial en portada |
| Auditoría del sitio exportado | `npm test` (`scripts/verify-site.mjs`, Playwright + Chrome) | 57 de 59 superadas; 2 fallos esperados (ver abajo) |
| firestore-rules-lint | `npm test` en su repositorio | 11 de 11 |
| postulaciones-api | `npm test` en su repositorio | 14 de 14 |

## Cobertura de `npm test` (sitio)

- Estado HTTP, un solo `h1`, `title`, sin errores de consola y sin imágenes rotas en las 8 rutas y en la página 404.
- Enlaces internos de la portada (9) y externos (GitHub, LinkedIn, demo ESP32).
- Existencia de CV, `sitemap.xml`, `robots.txt` y `og.png`.
- Filtros de proyectos, paleta de comandos (Ctrl+K, búsqueda y Enter), cambio de tema, enlace «Saltar al contenido» con Tab.
- Sin scroll horizontal en 1920×1080, 1366×768, 768×1024 y 390×844; menú móvil abre en 390×844.
- Capturas por viewport en `screenshots/` (ignorada por Git).

## Fallos y su causa

Los dos fallos son enlaces a `firestore-rules-lint` y `postulaciones-api` en GitHub (404): los repositorios aún no estaban publicados cuando se ejecutó la auditoría. Se resuelven al publicarlos.

LinkedIn responde 999 a clientes automatizados; se trata como válido porque no indica un enlace roto.

## Verificado por el autor

El autor verificó por su cuenta el funcionamiento de los proyectos mostrados.

## Revisión adicional

- Revisión visual de la portada en 1366×768, 1920×1080 (página completa) y 390×844.
- El PDF del CV no contiene teléfono, cédula, dirección ni referencias (búsqueda de esas cadenas en el texto extraído: 0 coincidencias).
