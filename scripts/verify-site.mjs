// Auditoría automática del sitio exportado (out/): consola, imágenes, enlaces, responsive, teclado y paleta.
// Uso: npm run build && npm test
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { startServer } from './serve.mjs';

const PORT = 4199;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const BASE = `${ORIGIN}/portfolio`;
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const VIEWPORTS = [
  ['1920x1080', 1920, 1080],
  ['1366x768', 1366, 768],
  ['768x1024', 768, 1024],
  ['390x844', 390, 844],
];
const ROUTES = ['/', '/proyectos/servix/', '/proyectos/dogcare/', '/proyectos/elmercado10/', '/proyectos/asistenteia/', '/proyectos/esp32-dashboard/', '/proyectos/firestore-rules-lint/', '/proyectos/postulaciones-api/', '/ruta-inexistente/'];

const results = [];
const ok = (name, pass, detail = '') => { results.push({ name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); };

await mkdir('screenshots', { recursive: true });
const server = await startServer(PORT);
const browser = await chromium.launch({ executablePath: CHROME });

try {
  // 1) Cada ruta: estado, consola, imágenes rotas, h1, title
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const expected = route.includes('inexistente') ? 404 : 200;
    ok(`HTTP ${expected} ${route}`, res?.status() === expected, `status ${res?.status()}`);
    if (expected === 200) {
      await page.evaluate(async () => { for (const i of document.images) i.loading = 'eager'; await Promise.all([...document.images].map((i) => i.decode().catch(() => null))); });
      const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
      ok(`sin imágenes rotas ${route}`, broken.length === 0, broken.join(', '));
      ok(`sin errores de consola ${route}`, errors.length === 0, errors.join(' | ').slice(0, 200));
      ok(`un solo h1 y title ${route}`, (await page.locator('h1').count()) === 1 && (await page.title()).length > 5);
    }
    await page.close();
  }

  // 2) Enlaces internos y externos de la portada
  const home = await ctx.newPage();
  await home.goto(BASE + '/', { waitUntil: 'networkidle' });
  const hrefs = await home.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')));
  const internal = [...new Set(hrefs.filter((h) => h.startsWith('/portfolio')).map((h) => h.split('#')[0]))];
  for (const h of internal) {
    const r = await ctx.request.get(ORIGIN + h);
    if (r.status() !== 200) ok(`enlace interno ${h}`, false, `status ${r.status()}`);
  }
  ok(`enlaces internos de portada (${internal.length}) responden 200`, !results.some((r) => r.name.startsWith('enlace interno') && !r.pass));
  const external = [...new Set(hrefs.filter((h) => /^https?:/.test(h)))];
  for (const h of external) {
    try {
      const r = await fetch(h, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0' } });
      // LinkedIn responde 999 a clientes automatizados: no indica enlace roto.
      ok(`enlace externo ${h}`, r.status < 400 || r.status === 999, `status ${r.status}`);
    } catch (e) { ok(`enlace externo ${h}`, false, String(e.cause?.code ?? e.message)); }
  }
  ok('CV descargable', (await ctx.request.get(`${BASE}/cv/Juan_Esteban_Olaya_CV.pdf`)).status() === 200);
  ok('sitemap.xml', (await ctx.request.get(`${BASE}/sitemap.xml`)).status() === 200);
  ok('robots.txt', (await ctx.request.get(`${BASE}/robots.txt`)).status() === 200);
  ok('og.png', (await ctx.request.get(`${BASE}/og.png`)).status() === 200);

  // 3) Interacciones: filtros, paleta de comandos, tema, menú móvil, teclado
  await home.locator('button', { hasText: 'Seguridad' }).click();
  ok('filtro Seguridad deja 1 proyecto', (await home.locator('article').count()) === 1);
  await home.locator('button', { hasText: 'Todos' }).click();
  ok('filtro Todos muestra 7 proyectos', (await home.locator('article').count()) === 7);
  await home.keyboard.press('Control+k');
  ok('Ctrl+K abre la paleta', await home.getByRole('dialog').isVisible());
  await home.keyboard.type('dogc');
  await home.keyboard.press('Enter');
  await home.waitForURL('**/proyectos/dogcare/');
  ok('paleta navega a DogCare con Enter', home.url().endsWith('/proyectos/dogcare/'));
  await home.goto(BASE + '/');
  const before = await home.evaluate(() => document.documentElement.dataset.theme ?? 'auto');
  await home.getByLabel('Cambiar tema claro u oscuro').click();
  ok('cambio de tema', (await home.evaluate(() => document.documentElement.dataset.theme)) !== before);
  await home.goto(BASE + '/', { waitUntil: 'networkidle' });
  await home.keyboard.press('Tab');
  ok('"Saltar al contenido" recibe el foco con Tab', await home.evaluate(() => document.activeElement?.textContent === 'Saltar al contenido'));
  await home.close();

  // 4) Responsive: capturas, sin scroll horizontal y menú móvil
  for (const [name, w, h] of VIEWPORTS) {
    const c = await browser.newContext({ viewport: { width: w, height: h } });
    const p = await c.newPage();
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    await p.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in')));
    await p.waitForTimeout(1800);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(`sin scroll horizontal ${name}`, overflow <= 1, `exceso ${overflow}px`);
    await p.screenshot({ path: `screenshots/home-${name}.png`, fullPage: false });
    await p.screenshot({ path: `screenshots/home-${name}-full.png`, fullPage: true });
    if (w <= 760) {
      await p.getByLabel('Abrir menú').click();
      ok(`menú móvil abre ${name}`, await p.locator('nav a', { hasText: 'Contacto' }).isVisible());
    }
    const d = await c.newPage();
    await d.goto(BASE + '/proyectos/firestore-rules-lint/', { waitUntil: 'networkidle' });
    await d.screenshot({ path: `screenshots/detalle-${name}.png` });
    await c.close();
  }
} finally {
  await browser.close();
  server.close();
}

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} comprobaciones superadas`);
process.exit(failed.length ? 1 : 0);
