# Auditoría de proyectos

Fuentes: hoja de vida maestra (`CV_Maestro_ATS.pdf`), carpetas locales del Escritorio, repositorios públicos de `JuanXD2201` y los README de cada proyecto. Fecha: 2026-11-06.

## Hoja de vida

Se usó `CV_Maestro_ATS.pdf` (2026-10-24) como fuente principal. Hay versiones anteriores en Descargas con menos información; no se usaron. No se publica teléfono, cédula, dirección ni referencias personales.

Trayectoria usada: Tecnología en Desarrollo de Software (quinto semestre, USB, desde 02/2024); curso SQL Injection (TryHackMe); empleos en Bombolandia, Cine Colombia, Chimichurry Chorizo Gourmet, Licores y Abarrotes El Mono y AGC Gas y Energía.

## Lo que el CV y los proyectos respaldan, y lo que no

| Respaldado por proyectos | Solo nivel académico (CV) | Sin evidencia: no se incluye |
|---|---|---|
| Kotlin, Compose, Material 3, Firebase (Auth, Firestore, AI Logic, Hosting, App Check) | React, TypeScript (Focus Mind), Jest, Cypress | Python avanzado, Docker, AWS, Flutter |
| C#/.NET MAUI, SQLite, xUnit | MySQL, SQL Server (ejercicios) | Experiencia laboral en desarrollo |
| Python/Flask, Vite, Vitest, pytest (ESP32) | Excel intermedio | Certificaciones de nube |
| Azure DevOps (CI), Make | | |

Brechas que cubren los dos proyectos complementarios: backend con Express y SQL, TypeScript en Node, pruebas de API y revisión de seguridad.

## Matriz de evaluación (0–100)

Criterios: complejidad técnica, calidad de código, interfaz, funcionalidades, arquitectura, integraciones, originalidad, utilidad, terminación y valor para un reclutador. Puntuación asignada por criterio propio a partir de la evidencia de cada README; no es una métrica externa.

| Proyecto | Puntaje | Decisión | Justificación |
|---|---|---|---|
| DogCare | 90 | Incluido | IA, mapas, marketplace, 50 pruebas, reglas verificadas en emulador |
| ServiX | 88 | Incluido | Arquitectura por capas, IA con escalamiento, CI en Azure |
| AsistenteIA | 85 | Incluido | Probado en Android real, 52 xUnit, SecureStorage |
| Elmercado10 | 80 | Incluido | Pedidos transaccionales; reglas sin desplegar (declarado) |
| ESP32 · LoRa · Firebase | 78 | Incluido | Dashboard en producción; firmware sin probar en hardware (declarado) |
| firestore-rules-lint | 74 | Incluido (complementario) | Herramienta útil sobre los repos propios; 11 pruebas |
| postulaciones-api | 72 | Incluido (complementario) | Cubre Express y SQL; 14 pruebas |
| Focus Mind (Next.js, Firebase, Genkit) | n/d | Descartado de las fichas | Sin análisis profundo en esta sesión; se menciona como evidencia de Next.js/React en el stack |
| Focus_Mind_Page, Sara, bootstrap, selectores_css, Hojas_de_vida, MiBlog | n/d | Descartados | Ejercicios HTML/CSS de bajo alcance |
| NET_MAUI, Eco Swap, trabajos-sql, procesos-almacenados, trigger | n/d | Descartados | Ejercicios o documentación sin producto demostrable |
| Esp32 (carpeta local de avances), Proyectos gas, claro-bold-sim | n/d | Descartados | Notas, hojas de cálculo o sin relación clara |

## Diferencias entre local y GitHub

- ServiX: la copia local tiene capturas de documentación sin versionar (`app/src/test/screenshots/doc/`).
- Los tres proyectos Android usan renders de Roborazzi con datos de demostración; se etiquetan así en el sitio.

## Pendientes

- Validar en teléfono: IA real y chat con dos cuentas en DogCare.
- Desplegar y probar las reglas de Firestore de Elmercado10.
- Probar el firmware ESP32 en hardware.
- Revisar Focus Mind con más detalle y decidir si merece ficha propia.
