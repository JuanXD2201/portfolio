// Rutas con el basePath de GitHub Pages (/portfolio en producción, vacío en desarrollo).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Ruta interna para <Link>/<a>: next/link ya añade basePath, por eso no se agrega aquí. */
export const route = (path = ''): string => `/${path.replace(/^\//, '')}`;

/** URL de un archivo estático en /public usado en <img src> o <a href download>. */
export const asset = (path: string): string => `${base}/${path.replace(/^\//, '')}`;
