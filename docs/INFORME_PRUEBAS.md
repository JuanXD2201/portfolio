# Informe de pruebas

Solo se registra lo que se ejecutó. Entorno: Windows, Node 25.9, Chrome instalado, build de producción servido desde `out/` bajo `/portfolio/`.

| Comprobación | Comando | Resultado |
|---|---|---|
| Tipos | `npx tsc --noEmit` | sin errores |
| Build | `npm run build` | 14 páginas estáticas (portada, 8 casos de estudio, 404, robots, sitemap y rutas internas); 42 imágenes optimizadas |
| JS de la ruta `/` | salida de `next build` | 124 kB de «First Load JS» (101 kB compartidos + 8,33 kB propios), gzip según Next |
| Verificación del sitio | `npm test` | 150 de 150 comprobaciones superadas (última ejecución) |

## Qué cubre `npm test`

- Rutas descubiertas desde `sitemap.xml` (portada y los 8 proyectos) y la 404: estado HTTP, consola sin errores ni peticiones fallidas, imágenes cargadas y con `width`/`height`, un solo `h1`, `title`, `description`, `canonical`, `og:image`, enlaces y botones con nombre accesible, y ausencia de palabras internas o de redes no usadas en el texto y el HTML.
- Demos de `public/labs/*` (Ledger e InjectionLab): HTTP 200, sin errores de consola ni recursos fallidos, contenido renderizado, fuentes cargadas y WASM servido como `application/wasm`.
- Portada: enlaces internos y externos, CV, sitemap, robots, `og.png` y favicon; `tel:+573123431825`, `wa.me/573123431825` con mensaje en español, `mailto:`, botones de copiar con confirmación `role="status"` y contenido del portapapeles; descarga del CV; filtros; botones «Abrir demo»; mapa de especialidades con teclado; paleta Ctrl+K (proyectos, laboratorios, contacto, tema y WhatsApp); cambio de tema; «Saltar al contenido»; progreso de lectura; «volver arriba».
- Responsive en 1920×1080, 1366×768, 768×1024 y 390×844 para la portada y dos casos de estudio: sin scroll horizontal y sin solapamientos entre textos, enlaces y botones; menú móvil.
- `prefers-reduced-motion`: carga sin errores y con el núcleo dibujado.

## Rendimiento (Chrome headless, equipo con Celeron N4020 y 4 GB)

Medido con la API de Performance durante `npm test` (última ejecución):

| Métrica | Valor |
|---|---|
| JS transferido en la portada (sin comprimir) | 413 KB |
| Peso total de la portada sin imágenes diferidas | 705 KB |
| FCP / LCP | 1000 ms / 1332 ms |
| CLS | 0,000 |
| Tiempo en tareas largas durante la carga | 254 ms (entre 254 y 512 ms según la ejecución) |
| Fotogramas por segundo con el núcleo animado | 60,5 |

No se ejecutó Lighthouse. Las cifras de rendimiento provienen de una sola máquina y varían entre ejecuciones.

## Revisión visual

Las capturas de `screenshots/` (carpeta ignorada por Git) se revisaron una por una en los cuatro tamaños, en tema oscuro y claro, y se corrigieron: etiquetas del núcleo recortadas en pantallas pequeñas, espaciado de los casos de estudio, imágenes altas de los laboratorios y cabeceras de sección sin color de acento.

## No verificado

- Accesibilidad con lector de pantalla y contraste medido con herramienta externa (el diseño usa pares de color AA por construcción, sin auditoría automática).
- Navegadores distintos de Chrome.
- Fotogramas por segundo en hardware sin aceleración distinta de la del equipo de desarrollo.
