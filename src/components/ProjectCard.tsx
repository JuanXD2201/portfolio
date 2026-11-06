import Link from 'next/link';
import { img, kindLabel, type Project } from '../data/projects';
import s from './ProjectCard.module.css';

export function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const first = p.captures[0];
  const cover = first ? img(p.slug, first.file) : null;
  const href = `/proyectos/${p.slug}/`;
  return (
    <article className={`${s.card} ${p.layout === 'wide' ? s.wide : ''}`} data-kinds={p.kind.join(' ')}>
      {cover && first ? (
        <Link className={s.media} href={href} aria-label={`Ver detalle de ${p.name}`} tabIndex={-1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover.src} width={cover.width} height={cover.height} alt={first.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
        </Link>
      ) : (
        <Link className={s.term} href={href} aria-label={`Ver detalle de ${p.name}`} tabIndex={-1}>
          <b>{p.preview?.title}</b>
          {p.preview?.lines.slice(0, 5).map((l, i) => <span key={i}>{l || ' '}</span>)}
        </Link>
      )}
      <div className={s.body}>
        <p className={s.meta}>
          <span className={s.idx}>{String(index + 1).padStart(2, '0')}</span>
          {p.kind.map((k) => <span key={k} className="chip">{kindLabel[k]}</span>)}
          {p.complementary && <span className={s.badge}>Complementario</span>}
        </p>
        <h3 className={s.name}><Link href={href}>{p.name}</Link></h3>
        <p className={s.tag}>{p.tagline}</p>
        <p className={`${s.status} ${p.statusTone === 'wip' ? s.wip : ''}`}>{p.status}</p>
        <ul className={s.stack}>{p.stack.slice(0, 5).map((t) => <li key={t}>{t}</li>)}</ul>
        <div className={s.links}>
          <Link className="btn btn-primary" href={href}>Ver caso</Link>
          <a className="btn" href={p.repo} rel="noopener">Repositorio</a>
          {p.demo && <a className="btn" href={p.demo} rel="noopener">Demo</a>}
        </div>
      </div>
    </article>
  );
}
