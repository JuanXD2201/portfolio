// Convierte raw-assets/projects/** a WebP en public/projects/** y genera src/data/images.json (ancho/alto).
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'raw-assets/projects';
const OUT = 'public/projects';
const manifest = {};
for (const slug of await readdir(SRC)) {
  await mkdir(path.join(OUT, slug), { recursive: true });
  for (const f of await readdir(path.join(SRC, slug))) {
    const name = f.replace(/\.(png|jpg|jpeg)$/i, '');
    const meta = await sharp(path.join(SRC, slug, f)).metadata();
    const target = meta.height > meta.width ? 540 : 1200; // capturas verticales vs diagramas/anchas
    const info = await sharp(path.join(SRC, slug, f))
      .resize({ width: Math.min(target, meta.width), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, slug, `${name}.webp`));
    manifest[`${slug}/${name}`] = { width: info.width, height: info.height };
  }
}
await writeFile('src/data/images.json', JSON.stringify(manifest, null, 2));
console.log(`${Object.keys(manifest).length} imágenes optimizadas`);
