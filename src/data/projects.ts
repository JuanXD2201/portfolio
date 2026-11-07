// Fuente única de proyectos. Para agregar uno: añadir un objeto aquí y sus imágenes en raw-assets/projects/<slug>/
// (luego `npm run build` las optimiza a WebP y regenera images.json).
// Para un laboratorio con demo: grupo 'lab' + `lab.path` y copiar su build (dist/) a public/labs/<slug>/.
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
export type Group = 'grado' | 'lab' | 'asignatura';
export type CaptureKind = 'render' | 'dispositivo' | 'produccion' | 'navegador';

export interface Capture { file: string; alt: string; caption: string }

export interface Project {
  slug: string;
  name: string;
  group: Group;
  kind: Kind[];
  tagline: string;
  summary: string;
  status: string;
  context: string;
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
  features: string[];
  /** Resultados de pruebas tal como figuran en el README del proyecto. */
  checks: string[];
  /** Total de pruebas automatizadas del README (se suma en los indicadores de la portada). */
  tests?: number;
  /** «Alcance y decisiones»: hechos redactados en positivo. */
  scope: string[];
  learnings: string[];
  repo: string;
  /** Demo externa. */
  demo?: string;
  /** Demo estática incluida en este sitio: ruta bajo public/. */
  lab?: { path: string };
  captures: Capture[];
  captureKind: CaptureKind;
  captureNote: string;
  diagram?: { file: string; alt: string };
  layout: 'phone' | 'wide';
}

export const kindLabel: Record<Kind, string> = { movil: 'Móvil', iot: 'IoT', ia: 'IA', web: 'Web', backend: 'Backend', seguridad: 'Seguridad' };

export const groupLabel: Record<Group, { title: string; lead: string }> = {
  grado: { title: 'Proyectos de grado', lead: 'Los dos trabajos con mayor alcance de la carrera.' },
  lab: { title: 'Laboratorio', lead: 'Proyectos personales con demo ejecutable en el navegador, sin servidor.' },
  asignatura: { title: 'Proyectos de asignatura', lead: 'Trabajos de curso con repositorio, pruebas y documentación.' },
};

const renderNote = 'Con datos de demostración.';

