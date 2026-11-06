# Guía de actualización

Todo el contenido está en `src/data/`. Después de cualquier cambio: `npm run build && npm test`.

## Agregar un proyecto

1. Copia las capturas (PNG o JPG) a `raw-assets/projects/<slug>/`.
2. Añade un objeto al arreglo `projects` de `src/data/projects.ts` (usa uno existente como plantilla). Sin capturas: deja `captures: []`, `captureKind: 'ninguna'` y rellena `preview` con salida real de comandos.
3. `npm run build` optimiza las imágenes, regenera `images.json` y crea la página `/proyectos/<slug>/`, el sitemap, el filtro, la paleta y el grafo.
4. Declara el estado real (`status`, `verified`, `limits`). No agregues métricas que no hayas medido.

## Modificar mis datos

`src/data/site.ts`: nombre, descripción, titular, disponibilidad, trayectoria (`timeline`), especialidades (`services`) y las líneas de la terminal (`terminalLines`).

## Agregar una tecnología

`src/data/stack.ts`: añade `{ name, proof }` al grupo correspondiente. `proof` debe indicar el proyecto o documento que la respalda.

## Actualizar mis redes

`src/data/site.ts`: `email`, `github`, `githubUser`, `linkedin`.

## Cambiar imágenes

Reemplaza el archivo en `raw-assets/projects/<slug>/` conservando el nombre y ejecuta `npm run build`. Para el dashboard del ESP32: `node scripts/capture-dashboard.mjs`.

## Actualizar la hoja de vida

1. Actualiza `timeline`, `about` y `stack` (el PDF se genera desde esos datos).
2. `node scripts/make-assets.mjs` crea `public/cv/Juan_Esteban_Olaya_CV.pdf` y `public/og.png`. Requiere Chrome instalado (variable `CHROME_PATH` si está en otra ruta).
3. Revisa el PDF antes de publicar: no debe incluir teléfono, cédula, dirección ni referencias.

## Despliegue

Cada `push` a `main` ejecuta `.github/workflows/deploy.yml` y publica en GitHub Pages. Si cambias el nombre del repositorio, actualiza `basePath` en `next.config.mjs`, `url` en `src/data/site.ts` y `scripts/serve.mjs`.
