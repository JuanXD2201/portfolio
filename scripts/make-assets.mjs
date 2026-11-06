// Genera public/og.png y public/cv/Juan_Esteban_Olaya_CV.pdf a partir de src/data (sin datos sensibles).
// Requiere Node >= 22.18 (importa .ts directamente) y Chrome instalado.
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { site, about, timeline } from '../src/data/site.ts';
import { stack } from '../src/data/stack.ts';

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const ring = `<svg width="520" height="520" viewBox="-260 -260 520 520" style="position:absolute;right:40px;top:55px" fill="none">
<circle r="250" stroke="#2c4b7c" stroke-width="1" stroke-dasharray="1 7"/>
<circle r="190" stroke="#2c4b7c" stroke-width="1"/><circle r="120" stroke="#2c4b7c" stroke-width="1"/>
<path d="M-210 -135A250 250 0 0 1 60 -243" stroke="#3fd8ff" stroke-width="5" stroke-linecap="round"/>
<path d="M243 60A250 250 0 0 1 120 220" stroke="#3fd8ff" stroke-width="5" stroke-linecap="round"/>
<path d="M-160 100A190 190 0 0 0 -40 186" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
<path d="M170 -85A190 190 0 0 1 100 162" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
<path d="M-250 0H250M0 -250V250" stroke="#2c4b7c" stroke-width="1" opacity=".6"/>
<circle r="70" fill="url(#g)"/><circle r="9" fill="#3fd8ff"/>
<defs><radialGradient id="g"><stop offset="0" stop-color="#3fd8ff" stop-opacity=".7"/><stop offset="1" stop-color="#3b82f6" stop-opacity="0"/></radialGradient></defs></svg>`;
const og = `<html><body style="margin:0;width:1200px;height:630px;background:#04070d;color:#e6eefb;font-family:'Segoe UI',system-ui,sans-serif;position:relative;overflow:hidden">
<div style="position:absolute;inset:0;background-image:linear-gradient(rgba(80,140,230,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(80,140,230,.12) 1px,transparent 1px);background-size:56px 56px"></div>
<div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 78% 40%,rgba(63,216,255,.18),transparent 70%)"></div>${ring}
<div style="position:absolute;left:72px;top:78px;font:500 24px Consolas,monospace;color:#3fd8ff">${esc(site.role)} · Bogotá</div>
<div style="position:absolute;left:72px;top:150px;font-size:78px;font-weight:700;letter-spacing:-1px;line-height:1.04;width:640px">${esc(site.name)}</div>
<div style="position:absolute;left:72px;top:420px;font-size:30px;color:#95a8c6;width:620px;line-height:1.3">Android, web, Firebase y .NET MAUI, con pruebas y documentación.</div>
<div style="position:absolute;left:72px;bottom:56px;font:26px Consolas,monospace;color:#3fd8ff">juanxd2201.github.io/portfolio</div></body></html>`;

const li = (items) => items.map((i) => `<li>${i}</li>`).join('');
const cv = `<html lang="es"><head><meta charset="utf-8"><style>
@page{size:A4;margin:16mm}body{font-family:'Segoe UI',Arial,sans-serif;color:#14161a;font-size:10.5pt;line-height:1.45}
h1{font-size:22pt;margin:0}h2{font-size:11pt;text-transform:uppercase;letter-spacing:.08em;border-bottom:1.5px solid #0a5fd1;padding-bottom:3px;margin:18px 0 8px;color:#0a5fd1}
.sub{color:#444;margin:2px 0 6px}.row{display:flex;justify-content:space-between;gap:12px}.muted{color:#555}ul{margin:4px 0 0 18px;padding:0}li{margin:2px 0}
.chips span{display:inline-block;margin:2px 6px 2px 0}.p{margin:0 0 8px}</style></head><body>
<h1>${esc(site.name)}</h1><p class="sub">${esc(site.role)} · ${esc(site.location)}</p>
<p class="muted">${esc(site.email)} · ${esc(site.github.replace('https://', ''))}</p>
<h2>Perfil</h2>${about.paragraphs.slice(0, 2).map((p) => `<p class="p">${esc(p)}</p>`).join('')}
<h2>Proyectos</h2><ul>
<li><b>ServiX</b> (proyecto de grado): app Android (Kotlin, Compose, Firebase, Gemini) para servicios técnicos; CI en Azure DevOps. github.com/JuanXD2201/ServiX</li>
<li><b>Focus Mind</b> (proyecto de grado): plataforma web con Next.js, Firebase y Genkit; cinco roles, cifrado en el cliente y 12 pruebas. github.com/JuanXD2201/focus-mind</li>
<li><b>Ledger</b> (laboratorio): finanzas personales en el navegador con React y TypeScript; 93 pruebas Jest y 22 e2e. github.com/JuanXD2201/ledger</li>
<li><b>InjectionLab</b> (laboratorio): práctica de inyección SQL con SQLite en WebAssembly; 93 pruebas Vitest y 11 e2e. github.com/JuanXD2201/injectionlab</li>
<li><b>DogCare</b>: app Android con IA, mapa de veterinarias y tienda; 50 pruebas y reglas de Firestore en emulador. github.com/JuanXD2201/DogCare</li>
<li><b>Elmercado10</b>: marketplace Android con pedidos transaccionales y chat. github.com/JuanXD2201/Elmercado10</li>
<li><b>AsistenteIA</b>: cliente .NET MAUI con SQLite y SecureStorage; 52 pruebas xUnit. github.com/JuanXD2201/AsistenteIA</li>
<li><b>ESP32 · LoRa · Firebase</b>: enlace LoRa, API Flask y dashboard web. github.com/JuanXD2201/ESP32-Firebase-Dashboard</li></ul>
<h2>Tecnologías</h2>${stack.map((g) => `<p class="p"><b>${esc(g.title)}:</b> ${esc(g.items.map((t) => t.name).join(', '))}</p>`).join('')}
<h2>Formación</h2><ul>${li(timeline.education.map((e) => `<b>${esc(e.title)}</b> · ${esc(e.org)} <span class="muted">(${esc(e.period)})</span>`))}</ul>
<h2>Experiencia seleccionada</h2><ul>${li(timeline.experience.map((e) => `<b>${esc(e.title)}</b> · ${esc(e.org)} <span class="muted">(${esc(e.period)})</span>${e.text ? ' — ' + esc(e.text) : ''}`))}</ul>
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
