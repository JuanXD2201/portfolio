'use client';

import { useEffect, useRef } from 'react';
import s from './Hero.module.css';

interface Particle { r: number; a: number; w: number; size: number; ox: number; oy: number }

/**
 * Núcleo interactivo en Canvas 2D: anillos, arcos, retícula y partículas que reaccionan al puntero.
 * Se pausa fuera de pantalla, con la pestaña oculta y con prefers-reduced-motion (un único fotograma).
 */
export function Core({ labels }: { labels: string[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current!;
    const holder = wrap.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let size = 0;
    let dpr = 1;
    let colors = { accent: '#3fd8ff', blue: '#3b82f6', line: '#2c4b7c', text: '#e6eefb' };
    const readColors = () => {
      const cs = getComputedStyle(canvas);
      const g = (n: string, d: string) => cs.getPropertyValue(n).trim() || d;
      colors = { accent: g('--accent', colors.accent), blue: g('--blue', colors.blue), line: g('--line-strong', colors.line), text: g('--text', colors.text) };
    };

    const parts: Particle[] = Array.from({ length: 64 }, (_, i) => ({
      r: 0.3 + ((i * 37) % 100) / 100 * 0.66,
      a: (i / 64) * Math.PI * 2 + ((i * 13) % 7),
      w: (0.05 + ((i * 17) % 10) / 120) * (i % 2 ? 1 : -1),
      size: 0.7 + ((i * 7) % 10) / 10,
      ox: 0, oy: 0,
    }));

    const ptr = { x: 0, y: 0, in: false, sx: 0, sy: 0 };
    const pulses: number[] = [];
    let visible = true;
    let last = 0;
    let t = 0;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      size = holder.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.height = `${size}px`;
      draw();
    };

    const arc = (cx: number, cy: number, r: number, from: number, len: number) => { ctx.beginPath(); ctx.arc(cx, cy, r, from, from + len); ctx.stroke(); };

    function draw() {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, size, size);
      const R = size / 2;
      // paralaje suave según el puntero
      ptr.sx += (ptr.x - ptr.sx) * 0.08;
      ptr.sy += (ptr.y - ptr.sy) * 0.08;
      const cx = R + ptr.sx * R * 0.05;
      const cy = R + ptr.sy * R * 0.05;
      const c = ctx!;
      c.lineCap = 'round';

      // núcleo: resplandor
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.6);
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, R * 0.34);
      g.addColorStop(0, colors.accent + 'aa');
      g.addColorStop(0.45, colors.blue + '33');
      g.addColorStop(1, 'transparent');
      c.fillStyle = g;
      c.beginPath(); c.arc(cx, cy, R * 0.34, 0, Math.PI * 2); c.fill();
      c.fillStyle = colors.accent;
      c.beginPath(); c.arc(cx, cy, R * (0.045 + pulse * 0.01), 0, Math.PI * 2); c.fill();

      // retícula de marcas
      c.strokeStyle = colors.line; c.lineWidth = 1; c.globalAlpha = 0.55;
      for (let i = 0; i < 120; i++) {
        const a = (i / 120) * Math.PI * 2; const long = i % 10 === 0; const r1 = R * 0.9; const r2 = r1 - (long ? 10 : 4);
        c.beginPath(); c.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); c.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); c.stroke();
      }
      c.globalAlpha = 0.35;
      c.beginPath(); c.moveTo(cx - R * 0.98, cy); c.lineTo(cx + R * 0.98, cy); c.moveTo(cx, cy - R * 0.98); c.lineTo(cx, cy + R * 0.98); c.stroke();
      c.globalAlpha = 1;

      // anillos
      c.lineWidth = 1; c.strokeStyle = colors.line; c.globalAlpha = 0.7;
      c.beginPath(); c.arc(cx, cy, R * 0.3, 0, Math.PI * 2); c.stroke();
      c.beginPath(); c.arc(cx, cy, R * 0.62, 0, Math.PI * 2); c.stroke();
      c.globalAlpha = 1;
      c.setLineDash([2, 7]); c.strokeStyle = colors.line; arc(cx, cy, R * 0.46, t * 0.2, Math.PI * 2); c.setLineDash([]);

      c.lineWidth = 2.5; c.strokeStyle = colors.accent;
      arc(cx, cy, R * 0.8, t * 0.18, 1.1); arc(cx, cy, R * 0.8, t * 0.18 + 2.4, 0.5); arc(cx, cy, R * 0.8, t * 0.18 + 4.1, 0.9);
      c.lineWidth = 2; c.strokeStyle = colors.blue;
      arc(cx, cy, R * 0.7, -t * 0.28, 1.6); arc(cx, cy, R * 0.7, -t * 0.28 + 3.3, 0.7);
      c.lineWidth = 1.5; c.strokeStyle = colors.accent; c.globalAlpha = 0.8;
      arc(cx, cy, R * 0.54, t * 0.4, 0.9); arc(cx, cy, R * 0.54, t * 0.4 + Math.PI, 0.9);
      c.globalAlpha = 1;

      // pulsos al hacer clic
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]; const age = t - p; if (age > 1.4) { pulses.splice(i, 1); continue; }
        c.globalAlpha = 1 - age / 1.4; c.strokeStyle = colors.accent; c.lineWidth = 1.5;
        c.beginPath(); c.arc(cx, cy, R * (0.1 + age * 0.62), 0, Math.PI * 2); c.stroke();
      }
      c.globalAlpha = 1;

      // partículas: orbitan y se desplazan hacia el puntero
      const px = R + ptr.sx * R; const py = R + ptr.sy * R;
      for (const p of parts) {
        const a = p.a + t * p.w;
        const bx = cx + Math.cos(a) * p.r * R; const by = cy + Math.sin(a) * p.r * R;
        let tx = 0; let ty = 0;
        if (ptr.in) { const dx = px - bx; const dy = py - by; const d = Math.hypot(dx, dy); if (d < R * 0.5 && d > 1) { const f = (1 - d / (R * 0.5)) * 14; tx = (dx / d) * f; ty = (dy / d) * f; } }
        p.ox += (tx - p.ox) * 0.12; p.oy += (ty - p.oy) * 0.12;
        c.fillStyle = p.size > 1.3 ? colors.accent : colors.text;
        c.globalAlpha = p.size > 1.3 ? 0.95 : 0.5;
        c.beginPath(); c.arc(bx + p.ox, by + p.oy, p.size, 0, Math.PI * 2); c.fill();
      }
      c.globalAlpha = 1;

      // retícula de puntería
      if (ptr.in) {
        c.strokeStyle = colors.accent; c.lineWidth = 1; c.globalAlpha = 0.9;
        c.beginPath(); c.arc(px, py, 9, 0, Math.PI * 2); c.stroke();
        c.beginPath(); c.moveTo(px - 15, py); c.lineTo(px - 5, py); c.moveTo(px + 5, py); c.lineTo(px + 15, py); c.moveTo(px, py - 15); c.lineTo(px, py - 5); c.moveTo(px, py + 5); c.lineTo(px, py + 15); c.stroke();
        c.globalAlpha = 1;
      }

      // etiquetas con línea guía
      c.font = `${Math.max(10, Math.round(size / 42))}px ${getComputedStyle(canvas).getPropertyValue('--mono') || 'monospace'}`;
      c.textBaseline = 'middle';
      labels.slice(0, 3).forEach((txt, i) => {
        const ang = [-0.75, 0.62, 2.35][i]; const r0 = R * 0.8;
        const x0 = cx + Math.cos(ang) * r0; const y0 = cy + Math.sin(ang) * r0;
        const right = Math.cos(ang) >= 0;
        // la etiqueta izquierda se dibuja hacia dentro para no recortarse en pantallas pequeñas
        const x1 = x0 + (right ? 14 : 14);
        c.strokeStyle = colors.accent; c.globalAlpha = 0.7; c.lineWidth = 1;
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y0 - 12); c.lineTo(x1 + (right ? 8 : -8), y0 - 12); c.stroke();
        c.globalAlpha = 1; c.fillStyle = colors.text; c.textAlign = right ? 'right' : 'left';
        c.fillText(txt, right ? x1 + 4 : x1 + 6, right ? y0 - 24 : y0 - 24);
      });
    }

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (now - last >= 22) { t += Math.min(now - last, 60) / 1000; last = now; draw(); } // ~45 fps como máximo
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!reduced && !raf && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); } };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0.05 });
    io.observe(holder);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener('visibilitychange', onVis);
    const ro = new ResizeObserver(resize);
    ro.observe(holder);
    const mo = new MutationObserver(() => { readColors(); draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      ptr.x = ((e.clientX - b.left) / b.width) * 2 - 1; ptr.y = ((e.clientY - b.top) / b.height) * 2 - 1; ptr.in = true;
      if (reduced) draw();
    };
    const leave = () => { ptr.in = false; ptr.x = 0; ptr.y = 0; if (reduced) draw(); };
    const click = () => { pulses.push(t); if (reduced) draw(); };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('click', click);

    readColors();
    resize();
    start();
    return () => {
      cancelAnimationFrame(raf); raf = 0; io.disconnect(); ro.disconnect(); mo.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); canvas.removeEventListener('click', click);
    };
  }, [labels]);

  return (
    <div ref={wrap} className={s.core}>
      <canvas ref={cv} aria-hidden="true" />
    </div>
  );
}
