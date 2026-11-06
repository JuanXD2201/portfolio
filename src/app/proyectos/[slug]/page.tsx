import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, img, kindLabel } from '../../../data/projects';
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
  return { title: p.name, description: p.summary, alternates: { canonical: url }, openGraph: { url, title: p.name, description: p.summary } };
}

const captureLabel = { render: 'Renders de pantalla', dispositivo: 'Capturas de dispositivo real', produccion: 'Captura de producción', ninguna: 'Sin capturas' } as const;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const phone = p.layout === 'phone';

  return (
    <article className={`wrap ${s.detail}`}>
      <nav aria-label="Migas de pan"><Link className={s.back} href="/#proyectos">← Proyectos</Link></nav>
      <header className={s.head}>
        <p className="eyebrow">{`// módulo ${String(i + 1).padStart(2, '0')} · ${p.kind.map((k) => kindLabel[k]).join(' · ')}`}</p>
        {p.complementary && <span className={s.badge}>Proyecto complementario creado para este portafolio</span>}
        <h1>{p.name}</h1>
        <p className={s.tag}>{p.tagline}</p>
        <p className={`${s.status} ${p.statusTone === 'wip' ? s.wip : ''}`}>{p.status}</p>
        <div className={s.cta}>
          <a className="btn btn-primary" href={p.repo} rel="noopener">Ver repositorio</a>
          {p.demo && <a className="btn" href={p.demo} rel="noopener">Abrir demo</a>}
        </div>
      </header>

      {p.captures.length === 0 && p.preview && (
        <section aria-label="Vista previa" className={s.gallery}>
          <div className={s.term}>
            <b>{p.preview.title}</b>
            {p.preview.lines.map((l, n) => <span key={n}>{l || ' '}</span>)}
          </div>
          <p className={s.note}><strong>Salida real.</strong> {p.captureNote}</p>
        </section>
      )}

      {p.captures.length > 0 && (
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
      )}

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
          <div className={s.box}><h2>Tecnologías</h2><ul className={s.chips}>{p.stack.map((t) => <li key={t} className="chip">{t}</li>)}</ul></div>
          <div className={s.box}><h2>Verificado</h2><ul className={s.list}>{p.verified.map((v) => <li key={v}>{v}</li>)}</ul></div>
          <div className={s.box}><h2>Limitaciones</h2><ul className={`${s.list} ${s.warn}`}>{p.limits.map((v) => <li key={v}>{v}</li>)}</ul></div>
        </aside>
      </div>

      <footer className={s.next}>
        <span>Siguiente módulo</span>
        <Link href={`/proyectos/${next.slug}/`}>{next.name} →</Link>
      </footer>
    </article>
  );
}
