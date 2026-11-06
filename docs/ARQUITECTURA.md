# Arquitectura

Sitio estático generado con Next.js (`output: 'export'`, `trailingSlash: true`). El contenido vive en `src/data/` y los componentes solo lo presentan, de modo que agregar un proyecto o un laboratorio es una entrada de datos.

## Estructura

```
src/
  app/                    layout, portada, /proyectos/[slug], sitemap, robots, 404
  components/
    Hero, Core, HeroLive  portada: núcleo Canvas 2D, paneles y reloj de Bogotá
    Sections              Sobre mí, Especialidades, Trayectoria y Contacto (servidor)
    SkillMap              mapa radial de especialidades (cliente) con lista alternativa
    ProjectsExplorer      filtros y tres grupos de proyectos
    ProjectCard           PosterCard (grado), LabCard (laboratorio), RowCard (asignatura)
    Contact               canales de contacto y botones de copiar
    Chrome                cabecera, pie, riel de secciones, progreso y «volver arriba»
    CommandPalette        paleta Ctrl+K
  data/                   site.ts, stack.ts, projects.ts, images.json (generado)
  lib/paths.ts            asset() y route(): respetan el basePath
  styles/global.css       tokens y utilidades
raw-assets/projects/      imágenes originales por proyecto
public/                   favicon, og.png, CV, projects/ (WebP generados) y labs/ (demos compiladas)
scripts/                  optimize-images, make-assets, serve, verify-site, deploy-pages
docs/                     esta documentación
```

## Flujo de datos

- `site.ts`: datos personales, navegación, «Sobre mí», trayectoria y las áreas del mapa (`areas`).
- `stack.ts`: tecnologías con el campo `proof` (proyecto o repositorio que las respalda). El mapa solo muestra tecnologías presentes aquí.
- `projects.ts`: proyectos con su grupo (`grado`, `lab`, `asignatura`), caso de estudio, pruebas (`checks`, `tests`) y «Alcance y decisiones» (`scope`). Un laboratorio añade `lab: { path: 'labs/<slug>/' }`.
- Los indicadores de la portada (proyectos, laboratorios, tecnologías, pruebas) se calculan a partir de estos archivos.

## Imágenes

`npm run build` ejecuta `scripts/optimize-images.mjs` (prebuild): convierte `raw-assets/projects/**` a WebP en `public/projects/**` y escribe `src/data/images.json` con ancho y alto. `img(slug, archivo)` devuelve la ruta y las dimensiones, de modo que todas las imágenes llevan `width` y `height`.

## Laboratorios

Cada laboratorio es un proyecto Vite independiente con `base: './'`. Su `dist/` se copia a `public/labs/<slug>/` y Next lo exporta tal cual. El botón «Abrir demo» enlaza a `asset('labs/<slug>/')`. `scripts/serve.mjs` sirve `.wasm` con el tipo correcto (necesario para InjectionLab).

## Portada

`Core.tsx` dibuja anillos, arcos, retícula y 64 partículas en un `<canvas>`. Limita el ritmo a unos 45 fotogramas por segundo y se detiene cuando el núcleo sale de pantalla, cuando la pestaña está oculta y con `prefers-reduced-motion` (en ese caso dibuja un solo fotograma y redibuja solo al mover el puntero). Lee los colores de las variables CSS y se actualiza al cambiar de tema.

## Navegación

Cabecera fija, riel lateral de secciones (≥1280 px) que marca la sección activa con `IntersectionObserver`, barra de progreso de lectura, botón «volver arriba» y paleta Ctrl+K con secciones, proyectos, laboratorios, contacto, WhatsApp, CV y tema. La única transición entre secciones es el trazado de la línea de cada cabecera al entrar en pantalla.

## Accesibilidad y SEO

Un solo `h1` por página, `title` y `description` por ruta, `canonical` y Open Graph, JSON-LD de persona, enlaces con nombre accesible, foco visible, enlace «Saltar al contenido», confirmaciones con `role="status"`, mapa operable con teclado y lista equivalente. `sitemap.xml` y `robots.txt` se generan desde los datos.

## Verificación

`npm test` ejecuta `scripts/verify-site.mjs` sobre `out/` (ver [INFORME_PRUEBAS.md](INFORME_PRUEBAS.md)).
