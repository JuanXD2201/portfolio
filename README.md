# Portafolio · Juan Esteban Olaya Muñoz

Sitio estático con Next.js 15 (App Router, `output: 'export'`) para GitHub Pages. Siete proyectos con su estado real, mapa de evidencia tecnología–proyecto, paleta de comandos (Ctrl+K), tema oscuro/claro y CV descargable sin datos sensibles.

**URL prevista:** https://juanxd2201.github.io/portfolio/

## Tecnologías

Next.js 15, React 19, TypeScript, CSS Modules, Geist (fontsource), sharp (optimización de imágenes), Playwright (pruebas).

## Instalación y ejecución

Requiere Node 22.18 o superior (el script de activos importa `.ts`).

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # optimiza imágenes y exporta a out/
npm start            # sirve out/ en http://127.0.0.1:4173/portfolio/
npm test             # auditoría con Playwright (requiere haber ejecutado build y tener Chrome)
```

## Estructura

Ver [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md). El contenido vive en `src/data/`.

## Documentación

- [Auditoría de proyectos](docs/AUDITORIA_PROYECTOS.md)
- [Arquitectura](docs/ARQUITECTURA.md)
- [Guía de actualización](docs/GUIA_ACTUALIZACION.md)
- [Informe de pruebas](docs/INFORME_PRUEBAS.md)

## Despliegue en GitHub Pages

Publicado desde la rama `gh-pages` (Settings → Pages → Deploy from a branch).

```bash
npm run build && npm run deploy   # sube out/ a la rama gh-pages
```

`docs/deploy.yml.ejemplo` es un workflow de GitHub Actions equivalente. Para usarlo hay que copiarlo a `.github/workflows/deploy.yml` y renovar el token de `gh` con el permiso `workflow` (`gh auth refresh -s workflow`).

Si el repositorio tiene otro nombre, cambia `basePath` en `next.config.mjs` y `url` en `src/data/site.ts`.

## Honestidad del contenido

Tres proyectos Android muestran renders de pantallas reales con datos ficticios, no capturas de dispositivo; el sitio lo indica en cada ficha. Los dos proyectos «complementarios» se crearon para este portafolio y están etiquetados así.
