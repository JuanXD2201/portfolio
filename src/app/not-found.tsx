import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingBlock: '120px', display: 'grid', gap: 16 }}>
      <p className="eyebrow">// error 404</p>
      <h1>Esta ruta no existe.</h1>
      <p style={{ color: 'var(--muted)' }}>Puede que el enlace haya cambiado.</p>
      <div><Link className="btn btn-primary" href="/">Volver al inicio</Link></div>
    </section>
  );
}
