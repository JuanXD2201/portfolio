'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { projects } from '../data/projects';
import s from './SkillGraph.module.css';

const ROW = 34;
const W = 760;
const LEFT_X = 190;
const RIGHT_X = 570;

/** Grafo bipartito tecnología ↔ proyecto. Los enlaces salen de projects[].stack, no se escriben a mano. */
export function SkillGraph() {
  const [active, setActive] = useState<string | null>(null);

  const { techs, links } = useMemo(() => {
    const count = new Map<string, string[]>();
    for (const p of projects) for (const t of p.stack) count.set(t, [...(count.get(t) ?? []), p.slug]);
    const techs = [...count.entries()].filter(([, slugs]) => slugs.length >= 2).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
    return { techs, links: techs.flatMap(([t, slugs], ti) => slugs.map((slug) => ({ t, ti, slug }))) };
  }, []);

  const rows = Math.max(techs.length, projects.length);
  const height = rows * ROW + 20;
  const pY = (i: number) => 20 + i * ((rows * ROW) / projects.length) + ROW / 2 - 6;
  const tY = (i: number) => 20 + i * ROW + ROW / 2 - 6;
  const activeSlugs = new Set(active ? techs.find(([t]) => t === active)?.[1] : []);

  return (
    <div>
      <div className={s.wrap}>
        <svg viewBox={`0 0 ${W} ${height}`} className={s.svg} role="img" aria-label="Grafo que conecta cada tecnología con los proyectos donde se usa">
          {links.map((l) => {
            const pi = projects.findIndex((p) => p.slug === l.slug);
            const on = active === l.t;
            return <path key={l.t + l.slug} className={`${s.link} ${on ? s.hot : active ? s.dim : ''}`} d={`M${LEFT_X + 8} ${tY(l.ti)} C ${LEFT_X + 150} ${tY(l.ti)}, ${RIGHT_X - 150} ${pY(pi)}, ${RIGHT_X - 8} ${pY(pi)}`} />;
          })}
          {techs.map(([t, slugs], i) => (
            <g key={t} className={`${s.node} ${active === t ? s.sel : ''}`} tabIndex={0} role="button" aria-label={`${t}: usada en ${slugs.length} proyectos`} aria-pressed={active === t}
              onMouseEnter={() => setActive(t)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(t)} onBlur={() => setActive(null)}>
              <text x={LEFT_X - 8} y={tY(i) + 4} textAnchor="end">{t}</text>
              <circle cx={LEFT_X} cy={tY(i)} r="4" />
            </g>
          ))}
          {projects.map((p, i) => (
            <g key={p.slug} className={`${s.pnode} ${activeSlugs.has(p.slug) ? s.sel : active ? s.faded : ''}`}>
              <circle cx={RIGHT_X} cy={pY(i)} r="4" />
              <text x={RIGHT_X + 10} y={pY(i) + 4}>{p.name}</text>
            </g>
          ))}
        </svg>
      </div>
      {/* Alternativa accesible y para pantallas estrechas */}
      <ul className={s.list}>
        {techs.map(([t, slugs]) => (
          <li key={t}><strong>{t}</strong> <span>{slugs.map((sl) => projects.find((p) => p.slug === sl)?.name).join(' · ')}</span></li>
        ))}
      </ul>
      <p className={s.note}>Se muestran las tecnologías usadas en 2 o más proyectos. Pasa el cursor o enfoca una para ver dónde. <Link href="/#proyectos">Ver proyectos</Link></p>
    </div>
  );
}
