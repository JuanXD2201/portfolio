// Datos personales y de navegación. Editar aquí para cambiar nombre, redes o textos globales.
export const site = {
  name: 'Juan Esteban Olaya Muñoz',
  shortName: 'Juan Olaya',
  role: 'Desarrollador de software',
  degree: 'Tecnología en Desarrollo de Software · Universidad de San Buenaventura, Bogotá',
  location: 'Bogotá D.C., Colombia',
  url: 'https://juanxd2201.github.io/portfolio',
  email: 'juanestebanolayamun@gmail.com',
  github: 'https://github.com/JuanXD2201',
  githubUser: 'JuanXD2201',
  linkedin: 'https://www.linkedin.com/in/juan-esteban-olaya-619b7b328',
  cvFile: 'cv/Juan_Esteban_Olaya_CV.pdf',
  description:
    'Portafolio de Juan Esteban Olaya Muñoz, desarrollador de software: apps Android con Kotlin y Jetpack Compose, .NET MAUI, Firebase, integración de IA e IoT.',
  headline: 'Apps móviles y sistemas conectados, construidos con criterio de ingeniería.',
  intro:
    'Estudio Tecnología en Desarrollo de Software y construyo aplicaciones Android (Kotlin, Jetpack Compose), apps multiplataforma con .NET MAUI y servicios sobre Firebase, con pruebas automatizadas, reglas de seguridad y documentación técnica.',
  availability: 'Disponible medio tiempo o fines de semana · remoto, híbrido o presencial en Bogotá',
  specialties: ['Android · Kotlin', 'Firebase', '.NET MAUI', 'Integración de IA', 'IoT'],
} as const;

export const nav = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#stack', label: 'Stack' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const about = {
  paragraphs: [
    'Estoy en quinto semestre de Tecnología en Desarrollo de Software en la Universidad de San Buenaventura (Bogotá). En los últimos semestres he construido cinco proyectos de software, tres de ellos en equipo; ServiX se trabajó con roles Scrum y un pipeline de CI en Azure DevOps.',
    'Mi enfoque es entregar software verificable: arquitectura por capas, reglas de seguridad en Firestore probadas con el emulador, pruebas unitarias y de renderizado, y documentación (SRS, diagramas, manuales) que permite a otra persona continuar el trabajo.',
    'Además de estudiar he trabajado como auxiliar de datos (registro y manejo de información) y en caja, facturación y atención al cliente. Eso me da una idea concreta de quién usa el software y qué errores le cuestan tiempo.',
  ],
  strengths: [
    { title: 'Arquitectura por capas', text: 'UI → ViewModel → UseCase → Repository → Data Source en ServiX; separación presentación/dominio/datos en DogCare y Elmercado10.' },
    { title: 'Seguridad y datos', text: 'Reglas de Firestore por rol y por usuario, 23 de 23 casos superados en el emulador (DogCare); sin credenciales en los repositorios.' },
    { title: 'Pruebas y evidencias', text: 'Pruebas unitarias, renders de pantallas (Roborazzi), xUnit y Vitest. Cada README declara qué se probó y qué falta.' },
    { title: 'Integración de IA', text: 'Gemini vía Firebase AI Logic (sin claves en el APK) y clientes REST con clave del usuario en SecureStorage.' },
  ],
} as const;

