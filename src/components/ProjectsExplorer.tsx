'use client';

import { useState } from 'react';
import { projects, byGroup, groupLabel, kindLabel, type Kind } from '../data/projects';
import { site } from '../data/site';
import { PosterCard, LabCard, RowCard } from './ProjectCard';
import s from './ProjectsExplorer.module.css';

type Filter = 'todos' | Kind;
const kinds = (Object.keys(kindLabel) as Kind[]).filter((k) => projects.some((p) => p.kind.includes(k)));

/** Explorador de proyectos: tres grupos con composición propia y filtro por categoría. */
export function ProjectsExplorer() {
  const [active, setActive] = useState<Filter>('todos');
  const pass = (p: { kind: Kind[] }) => active === 'todos' || p.kind.includes(active);
  const grado = byGroup('grado').filter(pass);
  const lab = byGroup('lab').filter(pass);
  const asig = byGroup('asignatura').filter(pass);
  const total = grado.length + lab.length + asig.length;

  return (
    <section id="proyectos">
      <div className="wrap">
        <div className="sec-head">
          <p className="tag">Proyectos · {projects.length} casos de estudio</p>
          <h2>Trabajos de grado, laboratorio y asignatura.</h2>
          <p>Cada proyecto tiene su caso de estudio: contexto, problema, solución, arquitectura, capturas y enlaces al repositorio.</p>
        </div>

        <div className={s.filters} role="group" aria-label="Filtrar proyectos por categoría">
          {(['todos', ...kinds] as Filter[]).map((k) => (
            <button key={k} type="button" className={`chip ${s.filter}`} aria-pressed={active === k} onClick={() => setActive(k)}>
              {k === 'todos' ? 'Todos' : kindLabel[k]}
            </button>
          ))}
          <span className={s.count} role="status">{total} {total === 1 ? 'proyecto' : 'proyectos'}</span>
        </div>

        {grado.length > 0 && (
          <div className={s.group}>
            <h3 className={s.groupTitle}>{groupLabel.grado.title}</h3>
            <p className={s.groupLead}>{groupLabel.grado.lead}</p>
            <div className={s.posters}>{grado.map((p, i) => <PosterCard key={p.slug} p={p} priority={i === 0} />)}</div>
          </div>
        )}

        {lab.length > 0 && (
          <div className={s.group}>
            <h3 className={s.groupTitle}>{groupLabel.lab.title}</h3>
            <p className={s.groupLead}>{groupLabel.lab.lead}</p>
            <div className={s.labs}>{lab.map((p) => <LabCard key={p.slug} p={p} />)}</div>
          </div>
        )}

        {asig.length > 0 && (
          <div className={s.group}>
            <h3 className={s.groupTitle}>{groupLabel.asignatura.title}</h3>
            <p className={s.groupLead}>{groupLabel.asignatura.lead}</p>
            <div>{asig.map((p) => <RowCard key={p.slug} p={p} />)}</div>
          </div>
        )}

        {total === 0 && <p className={s.empty}>No hay proyectos en esta categoría.</p>}
        <p className={s.more}>Otros repositorios (HTML/CSS, Bootstrap, SQL) están en <a href={site.github} rel="noopener">GitHub</a>.</p>
      </div>
    </section>
  );
}
