import { stack } from '../data/stack';
import { projects } from '../data/projects';
import { about, timeline, site } from '../data/site';
import { SkillMap } from './SkillMap';
import { Contact } from './Contact';
import s from './Sections.module.css';

export function About() {
  return (
    <section id="sobre-mi">
      <div className="wrap">
        <div className={s.aboutGrid}>
          <div className={s.aboutLead}>
            <p className="tag">Sobre mí · {site.degree.split(' · ')[1]}</p>
            <h2>Software que se puede probar, mantener y explicar.</h2>
          </div>
          <div className={s.aboutBody}>
            <div className={s.text}>{about.paragraphs.map((t) => <p key={t}>{t}</p>)}</div>
            <dl className={s.strengths}>
              {about.strengths.map((x) => (
                <div key={x.title}><dt>{x.title}</dt><dd>{x.text}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Specialties() {
  const techTotal = stack.reduce((n, g) => n + g.items.length, 0);
  return (
    <section id="especialidades" className={s.alt}>
      <div className="wrap">
        <div className="sec-head">
          <p className="tag">Especialidades · {techTotal} tecnologías con respaldo</p>
          <h2>Lo que puedo construir y el proyecto que lo demuestra.</h2>
          <p>Cada tecnología indica dónde la he usado. Sin porcentajes de dominio: la evidencia son los proyectos.</p>
        </div>
        <SkillMap />
        <details className={s.allTech}>
          <summary>Ver todas las tecnologías por categoría</summary>
          <div className={s.groups}>
            {stack.map((g) => (
              <div key={g.id} className={`panel ${s.group}`}>
                <h3>{g.title}</h3>
                <ul>{g.items.map((t) => <li key={t.name}><span>{t.name}</span><small>{t.proof}</small></li>)}</ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

export function Trayectoria() {
  const items = [
    ...timeline.education.map((e) => ({ ...e, type: 'Formación' })),
    ...timeline.experience.map((e) => ({ ...e, type: 'Experiencia seleccionada' })),
  ].sort((a, b) => Number(b.period.includes('actualidad')) - Number(a.period.includes('actualidad')) || b.start.localeCompare(a.start));
  return (
    <section id="trayectoria">
      <div className="wrap">
        <div className="sec-head">
          <p className="tag">Trayectoria · formación y experiencia seleccionada</p>
          <h2>Dónde he aprendido y dónde he trabajado con datos.</h2>
        </div>
        <ol className={s.tl}>
          {items.map((e) => (
            <li key={e.title + e.period}>
              <span className={s.when}>{e.period}</span>
              <div className={`panel ${s.tlCard}`}>
                <span className={`chip ${e.type === 'Formación' ? '' : s.exp}`}>{e.type}</span>
                <strong>{e.title}</strong>
                <em>{e.org}</em>
                {e.text && <p>{e.text}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contacto" className={s.alt}>
      <div className="wrap">
        <div className="sec-head">
          <p className="tag">Contacto · Bogotá (UTC−5)</p>
          <h2>Hablemos de tu equipo o tu proyecto.</h2>
          <p>Elige el canal que prefieras; {projects.length} proyectos y {site.githubUser} en GitHub son la mejor referencia de cómo trabajo.</p>
        </div>
        <Contact />
      </div>
    </section>
  );
}
