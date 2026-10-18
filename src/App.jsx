import { useState, useRef } from 'react';
import Header from './components/header/Header';
import SectionLayout from './layout/sectionLayout';
import Home from './sections/home';
import Gallery from './sections/gallery';
import Outfit from './sections/outfit';
import Details from './sections/details';
import Contact from './sections/contact';
import useFullPage from './hooks/useFullPage';


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

const sections = [
  { id: 'home',      label: 'Início',   Component: Home },
  { id: 'galeria',   label: 'Galeria',  Component: Gallery },
  { id: 'lifestyle', label: 'Outfit',   Component: Outfit },
  { id: 'detalhes',  label: 'Detalhes', Component: Details },
  { id: 'contato',   label: 'Contato',  Component: Contact },
];


export default function App() {
  const [index, setIndex] = useState(0);

  // telas que ainda têm conteúdo interno registram aqui (ex.: Detalhes)
  const guards = useRef({});

  const goTo = (i) => setIndex(i);

  useFullPage({ total: sections.length, index, setIndex, guards });

  return (
    <>
      <Header activeIndex={index} onNavigate={goTo} />
      <main className="fullpage">
        <div className="fullpage__track" style={{ '--index': index }}>
          {sections.map(({ id, label, Component }, i) => {
            const Section = Component ?? Placeholder;
            return (
              <Section
                key={id}
                id={id}
                label={label}
                active={i === index}
                onNavigate={goTo}
                registerGuard={(fn) => { guards.current[i] = fn; }}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
