import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, img, kindLabel, labUrl, groupLabel } from '../../../data/projects';
import { site } from '../../../data/site';
import s from './detail.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const url = `${site.url}/proyectos/${p.slug}/`;
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: url },
    openGraph: { type: 'article', locale: 'es_CO', url, title: `${p.name} · ${site.shortName}`, description: p.summary, images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${p.name}, caso de estudio` }] },
    twitter: { card: 'summary_large_image', title: p.name, description: p.summary, images: [`${site.url}/og.png`] },
  };
}

const captureLabel = { render: 'Pantallas renderizadas desde el código de la app', dispositivo: 'Capturas de dispositivo real', produccion: 'Captura de producción', navegador: 'Capturas en el navegador' } as const;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const phone = p.layout === 'phone';
  const demo = labUrl(p);

  return (
    <article className={`wrap ${s.detail}`}>
      <nav aria-label="Migas de pan"><Link className={s.back} href="/#proyectos">← Proyectos</Link></nav>
      <header className={s.head}>
        <p className="tag">{groupLabel[p.group].title} · {p.kind.map((k) => kindLabel[k]).join(' · ')}</p>
        <h1>{p.name}</h1>
        <p className={s.lead}>{p.tagline}</p>
        <p className={s.status}><span className={s.dot} aria-hidden="true" />{p.status}</p>
        <div className={s.cta}>
          {demo && <a className="btn btn-primary" href={demo}>Abrir aplicación</a>}
          <a className={demo ? 'btn' : 'btn btn-primary'} href={p.repo} rel="noopener" target="_blank">Ver repositorio</a>
          {p.demo && <a className="btn" href={p.demo} rel="noopener" target="_blank">Abrir en línea</a>}
        </div>
      </header>

      <section aria-labelledby="cap-h" className={s.gallery}>
        <h2 id="cap-h" className="sr-only">Capturas</h2>
        <ul className={`${s.shots} ${phone ? s.phone : ''}`}>
          {p.captures.map((c, n) => {
            const im = img(p.slug, c.file);
            return (
              <li key={c.file}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.src} width={im.width} height={im.height} alt={c.alt} loading={n < 2 ? 'eager' : 'lazy'} decoding="async" />
                  <figcaption>{c.caption}</figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
        <p className={s.note}><strong>{captureLabel[p.captureKind]}.</strong> {p.captureNote}</p>
      </section>

      <div className={s.cols}>
        <div className={s.main}>
          <section><h2>Contexto</h2><p>{p.context}</p></section>
          <section><h2>Problema</h2><p>{p.problem}</p></section>
          <section><h2>Solución</h2><p>{p.solution}</p></section>
          <section>
            <h2>Arquitectura</h2>
            <ul className={s.list}>{p.architecture.map((a) => <li key={a}>{a}</li>)}</ul>
            {p.diagram && (() => {
              const d = img(p.slug, p.diagram.file);
              // eslint-disable-next-line @next/next/no-img-element
              return <figure className={s.diagram}><img src={d.src} width={d.width} height={d.height} alt={p.diagram.alt} loading="lazy" decoding="async" /></figure>;
            })()}
          </section>
          <section><h2>Funcionalidades</h2><ul className={s.list}>{p.features.map((f) => <li key={f}>{f}</li>)}</ul></section>
          <section><h2>Aprendizajes técnicos</h2><ul className={s.list}>{p.learnings.map((f) => <li key={f}>{f}</li>)}</ul></section>
        </div>
        <aside className={s.side} aria-label="Datos del proyecto">
          <div className={`panel ${s.box}`}><h2>Tecnologías</h2><ul className={s.chips}>{p.stack.map((t) => <li key={t} className="chip">{t}</li>)}</ul></div>
          <div className={`panel ${s.box}`}><h2>Pruebas y resultados</h2><ul className={s.list}>{p.checks.map((v) => <li key={v}>{v}</li>)}</ul></div>
          <div className={`panel ${s.box}`}><h2>Alcance y decisiones</h2><ul className={s.list}>{p.scope.map((v) => <li key={v}>{v}</li>)}</ul></div>
        </aside>
      </div>

      <footer className={s.next}>
        <span>Siguiente proyecto</span>
        <Link href={`/proyectos/${next.slug}/`}>{next.name} →</Link>
      </footer>
    </article>
  );
}
