'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site, nav } from '../data/site';
import { CommandPalette } from './CommandPalette';
import s from './Chrome.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((p) => !p); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* almacenamiento no disponible */ }
  };

  return (
    <header className={s.nav}>
      <div className={`wrap ${s.navIn}`}>
        <Link className={s.brand} href="/" aria-label={`${site.name}, inicio`}>
          <svg className={s.mark} width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="60 28" />
            <circle cx="16" cy="16" r="8.5" stroke="currentColor" strokeWidth="1" opacity=".6" />
            <circle cx="16" cy="16" r="2.6" fill="currentColor" />
          </svg>
          <span className={s.brandName}>{site.shortName}</span>
        </Link>
        <nav aria-label="Principal" id="menu" className={`${s.menu} ${open ? s.open : ''}`}>
          {nav.map((n) => (
            <Link key={n.href} href={`/${n.href}`} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
        </nav>
        <div className={s.actions}>
          <button className={s.kbd} type="button" onClick={() => setPalette(true)} aria-label="Abrir paleta de comandos (Ctrl+K)" aria-haspopup="dialog">
            <span>Ctrl K</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </button>
          <button className={s.iconBtn} type="button" onClick={toggleTheme} aria-label="Cambiar tema claro u oscuro">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <button className={`${s.iconBtn} ${s.burger}`} type="button" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen((o) => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </header>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.footIn}`}>
        <div>
          <strong>{site.name}</strong>
          <p>{site.role} · Android, web, Firebase y .NET MAUI</p>
        </div>
        <ul className={s.footLinks}>
          <li><a href={site.github} rel="noopener">GitHub</a></li>
          <li><a href={`mailto:${site.email}`}>Correo</a></li>
          <li><Link href="/#contacto">Contacto</Link></li>
        </ul>
        {/* El año se calcula en el navegador para que el sitio estático no quede desactualizado. */}
        <p className={s.copy}>© <Year /> {site.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

function Year() {
  const [y, setY] = useState(2026);
  useEffect(() => setY(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{y}</span>;
}

/** Progreso de lectura, riel de secciones, botón «volver arriba» y trazado de las cabeceras de sección. */
export function ClientEffects() {
  const pathname = usePathname();
  const home = pathname === '/';
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState<string>('inicio');

  useEffect(() => {
    const root = document.documentElement;
    const bar = document.getElementById('progress');
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = root.scrollHeight - root.clientHeight;
        if (bar) bar.style.transform = `scaleX(${h > 0 ? root.scrollTop / h : 0})`;
        setShowTop(root.scrollTop > 700);
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const heads = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); heads.unobserve(e.target); } }),
      { threshold: 0.3 },
    );
    const observe = () => document.querySelectorAll('.sec-head:not(.in)').forEach((el) => heads.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.getElementById('main')!, { childList: true, subtree: true });

    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); heads.disconnect(); mo.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    if (!home) return;
    const ids = nav.map((n) => n.href.slice(1));
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    return () => spy.disconnect();
  }, [home]);

  return (
    <>
      {home && (
        <nav className={s.rail} aria-label="Secciones de la página">
          <ol>
            {nav.map((n) => {
              const id = n.href.slice(1);
              return (
                <li key={id}>
                  <a href={n.href} aria-current={active === id ? 'location' : undefined}><span>{n.label}</span><i aria-hidden="true" /></a>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
      {showTop && (
        <button className={s.toTop} type="button" aria-label="Volver arriba" onClick={() => scrollTo({ top: 0 })}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </button>
      )}
    </>
  );
}
