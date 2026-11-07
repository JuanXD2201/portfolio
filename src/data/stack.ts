// Cada tecnología está respaldada por al menos un proyecto o repositorio (campo `proof`).
export interface Tech { name: string; proof: string }
export interface StackGroup { id: string; title: string; items: Tech[] }

export const stack: StackGroup[] = [
  {
    id: 'mobile', title: 'Móvil',
    items: [
      { name: 'Kotlin', proof: 'ServiX, DogCare, Elmercado10' },
      { name: 'Jetpack Compose', proof: 'ServiX, DogCare, Elmercado10' },
      { name: 'Material 3', proof: 'ServiX, DogCare, Elmercado10' },
      { name: '.NET MAUI / C#', proof: 'AsistenteIA' },
      { name: 'CameraX · Coil', proof: 'Elmercado10' },
      { name: 'OSMDroid', proof: 'DogCare' },
    ],
  },
  {
    id: 'web', title: 'Web',
    items: [
      { name: 'HTML · CSS · JavaScript', proof: 'Repos Focus_Mind_Page, bootstrap, selectores_css' },
      { name: 'TypeScript', proof: 'Focus Mind, Ledger, InjectionLab, Bodega' },
      { name: 'React · Next.js', proof: 'Focus Mind, Ledger, este portafolio' },
      { name: 'Tailwind CSS', proof: 'Focus Mind' },
      { name: 'Vite', proof: 'ESP32 Dashboard, Ledger, InjectionLab, Bodega' },
      { name: 'sql.js · WebAssembly', proof: 'InjectionLab, Bodega' },
    ],
  },
  {
    id: 'backend', title: 'Backend y datos',
    items: [
      { name: 'Python · Flask', proof: 'ESP32 Dashboard (API REST)' },
      { name: 'Cloud Firestore', proof: 'ServiX, DogCare, Elmercado10, Focus Mind, ESP32' },
      { name: 'SQLite', proof: 'AsistenteIA, InjectionLab y Bodega (sql.js)' },
      { name: 'MySQL · SQL Server', proof: 'Ejercicios académicos, repos trabajos-sql, procesos-almacenados, trigger; scripts de esquema de Bodega' },
      { name: 'Triggers · vistas · índices (SQL)', proof: 'Bodega: 25 triggers, 9 vistas, 16 tablas' },
      { name: 'APIs REST · Webhooks', proof: 'AsistenteIA, ServiX (Make)' },
    ],
  },
  {
    id: 'cloud', title: 'Cloud y servicios',
    items: [
      { name: 'Firebase Authentication', proof: 'ServiX, DogCare, Elmercado10, Focus Mind' },
      { name: 'Firebase Hosting', proof: 'ESP32 Dashboard (en producción)' },
      { name: 'Cloud Storage', proof: 'Elmercado10' },
      { name: 'App Check', proof: 'DogCare' },
      { name: 'Azure DevOps · Pipelines', proof: 'ServiX' },
      { name: 'Make', proof: 'ServiX' },
    ],
  },
  {
    id: 'ai', title: 'Inteligencia artificial',
    items: [
      { name: 'Gemini (Firebase AI Logic)', proof: 'ServiX, DogCare' },
      { name: 'Genkit', proof: 'Focus Mind' },
      { name: 'API Gemini (REST)', proof: 'AsistenteIA' },
    ],
  },
  {
    id: 'tools', title: 'Calidad y herramientas',
    items: [
      { name: 'JUnit · Robolectric · Roborazzi', proof: 'DogCare, ServiX, Elmercado10' },
      { name: 'xUnit', proof: 'AsistenteIA' },
      { name: 'Vitest · pytest', proof: 'ESP32 Dashboard, Focus Mind, InjectionLab, Bodega' },
      { name: 'Jest', proof: 'Ledger' },
      { name: 'Playwright', proof: 'Ledger, InjectionLab, Bodega y verificación de este sitio' },
      { name: 'Microsoft Excel (intermedio)', proof: 'Matrices de pruebas y exportación de datos en Focus Mind' },
      { name: 'Desarrollo asistido por IA (Claude Code)', proof: 'Herramienta de apoyo en mi flujo de trabajo: borradores y alternativas que reviso, pruebo y ajusto' },
      { name: 'Git · GitHub', proof: 'Todos los proyectos y laboratorios' },
      { name: 'Arduino / C++ (ESP32)', proof: 'ESP32 Dashboard' },
      { name: 'Draw.io · UML', proof: 'Documentación de cada proyecto' },
    ],
  },
];
