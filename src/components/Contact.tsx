'use client';

import { useRef, useState } from 'react';
import { site, whatsappLink } from '../data/site';
import { asset } from '../lib/paths';
import s from './Contact.module.css';

/** Módulo de contacto: cada canal tiene su acción directa y, cuando aplica, un botón para copiar. */
export function Contact() {
  const [msg, setMsg] = useState('');
  const timer = useRef<number>(0);

  const copy = async (text: string, what: string) => {
    let note: string;
    try { await navigator.clipboard.writeText(text); note = `${what} copiado`; } catch { note = `No se pudo copiar; selecciona el ${what.toLowerCase()} manualmente.`; }
    setMsg(note);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className={`panel ${s.module}`}>
      <ul className={s.rows}>
        <li>
          <div className={s.info}><span className={s.label}>Teléfono</span><a className={s.value} href={`tel:${site.phone}`}>{site.phoneDisplay}</a></div>
          <div className={s.acts}>
            <a className="btn" href={`tel:${site.phone}`}>Llamar</a>
            <button type="button" className="btn" onClick={() => copy(site.phoneDisplay, 'Teléfono')}>Copiar teléfono</button>
          </div>
        </li>
        <li>
          <div className={s.info}><span className={s.label}>WhatsApp</span><span className={s.value}>Mensaje prellenado en español</span></div>
          <div className={s.acts}>
            <a className="btn btn-primary" href={whatsappLink} rel="noopener" target="_blank">Escribir por WhatsApp</a>
          </div>
        </li>
        <li>
          <div className={s.info}><span className={s.label}>Correo</span><a className={s.value} href={`mailto:${site.email}`}>{site.email}</a></div>
          <div className={s.acts}>
            <a className="btn" href={`mailto:${site.email}`}>Enviar correo</a>
            <button type="button" className="btn" onClick={() => copy(site.email, 'Correo')}>Copiar correo</button>
          </div>
        </li>
        <li>
          <div className={s.info}><span className={s.label}>GitHub</span><a className={s.value} href={site.github} rel="noopener" target="_blank">github.com/{site.githubUser}</a></div>
          <div className={s.acts}><a className="btn" href={site.github} rel="noopener" target="_blank">Ver perfil</a></div>
        </li>
        <li>
          <div className={s.info}><span className={s.label}>Hoja de vida</span><span className={s.value}>PDF · proyectos, formación y tecnologías</span></div>
          <div className={s.acts}><a className="btn" href={asset(site.cvFile)} download>Descargar PDF</a></div>
        </li>
      </ul>
      <p className={s.status} role="status" aria-live="polite">{msg}</p>
    </div>
  );
}
