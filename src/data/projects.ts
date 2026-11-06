// Fuente única de proyectos. Para agregar uno: añadir un objeto aquí y sus imágenes en raw-assets/projects/<slug>/
// (luego `npm run build` las optimiza a WebP y regenera images.json).
import manifest from './images.json';
import { asset } from '../lib/paths';

export interface Img { src: string; width: number; height: number }

export function img(slug: string, file: string): Img {
  const key = `${slug}/${file.replace(/\.(png|jpg|webp)$/i, '')}`;
  const m = (manifest as Record<string, { width: number; height: number }>)[key];
  if (!m) throw new Error(`Imagen no encontrada: ${key}`);
  return { src: asset(`projects/${key}.webp`), width: m.width, height: m.height };
}

export type Kind = 'movil' | 'iot' | 'ia' | 'web' | 'backend' | 'seguridad';
export type CaptureKind = 'render' | 'dispositivo' | 'produccion' | 'ninguna';

export interface Capture { file: string; alt: string; caption: string }

export interface Project {
  slug: string;
  name: string;
  kind: Kind[];
  tagline: string;
  summary: string;
  status: string;
  statusTone: 'ok' | 'wip';
  context: string;
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
  features: string[];
  verified: string[];
  limits: string[];
  learnings: string[];
  repo: string;
  demo?: string;
  captures: Capture[];
  captureKind: CaptureKind;
  captureNote: string;
  diagram?: { file: string; alt: string };
  layout: 'phone' | 'wide';
  score: number;
  /** Vista previa tipo terminal (salida real de comandos) para proyectos sin capturas. */
  preview?: { title: string; lines: string[] };
  /** true = proyecto creado como complemento del portafolio, no académico. */
  complementary?: boolean;
  /** true = proyecto de grado (se destaca en una sección propia). */
  thesis?: boolean;
}

export const kindLabel: Record<Kind, string> = { movil: 'Móvil', iot: 'IoT', ia: 'IA', web: 'Web', backend: 'Backend', seguridad: 'Seguridad' };

const renderNote =
  'Renders generados con Robolectric + Roborazzi a partir de los Composables reales de la app, con repositorios de demostración y datos ficticios. No son capturas de un dispositivo.';

