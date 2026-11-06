// Servidor estático mínimo que sirve `out/` bajo /portfolio/ (igual que GitHub Pages).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.pdf': 'application/pdf', '.txt': 'text/plain', '.xml': 'application/xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.wasm': 'application/wasm', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mjs': 'text/javascript', '.map': 'application/json', '.jpg': 'image/jpeg', '.gif': 'image/gif' };
const BASE = '/portfolio';

export function startServer(port = 4173, root = 'out') {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://x');
    if (!url.pathname.startsWith(BASE)) { res.writeHead(404).end('fuera de /portfolio'); return; }
    const rel = decodeURIComponent(url.pathname.slice(BASE.length)) || '/';
    let file = path.join(root, rel);
    if (!path.resolve(file).startsWith(path.resolve(root))) { res.writeHead(403).end(); return; }
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    } catch {
      if (!path.extname(file)) file = path.join(file, 'index.html');
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' }).end(body);
    } catch {
      const nf = await readFile(path.join(root, '404.html')).catch(() => 'No encontrado');
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' }).end(nf);
    }
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

if (process.argv[1]?.endsWith('serve.mjs')) {
  const port = Number(process.env.PORT ?? 4173);
  await startServer(port);
  console.log(`http://127.0.0.1:${port}${BASE}/`);
}
