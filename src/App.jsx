// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import SectionLayout from './layout/sectionLayout';
import Home from './sections/home';
import Gallery from './sections/gallery';
import Outfit from './sections/outfit';
import Details from './sections/details';
import Contact from './sections/contact';


// Tela provisória, só para as seções que ainda não existem
function Placeholder({ id, label, active }) {
  return (
    <SectionLayout id={id} label={label} active={active}>
      <h2 style={{ color: 'var(--text-primary)' }}>{label}</h2>
    </SectionLayout>
  );
}

// A ordem aqui é a ordem das telas e o "index" usado no Header.
// Os ids precisam ser os mesmos dos links do Header.
// Quando uma seção ficar pronta, é só adicionar o Component dela.

const sections = [
  { id: 'home',      label: 'Início',   Component: Home },
  { id: 'galeria',   label: 'Galeria',  Component: Gallery },
  { id: 'lifestyle', label: 'Outfit',   Component: Outfit },
  { id: 'detalhes',  label: 'Detalhes', Component: Details },
  { id: 'contato',   label: 'Contato',  Component: Contact },
];


export default function App() {
  const [index, setIndex] = useState(0);

  // Navegação pelo menu e pelos botões: rola até a seção
  const goTo = (i) => {
    setIndex(i);
    document.getElementById(sections[i].id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Enquanto o efeito de tela cheia não existe, descobre qual seção
  // está na tela para marcar o menu e disparar a animação de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = sections.findIndex((s) => s.id === entry.target.id);
            if (i !== -1) setIndex(i);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header activeIndex={index} onNavigate={goTo} />
      <main>
        {sections.map(({ id, label, Component }, i) => {
          const Section = Component ?? Placeholder;
          return (
            <Section
              key={id}
              id={id}
              label={label}
              active={i === index}
              onNavigate={goTo}
            />
          );
        })}
      </main>
    </>
  );
}