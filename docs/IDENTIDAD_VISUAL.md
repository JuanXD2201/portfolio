# Identidad visual

Dirección: interfaz de un sistema tecnológico personal, inspirada en las pantallas de J.A.R.V.I.S. de Iron Man pero reinterpretada de forma sobria y funcional. Modo oscuro por defecto; modo claro opcional.

## Paleta

| Token | Oscuro | Claro | Uso |
|---|---|---|---|
| `--bg` | `#04070d` | `#edf2f9` | Fondo (negro grafito azulado) |
| `--panel` / `--panel-2` | `#0a1424` / `#0e1b31` | `#ffffff` / `#f4f7fc` | Paneles |
| `--line` / `--line-strong` | `#1a2a45` / `#2c4b7c` | `#c9d6e8` / `#8aa5c9` | Líneas técnicas |
| `--text` / `--muted` | `#e6eefb` / `#95a8c6` | `#0a1730` / `#475b7a` | Texto |
| `--accent` | `#3fd8ff` (cian) | `#0a5fd1` | Acento principal |
| `--blue` | `#3b82f6` | `#1d4ed8` | Azul eléctrico secundario |
| `--deep` | `#0b2a5c` | `#0b2a5c` | Azul profundo (nodos activos) |

El acento brilla solo donde hay información o acción: botón principal, nodo activo, indicador de sección, esquinas de panel. Los pares de texto principales superan el contraste AA en ambos temas.

## Tipografía

- **Chakra Petch** (500, 600, 700): titulares y cifras; carácter técnico y legible.
- **Geist Variable**: texto corrido.
- **Geist Mono Variable**: datos, etiquetas y coordenadas, en minúsculas y con información real (por ejemplo, «Proyectos · 8 casos de estudio»).

Las fuentes se autoalojan con fontsource; no hay peticiones a terceros.

## Componentes HUD

- **Panel:** marco de 1 px con dos esquinas marcadas en el acento (`.panel`).
- **Núcleo:** anillos, arcos giratorios, retícula de marcas y partículas en Canvas 2D; retícula de puntería y pulso al hacer clic.
- **Indicadores:** cifras derivadas de los datos con una barra lateral.
- **Mapa radial:** especialidades en el anillo interior, proyectos en el exterior; seleccionar una especialidad resalta sus enlaces y muestra tecnologías con respaldo.
- **Riel de secciones:** puntos con la sección activa y etiqueta al enfocar.
- **Cabecera de sección:** línea que se traza al entrar en pantalla.

Cada sección usa su propia composición: portada de centro de control, texto editorial en dos columnas, mapa radial, carteles grandes para proyectos de grado, tarjetas con captura para laboratorios, filas compactas para asignaturas, eje vertical para la trayectoria y filas de canal para el contacto.

## Movimiento

- Una entrada escalonada de la portada.
- Trazado de la línea de cada cabecera de sección.
- Núcleo animado, pausado fuera de pantalla, con la pestaña oculta y con `prefers-reduced-motion`.
- Transiciones de 150–200 ms solo como respuesta a la interacción.

## Decisiones

- Sin Three.js ni WebGL: Canvas 2D y SVG bastan y cuestan poco en equipos modestos.
- Retícula y resplandor en capas fijas del `body` para no repintar al desplazarse.
- Bordes de 4 px de radio y líneas finas en lugar de tarjetas muy redondeadas con sombra.
- La paleta Ctrl+K y el riel son navegación real, no decoración.
