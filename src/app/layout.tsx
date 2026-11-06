import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '../styles/global.css';
import { site } from '../data/site';
import { Header, Footer, ClientEffects } from '../components/Chrome';

const origin = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(`${origin}/`),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.shortName}` },
  description: site.description,
  alternates: { canonical: `${origin}/` },
  icons: { icon: `${origin}/favicon.svg` },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: `${origin}/`,
    title: `${site.name} · ${site.role}`,
    description: site.description,
    images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: `Portafolio de ${site.name}` }],
  },
  twitter: { card: 'summary_large_image', images: [`${origin}/og.png`] },
};

export const viewport: Viewport = { themeColor: '#0b0c0f', width: 'device-width', initialScale: 1 };

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: `${origin}/`,
  sameAs: [site.github, site.linkedin],
  alumniOf: 'Universidad de San Buenaventura',
};

const themeInit = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">Saltar al contenido</a>
        <div className="progress" aria-hidden="true"><span id="progress" /></div>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ClientEffects />
      </body>
    </html>
  );
}