export const projects: Project[] = [
  {
    slug: 'servix',
    name: 'ServiX',
    group: 'grado',
    kind: ['movil', 'ia'],
    tagline: 'Gestión de servicios técnicos del hogar con asistente de IA que escala a un administrador.',
    summary: 'App Android para administrar clientes, órdenes de servicio, historial y notificaciones, con chat de IA y escalamiento a un administrador.',
    status: 'Terminado · pruebas unitarias y CI',
    context: 'Proyecto de Optativa III (Aplicaciones Móviles), Universidad de San Buenaventura. Equipo de tres con roles Scrum; mi rol fue Developer.',
    problem: 'Un negocio de servicios técnicos del hogar necesita registrar clientes y órdenes, dar seguimiento al estado de cada servicio y atender consultas sin depender de llamadas.',
    solution: 'App con roles de administrador y cliente, órdenes y historial por usuario, notificaciones y un chat con Gemini que responde dudas frecuentes y puede derivar la conversación a un administrador.',
    architecture: [
      'UI (Compose) → ViewModel → UseCase → Repository → Data Source',
      'Firebase Authentication y Cloud Firestore; cada usuario accede solo a su árbol usuarios/{uid}/…',
      'Gemini mediante Firebase AI Logic: no hay claves de IA en el APK',
      'Webhook de Make para eventos de servicio (URL por local.properties)',
      'Azure Pipelines: compila, ejecuta pruebas unitarias y publica el APK debug',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Firebase Auth', 'Firestore', 'Firebase AI Logic', 'Make', 'Azure DevOps'],
    features: [
      'Clientes, órdenes de servicio e historial',
      'Rol administrador y portal de cliente',
      'Chat con IA y bandeja de escalamientos',
      'Notificaciones y reglas de Firestore por rol',
    ],
    checks: ['Compilación y pruebas unitarias ejecutadas en CI (Azure Pipelines)', 'Scrum, backlog y pipeline documentados'],
    scope: ['El webhook de Make es configurable: sin URL no se envían eventos', 'La IA se consume desde Firebase AI Logic, sin claves en el APK'],
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
  },
  {
    slug: 'focus-mind',
    name: 'Focus Mind',
    group: 'grado',
    kind: ['web', 'ia'],
    tagline: 'Plataforma web de bienestar y productividad con paneles por rol, datos cifrados y actividades con IA.',
    summary: 'Espacio para concentrarse, relajarse y llevar un registro personal, con quince actividades, flujos de IA con Genkit y Gemini, y paneles de administración, supervisión, análisis y contenido.',
    status: 'Terminado · 12 pruebas unitarias',
    context: 'Proyecto de grado de Tecnología en Desarrollo de Software, Universidad de San Buenaventura.',
    problem: 'Quien busca concentrarse o desconectarse suele repartir tareas, calendario, hábitos y ejercicios de relajación entre varias apps; y quien administra la plataforma necesita ver el uso agregado sin acceder a lo que cada persona escribe.',
    solution: 'Una aplicación web con lista de enfoque, calendario, diario de gratitud, hábitos y quince actividades de relajación y juego. El texto personal se cifra en el navegador antes de llegar a Firestore, y cinco roles ven solo lo que su panel necesita.',
    architecture: [
      'Next.js 15 (App Router) con React y TypeScript; interfaz con Tailwind CSS y shadcn/ui',
      'Firebase Authentication y Cloud Firestore en tiempo real; el rol vive en users/{uid} y las reglas lo comprueban en el servidor',
      'Cifrado en el cliente: clave AES-256 derivada con PBKDF2 (SHA-256, 100 000 iteraciones), AES-GCM con IV aleatorio por mensaje',
      'Flujos de IA con Genkit y Gemini en el servidor: cuento, meditación con audio, juego de imágenes y conexión de palabras',
      'Panel de análisis con gráficos (Recharts) y exportación de usuarios a Excel',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Firebase Auth', 'Firestore', 'Genkit', 'Gemini', 'Zod', 'Recharts', 'Vitest'],
    features: [
      'Cinco roles: usuario, administrador, supervisor, analista de datos y gestor de contenido',
      'Quince actividades: dibujo, mándala, meditación guiada, memoria, respiración, sonidos, cuentos, Pomodoro, hábitos, puzzle y más',
      'Lista de enfoque y calendario de eventos por día',
      'Panel de análisis con conteos globales, crecimiento de usuarios y exportación a Excel',
      'Tema claro y oscuro, diseño responsive',
    ],
    checks: ['12 pruebas unitarias con Vitest sobre los 5 flujos de IA, con el modelo simulado', 'Reglas de Firestore revisadas con linter estático y a mano'],
    tests: 12,
    scope: [
      'El cifrado cubre tareas, títulos de eventos y gratitud; la clave se deriva de la contraseña y no sale del navegador',
      'Los registros nuevos nacen con rol usuario; solo un administrador cambia roles',
      'Las actividades de IA requieren una clave de Gemini en el servidor y consumen cuota del servicio',
      'Sin cuenta de prueba pública: cada persona crea la suya desde el registro',
    ],
    learnings: [
      'El rol debe validarse en el servidor con reglas de Firestore; comprobarlo solo en el cliente no protege los datos.',
      'Cifrar en el navegador obliga a decidir qué se protege y qué se puede agregar para estadísticas.',
      'Aislar los flujos de IA en el servidor mantiene la clave fuera del bundle.',
    ],
    repo: 'https://github.com/JuanXD2201/focus-mind',
    captures: [
      { file: '01-landing.png', alt: 'Página de inicio de Focus Mind en tema oscuro', caption: 'Inicio · tema oscuro' },
      { file: '04-landing-claro.png', alt: 'Página de inicio de Focus Mind en tema claro', caption: 'Inicio · tema claro' },
      { file: '02-login.png', alt: 'Formulario de inicio de sesión de Focus Mind', caption: 'Inicio de sesión' },
      { file: '03-register.png', alt: 'Formulario de registro de Focus Mind', caption: 'Registro' },
    ],
    captureKind: 'navegador',
    captureNote: 'Capturas de las páginas públicas (1280×800). Las pantallas por rol requieren una cuenta de Firebase.',
    layout: 'wide',
  },
  {
    slug: 'ledger',
    name: 'Ledger',
    group: 'lab',
    kind: ['web'],
    tagline: 'Finanzas personales que viven en el navegador: cuentas, presupuestos, informes e importación CSV.',
    summary: 'Registra cuentas y movimientos, fija presupuestos mensuales, importa extractos en CSV y ve a dónde se va el dinero, sin servidor ni cuenta.',
    status: 'Terminado · demo en el navegador',
    context: 'Laboratorio personal para practicar arquitectura en el frontend: dominio puro y testeable, almacenamiento intercambiable e interfaz cuidada.',
    problem: 'Una app de finanzas debe mantener saldos consistentes al editar o borrar movimientos, repetir gastos sin duplicarlos y aceptar extractos con formatos desordenados.',
    solution: 'El saldo siempre se deriva de los movimientos; las recurrencias son idempotentes; el CSV se valida fila a fila con vista previa y detección de duplicados; el esquema guardado está versionado y se migra al leer.',
    architecture: [
      'Tres capas con dependencias en una sola dirección: ui → storage → domain',
      'Dominio en funciones puras (saldos, presupuestos, recurrencias, CSV, esquema) que se prueba en Node sin DOM',
      'Repositorio con interfaz LedgerRepository sobre localStorage; cambiar a IndexedDB no toca la interfaz',
      'Gráficos propios en SVG (dona, barras, tendencia) con lectura por puntero y teclado',
      'Navegación por hash y base relativa, para publicarse en cualquier subruta estática',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Jest', 'Playwright', 'SVG', 'localStorage'],
    features: [
      'Cuentas de efectivo, banco y tarjeta; gastos, ingresos y transferencias',
      'Movimientos recurrentes semanales o mensuales que respetan el fin de mes',
      'Presupuestos por categoría con aviso al 80 % y alerta al 100 %',
      'Informes: gasto por categoría, flujo mensual y tendencia del patrimonio',
      'Importar y exportar CSV, respaldo JSON validado, atajos de teclado y tema claro/oscuro',
    ],
    checks: ['93 pruebas Jest sobre dominio y repositorio (6 archivos)', '22 pruebas e2e con Playwright sobre el build de producción', 'Build de 665 KB (JS 315 KB, 96 KB comprimido)'],
    tests: 115,
    scope: [
      'Moneda única (COP) y montos en pesos enteros, para evitar errores de coma flotante',
      'Los datos viven solo en el navegador de cada persona; el respaldo JSON permite moverlos',
      'Proyecto de demostración: no es un producto financiero',
    ],
    learnings: [
      'Derivar los saldos de los movimientos evita inconsistencias al editar o borrar.',
      'Guardar fechas como texto ISO elimina el desfase de un día por zona horaria.',
      'Neutralizar celdas que empiezan por = + @ al exportar evita inyección de fórmulas en hojas de cálculo.',
    ],
    repo: 'https://github.com/JuanXD2201/ledger',
    lab: { path: 'labs/ledger/' },
    captures: [
      { file: 'panel-escritorio-oscuro.png', alt: 'Panel de Ledger en tema oscuro', caption: 'Panel · oscuro' },
      { file: 'movimientos-escritorio-claro.png', alt: 'Lista de movimientos de Ledger con filtros', caption: 'Movimientos' },
      { file: 'presupuestos-escritorio-oscuro.png', alt: 'Presupuestos mensuales con barras de progreso', caption: 'Presupuestos' },
      { file: 'informes-escritorio-claro.png', alt: 'Informes con dona, barras y tendencia', caption: 'Informes' },
      { file: 'importacion-escritorio-claro.png', alt: 'Importación de CSV con vista previa', caption: 'Importación CSV' },
      { file: 'panel-movil.png', alt: 'Panel de Ledger en móvil', caption: 'Panel · móvil' },
    ],
    captureKind: 'navegador',
    captureNote: 'Capturas del propio laboratorio ejecutándose en Chrome, con datos de ejemplo.',
    layout: 'wide',
  },
  {
    slug: 'injectionlab',
    name: 'InjectionLab',
    group: 'lab',
    kind: ['seguridad', 'web'],
    tagline: 'Laboratorio para detectar, explotar en un entorno aislado y prevenir la inyección SQL.',
    summary: 'Cuatro escenarios vulnerables que se ejecutan de verdad sobre SQLite en memoria (WebAssembly), con modo defender, ocho retos y consola SQL.',
    status: 'Terminado · demo en el navegador',
    context: 'Laboratorio personal construido después de completar la sala «SQL Injection» de TryHackMe, pensado como herramienta de práctica reutilizable.',
    problem: 'Entender la inyección SQL exige ver la consulta final, el resultado real y por qué la defensa funciona, sin atacar sistemas ajenos.',
    solution: 'Una tienda ficticia con SQLite en el navegador (sql.js). Cada escenario muestra la consulta con la entrada resaltada y permite comparar, lado a lado, la versión vulnerable con su corrección: parametrizada, con lista blanca o con mínimo privilegio.',
    architecture: [
      'Dominio puro (consultas, sanitizadores, retos, payloads) que no conoce DOM ni sql.js',
      'El contrato ConsultaConstruida separa la consulta en segmentos fijo, entrada y derivado, para resaltar el origen de cada parte',
      'Dos bases SQLite en memoria para simular el mínimo privilegio: la pública no contiene las tablas sensibles',
      'Interfaz con DOM propio y router por hash, sin framework de UI',
      'Banderas de los retos calculadas con hash y semilla local; no existen como texto en el código',
    ],
    stack: ['TypeScript', 'Vite', 'sql.js', 'WebAssembly', 'SQLite', 'Vitest', 'Playwright'],
    features: [
      'Cuatro escenarios: elusión de login, UNION SELECT, inyección ciega y ORDER BY',
      'Modo atacar con pistas y biblioteca de payloads; modo defender con comparación lado a lado',
      'Ocho retos tipo CTF con puntaje y progreso persistente',
      'Consola SQL de solo lectura y guía de defensa con ejemplos en Node.js, Kotlin/JDBC y C#/ADO.NET',
    ],
    checks: ['93 pruebas Vitest sobre el dominio, incluidas pruebas de explotación contra sql.js en Node', '11 pruebas e2e con Playwright, sin errores de consola'],
    tests: 104,
    scope: [
      'Todo corre en el navegador: sin backend, sin red y sin objetivos reales',
      'ORDER BY se defiende con lista blanca porque un identificador de columna no se puede enlazar como parámetro',
      'El mínimo privilegio se demuestra con una segunda base sin tablas sensibles, no con GRANT',
    ],
    learnings: [
      'Construir la consulta como datos permite probar la lógica de inyección sin levantar un motor.',
      'Ejecutar sobre un motor SQL real muestra errores y resultados auténticos, no texto simulado.',
    ],
    repo: 'https://github.com/JuanXD2201/injectionlab',
    lab: { path: 'labs/injectionlab/' },
    captures: [
      { file: '01-inicio.png', alt: 'Inicio de InjectionLab con los cuatro escenarios', caption: 'Inicio' },
      { file: '02-escenario-login-ataque.png', alt: 'Escenario de inicio de sesión vulnerable', caption: 'Elusión de login' },
      { file: '03-escenario-busqueda-union.png', alt: 'Escenario de búsqueda con UNION SELECT', caption: 'UNION SELECT' },
      { file: '06-modo-defender.png', alt: 'Modo defender comparando consulta vulnerable y corregida', caption: 'Modo defender' },
      { file: '07-retos.png', alt: 'Lista de retos tipo CTF', caption: 'Retos' },
      { file: '08-consola-sql.png', alt: 'Consola SQL de solo lectura', caption: 'Consola SQL' },
    ],
    captureKind: 'navegador',
    captureNote: 'Capturas del propio laboratorio ejecutándose en Chrome.',
    layout: 'wide',
  },
  {
    slug: 'bodega',
    name: 'Bodega',
    group: 'lab',
    kind: ['web', 'backend'],
    tagline: 'Inventario, compras y pedidos para una distribuidora, con una base SQLite real en el navegador.',
    summary: 'Gestión de productos, existencias por bodega, pedidos de venta, compras y auditoría sobre SQLite en WebAssembly: 16 tablas, 9 vistas y 25 triggers, con tres roles y consola SQL de solo lectura.',
    status: 'Terminado · demo en el navegador',
    context: 'Laboratorio personal cuyo centro es la base de datos: el modelo relacional, sus restricciones y triggers, con una aplicación de negocio construida encima.',
    problem: 'Un inventario se corrompe cuando el stock cambia desde varios sitios o cuando un pedido se confirma a medias. Las reglas deben sostenerse aunque falle la interfaz.',
    solution: 'Las existencias solo cambian al insertar movimientos; pedidos, recepciones, traslados y ajustes los generan mediante triggers. Confirmar un pedido es todo o nada: si una línea no tiene stock, la base revierte el pedido completo. El dominio valida antes para dar mensajes claros y los triggers son la defensa final.',
    architecture: [
      'Tres capas: UI (React) → dominio en TypeScript puro (servicios, permisos, validaciones) → datos (sql.js, migraciones, IndexedDB)',
      'SQLite compilado a WebAssembly con 16 tablas, 9 vistas, 25 triggers e índices; consultas siempre parametrizadas',
      'El libro de movimientos es inmutable y siempre cuadra con las existencias',
      'Permisos por rol aplicados en el dominio, no solo en la interfaz; un vendedor solo modifica sus pedidos',
      'La base se guarda en IndexedDB tras cada operación; «Deshacer» restaura una instantánea',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'SQLite', 'sql.js', 'WebAssembly', 'IndexedDB', 'Vitest', 'Playwright'],
    features: [
      'Productos con búsqueda, filtros, rótulo imprimible e importación y exportación CSV',
      'Existencias por bodega con ajustes con motivo y traslados atómicos',
      'Pedidos de venta (borrador, confirmar, despachar, anular) y compras con recepción parcial o total',
      'Reportes con gráficos SVG propios: stock bajo, rotación, ventas por período, producto y cliente',
      'Roles Administrador, Vendedor y Bodeguero; auditoría; consola SQL de solo lectura con explorador del esquema',
      'Scripts de esquema y datos para SQLite, MySQL y SQL Server',
    ],
    checks: [
      '132 pruebas Vitest en 4 archivos sobre la base SQLite real en memoria (restricciones, triggers, permisos, CSV, semilla)',
      '26 pruebas e2e con Playwright, con fallo ante cualquier error de consola',
      'Build de 1,4 MB, con el motor WASM y las fuentes autoalojadas',
    ],
    tests: 158,
    scope: [
      'Todo corre en el navegador: sin servidor, sin cuentas y sin peticiones a terceros',
      'Los scripts de MySQL y SQL Server son equivalentes de esquema y datos escritos a mano; su contenido se comprueba con pruebas automáticas',
      'Los usuarios son de demostración y sirven para mostrar los roles; no hay autenticación',
      'Un usuario a la vez por navegador; el respaldo es la exportación .sqlite',
    ],
    learnings: [
      'Poner las reglas críticas en triggers y restricciones mantiene la integridad aunque se salte el dominio.',
      'Generar la semilla con los mismos servicios de la interfaz produce datos coherentes con los triggers.',
      'Probar contra un SQLite real detecta errores que un arreglo en memoria no mostraría.',
    ],
    repo: 'https://github.com/JuanXD2201/bodega',
    lab: { path: 'labs/bodega/' },
    captures: [
      { file: 'panel-1440.png', alt: 'Panel de Bodega con valor del inventario y ventas', caption: 'Panel' },
      { file: 'productos-1440.png', alt: 'Lista de productos con filtros', caption: 'Productos' },
      { file: 'existencias-traslado-1440.png', alt: 'Existencias por bodega y traslado entre bodegas', caption: 'Existencias y traslados' },
      { file: 'reportes-ventas-1440.png', alt: 'Reporte de ventas por período', caption: 'Reportes' },
      { file: 'consola-sql-1440.png', alt: 'Consola SQL de solo lectura con explorador del esquema', caption: 'Consola SQL' },
      { file: 'pedido-390.png', alt: 'Pedido de venta en móvil', caption: 'Pedido · móvil' },
    ],
    captureKind: 'navegador',
    captureNote: 'Capturas del propio laboratorio ejecutándose en Chrome, con datos de ejemplo.',
    layout: 'wide',
  },
  {
    slug: 'dogcare',
    name: 'DogCare',
    group: 'asignatura',
    kind: ['movil', 'ia'],
    tagline: 'Cuidado canino: edad, asistente de IA con urgencias, veterinarias reales, tienda y chat.',
    summary: 'App Android con calculadora de edad canina, IA con detección de urgencias, mapa de veterinarias de OpenStreetMap, marketplace y chat entre usuarios.',
    status: 'Terminado · 50 pruebas superadas',
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
    checks: ['50 pruebas automatizadas superadas (41 unitarias y 9 renders)', 'Reglas de Firestore: 23 de 23 casos en el emulador', 'Lint: 0 errores y 65 avisos'],
    tests: 50,
    scope: ['El pago es simulado por diseño: no hay cobros reales', 'La IA orienta y no sustituye a un médico veterinario'],
    learnings: [
      'Las reglas de Firestore se validan en el emulador (23 casos), no solo desde la interfaz.',
      'Combinar dos fuentes (Overpass y Nominatim) exige manejar fallos y datos parciales de OpenStreetMap.',
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
    captureNote: renderNote + ' El mapa no muestra teselas porque el render se hace sin red.',
    diagram: { file: 'arquitectura.png', alt: 'Diagrama de arquitectura por capas de DogCare' },
    layout: 'phone',
  },
  {
    slug: 'elmercado10',
    name: 'Elmercado10',
    group: 'asignatura',
    kind: ['movil'],
    tagline: 'Marketplace móvil con roles comprador y vendedor, pedidos transaccionales y chat.',
    summary: 'App Android para comprar y vender productos nuevos y usados, con catálogo filtrable, carrito, ciclo de vida del pedido, calificaciones y chat en tiempo real.',
    status: 'Terminado · 25 pruebas superadas',
    context: 'Proyecto de Optativa 2, Universidad de San Buenaventura. Trabajo en equipo de tres personas.',
    problem: 'Un marketplace pequeño necesita que el stock y el precio no se corrompan cuando varios compradores confirman pedidos al mismo tiempo.',
    solution: 'Confirmación de pedidos con control transaccional de inventario y precio en Firestore, estados del pedido hasta su entrega o cancelación, y chat directo entre comprador y vendedor.',
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
    checks: ['Compilación de depuración correcta', '25 pruebas superadas: 7 de OrderStatus, 15 renders de pantallas y 3 de plantilla'],
    tests: 25,
    scope: ['Las notificaciones funcionan con la app abierta (sin FCM)'],
    learnings: [
      'El stock y el precio se validan de forma transaccional al confirmar un pedido, no en la interfaz.',
      'Documentar el alcance en el README ayuda a priorizar el trabajo siguiente.',
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
    captureNote: renderNote,
    diagram: { file: 'arquitectura.png', alt: 'Diagrama de capas de Elmercado10' },
    layout: 'phone',
  },
  {
    slug: 'asistenteia',
    name: 'AsistenteIA',
    group: 'asignatura',
    kind: ['movil', 'ia'],
    tagline: 'Cliente .NET MAUI para consultar una IA con la clave del propio usuario, con historial SQLite.',
    summary: 'App .NET MAUI (Windows y Android) que consulta modelos de IA por API REST, guarda la clave en SecureStorage y conserva un historial local con búsqueda y CRUD.',
    status: 'Terminado · 52 pruebas xUnit',
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
    checks: [
      '52 pruebas xUnit aprobadas (más 5 en vivo opcionales)',
      'Compila para Windows y Android sin errores',
      'Ejecutado en un teléfono físico con Android 15 y en Windows, con capturas',
    ],
    tests: 52,
    scope: [
      'Plataformas objetivo: Windows y Android; iOS y Mac Catalyst quedan fuera',
      'Las capturas de Windows usan registros de ejemplo; las de Android son consultas reales',
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
    captureNote: 'Capturas tomadas en un teléfono físico con Android 15.',
    diagram: { file: 'arquitectura.png', alt: 'Diagrama de arquitectura de AsistenteIA' },
    layout: 'phone',
  },
  {
    slug: 'esp32-dashboard',
    name: 'ESP32 · LoRa · Firebase',
    group: 'asignatura',
    kind: ['iot', 'web', 'backend'],
    tagline: 'Enlace LoRa 915 MHz entre dos ESP32, API REST y dashboard web en producción.',
    summary: 'Dos ESP32 forman un enlace LoRa; el receptor actúa de pasarela hacia una API Flask que guarda en Firestore, y un dashboard web muestra las lecturas.',
    status: 'Terminado · dashboard en producción',
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
    checks: ['Extremo a extremo con lecturas simuladas: API → Firestore → dashboard', '30 pruebas pytest y 18 pruebas Vitest superadas', 'Dashboard publicado (HTTP 200)'],
    tests: 48,
    scope: ['La API se ejecuta en un PC del laboratorio (plan Spark, sin Cloud Run)', 'Las credenciales administrativas viven solo en la API, nunca en el microcontrolador'],
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
    captureNote: 'Captura del dashboard desplegado en Firebase Hosting.',
    layout: 'wide',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const byGroup = (g: Group) => projects.filter((p) => p.group === g);
export const labs = projects.filter((p) => p.lab);
/** URL de la demo incluida en este sitio (o undefined). */
export const labUrl = (p: Project) => (p.lab ? asset(p.lab.path) : undefined);
