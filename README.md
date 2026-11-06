# Portafolio · Juan Esteban Olaya Muñoz

Sitio estático con Next.js 15 (App Router, `output: 'export'`) para GitHub Pages. Interfaz de centro de control: núcleo interactivo en Canvas 2D, indicadores derivados de los datos, mapa radial de especialidades, casos de estudio de proyectos de grado, laboratorios con demo ejecutable en el navegador, paleta de comandos (Ctrl+K), tema oscuro y claro, y hoja de vida descargable.

**URL:** https://juanxd2201.github.io/portfolio/

## Qué contiene

- **Inicio:** núcleo visual que reacciona al puntero, identificación, indicadores (proyectos, laboratorios, tecnologías, pruebas), hora de Bogotá y accesos rápidos.
- **Sobre mí, Especialidades, Trayectoria:** presentación editorial, mapa radial accesible por teclado (con lista en móvil) y cronología de formación y experiencia seleccionada.
- **Proyectos:** proyectos de grado (ServiX, Focus Mind), laboratorio (Ledger, InjectionLab) y proyectos de asignatura. Cada uno tiene su caso de estudio en `/proyectos/<slug>/`.
- **Demos:** cada laboratorio se publica compilado en `public/labs/<slug>/` y se abre desde `/labs/<slug>/`.
- **Contacto:** teléfono, WhatsApp con mensaje prellenado, correo, GitHub y CV, con botones para copiar.

## Tecnologías

Next.js 15, React 19, TypeScript, CSS Modules, Geist y Chakra Petch (fontsource, autoalojadas), sharp (imágenes) y playwright-core (verificación). Sin Three.js ni librerías de animación: el núcleo es Canvas 2D.

## Instalación y ejecución

Requiere Node 22.18 o superior (el script de activos importa `.ts`) y Google Chrome para la verificación.

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # optimiza imágenes y exporta a out/
npm start            # sirve out/ en http://127.0.0.1:4173/portfolio/
npm test             # verificación con Playwright (requiere build previo)
node scripts/make-assets.mjs   # regenera public/og.png y el CV
```

En equipos con poca memoria conviene anteponer `NODE_OPTIONS=--max-old-space-size=1536`.

## Documentación

- [Arquitectura](docs/ARQUITECTURA.md)
- [Identidad visual](docs/IDENTIDAD_VISUAL.md)
- [Proyectos mostrados y descartados](docs/PROYECTOS.md)
- [Guía de actualización](docs/GUIA_ACTUALIZACION.md)
- [Informe de pruebas](docs/INFORME_PRUEBAS.md)

## Despliegue en GitHub Pages

Se publica desde la rama `gh-pages` (Settings → Pages → Deploy from a branch).

```bash
npm run build && npm run deploy   # sube out/ a la rama gh-pages
```

`docs/deploy.yml.ejemplo` es un workflow de GitHub Actions equivalente: se copia a `.github/workflows/deploy.yml` y requiere renovar el token de `gh` con el permiso `workflow` (`gh auth refresh -s workflow`). Como las demos están versionadas en `public/labs/`, el despliegue no necesita compilar los laboratorios.

Si el repositorio cambia de nombre, se ajustan `basePath` en `next.config.mjs` y `url` en `src/data/site.ts`.
