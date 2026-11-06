'use client';

import { useEffect, useState } from 'react';
import { terminalLines } from '../data/site';
import s from './Terminal.module.css';

/** Terminal que "escribe" los comandos y muestra su salida. Con prefers-reduced-motion se muestra completa. */
export function Terminal() {
  const total = terminalLines.reduce((n, l) => n + l.text.length + 1, 0);
  const [typed, setTyped] = useState(total); // SSR y sin JS: contenido completo

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setTyped(0);
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      setTyped(n);
      if (n >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [total]);

  let budget = typed;
  return (
    <div className={s.win} role="img" aria-label="Terminal con un resumen del perfil: quién soy, stack y proyectos">
      <div className={s.bar} aria-hidden="true">
        <i /><i /><i /><span>juan@portfolio ~ zsh</span>
      </div>
      <pre className={s.body} aria-hidden="true">
        {terminalLines.map((l, i) => {
          const shown = Math.max(0, Math.min(l.text.length, budget));
          budget -= l.text.length + 1;
          if (shown === 0 && typed < total) return null;
          return (
            <span key={i} className={`${s.line} ${s[l.kind]}`}>
              {l.kind === 'cmd' && <b>$ </b>}
              {l.text.slice(0, shown)}
              {typed < total && budget < 0 && budget > -(l.text.length + 2) && shown < l.text.length ? <em className={s.caret} /> : null}
              {'\n'}
            </span>
          );
        })}
        {typed >= total && <span className={s.line}><b>$ </b><em className={s.caret} /></span>}
      </pre>
    </div>
  );
}
