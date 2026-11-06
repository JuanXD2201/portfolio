import Link from 'next/link';
import { site, whatsappLink } from '../data/site';
import { projects, labs, labUrl } from '../data/projects';
import { stack } from '../data/stack';
import { asset } from '../lib/paths';
import { Core } from './Core';
import { BogotaClock } from './HeroLive';
import s from './Hero.module.css';

const techCount = stack.reduce((n, g) => n + g.items.length, 0);
const testCount = projects.reduce((n, p) => n + (p.tests ?? 0), 0);
const coreLabels = [`${projects.length} proyectos`, `${techCount} tecnologías`, `${testCount} pruebas`];

/** Indicadores derivados de los datos: cambian solos al añadir proyectos o tecnologías. */
const metrics = [
  { value: projects.length, label: 'Proyectos documentados' },
  { value: labs.length, label: 'Laboratorios con demo' },
  { value: techCount, label: 'Tecnologías con respaldo' },
  { value: testCount, label: 'Pruebas automatizadas' },
];

export function Hero() {
  return (
    <section id="inicio" className={s.hero}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <p className={`tag ${s.stagger}`} style={{ '--i': 0 } as React.CSSProperties}>{site.role} · {site.location}</p>
          <h1 className={`${s.title} ${s.stagger}`} style={{ '--i': 1 } as React.CSSProperties}>{site.name}</h1>
          <p className={`${s.lead} ${s.stagger}`} style={{ '--i': 2 } as React.CSSProperties}>{site.headline}</p>
          <p className={`${s.sub} ${s.stagger}`} style={{ '--i': 3 } as React.CSSProperties}>{site.intro}</p>
          <ul className={`${s.tags} ${s.stagger}`} style={{ '--i': 4 } as React.CSSProperties} aria-label="Especialidades">
            {site.specialties.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
          <div className={`${s.cta} ${s.stagger}`} style={{ '--i': 5 } as React.CSSProperties}>
            <Link className="btn btn-primary" href="/#proyectos">Explorar proyectos</Link>
            <Link className="btn" href="/#contacto">Contacto</Link>
            <a className="btn" href={whatsappLink} rel="noopener" target="_blank">WhatsApp</a>
            <a className="btn" href={site.github} rel="noopener" target="_blank">GitHub</a>
          </div>
        </div>

        <div className={s.stage}>
          <Core labels={coreLabels} />
        </div>
      </div>

      <div className={`wrap ${s.panels}`}>
        <div className={`panel ${s.card}`} role="group" aria-labelledby="p-id">
          <h2 id="p-id" className={s.cardTitle}>Identificación</h2>
          <dl className={s.dl}>
            <div><dt>Nombre</dt><dd>{site.name}</dd></div>
            <div><dt>Rol</dt><dd>{site.role}</dd></div>
            <div><dt>Formación</dt><dd>{site.degree}</dd></div>
            <div><dt>Ubicación</dt><dd>{site.location}</dd></div>
          </dl>
        </div>

        <div className={`panel ${s.card}`} role="group" aria-labelledby="p-ind">
          <h2 id="p-ind" className={s.cardTitle}>Indicadores</h2>
          <ul className={s.metrics}>
            {metrics.map((m) => (
              <li key={m.label}><b>{m.value}</b><span>{m.label}</span></li>
            ))}
          </ul>
        </div>

        <div className={`panel ${s.card}`} role="group" aria-labelledby="p-est">
          <h2 id="p-est" className={s.cardTitle}>Estado</h2>
          <BogotaClock />
          <p className={s.avail}><span className={s.dot} aria-hidden="true" />{site.availability}</p>
          <ul className={s.quick} aria-label="Accesos rápidos">
            {labs.map((l) => <li key={l.slug}><a href={labUrl(l)}>Demo · {l.name}</a></li>)}
            <li><a href={asset(site.cvFile)} download>Hoja de vida (PDF)</a></li>
            <li><Link href="/#proyectos">Explorar proyectos</Link></li>
          </ul>
          <p className={s.hint}>Pulsa <kbd>Ctrl</kbd> <kbd>K</kbd> para abrir la paleta de comandos.</p>
        </div>
      </div>
    </section>
  );
}
