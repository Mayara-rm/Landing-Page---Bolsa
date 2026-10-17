import { useEffect, useRef, useState } from 'react';
import SectionLayout from '../../layout/sectionLayout';
import DetailsCarousel from './DetailsCarousel';
import styles from './details.module.css';

const features = [
  { n: '01', title: 'Alta durabilidade', text: 'Couro sintético reforçado, testado pra uso diário intenso.', accent: 'var(--accent-blue, #4f8fe8)' },
  { n: '02', title: 'Alça ajustável', text: 'Removível, com regulagem rápida pra qualquer altura.', accent: 'var(--accent-red, #e7423c)' },
  { n: '03', title: 'Bolsos internos', text: 'Organização pensada pra carteira, chaves e celular.', accent: 'var(--accent-blue, #4f8fe8)' },
  { n: '04', title: 'Design exclusivo', text: 'Placa metálica com símbolos oficiais da franquia.', accent: 'var(--accent-red, #e7423c)' },
];

const LAST_STEP = 3; // 0 = grid | 1..3 = cards do carrossel

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Details({ active, onNavigate }) {
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  const lockRef = useRef(0);

  const go = (next) => {
    stepRef.current = next;
    setStep(next);
  };

  useEffect(() => {
    if (!active) return;

    const move = (dir) => {
      const next = stepRef.current + dir;
      if (next < 0 || next > LAST_STEP) return false; // fora dos limites: não consome
      const now = Date.now();
      if (now - lockRef.current < 900) return true; // trava a inércia do trackpad
      lockRef.current = now;
      go(next);
      return true;
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 8) return;
      const consumed = move(e.deltaY > 0 ? 1 : -1);
      if (consumed) e.preventDefault();
    };
    const onKey = (e) => {
      if (e.key === 'ArrowDown') move(1) && e.preventDefault();
      if (e.key === 'ArrowUp') move(-1) && e.preventDefault();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  const page = step === 0 ? 0 : 1;

  return (
    <SectionLayout id="detalhes" label="Detalhes do produto" active={active}>
      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateY(${-page * 100}%)` }}>
          {/* PÁGINA 1 */}
          <div className={styles.page}>
            <div className={`${styles.intro} ${active && step === 0 ? styles.show : ''}`}>
              <span className={styles.eyebrow}>Por que essa bolsa</span>
              <h2 className={styles.heading}>Construída pra durar a jornada toda</h2>
            </div>
            <div className={`${styles.grid} ${active && step === 0 ? styles.show : ''}`}>
              {features.map((f, i) => (
                <article key={f.n} className={styles.feature} style={{ '--accent': f.accent, '--i': i }}>
                  <span className={styles.num}>{f.n}</span>
                  <h3 className={styles.ftitle}>{f.title}</h3>
                  <p className={styles.ftext}>{f.text}</p>
                </article>
              ))}
            </div>
          </div>

          {/* PÁGINA 2 */}
          <div className={styles.page}>
            <DetailsCarousel current={Math.max(step - 1, 0)} onSelect={(i) => go(i + 1)} />
          </div>
        </div>

        {step > 0 && (
          <button type="button" aria-label="Voltar"
                  className={`${styles.arrow} ${styles.up}`} onClick={() => go(step - 1)}>
            <Chevron />
          </button>
        )}
        <button type="button"
                aria-label={step < LAST_STEP ? 'Próximo' : 'Ir para contato'}
                className={`${styles.arrow} ${styles.down}`}
                onClick={() => (step < LAST_STEP ? go(step + 1) : onNavigate?.(4))}>
          <Chevron />
        </button>
      </div>
    </SectionLayout>
  );
}