import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import About from './components/About.jsx';
import ClientWork from './components/ClientWork.jsx';
import Contact from './components/Contact.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import Projects from './components/Projects.jsx';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <>
    <CustomCursor/>
    <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    <main id="home">
      <Hero/>
      <Projects setActiveProject={setActiveProject}/>
      <About/>
      <Experience/>
      <ClientWork/>
      <Contact/>
    </main>
    <Footer/>
    <ProjectModal project={activeProject} onClose={() => setActiveProject(null)}/>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
