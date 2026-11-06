# Arquitectura

## Decisión

**Next.js 15 (App Router) con `output: 'export'`**, publicado en GitHub Pages.

- Next.js y React ya se usaron en Focus Mind, así que el mantenimiento no exige aprender una herramienta nueva.
- El export estático genera HTML por ruta (SEO, sin servidor) y permite alojarlo gratis en GitHub Pages.
- No hay backend ni base de datos: no existe una necesidad que los justifique.
- Se probó primero Astro y se descartó porque el autor no lo ha usado.

Limitación del export: `next/image` no optimiza en el servidor. Las imágenes se convierten a WebP antes de compilar con `scripts/optimize-images.mjs` (sharp).

## Estructura

```
src/data/        contenido: site.ts (perfil, trayectoria, terminal), projects.ts, stack.ts, images.json (generado)
src/app/         layout, portada, ruta dinámica proyectos/[slug], sitemap, robots, 404
src/components/  Hero, Terminal, ProjectsExplorer, ProjectCard, SkillGraph, Sections, CommandPalette, Chrome
src/lib/paths.ts rutas con el basePath de GitHub Pages
src/styles/      variables de diseño y estilos globales (los demás son CSS Modules)
raw-assets/      capturas originales (PNG); public/projects las contiene ya en WebP
scripts/         optimize-images, make-assets (og.png y CV), serve, verify-site
```

## Flujo de datos

`projects.ts` es la única fuente de proyectos. De ahí salen la portada, las tarjetas, las páginas de detalle, el sitemap, la paleta de comandos y el grafo de habilidades (`SkillGraph` deriva las conexiones tecnología–proyecto de `projects[].stack`).

## Diseño

Tema oscuro por defecto con interruptor claro/oscuro. Tipografía Geist y Geist Mono (autoalojadas con `@fontsource-variable`). Un solo color de acento. Elementos propios: terminal del hero, paleta Ctrl+K y grafo de evidencia. Las animaciones respetan `prefers-reduced-motion`.

## Decisiones técnicas

| Decisión | Motivo |
|---|---|
| Capturas etiquetadas como render, dispositivo o producción | Tres proyectos usan renders de Roborazzi con datos ficticios; no se presentan como capturas reales |
| Sin formulario de contacto | No hay backend; se ofrece correo con enlace y botón de copiar |
| CV generado desde los datos del sitio | Evita publicar teléfono, cédula, dirección y referencias del original |
| Año del pie calculado en el navegador | El sitio estático no queda desactualizado en enero |
| Paleta en portal sobre `body` | El header usa `backdrop-filter`, que rompe `position: fixed` en descendientes |
