'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { nav, site } from '../data/site';
import { projects } from '../data/projects';
import s from './CommandPalette.module.css';

interface Item { label: string; hint: string; run: () => void }

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const go = (path: string) => () => router.push(path);
    const ext = (u: string) => () => window.open(u, '_blank', 'noopener');
    return [
      ...nav.map((n) => ({ label: n.label, hint: 'Ir a sección', run: go(`/${n.href}`) })),
      ...projects.map((p) => ({ label: p.name, hint: 'Proyecto', run: go(`/proyectos/${p.slug}/`) })),
      { label: 'GitHub', hint: site.githubUser, run: ext(site.github) },
      { label: 'LinkedIn', hint: 'Perfil', run: ext(site.linkedin) },
      { label: 'Escribir correo', hint: site.email, run: () => { location.href = `mailto:${site.email}`; } },
    ];
  }, [router]);

  const shown = items.filter((i) => (i.label + ' ' + i.hint).toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => input.current?.focus(), 0); }
  }, [open]);

  if (!open) return null;

  const choose = (i?: Item) => { if (i) { onClose(); i.run(); } };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((x) => Math.min(x + 1, shown.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((x) => Math.max(x - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(shown[sel]); }
    else if (e.key === 'Escape') onClose();
  };

  return createPortal(
    <div className={s.overlay} onMouseDown={onClose}>
      <div className={s.box} role="dialog" aria-modal="true" aria-label="Paleta de comandos" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <input ref={input} className={s.input} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder="Buscar sección, proyecto o enlace…" aria-label="Buscar" role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-activedescendant={shown[sel] ? `cmd-${sel}` : undefined} />
        <ul id="cmd-list" className={s.list} role="listbox">
          {shown.map((it, i) => (
            <li key={it.label + it.hint} id={`cmd-${i}`} role="option" aria-selected={i === sel} className={i === sel ? s.on : ''} onMouseEnter={() => setSel(i)} onClick={() => choose(it)}>
              <span>{it.label}</span><small>{it.hint}</small>
            </li>
          ))}
          {shown.length === 0 && <li className={s.empty}>Sin resultados</li>}
        </ul>
        <p className={s.foot}>↑↓ navegar · ↵ abrir · esc cerrar</p>
      </div>
    </div>,
    document.body,
  );
}
