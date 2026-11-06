import Link from 'next/link';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { Terminal } from './Terminal';
import s from './Hero.module.css';

export function Hero() {
  return (
    <section className={s.hero}>
      <div className={`wrap ${s.grid}`}>
        <div>
          <p className="eyebrow">{site.role} · {site.location}</p>
          <h1 className={s.title}>{site.name}</h1>
          <p className={s.lead}>{site.headline}</p>
          <p className={s.sub}>{site.intro}</p>
          <ul className={s.tags} aria-label="Especialidades">
            {site.specialties.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
          <div className={s.cta}>
            <Link className="btn btn-primary" href="/#proyectos">Explorar proyectos</Link>
            <Link className="btn" href="/#contacto">Contacto</Link>
            <a className="btn" href={site.github} rel="noopener">GitHub</a>
            <a className="btn" href={site.linkedin} rel="noopener">LinkedIn</a>
          </div>
          <p className={s.avail}><span className={s.dot} aria-hidden="true" />{site.availability}</p>
        </div>

        <div className={s.visual}>
          <Terminal />
          <p className={s.caption}>{projects.length} proyectos documentados · pulsa <kbd>Ctrl</kbd> + <kbd>K</kbd> para navegar</p>
        </div>
      </div>
    </section>
  );
}
