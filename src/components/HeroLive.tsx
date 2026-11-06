'use client';

import { useEffect, useState } from 'react';
import { site } from '../data/site';

/** Hora local de Bogotá. Se actualiza cada segundo solo mientras la pestaña está visible. */
export function BogotaClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let id = 0;
    const tick = () => setNow(new Date());
    const start = () => { tick(); id = window.setInterval(tick, 1000); };
    const stop = () => window.clearInterval(id);
    const onVis = () => { stop(); if (!document.hidden) start(); };
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => { stop(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  const time = now?.toLocaleTimeString('es-CO', { timeZone: site.timezone, hour12: false }) ?? '--:--:--';
  const date = now?.toLocaleDateString('es-CO', { timeZone: site.timezone, weekday: 'long', day: 'numeric', month: 'long' }) ?? ' ';
  return (
    <div>
      <time dateTime={now?.toISOString()} style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 600, lineHeight: 1, letterSpacing: '.02em' }}>{time}</time>
      <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginTop: 6, minHeight: '1.4em' }}>{date} · Bogotá (UTC−5)</p>
    </div>
  );
}