export const projects: Project[] = [
  {
    slug: 'servix',
    name: 'ServiX',
    kind: ['movil', 'ia'],
    tagline: 'Gestión de servicios técnicos del hogar con asistente de IA que escala a un administrador.',
    summary: 'App Android para administrar clientes, órdenes de servicio, historial y notificaciones, con chat de IA y escalamiento humano.',
    status: 'Terminado · pruebas unitarias y CI · verificado por el autor',
    statusTone: 'ok',
    context: 'Proyecto de Optativa III (Aplicaciones Móviles), Universidad de San Buenaventura. Equipo de tres con roles Scrum; mi rol fue Developer.',
    problem: 'Un negocio de servicios técnicos del hogar necesita registrar clientes y órdenes, dar seguimiento al estado de cada servicio y atender consultas sin depender de llamadas.',
    solution: 'App con roles de administrador y cliente, órdenes y historial por usuario, notificaciones y un chat con Gemini que responde dudas frecuentes y puede derivar la conversación a un administrador.',
    architecture: [
      'UI (Compose) → ViewModel → UseCase → Repository → Data Source',
      'Firebase Authentication y Cloud Firestore; cada usuario accede solo a su árbol usuarios/{uid}/…',
      'Gemini mediante Firebase AI Logic: no hay claves de IA en el APK',
      'Webhook de Make opcional para eventos de servicio (URL por local.properties)',
      'Azure Pipelines: compila, ejecuta pruebas unitarias y publica el APK debug',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Firebase Auth', 'Firestore', 'Firebase AI Logic', 'Make', 'Azure DevOps'],
    features: [
      'Clientes, órdenes de servicio e historial',
      'Rol administrador y portal de cliente',
      'Chat con IA y bandeja de escalamientos',
      'Notificaciones y reglas de Firestore por rol',
    ],
    verified: ['Compilación y pruebas unitarias ejecutadas en CI (Azure Pipelines)', 'Evidencia de Scrum, backlog y pipeline en la documentación'],
    limits: ['Las capturas son renders, no capturas de dispositivo', 'Integración con Make opcional: sin URL no se envían eventos'],
    learnings: [
      'Los repositorios simulados permiten renderizar y probar las pantallas sin depender de Firebase.',
      'Mover la IA a Firebase AI Logic evita publicar claves en el APK.',
      'Las reglas por usuario y rol deben diseñarse junto con el modelo de datos, no después.',
    ],
    repo: 'https://github.com/JuanXD2201/ServiX',
    captures: [
      { file: '03_home.png', alt: 'Pantalla de inicio de administrador en ServiX', caption: 'Inicio del administrador' },
      { file: '04_clientes.png', alt: 'Lista de clientes en ServiX', caption: 'Clientes' },
      { file: '07_servicio_detalle.png', alt: 'Detalle de una orden de servicio', caption: 'Detalle de servicio' },
      { file: '10_chat_ia_admin.png', alt: 'Chat con IA visto por el administrador', caption: 'Chat con IA (admin)' },
      { file: '15_portal_cliente.png', alt: 'Portal de cliente', caption: 'Portal del cliente' },
      { file: '16_escalamientos_admin.png', alt: 'Bandeja de escalamientos', caption: 'Escalamientos' },
    ],
    captureKind: 'render',
    captureNote: renderNote,
    diagram: { file: 'arquitectura.png', alt: 'Diagrama de arquitectura por capas de ServiX' },
    layout: 'phone',
    score: 88,
    thesis: true,
  },
  {
    slug: 'dogcare',
    name: 'DogCare',
    kind: ['movil', 'ia'],
    tagline: 'Cuidado canino: edad, asistente de IA con urgencias, veterinarias reales, tienda y chat.',
    summary: 'App Android con calculadora de edad canina, IA con detección de urgencias, mapa de veterinarias de OpenStreetMap, marketplace y chat entre usuarios.',
    status: 'Terminado · 50 pruebas superadas · verificado por el autor',
    statusTone: 'ok',
    context: 'Taller II (Corte III) de Optativa II, Universidad de San Buenaventura. Trabajo en equipo de tres personas.',
    problem: 'Quienes tienen perro buscan en sitios distintos la edad equivalente, orientación ante síntomas, clínicas cercanas y productos.',
    solution: 'Una sola app que registra los perros, orienta con IA (con tarjeta de urgencia hacia veterinarias y la línea 123), ubica clínicas reales con distancia e indicaciones, y ofrece tienda con carrito y chat.',
    architecture: [
      'Capas data / domain / presentation (Compose)',
      'Firebase Auth (correo y Google), Firestore y Firebase AI Logic (Gemini) con App Check',
      'Veterinarias desde OpenStreetMap: Overpass con Nominatim de respaldo; mapa con OSMDroid',
      'Detector de urgencias y cálculo de edad en la capa de dominio, con pruebas unitarias',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Firebase Auth', 'Firestore', 'Firebase AI Logic', 'App Check', 'OSMDroid', 'OkHttp'],
    features: [
      'Registro de perros y edad humana aproximada con recomendaciones por etapa',
      'Asistente de IA con tarjeta de urgencia',
      'Veterinarias reales cercanas con distancia e indicaciones',
      'Marketplace, carrito y pago simulado',
      'Chat entre usuarios con bloqueo y reporte',
    ],
    verified: [
      '50 pruebas automatizadas superadas (41 unitarias y 9 renders), 2026-11-02',
      'Reglas de Firestore: 23 de 23 casos en el emulador',
      'Lint: 0 errores y 65 avisos',
      'Funcionamiento general verificado por el autor',
    ],
    limits: [
      'El pago es una simulación: no hay cobros reales',
      'La IA no sustituye a un médico veterinario',
    ],
    learnings: [
      'Las reglas de Firestore se validan en el emulador (23 casos), no solo desde la interfaz.',
      'Combinar dos fuentes (Overpass y Nominatim) exige manejar fallos y datos incompletos de OpenStreetMap.',
    ],
    repo: 'https://github.com/JuanXD2201/DogCare',
    captures: [
      { file: '02_calculadora_edad.png', alt: 'Calculadora de edad canina', caption: 'Edad canina' },
      { file: '03_chat_ia.png', alt: 'Chat con IA y tarjeta de urgencia', caption: 'Chat con IA' },
      { file: '04_veterinarias.png', alt: 'Búsqueda de veterinarias', caption: 'Veterinarias' },
      { file: '05_tienda.png', alt: 'Marketplace de alimento canino', caption: 'Tienda' },
      { file: '07_pago_simulado.png', alt: 'Pantalla de pago simulado', caption: 'Pago simulado' },
    ],
    captureKind: 'render',
    captureNote: renderNote + ' El mapa no muestra teselas porque el render no tiene red.',
    diagram: { file: 'arquitectura.png', alt: 'Diagrama de arquitectura por capas de DogCare' },
    layout: 'phone',
    score: 90,
  },
  {
    slug: 'elmercado10',
    name: 'Elmercado10',
    kind: ['movil'],
    tagline: 'Marketplace móvil con roles comprador y vendedor, pedidos transaccionales y chat.',
    summary: 'App Android para comprar y vender productos nuevos y usados, con catálogo filtrable, carrito, ciclo de vida del pedido, calificaciones y chat en tiempo real.',
    status: 'Terminado · 25 pruebas superadas · verificado por el autor',
    statusTone: 'ok',
    context: 'Proyecto de Optativa 2, Universidad de San Buenaventura. Trabajo en equipo de tres personas.',
    problem: 'Un marketplace pequeño necesita que el stock y el precio no se corrompan cuando varios compradores confirman pedidos al mismo tiempo.',
    solution: 'Confirmación de pedidos con control transaccional de inventario y precio en Firestore, estados del pedido (pendiente → confirmado → enviado → entregado/cancelado) y chat directo entre comprador y vendedor.',
    architecture: [
      'Tres capas: presentación (Compose, ViewModels, navegación), dominio (modelos e interfaces) y datos (repositorios sobre Firebase)',
      'Sin servidor propio: la seguridad recae en firestore.rules y storage.rules',
      'Fotografías con CameraX o galería, cargadas con Coil y guardadas en Cloud Storage',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Navigation Compose', 'CameraX', 'Coil', 'Firebase Auth', 'Firestore', 'Cloud Storage'],
    features: [
      'Dos roles: comprador y vendedor',
      'Catálogo con categorías, filtros (estado, precio, calificación) y orden',
      'Publicación, edición y baja de productos con cámara o galería',
      'Carrito y pedidos con control transaccional',
      'Chat comprador–vendedor y calificaciones de 1 a 5',
    ],
    verified: ['Compilación de depuración correcta', '25 pruebas superadas: 7 de OrderStatus, 15 renders de pantallas y 3 de plantilla'],
    limits: [
      'Las notificaciones solo funcionan con la app activa (sin FCM)',
    ],
    learnings: [
      'El stock y el precio se validan de forma transaccional al confirmar un pedido, no en la interfaz.',
      'Declarar las limitaciones en el README ayuda a priorizar lo que falta antes de publicar.',
    ],
    repo: 'https://github.com/JuanXD2201/Elmercado10',
    captures: [
      { file: '04_catalogo.png', alt: 'Catálogo de productos', caption: 'Catálogo' },
      { file: '06_detalle_producto.png', alt: 'Detalle de producto', caption: 'Detalle de producto' },
      { file: '08_carrito.png', alt: 'Carrito de compras', caption: 'Carrito' },
      { file: '10_pedidos_vendedor.png', alt: 'Pedidos recibidos por el vendedor', caption: 'Pedidos del vendedor' },
      { file: '14_chat_detalle.png', alt: 'Chat entre comprador y vendedor', caption: 'Chat' },
    ],
    captureKind: 'render',
    captureNote: 'Renders de las pantallas reales con datos de demostración (Robolectric y Roborazzi); no provienen de un dispositivo.',
    diagram: { file: 'arquitectura.png', alt: 'Diagrama de capas de Elmercado10' },
    layout: 'phone',
    score: 80,
  },
  {
    slug: 'asistenteia',
    name: 'AsistenteIA',
    kind: ['movil', 'ia'],
    tagline: 'Cliente .NET MAUI para consultar una IA con la clave del propio usuario, con historial SQLite.',
    summary: 'App .NET MAUI (Windows y Android) que consulta modelos de IA por API REST, guarda la clave en SecureStorage y conserva un historial local con búsqueda y CRUD.',
    status: 'Terminado · 52 pruebas xUnit · ejecutado en Windows y Android físico',
    statusTone: 'ok',
    context: 'Proyecto académico de .NET MAUI con requisitos, arquitectura, riesgos y manuales entregados como documentación.',
    problem: 'Consultar una IA desde el móvil sin incrustar claves en el código y conservando el historial de consultas en el dispositivo.',
    solution: 'La clave la pega el usuario y se guarda con SecureStorage; el proveedor se detecta por prefijo y solo a él se envía la clave. Maneja errores 400/401/403/404/408/429/5xx, timeout y falta de red.',
    architecture: [
      'AsistenteIA (MAUI: Views, ViewModels con MVVM y AppShell) + AsistenteIA.Core (modelos, cliente REST, configuración, repositorio)',
      'Persistencia local en SQLite; clave en SecureStorage (nunca en código, SQLite ni Git)',
      'Proveedor principal Google Gemini por API compatible con Chat Completions',
    ],
    stack: ['C#', '.NET MAUI', 'MVVM', 'SQLite', 'SecureStorage', 'API REST', 'xUnit'],
    features: [
      'Cinco pantallas: inicio, consultar IA, historial, detalle y configuración',
      'Detección del proveedor y prueba de conexión',
      'Historial con CRUD, búsqueda y persistencia tras reiniciar',
      'Manejo explícito de errores HTTP, timeout y sin red',
    ],
    verified: [
      '52 pruebas xUnit aprobadas en el entorno de desarrollo (5 en vivo opcionales)',
      'Compila para Windows y Android sin errores',
      'Ejecutado en un teléfono físico con Android 15 y en Windows, con capturas',
    ],
    limits: [
      'iOS y Mac Catalyst quedan fuera del alcance',
      'Algunos registros de las capturas de Windows se sembraron a mano; los de Android son consultas reales',
    ],
    learnings: [
      'Aislar el cliente REST en un proyecto Core permitió probarlo sin interfaz.',
      'SecureStorage protege la clave en reposo pero no ante un dispositivo comprometido; por eso no existe clave por defecto.',
    ],
    repo: 'https://github.com/JuanXD2201/AsistenteIA',
    captures: [
      { file: 'android_02_configuracion_validada.png', alt: 'Configuración validada en Android', caption: 'Configuración (Android)' },
      { file: 'android_03_consulta_respuesta.png', alt: 'Consulta con respuesta en Android', caption: 'Consulta (Android)' },
      { file: 'android_04_historial.png', alt: 'Historial de consultas en Android', caption: 'Historial (Android)' },
      { file: 'android_12_modelos_cargados.png', alt: 'Modelos cargados desde la API', caption: 'Modelos (Android)' },
    ],
    captureKind: 'dispositivo',
    captureNote: 'Capturas tomadas en un teléfono físico con Android 15 durante las pruebas manuales.',
    diagram: { file: 'arquitectura.png', alt: 'Diagrama de arquitectura de AsistenteIA' },
    layout: 'phone',
    score: 85,
  },
  {
    slug: 'esp32-dashboard',
    name: 'ESP32 · LoRa · Firebase',
    kind: ['iot', 'web'],
    tagline: 'Enlace LoRa 915 MHz entre dos ESP32, API REST y dashboard web en producción.',
    summary: 'Dos ESP32 forman un enlace LoRa; el receptor actúa de pasarela hacia una API Flask que guarda en Firestore, y un dashboard web muestra las lecturas.',
    status: 'Terminado · dashboard en producción · verificado por el autor',
    statusTone: 'ok',
    context: 'Seminario en TIC, guía «Capa de red en IoT». Repositorio ESP32-Firebase-Dashboard.',
    problem: 'Llevar lecturas de un sensor remoto hasta una interfaz web sin exponer credenciales administrativas en el microcontrolador.',
    solution: 'El emisor envía por LoRa; el receptor publica por HTTP a una API que valida la clave X-API-Key y escribe con Admin SDK. Los clientes web solo pueden leer la colección lecturas.',
    architecture: [
      'AM2301 → emisor (T3 V1.6.1) ── LoRa 915 MHz ──► receptor ── HTTP POST ──► API Flask ──► Firestore',
      'Dashboard (Vite) lee Firestore en solo lectura y está desplegado en Firebase Hosting',
      'Mensajes BLE desde un teléfono hacia el receptor; clave de API guardada en NVS, no en el código',
    ],
    stack: ['C++ / Arduino', 'LoRa', 'BLE', 'Python', 'Flask', 'Firestore', 'Vite', 'Vitest', 'pytest', 'Firebase Hosting'],
    features: [
      'Firmware de emisor y receptor que compilan con esp32 core 2.0.12',
      'API REST con 30 pruebas pytest',
      'Dashboard con 18 pruebas Vitest, build y despliegue',
      'Reglas de Firestore: lectura pública de lecturas, escritura solo vía API',
    ],
    verified: [
      'Extremo a extremo con lecturas simuladas: API → Firestore → dashboard',
      '30 pruebas pytest y 18 pruebas Vitest superadas',
      'Dashboard publicado (HTTP 200)',
    ],
    limits: [
      'No existe URL pública de la API (plan Spark sin Cloud Run); se ejecuta en un PC del laboratorio',
    ],
    learnings: [
      'Diseñar las reglas de seguridad primero evitó poner credenciales de administrador en el microcontrolador.',
      'Simular lecturas permitió probar la cadena completa sin depender del hardware.',
    ],
    repo: 'https://github.com/JuanXD2201/ESP32-Firebase-Dashboard',
    demo: 'https://esp32-8aa66.web.app',
    captures: [
      { file: 'dashboard.png', alt: 'Dashboard web de lecturas ESP32 en producción', caption: 'Dashboard en producción' },
    ],
    captureKind: 'produccion',
    captureNote: 'Captura tomada del dashboard desplegado; sin lecturas reales porque la colección está vacía.',
    layout: 'wide',
    score: 78,
  },
  {
    slug: 'firestore-rules-lint',
    name: 'firestore-rules-lint',
    kind: ['seguridad', 'backend'],
    tagline: 'CLI en TypeScript que audita firestore.rules y falla en CI si encuentra accesos abiertos.',
    summary: 'Auditor estático de reglas de Firestore: detecta escrituras sin autenticación, accesos abiertos, comodines recursivos y reglas sin validación.',
    status: 'Complementario · 11 pruebas Vitest superadas · ejecutado sobre 3 repos propios',
    statusTone: 'ok',
    context: 'Proyecto creado para este portafolio (noviembre de 2026) a partir de una necesidad real: revisar las reglas de seguridad de DogCare, ServiX y Elmercado10 de forma repetible.',
    problem: 'Las reglas de Firestore son la única barrera de seguridad de una app sin servidor propio, y un allow demasiado permisivo pasa inadvertido en una revisión manual.',
    solution: 'Un CLI que recorre los bloques match anidados, expande las funciones locales y evalúa cada allow contra siete reglas (FR001–FR007). Devuelve texto o JSON y un código de salida configurable con --fail-on para integrarlo en CI.',
    architecture: [
      'src/lint.ts: limpieza de comentarios, extracción de funciones y de sentencias allow con su ruta, y motor de reglas',
      'src/cli.ts: argumentos, salida en texto o JSON y código de salida por severidad',
      'Sin dependencias en ejecución; TypeScript compilado a dist/ y Vitest para pruebas',
    ],
    stack: ['TypeScript', 'Node.js', 'Vitest', 'Firestore Rules', 'CLI'],
    features: [
      'Siete reglas con severidad: crítica, alta, media, baja e información',
      'Expansión de funciones locales antes de evaluar cada condición',
      'Números de línea correctos aun con comentarios',
      'Salida JSON y --fail-on para CI',
    ],
    verified: [
      '11 pruebas Vitest superadas, incluidos los falsos positivos encontrados al usarlo',
      'Ejecutado sobre DogCare, ServiX y Elmercado10: 0 hallazgos críticos o altos',
    ],
    limits: [
      'Análisis por expresiones regulares: no sustituye al emulador de Firestore',
      'No evalúa funciones con parámetros ni lógica compleja',
    ],
    learnings: [
      'La primera versión marcaba if false y la lectura pública como errores; las pruebas de falsos positivos salieron de usarlo sobre reglas reales.',
      'Contar líneas sobre el texto sin comentarios, reemplazados por espacios, mantiene los números de línea del archivo original.',
    ],
    repo: 'https://github.com/JuanXD2201/firestore-rules-lint',
    captures: [],
    captureKind: 'ninguna',
    captureNote: 'Sin capturas: la vista previa es salida real del CLI sobre las reglas de DogCare.',
    layout: 'wide',
    score: 74,
    complementary: true,
    preview: {
      title: '$ firestore-rules-lint firestore.rules --fail-on critical',
      lines: [
        'firestore.rules:248  [INFO] FR007  /products/{productId}',
        '    `allow get, list: if true` es lectura pública. Confirma que los datos no son sensibles.',
        'firestore.rules:276  [INFO] FR007  /categories/{categoryId}',
        '',
        '2 hallazgo(s) · critical: 0  high: 0  medium: 0  low: 0  info: 2',
      ],
    },
  },
  {
    slug: 'postulaciones-api',
    name: 'postulaciones-api',
    kind: ['backend', 'web'],
    tagline: 'API REST con Express, SQLite y zod para seguir postulaciones, seguimientos y embudo.',
    summary: 'API REST con interfaz web mínima para llevar el control de postulaciones laborales: estados, fechas de seguimiento y tasa de avance.',
    status: 'Complementario · 14 pruebas superadas · API verificada con servidor real',
    statusTone: 'ok',
    context: 'Proyecto creado para este portafolio (noviembre de 2026) para cubrir backend con Express y SQL, y resolver una necesidad propia: ordenar la búsqueda laboral.',
    problem: 'Llevar decenas de postulaciones en hojas de cálculo hace perder fechas de seguimiento y no muestra cuántas avanzan a entrevista.',
    solution: 'API con CRUD, filtro por estado, estadísticas del embudo y lista de seguimientos vencidos o próximos. La validación es estricta y las consultas están parametrizadas.',
    architecture: [
      'src/db.ts: esquema SQLite con restricciones CHECK e índices, y clase Store con consultas parametrizadas',
      'src/app.ts: rutas Express 5 con validación zod .strict() y manejador de errores central',
      'public/index.html: interfaz mínima sin frameworks que construye el DOM con textContent (sin innerHTML)',
      'El reloj se inyecta en createApp para probar los seguimientos sin depender de la fecha actual',
    ],
    stack: ['TypeScript', 'Node.js', 'Express 5', 'SQLite', 'zod', 'Vitest'],
    features: [
      'CRUD de postulaciones con cinco estados',
      'GET /api/stats con conteo por estado y tasa de avance',
      'GET /api/followups con vencidos y próximos de postulaciones activas',
      'Validación de fechas, URLs y campos desconocidos (400)',
    ],
    verified: [
      '14 pruebas superadas: CRUD, validación, inyección SQL, estadísticas y seguimientos',
      'Servidor levantado con curl: alta, estadísticas, validación 400 e interfaz en /',
    ],
    limits: [
      'Sin autenticación ni multiusuario: escucha solo en 127.0.0.1',
    ],
    learnings: [
      'Inyectar el reloj en la aplicación permitió probar fechas relativas de forma determinista.',
      'Resolver la ruta de archivos estáticos con fileURLToPath evita el 404 que produjo una conversión manual en Windows.',
    ],
    repo: 'https://github.com/JuanXD2201/postulaciones-api',
    captures: [],
    captureKind: 'ninguna',
    captureNote: 'Sin capturas: la vista previa es salida real de curl contra el servidor en ejecución.',
    layout: 'wide',
    score: 72,
    complementary: true,
    preview: {
      title: '$ curl localhost:3917/api/stats',
      lines: [
        '{"total":1,"byStatus":{"guardada":0,"postulada":1,',
        '  "entrevista":0,"oferta":0,"rechazada":0},',
        ' "submitted":1,"advanceRate":0}',
        '',
        '$ curl -X POST /api/applications -d {"role":"x"}',
        '{"error":"Datos inválidos","details":[{"path":"company",...}]}',
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