export const timeline = {
  education: [
    {
      period: '02/2024 — actualidad',
      title: 'Tecnología en Desarrollo de Software · quinto semestre',
      org: 'Universidad de San Buenaventura · Bogotá',
      text: 'Programación, bases de datos, desarrollo móvil (Kotlin/Compose, .NET MAUI), servicios web y gestión de proyectos con Scrum.',
    },
    {
      period: 'Nov 2024',
      title: 'SQL Injection',
      org: 'TryHackMe · curso práctico',
      text: 'Detección, explotación y prevención de inyecciones SQL.',
    },
    {
      period: '2023',
      title: 'Bachillerato',
      org: 'Liceo Psicopedagógico Tibabitá · Bogotá',
      text: '',
    },
  ],
  experience: [
    {
      period: '08/2025 — 03/2026',
      title: 'Cajero · Auxiliar administrativo · Bodega',
      org: 'Bombolandia',
      text: 'Atención al cliente, caja y facturación, control de mercancía e inventarios, apoyo administrativo.',
    },
    {
      period: '06/2025 — 07/2025',
      title: 'Auxiliar operativo',
      org: 'Cine Colombia',
      text: 'Atención al cliente, facturación y apoyo operativo bajo presión.',
    },
    {
      period: '08/2024 — 05/2025',
      title: 'Cajero · Auxiliar administrativo · Cocina',
      org: 'Chimichurry Chorizo Gourmet',
      text: 'Atención al cliente, caja, facturación y trabajo en equipo en alta demanda.',
    },
    {
      period: '03/2024 — 07/2024',
      title: 'Auxiliar · Cajero',
      org: 'Licores y Abarrotes El Mono',
      text: 'Atención al cliente, caja y facturación, apoyo en bodega.',
    },
    {
      period: '06/2023 — 04/2024',
      title: 'Auxiliar de datos',
      org: 'AGC Gas y Energía SAS ESP',
      text: 'Manejo, organización y registro de información; apoyo en procesos administrativos y operativos.',
    },
  ],
} as const;

export const services = [
  { title: 'Apps Android nativas', text: 'Kotlin, Jetpack Compose y Material 3, con Firebase como backend y pruebas automatizadas.', evidence: ['servix', 'dogcare', 'elmercado10'] },
  { title: 'Apps multiplataforma .NET MAUI', text: 'Cliente REST, SQLite local, SecureStorage y MVVM; compilado para Windows y Android.', evidence: ['asistenteia'] },
  { title: 'Integración de IA', text: 'Chat con Gemini mediante Firebase AI Logic y clientes REST con la clave del usuario.', evidence: ['servix', 'dogcare', 'asistenteia'] },
  { title: 'Backend, APIs y datos', text: 'API REST en Flask, modelado en Firestore y SQLite, reglas de seguridad y webhooks (Make).', evidence: ['esp32-dashboard', 'servix'] },
  { title: 'IoT y dashboards', text: 'Enlace LoRa/BLE con ESP32, pasarela a API y panel web en tiempo real.', evidence: ['esp32-dashboard'] },
  { title: 'Auditoría y documentación', text: 'Revisión de código y seguridad, SRS, diagramas de arquitectura y manuales técnicos.', evidence: ['servix', 'dogcare'] },
] as const;

export type TerminalKind = 'cmd' | 'out' | 'dim' | 'ok';
/** Contenido de la terminal del hero. Todo proviene de los README de los proyectos. */
export const terminalLines: { kind: TerminalKind; text: string }[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'juan-esteban-olaya · desarrollador de software' },
  { kind: 'dim', text: 'Tecnología en Desarrollo de Software · USB Bogotá' },
  { kind: 'cmd', text: 'cat stack.txt' },
  { kind: 'out', text: 'Kotlin · Jetpack Compose · Firebase · .NET MAUI' },
  { kind: 'out', text: 'TypeScript · Node.js · Express · SQLite · Flask' },
  { kind: 'cmd', text: 'ls proyectos/' },
  { kind: 'out', text: 'servix  dogcare  elmercado10  asistenteia' },
  { kind: 'out', text: 'esp32-dashboard  firestore-rules-lint  postulaciones-api' },
  { kind: 'cmd', text: 'cat verificado.md' },
  { kind: 'ok', text: '✔ DogCare 50 pruebas · reglas Firestore 23/23' },
  { kind: 'ok', text: '✔ AsistenteIA 52 xUnit · probado en Android real' },
  { kind: 'ok', text: '✔ rules-lint 11 · postulaciones-api 14' },
];
