// Auditoría automática del sitio exportado (out/): rutas, demos de laboratorios, consola, imágenes, enlaces,
// contacto, texto prohibido, responsive (sin scroll horizontal ni solapamientos), teclado, paleta y rendimiento.
// Uso: npm run build && npm test
import { chromium } from 'playwright-core';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import { startServer } from './serve.mjs';

const PORT = 4199;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const BASE = `${ORIGIN}/portfolio`;
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const VIEWPORTS = [['1920x1080', 1920, 1080], ['1366x768', 1366, 768], ['768x1024', 768, 1024], ['390x844', 390, 844]];
const PHONE = '+573123431825';
const BANNED = [new RegExp('linked' + 'in', 'i'), /verificado por el autor/i, /complementari[oa]/i, /pendiente/i, /no probad[oa]/i, /incomplet[oa]/i, /en construcci[oó]n/i, /sin capturas/i, /limitaciones/i, /generado con ia/i, /claude/i, /prompt/i, /trabajo en curso/i];

const results = [];
const ok = (name, pass, detail = '') => { results.push({ name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); };
const info = (name, value) => console.log(`INFO  ${name}: ${value}`);

// Rutas y laboratorios descubiertos desde la salida de la compilación (no se escriben a mano)
const sitemap = await readFile('out/sitemap.xml', 'utf8');
const pages = [...sitemap.matchAll(/<loc>[^<]*?\/portfolio(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
const labs = (await readdir('public/labs', { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
const ROUTES = [...new Set(['/', ...pages])];

const eager = (page) => page.evaluate(async () => { for (const i of document.images) i.loading = 'eager'; await Promise.all([...document.images].map((i) => i.decode().catch(() => null))); });

await mkdir('screenshots', { recursive: true });
const server = await startServer(PORT);
const browser = await chromium.launch({ executablePath: CHROME });

try {
  // 1) Rutas: estado, consola, imágenes, h1, metadatos, texto prohibido
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  for (const route of [...ROUTES, '/ruta-inexistente/']) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('requestfailed', (r) => errors.push(`fallo ${r.url()}`));
    const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const expected = route.includes('inexistente') ? 404 : 200;
    ok(`HTTP ${expected} ${route}`, res?.status() === expected, `status ${res?.status()}`);
    if (expected === 200) {
      await eager(page);
      const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
      ok(`sin imágenes rotas ${route}`, broken.length === 0, broken.join(', '));
      const noDims = await page.evaluate(() => [...document.images].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length);
      ok(`imágenes con ancho y alto ${route}`, noDims === 0, `${noDims} sin dimensiones`);
      ok(`sin errores de consola ${route}`, errors.length === 0, errors.join(' | ').slice(0, 200));
      ok(`un solo h1 ${route}`, (await page.locator('h1').count()) === 1);
      const meta = await page.evaluate(() => ({
        title: document.title,
        desc: document.querySelector('meta[name=description]')?.content ?? '',
        canon: document.querySelector('link[rel=canonical]')?.href ?? '',
        og: document.querySelector('meta[property="og:image"]')?.content ?? '',
      }));
      ok(`metadatos (title, description, canonical, og:image) ${route}`, meta.title.length > 5 && meta.desc.length > 30 && meta.canon.startsWith('https://') && meta.og.endsWith('/og.png'), JSON.stringify(meta).slice(0, 160));
      const noName = await page.evaluate(() => [...document.querySelectorAll('a, button')].filter((e) => !e.closest('[aria-hidden=true]') && !(e.innerText || e.getAttribute('aria-label') || e.getAttribute('title') || '').trim()).length);
      ok(`enlaces y botones con nombre accesible ${route}`, noName === 0, `${noName} sin nombre`);
      const text = await page.evaluate(() => document.body.innerText + ' ' + document.documentElement.innerHTML.replace(/<[^>]+>/g, ' '));
      const hits = BANNED.filter((r) => r.test(text)).map(String);
      ok(`sin palabras prohibidas ${route}`, hits.length === 0, hits.join(', '));
    }
    await page.close();
  }

  // 2) Demos de laboratorios: abren, cargan fuentes y WASM, sin errores
  for (const slug of labs) {
    const page = await ctx.newPage();
    const errors = []; const bad = []; const types = new Map();
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('response', (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`); types.set(r.url().split('?')[0].split('.').pop(), r.headers()['content-type']); });
    const res = await page.goto(`${BASE}/labs/${slug}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    ok(`demo ${slug}: HTTP 200`, res?.status() === 200);
    ok(`demo ${slug}: sin errores de consola ni recursos fallidos`, errors.length === 0 && bad.length === 0, [...errors, ...bad].join(' | ').slice(0, 200));
    ok(`demo ${slug}: contenido renderizado`, (await page.evaluate(() => document.body.innerText.trim().length)) > 80);
    const fonts = await page.evaluate(async () => { await document.fonts.ready; return [...document.fonts].filter((f) => f.status === 'loaded').length; });
    ok(`demo ${slug}: fuentes cargadas`, fonts > 0, `${fonts} fuentes`);
    if (types.has('wasm')) ok(`demo ${slug}: WASM servido como application/wasm`, types.get('wasm') === 'application/wasm');
    await page.screenshot({ path: `screenshots/demo-${slug}.png` });
    await page.close();
  }

  // 3) Portada: enlaces, contacto, interacciones
  const home = await ctx.newPage();
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: ORIGIN });
  await home.goto(BASE + '/', { waitUntil: 'networkidle' });
  const hrefs = await home.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')));
  const internal = [...new Set(hrefs.filter((h) => h.startsWith('/portfolio')).map((h) => h.split('#')[0]))];
  const badInternal = [];
  for (const h of internal) { const r = await ctx.request.get(ORIGIN + h); if (r.status() !== 200) badInternal.push(`${h} ${r.status()}`); }
  ok(`enlaces internos de portada (${internal.length}) responden 200`, badInternal.length === 0, badInternal.join(', '));
  const external = [...new Set(hrefs.filter((h) => /^https?:/.test(h)))];
  for (const h of external) {
    try { const r = await fetch(h, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0' } }); ok(`enlace externo ${h.slice(0, 70)}`, r.status < 400, `status ${r.status}`); }
    catch (e) { ok(`enlace externo ${h.slice(0, 70)}`, false, String(e.cause?.code ?? e.message)); }
  }
  for (const f of ['cv/Juan_Esteban_Olaya_CV.pdf', 'sitemap.xml', 'robots.txt', 'og.png', 'favicon.svg']) ok(`recurso ${f}`, (await ctx.request.get(`${BASE}/${f}`)).status() === 200);

  // Contacto
  await home.locator('#contacto').scrollIntoViewIfNeeded();
  const tel = await home.locator('a[href^="tel:"]').first().getAttribute('href');
  ok('enlace tel: correcto', tel === `tel:${PHONE}`, tel ?? '');
  const wa = new URL(await home.locator('#contacto a[href*="wa.me"]').first().getAttribute('href'));
  ok('WhatsApp: wa.me/573123431825 con mensaje en español', wa.hostname === 'wa.me' && wa.pathname === '/573123431825' && /conversar/.test(wa.searchParams.get('text') ?? ''), wa.search.slice(0, 80));
  const mail = await home.locator('#contacto a[href^="mailto:"]').first().getAttribute('href');
  ok('enlace mailto: correcto', mail === 'mailto:juanestebanolayamun@gmail.com', mail ?? '');
  await home.getByRole('button', { name: 'Copiar teléfono' }).click();
  ok('copiar teléfono: confirmación role=status', await home.locator('#contacto [role=status]', { hasText: 'Teléfono copiado' }).waitFor({ timeout: 3000 }).then(() => true, () => false));
  ok('copiar teléfono: portapapeles correcto', (await home.evaluate(() => navigator.clipboard.readText())).replace(/\s/g, '') === PHONE);
  await home.getByRole('button', { name: 'Copiar correo' }).click();
  ok('copiar correo: confirmación role=status', await home.locator('#contacto [role=status]', { hasText: 'Correo copiado' }).waitFor({ timeout: 3000 }).then(() => true, () => false));
  ok('copiar correo: portapapeles correcto', (await home.evaluate(() => navigator.clipboard.readText())) === 'juanestebanolayamun@gmail.com');
  ok('descarga del CV enlazada', (await home.locator('#contacto a[download]').getAttribute('href')).endsWith('cv/Juan_Esteban_Olaya_CV.pdf'));

  // Filtros del explorador
  const cards = () => home.locator('#proyectos article').count();
  const total = await cards();
  await home.locator('#proyectos button', { hasText: 'Seguridad' }).click();
  ok('filtro Seguridad deja 1 proyecto', (await cards()) === 1);
  await home.locator('#proyectos button', { hasText: 'Todos' }).click();
  ok(`filtro Todos muestra los ${pages.filter((p) => p.startsWith('/proyectos/')).length} proyectos`, total === pages.filter((p) => p.startsWith('/proyectos/')).length && (await cards()) === total);
  ok('«Abrir demo» enlaza a cada laboratorio', (await home.locator('#proyectos a', { hasText: 'Abrir demo' }).evaluateAll((as) => as.map((a) => a.getAttribute('href')))).length === labs.length);

  // Mapa de especialidades por teclado
  await home.locator('#area-ia').focus();
  await home.keyboard.press('Enter');
  ok('mapa de especialidades: selección con teclado muestra Genkit', await home.locator('#especialidades').getByText('Genkit').first().isVisible());
  await home.keyboard.press('ArrowRight');
  ok('mapa de especialidades: flechas cambian de especialidad', (await home.evaluate(() => document.activeElement?.id)) === 'area-datos');

  // Paleta de comandos
  await home.keyboard.press('Control+k');
  ok('Ctrl+K abre la paleta', await home.getByRole('dialog').isVisible());
  const options = await home.getByRole('option').allInnerTexts();
  const want = ['Ledger', 'InjectionLab', 'Focus Mind', 'Contacto', 'tema', 'WhatsApp'];
  const missing = want.filter((w) => !options.some((o) => o.toLowerCase().includes(w.toLowerCase())));
  ok('la paleta incluye proyectos, laboratorios, contacto, tema y WhatsApp', missing.length === 0, missing.join(', '));
  await home.keyboard.type('focus');
  await home.keyboard.press('Enter');
  await home.waitForURL('**/proyectos/focus-mind/');
  ok('paleta navega a Focus Mind con Enter', home.url().endsWith('/proyectos/focus-mind/'));

  // Tema, foco inicial y riel
  await home.goto(BASE + '/', { waitUntil: 'networkidle' });
  const before = await home.evaluate(() => document.documentElement.dataset.theme ?? 'dark');
  await home.getByLabel('Cambiar tema claro u oscuro').click();
  ok('cambio de tema', (await home.evaluate(() => document.documentElement.dataset.theme)) !== before);
  await home.getByLabel('Cambiar tema claro u oscuro').click();
  await home.reload({ waitUntil: 'networkidle' });
  await home.keyboard.press('Tab');
  ok('«Saltar al contenido» recibe el foco con Tab', await home.evaluate(() => document.activeElement?.textContent === 'Saltar al contenido'));
  await home.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await home.waitForTimeout(400);
  ok('barra de progreso de lectura llega al final', (await home.evaluate(() => document.getElementById('progress').style.transform)).includes('scaleX(1)') || (await home.evaluate(() => document.getElementById('progress').style.transform)).includes('scaleX(0.99'));
  await home.getByLabel('Volver arriba').click();
  await home.waitForTimeout(900);
  ok('«volver arriba» funciona', (await home.evaluate(() => scrollY)) < 50);
  await home.close();

  // 4) Rendimiento básico y movimiento reducido
  const perfCtx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const perf = await perfCtx.newPage();
  let js = 0; let total2 = 0;
  perf.on('response', async (r) => { try { const b = await r.body(); total2 += b.length; if ((r.headers()['content-type'] ?? '').includes('javascript')) js += b.length; } catch { /* redirecciones */ } });
  await perf.addInitScript(() => {
    window.__m = { cls: 0, lcp: 0, long: 0 };
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__m.cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { window.__m.lcp = e.startTime; })).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { window.__m.long += e.duration; })).observe({ type: 'longtask', buffered: true });
  });
  await perf.goto(BASE + '/', { waitUntil: 'networkidle' });
  await perf.waitForTimeout(1500);
  const m = await perf.evaluate(() => ({ ...window.__m, fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0, ttfb: performance.getEntriesByType('navigation')[0].responseStart }));
  const fps = await perf.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 2000) requestAnimationFrame(f); else res(n / 2); }; requestAnimationFrame(f); }));
  info('JS inicial transferido (sin comprimir) en portada', `${(js / 1024).toFixed(0)} KB`);
  info('peso total de la portada (sin imágenes diferidas)', `${(total2 / 1024).toFixed(0)} KB`);
  info('FCP / LCP / CLS / tiempo en tareas largas', `${m.fcp.toFixed(0)} ms / ${m.lcp.toFixed(0)} ms / ${m.cls.toFixed(3)} / ${m.long.toFixed(0)} ms`);
  info('fotogramas por segundo con el núcleo animado (Chrome headless)', fps.toFixed(1));
  ok('JS inicial de la portada ≤ 450 KB sin comprimir', js <= 450 * 1024, `${(js / 1024).toFixed(0)} KB`);
  ok('CLS ≤ 0,1', m.cls <= 0.1, m.cls.toFixed(3));
  ok('al menos 30 fps con el núcleo animado', fps >= 30, fps.toFixed(1));
  await perf.close();

  const rm = await (await browser.newContext({ viewport: { width: 1366, height: 768 }, reducedMotion: 'reduce' })).newPage();
  const rmErr = []; rm.on('pageerror', (e) => rmErr.push(String(e)));
  await rm.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok('prefers-reduced-motion: el núcleo se dibuja una vez y sin errores', rmErr.length === 0 && (await rm.locator('canvas').count()) === 1);
  await rm.close();

  // 5) Responsive: capturas, sin scroll horizontal, sin solapamientos y menú móvil
  for (const [name, w, h] of VIEWPORTS) {
    const c = await browser.newContext({ viewport: { width: w, height: h } });
    const p = await c.newPage();
    for (const route of ['/', '/proyectos/focus-mind/', '/proyectos/ledger/']) {
      await p.goto(BASE + route, { waitUntil: 'networkidle' });
      await eager(p);
      await p.waitForTimeout(1200);
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      ok(`sin scroll horizontal ${route} ${name}`, overflow <= 1, `exceso ${overflow}px`);
      const overlaps = await p.evaluate(() => {
        const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 4 && r.height > 4 && cs.visibility !== 'hidden' && cs.display !== 'none' && cs.position !== 'fixed' && !e.closest('svg, header, [class*=rail], .skip, details:not([open])'); };
        const els = [...document.querySelectorAll('main a, main button, main h1, main h2, main h3, main p, footer a')].filter(vis);
        const rects = els.map((e) => [e, e.getBoundingClientRect()]);
        const out = [];
        for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
          const [a, ra] = rects[i]; const [b, rb] = rects[j];
          if (a.contains(b) || b.contains(a)) continue;
          const ix = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left); const iy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
          if (ix > 3 && iy > 3 && !(a.closest('[class*=phones],[class*=wideShot]') && b.closest('[class*=phones],[class*=wideShot]'))) out.push(`${a.tagName}"${(a.innerText || '').slice(0, 20)}" × ${b.tagName}"${(b.innerText || '').slice(0, 20)}"`);
        }
        return out.slice(0, 5);
      });
      ok(`sin solapamientos ${route} ${name}`, overlaps.length === 0, overlaps.join(' ; '));
      const slug = route === '/' ? 'home' : route.split('/')[2];
      await p.screenshot({ path: `screenshots/${slug}-${name}.png` });
      if (route === '/') await p.screenshot({ path: `screenshots/home-${name}-full.png`, fullPage: true });
    }
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    if (w <= 960) {
      await p.getByLabel('Abrir menú').click();
      ok(`menú móvil abre ${name}`, await p.locator('nav#menu a', { hasText: 'Contacto' }).isVisible());
      await p.locator('nav#menu a', { hasText: 'Proyectos' }).click();
      await p.waitForTimeout(500);
      ok(`menú móvil navega y se cierra ${name}`, !(await p.locator('nav#menu a', { hasText: 'Contacto' }).isVisible()));
    }
    await c.close();
  }
} finally {
  await browser.close();
  server.close();
}

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} comprobaciones superadas`);
if (failed.length) console.log('Fallos:\n' + failed.map((f) => `- ${f.name}: ${f.detail}`).join('\n'));
process.exit(failed.length ? 1 : 0);
