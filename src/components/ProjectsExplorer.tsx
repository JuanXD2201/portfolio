'use client';

import { useState } from 'react';
import { projects, kindLabel, type Kind } from '../data/projects';
import { site } from '../data/site';
import { ProjectCard } from './ProjectCard';
import s from './Sections.module.css';

const filters: { key: 'todos' | Kind; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'movil', label: kindLabel.movil },
  { key: 'ia', label: kindLabel.ia },
  { key: 'backend', label: kindLabel.backend },
  { key: 'seguridad', label: kindLabel.seguridad },
  { key: 'iot', label: kindLabel.iot },
  { key: 'web', label: kindLabel.web },
];

export function ProjectsExplorer() {
  const [active, setActive] = useState<'todos' | Kind>('todos');
  const visible = projects.filter((p) => active === 'todos' || p.kind.includes(active));

  return (
    <section id="proyectos">
      <div className="wrap">
        <div className={`sec-head reveal`}>
          <p className="eyebrow">01 · Proyectos</p>
          <h2>Siete proyectos, cada uno con su estado real.</h2>
          <p>Cinco proyectos académicos y dos herramientas complementarias creadas para cubrir backend, SQL y seguridad. Cada ficha indica qué se verificó y qué falta.</p>
        </div>
        <div className={s.filters} role="group" aria-label="Filtrar proyectos por tipo">
          {filters.map((f) => (
            <button key={f.key} type="button" className={`chip ${s.filter}`} aria-pressed={active === f.key} onClick={() => setActive(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className={s.cards}>
          {visible.map((p) => (
            <div key={p.slug}><ProjectCard project={p} index={projects.indexOf(p)} /></div>
          ))}
        </div>
        {visible.length === 0 && <p className={s.muted}>No hay proyectos en esta categoría.</p>}
        <p className={s.muted}>
          Otros repositorios (HTML/CSS, Bootstrap, SQL, Focus Mind) están en <a className={s.link} href={site.github} rel="noopener">GitHub</a>.
        </p>
      </div>
    </section>
  );
}
