// Datos personales y de navegación. Editar aquí para cambiar nombre, contacto, textos globales o especialidades.
export const site = {
  name: 'Juan Esteban Olaya Muñoz',
  shortName: 'Juan Olaya',
  role: 'Desarrollador de software',
  degree: 'Tecnología en Desarrollo de Software · Universidad de San Buenaventura, Bogotá',
  location: 'Bogotá D.C., Colombia',
  timezone: 'America/Bogota',
  url: 'https://juanxd2201.github.io/portfolio',
  email: 'juanestebanolayamun@gmail.com',
  phone: '+573123431825',
  phoneDisplay: '+57 312 343 1825',
  whatsapp: 'https://wa.me/573123431825',
  whatsappMessage: 'Hola Juan, vi tu portafolio y me gustaría conversar contigo.',
  github: 'https://github.com/JuanXD2201',
  githubUser: 'JuanXD2201',
  cvFile: 'cv/Juan_Esteban_Olaya_CV.pdf',
  description:
    'Portafolio de Juan Esteban Olaya Muñoz, desarrollador de software: apps Android con Kotlin y Jetpack Compose, aplicaciones web con Next.js, .NET MAUI, Firebase, integración de IA e IoT.',
  headline: 'Apps móviles, web y sistemas conectados, construidos con criterio de ingeniería.',
  intro:
    'Estudio Tecnología en Desarrollo de Software y construyo aplicaciones Android, web y multiplataforma con pruebas automatizadas, reglas de seguridad y documentación técnica.',
  availability: 'Disponible medio tiempo o fines de semana · remoto, híbrido o presencial en Bogotá',
  specialties: ['Android · Kotlin', 'Web · Next.js', 'Firebase', '.NET MAUI', 'Integración de IA', 'IoT'],
} as const;

/** Enlace de WhatsApp con el mensaje prellenado y codificado. */
export const whatsappLink = `${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const nav = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const about = {
  paragraphs: [
    'Estoy en quinto semestre de Tecnología en Desarrollo de Software en la Universidad de San Buenaventura (Bogotá). En los últimos semestres he construido seis proyectos de curso y de grado, varios en equipo, y dos laboratorios personales que se ejecutan en el navegador. ServiX se trabajó con roles Scrum y un pipeline de CI en Azure DevOps.',
    'Mi enfoque es entregar software verificable: arquitectura por capas, reglas de seguridad en Firestore probadas con el emulador, pruebas unitarias, de renderizado y de extremo a extremo, y documentación (SRS, diagramas, manuales) que permite a otra persona continuar el trabajo.',
    'Trabajé como auxiliar de datos en una empresa de gas y energía, registrando y organizando información: sé qué errores de captura le cuestan tiempo a quien usa un sistema.',
  ],
  strengths: [
    { title: 'Arquitectura por capas', text: 'UI → ViewModel → UseCase → Repository → Data Source en ServiX; dominio puro y almacenamiento intercambiable en Ledger.' },
    { title: 'Seguridad y datos', text: 'Reglas de Firestore por rol y por usuario (23 de 23 casos en el emulador en DogCare), cifrado en el cliente en Focus Mind y sin credenciales en los repositorios.' },
    { title: 'Pruebas y evidencias', text: 'Pruebas unitarias, renders de pantallas, xUnit, Vitest, Jest y Playwright. Cada README indica qué se probó y con qué resultado.' },
    { title: 'Integración de IA', text: 'Gemini vía Firebase AI Logic (sin claves en el APK), flujos con Genkit en el servidor y clientes REST con la clave del usuario en SecureStorage.' },
  ],
} as const;

export const timeline = {
  education: [
    {
      start: '2024-02',
      period: '02/2024 — actualidad',
      title: 'Tecnología en Desarrollo de Software · quinto semestre',
      org: 'Universidad de San Buenaventura · Bogotá',
      text: 'Programación, bases de datos, desarrollo móvil (Kotlin/Compose, .NET MAUI), servicios web y gestión de proyectos con Scrum.',
    },
    {
      start: '2024-11',
      period: 'Nov 2024',
      title: 'SQL Injection',
      org: 'TryHackMe · curso práctico',
      text: 'Detección, explotación y prevención de inyecciones SQL. Origen de InjectionLab.',
    },
    {
      start: '2023-01',
      period: '2023',
      title: 'Bachillerato',
      org: 'Liceo Psicopedagógico Tibabitá · Bogotá',
      text: '',
    },
  ],
  experience: [
    {
      start: '2023-06',
      period: '06/2023 — 04/2024',
      title: 'Auxiliar de datos',
      org: 'AGC Gas y Energía SAS ESP',
      text: 'Manejo, organización y registro de información; apoyo en procesos administrativos y operativos.',
    },
  ],
} as const;

/**
 * Especialidades del mapa radial. `techs` debe coincidir con nombres de `stack.ts` (solo se muestran las que
 * tienen respaldo) y `projects` con slugs de `projects.ts`.
 */
export interface Area { id: string; title: string; text: string; techs: string[]; projects: string[] }
export const areas: Area[] = [
  { id: 'android', title: 'Android nativo', text: 'Kotlin, Jetpack Compose y Material 3, con Firebase como backend y pruebas automatizadas.', techs: ['Kotlin', 'Jetpack Compose', 'Material 3', 'CameraX · Coil', 'OSMDroid'], projects: ['servix', 'dogcare', 'elmercado10'] },
  { id: 'web', title: 'Web', text: 'Aplicaciones con React y TypeScript, desde plataformas con roles hasta laboratorios que corren sin servidor.', techs: ['TypeScript', 'React · Next.js', 'Tailwind CSS', 'Vite', 'sql.js · WebAssembly'], projects: ['focus-mind', 'ledger', 'injectionlab', 'esp32-dashboard'] },
  { id: 'maui', title: '.NET MAUI', text: 'Cliente REST, SQLite local, SecureStorage y MVVM; compilado para Windows y Android.', techs: ['.NET MAUI / C#', 'SQLite'], projects: ['asistenteia'] },
  { id: 'ia', title: 'Integración de IA', text: 'Chat con Gemini mediante Firebase AI Logic, flujos con Genkit en el servidor y clientes REST con la clave del usuario.', techs: ['Gemini (Firebase AI Logic)', 'Genkit', 'API Gemini (REST)'], projects: ['servix', 'dogcare', 'asistenteia', 'focus-mind'] },
  { id: 'datos', title: 'Backend, datos y seguridad', text: 'Modelado en Firestore y SQLite, API REST en Flask, reglas de seguridad y cifrado en el cliente.', techs: ['Cloud Firestore', 'Firebase Authentication', 'Python · Flask', 'MySQL · SQL Server', 'APIs REST · Webhooks'], projects: ['focus-mind', 'dogcare', 'esp32-dashboard', 'injectionlab'] },
  { id: 'iot', title: 'IoT y dashboards', text: 'Enlace LoRa/BLE con ESP32, pasarela a API y panel web con lecturas.', techs: ['Arduino / C++ (ESP32)', 'Firebase Hosting'], projects: ['esp32-dashboard'] },
  { id: 'calidad', title: 'Pruebas y documentación', text: 'Pruebas unitarias, de renderizado y e2e; SRS, diagramas de arquitectura y manuales técnicos.', techs: ['JUnit · Robolectric · Roborazzi', 'xUnit', 'Vitest · pytest', 'Jest', 'Playwright', 'Draw.io · UML'], projects: ['servix', 'dogcare', 'ledger', 'injectionlab'] },
];
