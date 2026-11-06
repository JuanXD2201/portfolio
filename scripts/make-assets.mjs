// Genera public/og.png y public/cv/Juan_Esteban_Olaya_CV.pdf a partir de src/data (sin datos sensibles).
// Requiere Node >= 22.18 (importa .ts directamente) y Chrome instalado.
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { site, about, timeline } from '../src/data/site.ts';
import { stack } from '../src/data/stack.ts';

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const og = `<html><body style="margin:0;width:1200px;height:630px;background:#0b0c0f;color:#e8eaf0;font-family:'Segoe UI',system-ui,sans-serif;position:relative;overflow:hidden">
<div style="position:absolute;inset:0;background-image:linear-gradient(#262a34 1px,transparent 1px),linear-gradient(90deg,#262a34 1px,transparent 1px);background-size:60px 60px;opacity:.35"></div>
<div style="position:absolute;left:72px;top:70px;font:600 24px Consolas,monospace;color:#6ee7b7">// portafolio</div>
<div style="position:absolute;left:72px;top:150px;font-size:84px;font-weight:700;letter-spacing:-2px;line-height:1.02;width:900px">${esc(site.name)}</div>
<div style="position:absolute;left:72px;top:380px;font-size:38px;color:#9aa1b0;width:900px;line-height:1.3">${esc(site.role)} · Android, Firebase, .NET MAUI, TypeScript</div>
<div style="position:absolute;left:72px;bottom:60px;font:28px Consolas,monospace;color:#6ee7b7">$ juanxd2201.github.io/portfolio</div></body></html>`;

const li = (items) => items.map((i) => `<li>${i}</li>`).join('');
const cv = `<html lang="es"><head><meta charset="utf-8"><style>
@page{size:A4;margin:16mm}body{font-family:'Segoe UI',Arial,sans-serif;color:#14161a;font-size:10.5pt;line-height:1.45}
h1{font-size:22pt;margin:0}h2{font-size:11pt;text-transform:uppercase;letter-spacing:.08em;border-bottom:1.5px solid #0b7a63;padding-bottom:3px;margin:18px 0 8px;color:#0b7a63}
.sub{color:#444;margin:2px 0 6px}.row{display:flex;justify-content:space-between;gap:12px}.muted{color:#555}ul{margin:4px 0 0 18px;padding:0}li{margin:2px 0}
.chips span{display:inline-block;margin:2px 6px 2px 0}.p{margin:0 0 8px}</style></head><body>
<h1>${esc(site.name)}</h1><p class="sub">${esc(site.role)} · ${esc(site.location)}</p>
<p class="muted">${esc(site.email)} · ${esc(site.github.replace('https://', ''))} · ${esc(site.linkedin.replace('https://www.', ''))}</p>
<h2>Perfil</h2>${about.paragraphs.slice(0, 2).map((p) => `<p class="p">${esc(p)}</p>`).join('')}
<h2>Proyectos</h2><ul>
<li><b>ServiX</b>: app Android (Kotlin, Compose, Firebase, Gemini) para servicios técnicos; CI en Azure DevOps. github.com/JuanXD2201/ServiX</li>
<li><b>DogCare</b>: app Android con IA, mapa de veterinarias y tienda; 50 pruebas y reglas de Firestore verificadas en emulador. github.com/JuanXD2201/DogCare</li>
<li><b>Elmercado10</b>: marketplace Android con pedidos transaccionales y chat. github.com/JuanXD2201/Elmercado10</li>
<li><b>AsistenteIA</b>: cliente .NET MAUI con SQLite y SecureStorage; 52 pruebas xUnit. github.com/JuanXD2201/AsistenteIA</li>
<li><b>ESP32 · LoRa · Firebase</b>: enlace LoRa, API Flask y dashboard web. github.com/JuanXD2201/ESP32-Firebase-Dashboard</li>
<li><b>firestore-rules-lint</b> y <b>postulaciones-api</b>: herramientas en TypeScript con Vitest.</li></ul>
<h2>Tecnologías</h2>${stack.map((g) => `<p class="p"><b>${esc(g.title)}:</b> ${esc(g.items.map((t) => t.name).join(', '))}</p>`).join('')}
<h2>Formación</h2><ul>${li(timeline.education.map((e) => `<b>${esc(e.title)}</b> · ${esc(e.org)} <span class="muted">(${esc(e.period)})</span>`))}</ul>
<h2>Experiencia laboral</h2><ul>${li(timeline.experience.map((e) => `<b>${esc(e.title)}</b> · ${esc(e.org)} <span class="muted">(${esc(e.period)})</span>${e.text ? ' — ' + esc(e.text) : ''}`))}</ul>
</body></html>`;

await mkdir('public/cv', { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.screenshot({ path: 'public/og.png' });
await page.setContent(cv);
await page.pdf({ path: 'public/cv/Juan_Esteban_Olaya_CV.pdf', format: 'A4', printBackground: true });
await browser.close();
console.log('og.png y CV generados');
