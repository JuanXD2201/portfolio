import { stack } from '../data/stack';
import { projects } from '../data/projects';
import { about, timeline, services, site } from '../data/site';
import { asset } from '../lib/paths';
import { CopyEmail } from './CopyEmail';
import { SkillGraph } from './SkillGraph';
import s from './Sections.module.css';

const names = (slugs: readonly string[]) => slugs.map((x) => projects.find((p) => p.slug === x)?.name).filter(Boolean).join(' · ');

export function Sections() {
  return (
    <>
      <section id="stack" className={s.alt}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">02 · Stack</p>
            <h2>Tecnologías con proyecto que las respalda.</h2>
            <p>Sin porcentajes de dominio: cada herramienta indica dónde la he usado.</p>
          </div>
          <div className={`${s.graph} reveal`}>
            <h3 className={s.tlH}>Mapa de evidencia</h3>
            <SkillGraph />
          </div>
          <div className={s.groups}>
            {stack.map((g) => (
              <div key={g.id} className={`${s.group} reveal`}>
                <h3>{g.title}</h3>
                <ul>{g.items.map((t) => <li key={t.name}><span>{t.name}</span><small>{t.proof}</small></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre-mi">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">03 · Sobre mí</p>
            <h2>Software que se puede probar, mantener y explicar.</h2>
          </div>
          <div className={s.aboutBody}>
            <div className={`${s.text} reveal`}>{about.paragraphs.map((t) => <p key={t}>{t}</p>)}</div>
            <ul className={s.strengths}>
              {about.strengths.map((x) => <li key={x.title} className="reveal"><h3>{x.title}</h3><p>{x.text}</p></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="servicios" className={s.alt}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">04 · Especialidades</p>
            <h2>Lo que puedo construir, con el proyecto que lo demuestra.</h2>
          </div>
          <ul className={s.services}>
            {services.map((x) => (
              <li key={x.title} className="reveal">
                <h3>{x.title}</h3>
                <p>{x.text}</p>
                <p className={s.ev}>Evidencia: {names(x.evidence)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="trayectoria">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">05 · Trayectoria</p>
            <h2>Formación y experiencia.</h2>
          </div>
          <div className={s.tlCols}>
            {([['Formación', timeline.education], ['Experiencia laboral', timeline.experience]] as const).map(([title, items]) => (
              <div key={title}>
                <h3 className={s.tlH}>{title}</h3>
                <ol className={s.tl}>
                  {items.map((e) => (
                    <li key={e.title + e.period} className="reveal">
                      <span className={s.when}>{e.period}</span>
                      <strong>{e.title}</strong>
                      <em>{e.org}</em>
                      {e.text && <p>{e.text}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className={s.alt}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">06 · Contacto</p>
            <h2>Hablemos de tu equipo o tu proyecto.</h2>
            <p>La forma más directa es el correo. Respondo desde Bogotá (UTC−5).</p>
          </div>
          <div className={`${s.channels} reveal`}>
            <div className={s.mail}>
              <span className={s.label}>Correo</span>
              <a className={s.addr} href={`mailto:${site.email}`}>{site.email}</a>
              <CopyEmail email={site.email} />
            </div>
            <ul className={s.social}>
              <li><a className="btn" href={site.github} rel="noopener">GitHub · {site.githubUser}</a></li>
              <li><a className="btn" href={site.linkedin} rel="noopener">LinkedIn</a></li>
              <li><a className="btn btn-primary" href={asset(site.cvFile)} download>Descargar hoja de vida (PDF)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
