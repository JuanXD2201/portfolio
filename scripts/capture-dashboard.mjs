// Captura el dashboard ESP32 desplegado (https://esp32-8aa66.web.app) para la ficha del proyecto.
import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('https://esp32-8aa66.web.app', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'raw-assets/projects/esp32-dashboard/dashboard.png' });
console.log(await page.title());
await browser.close();
