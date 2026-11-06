'use client';

import { useState } from 'react';

export function CopyEmail({ email }: { email: string }) {
  const [msg, setMsg] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setMsg('Correo copiado');
    } catch {
      setMsg('No se pudo copiar; usa el enlace de correo.');
    }
    setTimeout(() => setMsg(''), 2500);
  };
  return (
    <>
      <button type="button" className="btn" onClick={copy}>Copiar correo</button>
      <span role="status" aria-live="polite" style={{ fontSize: '.85rem', color: 'var(--accent)' }}>{msg}</span>
    </>
  );
}
