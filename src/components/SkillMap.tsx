'use client';

import { useState } from 'react';
import Link from 'next/link';
import { areas, type Area } from '../data/site';
import { projects } from '../data/projects';
import { stack } from '../data/stack';
import s from './SkillMap.module.css';

const W = 760;
const H = 660;
const CX = W / 2;
const CY = H / 2;
const R_AREA = 168;
const R_PROJ = 262;

const proofOf = new Map(stack.flatMap((g) => g.items.map((t) => [t.name, t.proof] as const)));
const shortName = (n: string) => (n.length > 12 ? n.split(' ')[0] : n);
const polar = (r: number, i: number, n: number, off = -Math.PI / 2) => {
  const a = off + (i / n) * Math.PI * 2;
  return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r, a };
};
const shortArea = (t: string) => { const b = t.replace(/,.*/, ''); return b.length > 18 ? b.split(' ')[0] : b; };
const nameOf = (slug: string) => projects.find((p) => p.slug === slug)?.name ?? slug;

function Detail({ area }: { area: Area }) {
  const techs = area.techs.filter((t) => proofOf.has(t));
  return (
    <div className={s.detail}>
      <h3>{area.title}</h3>
      <p>{area.text}</p>
      <h4>Tecnologías con respaldo</h4>
      <ul className={s.techs}>
        {techs.map((t) => <li key={t}><span>{t}</span><small>{proofOf.get(t)}</small></li>)}
      </ul>
      <h4>Proyectos</h4>
      <ul className={s.links}>
        {area.projects.map((slug) => <li key={slug}><Link href={`/proyectos/${slug}/`}>{nameOf(slug)}</Link></li>)}
      </ul>
    </div>
  );
}

/**
 * Mapa radial de especialidades. Los enlaces salen de `areas` (site.ts) y las tecnologías de `stack.ts`,
 * así que solo aparece lo que tiene proyecto que lo respalde. En pantallas estrechas se muestra una lista.
 */
export function SkillMap() {
  const [sel, setSel] = useState(areas[0].id);
  const [hover, setHover] = useState<string | null>(null);
  const current = hover ?? sel;
  const area = areas.find((a) => a.id === current) ?? areas[0];
  const active = new Set(area.projects);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = areas[(i + d + areas.length) % areas.length];
    setSel(next.id);
    document.getElementById(`area-${next.id}`)?.focus();
  };

  return (
    <div className={s.root}>
      <div className={s.mapWrap}>
        <svg viewBox={`0 0 ${W} ${H}`} className={s.svg} role="group" aria-label="Mapa radial de especialidades y proyectos que las respaldan">
          <circle cx={CX} cy={CY} r={R_AREA} className={s.ring} />
          <circle cx={CX} cy={CY} r={R_PROJ} className={s.ring} strokeDasharray="2 6" />
          {areas.flatMap((a, ai) => a.projects.map((slug) => {
            const pi = projects.findIndex((p) => p.slug === slug);
            const from = polar(R_AREA, ai, areas.length);
            const to = polar(R_PROJ, pi, projects.length);
            const on = a.id === area.id;
            return <line key={a.id + slug} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={`${s.edge} ${on ? s.edgeOn : ''}`} />;
          }))}
          <circle cx={CX} cy={CY} r="34" className={s.hub} />
          <text x={CX} y={CY + 5} textAnchor="middle" className={s.hubText}>JO</text>

          {projects.map((p, i) => {
            const pos = polar(R_PROJ, i, projects.length);
            const right = Math.cos(pos.a) >= 0;
            const on = active.has(p.slug);
            return (
              <Link key={p.slug} href={`/proyectos/${p.slug}/`} aria-label={`Proyecto ${p.name}`} className={`${s.pnode} ${on ? s.pOn : ''}`}>
                <circle cx={pos.x} cy={pos.y} r={on ? 6 : 4} />
                <text x={pos.x + (right ? 12 : -12)} y={pos.y + 4} textAnchor={right ? 'start' : 'end'}>{shortName(p.name)}</text>
              </Link>
            );
          })}

          {areas.map((a, i) => {
            const pos = polar(R_AREA, i, areas.length);
            const on = a.id === area.id;
            return (
              <g key={a.id} id={`area-${a.id}`} className={`${s.anode} ${on ? s.aOn : ''}`} tabIndex={0} role="button" aria-pressed={sel === a.id}
                aria-label={`${a.title}: ${a.projects.length} proyectos`}
                onClick={() => setSel(a.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(a.id); } else onKey(e, i); }}
                onMouseEnter={() => setHover(a.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(a.id)} onBlur={() => setHover(null)}>
                <circle cx={pos.x} cy={pos.y} r="25" />
                <text x={pos.x} y={pos.y + 4} textAnchor="middle">{a.projects.length}</text>
                <text x={pos.x} y={pos.y + (pos.y > CY ? 44 : -34)} textAnchor="middle" className={s.alabel}>{shortArea(a.title)}</text>
              </g>
            );
          })}
        </svg>
        <p className={s.note}>El número de cada nodo indica cuántos proyectos respaldan la especialidad. Usa las flechas para recorrerlas.</p>
      </div>

      <div className={`panel ${s.panelDetail}`}><Detail area={area} /></div>

      {/* Alternativa en lista: pantallas estrechas y lectores de pantalla */}
      <ul className={s.mobile}>
        {areas.map((a) => (
          <li key={a.id} className={`panel ${s.mItem}`}><Detail area={a} /></li>
        ))}
      </ul>
    </div>
  );
}
