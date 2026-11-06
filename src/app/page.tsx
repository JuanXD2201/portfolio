import { Hero } from '../components/Hero';
import { ProjectsExplorer } from '../components/ProjectsExplorer';
import { About, Specialties, Trayectoria, ContactSection } from '../components/Sections';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Specialties />
      <ProjectsExplorer />
      <Trayectoria />
      <ContactSection />
    </>
  );
}
