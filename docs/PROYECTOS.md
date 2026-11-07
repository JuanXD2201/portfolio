# Proyectos

Fuentes: la hoja de vida `C:/Users/juane/Desktop/Busqueda_Trabajo/Busqueda_Laboral/CV_Maestro_ATS.pdf`, los README y la documentación de cada repositorio, y las carpetas locales de los proyectos. El CV publicado en el sitio no incluye teléfono, cédula, dirección ni referencias personales.

## Proyectos mostrados

| Grupo | Proyecto | Repositorio | Pruebas según su README |
|---|---|---|---|
| Grado | ServiX | JuanXD2201/ServiX | Pruebas unitarias en CI (Azure Pipelines) |
| Grado | Focus Mind | JuanXD2201/focus-mind | 12 pruebas Vitest sobre los 5 flujos de IA |
| Laboratorio | Ledger | JuanXD2201/ledger | 93 Jest + 22 e2e |
| Laboratorio | InjectionLab | JuanXD2201/injectionlab | 93 Vitest + 11 e2e |
| Laboratorio | Bodega | JuanXD2201/bodega | 132 Vitest + 26 e2e |
| Asignatura | DogCare | JuanXD2201/DogCare | 50 (41 unitarias y 9 renders); reglas Firestore 23/23 |
| Asignatura | Elmercado10 | JuanXD2201/Elmercado10 | 25 |
| Asignatura | AsistenteIA | JuanXD2201/AsistenteIA | 52 xUnit |
| Asignatura | ESP32 · LoRa · Firebase | JuanXD2201/ESP32-Firebase-Dashboard | 30 pytest + 18 Vitest |

La suma de pruebas que muestra la portada (564) se calcula con el campo `tests` de cada proyecto en `src/data/projects.ts`; ServiX no declara un número y no se suma.

## Criterios

- **Proyectos de grado primero:** ServiX y Focus Mind son los trabajos de mayor alcance y se presentan con cartel grande.
- **Laboratorio:** proyectos personales cuya demo se ejecuta en el navegador sin servidor.
- **Asignatura:** trabajos de curso con repositorio, pruebas y documentación.
- Los datos de cada ficha salen de los README y la documentación del repositorio: no se declaran funciones ni métricas que ahí no figuren.
- Las pantallas de ServiX, DogCare y Elmercado10 se describen como «Pantallas renderizadas desde el código de la app». Las de AsistenteIA son de un teléfono con Android 15; las de Focus Mind, Ledger e InjectionLab son capturas en el navegador.

Los scripts de MySQL y SQL Server de Bodega son equivalentes de esquema y datos escritos a mano: se comprueban con pruebas automáticas y no se ejecutaron en un motor real, y la ficha lo indica así.

## Proyectos que no se muestran

| Proyecto | Motivo |
|---|---|
| firestore-rules-lint, postulaciones-api | Herramientas auxiliares descartadas del portafolio |
| Focus_Mind_Page, Sara, bootstrap, selectores_css, Hojas_de_vida, MiBlog | Ejercicios de HTML/CSS de alcance reducido |
| NET_MAUI, Eco Swap, trabajos-sql, procesos-almacenados, trigger | Ejercicios o documentación sin producto demostrable |
| Esp32 (carpeta local de avances), Proyectos gas, claro-bold-sim | Notas, hojas de cálculo o sin relación clara con el perfil |

## Trayectoria mostrada

Formación: Tecnología en Desarrollo de Software (USB, desde 02/2024), curso SQL Injection (TryHackMe, 11/2024) y bachillerato. Experiencia seleccionada: únicamente «Auxiliar de datos» (AGC Gas y Energía, 06/2023–04/2024), por su relación con el perfil de desarrollador.

## Tecnologías

Cada tecnología de `src/data/stack.ts` lleva un campo `proof` con el proyecto o repositorio que la respalda. No se publican porcentajes de dominio.
