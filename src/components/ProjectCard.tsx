import Link from 'next/link';
import { img, kindLabel, labUrl, type Project } from '../data/projects';
import s from './ProjectCard.module.css';

const href = (p: Project) => `/proyectos/${p.slug}/`;

function Shot({ p, i, eager = false }: { p: Project; i: number; eager?: boolean }) {
  const c = p.captures[i];
  if (!c) return null;
  const im = img(p.slug, c.file);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={im.src} width={im.width} height={im.height} alt={c.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

function Links({ p }: { p: Project }) {
  const demo = labUrl(p);
  return (
    <div className={s.links}>
      {demo && <a className="btn btn-primary" href={demo} aria-label={`Abrir ${p.name}`}>Abrir aplicación</a>}
      <Link className={demo ? 'btn' : 'btn btn-primary'} href={href(p)} aria-label={`Ver caso de estudio de ${p.name}`}>Ver caso</Link>
      <a className="btn" href={p.repo} rel="noopener" target="_blank" aria-label={`Repositorio de ${p.name} en GitHub`}>Repositorio</a>
      {p.demo && <a className="btn" href={p.demo} rel="noopener" target="_blank" aria-label={`Abrir en línea ${p.name}`}>Abrir en línea</a>}
    </div>
  );
}

/** Cartel grande para los proyectos de grado. */
export function PosterCard({ p, priority }: { p: Project; priority?: boolean }) {
  const phone = p.layout === 'phone';
  return (
    <article className={`panel ${s.poster}`} data-kinds={p.kind.join(' ')}>
      <div className={s.posterInfo}>
        <p className="tag">Proyecto de grado · {p.kind.map((k) => kindLabel[k]).join(' · ')}</p>
        <h3 className={s.posterName}><Link href={href(p)}>{p.name}</Link></h3>
        <p className={s.posterTag}>{p.tagline}</p>
        <p className={s.summary}>{p.summary}</p>
        <p className={s.status}><span className={s.dot} aria-hidden="true" />{p.status}</p>
        <ul className={s.stack}>{p.stack.slice(0, 7).map((t) => <li key={t} className="chip">{t}</li>)}</ul>
        <Links p={p} />
      </div>
      <Link className={`${s.posterVisual} ${phone ? s.phones : s.wideShot}`} href={href(p)} tabIndex={-1} aria-hidden="true">
        {phone ? (
          <>
            <Shot p={p} i={0} eager={priority} /><Shot p={p} i={3} eager={priority} /><Shot p={p} i={4} eager={priority} />
          </>
        ) : (
          <>
            <Shot p={p} i={0} eager={priority} /><Shot p={p} i={1} eager={priority} />
          </>
        )}
      </Link>
    </article>
  );
}

/** Tarjeta de laboratorio con acceso directo a la aplicación. */
export function LabCard({ p }: { p: Project }) {
  return (
    <article className={`panel ${s.lab}`} data-kinds={p.kind.join(' ')}>
      <Link className={s.labShot} href={href(p)} tabIndex={-1} aria-hidden="true"><Shot p={p} i={0} /></Link>
      <div className={s.labBody}>
        <p className="tag">{p.kind.map((k) => kindLabel[k]).join(' · ')}{p.tests ? ` · ${p.tests} pruebas` : ''}</p>
        <h3 className={s.labName}><Link href={href(p)}>{p.name}</Link></h3>
        <p className={s.summary}>{p.summary}</p>
        <ul className={s.stack}>{p.stack.slice(0, 5).map((t) => <li key={t} className="chip">{t}</li>)}</ul>
        <Links p={p} />
      </div>
    </article>
  );
}

/** Fila compacta para proyectos de asignatura. */
export function RowCard({ p }: { p: Project }) {
  return (
    <article className={s.row} data-kinds={p.kind.join(' ')}>
      <Link className={s.thumb} href={href(p)} tabIndex={-1} aria-hidden="true"><Shot p={p} i={0} /></Link>
      <div className={s.rowBody}>
        <p className="tag">{p.kind.map((k) => kindLabel[k]).join(' · ')}{p.tests ? ` · ${p.tests} pruebas` : ''}</p>
        <h3 className={s.rowName}><Link href={href(p)}>{p.name}</Link></h3>
        <p className={s.summary}>{p.tagline}</p>
        <ul className={s.stack}>{p.stack.slice(0, 5).map((t) => <li key={t} className="chip">{t}</li>)}</ul>
      </div>
      <div className={s.rowLinks}>
        <Link className="btn btn-primary" href={href(p)} aria-label={`Ver caso de estudio de ${p.name}`}>Ver caso</Link>
        <a className="btn" href={p.repo} rel="noopener" target="_blank" aria-label={`Repositorio de ${p.name} en GitHub`}>Repositorio</a>
      </div>
    </article>
  );
}
