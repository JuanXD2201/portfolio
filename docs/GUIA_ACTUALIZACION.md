# Guía de actualización

Todo el contenido está en `src/data/`. Después de cualquier cambio: `npm run typecheck`, `npm run build` y `npm test`.

## Datos personales, teléfono y correo

`src/data/site.ts`:

- `name`, `shortName`, `role`, `degree`, `location`, `headline`, `intro`, `availability`, `specialties`.
- Teléfono: `phone` (formato internacional sin espacios, por ejemplo `+573123431825`, se usa en `tel:`), `phoneDisplay` (texto visible) y `whatsapp` (`https://wa.me/<número sin +>`).
- Mensaje de WhatsApp: `whatsappMessage`; se codifica solo con `encodeURIComponent`.
- Correo: `email`. GitHub: `github` y `githubUser`.
- Si cambia la URL pública, actualiza `url` aquí y `basePath` en `next.config.mjs`.

## Hoja de vida y activos sociales

1. Edita `about`, `timeline` y `stack` (el CV se genera a partir de ellos) y, si cambian los proyectos, la lista de proyectos de `scripts/make-assets.mjs`.
2. Ejecuta `node scripts/make-assets.mjs`: regenera `public/cv/Juan_Esteban_Olaya_CV.pdf` y `public/og.png` (requiere Chrome). El CV no incluye teléfono.
3. Para usar un PDF propio, reemplaza el archivo en `public/cv/` y mantén el nombre en `site.cvFile`.

## Experiencia y formación

`timeline.education` y `timeline.experience` en `site.ts`. Cada entrada lleva `start` (AAAA-MM, para ordenar), `period`, `title`, `org` y `text`. Se muestra solo la experiencia relevante para un perfil de desarrollador.

## Tecnologías

`src/data/stack.ts`: agrega `{ name, proof }` al grupo correspondiente; `proof` debe nombrar un proyecto o repositorio real. Para que aparezca en el mapa radial, incluye el mismo nombre en `techs` del área correspondiente en `areas` (`site.ts`).

## Proyectos

1. Copia las capturas a `raw-assets/projects/<slug>/` (PNG o JPG).
2. Añade un objeto a `projects` en `src/data/projects.ts` con `group` (`grado`, `lab` o `asignatura`), caso de estudio, `checks`, `tests` (número del README), `scope` y las capturas (`file`, `alt`, `caption`).
3. Si el proyecto respalda una especialidad, añade su `slug` a `projects` del área en `areas` (`site.ts`).
4. `npm run build` genera los WebP y `src/data/images.json`.

Los números de pruebas deben coincidir con los del README del proyecto. Las capturas renderizadas se describen con la nota «Pantallas renderizadas desde el código de la app».

## Laboratorios

Para un laboratorio nuevo (por ejemplo `bodega`):

1. En la carpeta del laboratorio: `npm ci` (si hace falta) y `npm run build`. Debe usar `base: './'`.
2. Copia `dist/` a `public/labs/<slug>/` (las compilaciones se versionan; el despliegue no compila nada más).
3. Agrega la entrada en `projects.ts` con `group: 'lab'` y `lab: { path: 'labs/<slug>/' }`; el botón «Abrir aplicación», la paleta y los accesos rápidos de la portada se actualizan solos.
4. Para actualizar una aplicación existente, repite los pasos 1 y 2 con la carpeta del mismo `slug`.
5. `npm test` abre cada carpeta de `public/labs/` y comprueba consola, fuentes y WASM.

## Imágenes e imagen social

Las imágenes del sitio se optimizan desde `raw-assets/`. `public/og.png` se genera con `scripts/make-assets.mjs`; `public/favicon.svg` se edita a mano.

## Enlaces

Repositorio y demo externa de cada proyecto: campos `repo` y `demo` en `projects.ts`. `npm test` comprueba que todos los enlaces de la portada respondan.

## Despliegue

`npm run build && npm run deploy` publica `out/` en la rama `gh-pages`. Alternativa con Actions: `docs/deploy.yml.ejemplo`.
