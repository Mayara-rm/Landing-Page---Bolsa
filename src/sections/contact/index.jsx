// src/sections/contact/index.jsx
import { useState } from 'react';
import SectionLayout from '../../layout/sectionLayout';
import Button from '../../components/button/Button';
import styles from './contact.module.css';

const icon = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const benefits = [
  { title: 'Atendimento rápido', text: 'Retornamos em breve com todas as informações.',
    svg: <svg {...icon}><path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" /></svg> },
  { title: 'Compra segura', text: 'Seus dados estão protegidos com a gente.',
    svg: <svg {...icon}><path d="M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9.5-4.1-1.6-7-5.3-7-9.5V6l7-3z" /></svg> },
  { title: 'Sua satisfação importa', text: 'Retornamos em breve com todas as informações.',
    svg: <svg {...icon}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg> },
];

// FORMULÁRIO ILUSTRATIVO: nada é enviado para lugar nenhum.
// Para ativar o envio real depois, é só trocar o setTimeout por um fetch
// (ex.: Web3Forms) dentro do handleSubmit.
export default function Contact({ active }) {
  // 'idle' | 'sending' | 'success'
  const [status, setStatus] = useState('idle');

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');

    // simula o envio (~0,8 s) para mostrar os estados da interface
    setTimeout(() => {
      setStatus('success');
      form.reset();
    }, 800);
  }

  return (
    <SectionLayout id="contato" label="Contato" active={active}>
      <div className={`${styles.contact} ${active ? styles.active : ''}`}>
        {/* ---------- coluna esquerda ---------- */}
        <div className={styles.text}>
          <span className={styles.eyebrow} style={{ '--i': 0 }}>Fale conosco</span>
          <h2 className={styles.title} style={{ '--i': 1 }}>Quer adquirir nossa novidade?</h2>
          <p className={styles.description} style={{ '--i': 2 }}>
            Preencha o formulário com os dados solicitados que entraremos em contato com
            você para providenciar sua bolsa espacial!
          </p>

          <ul className={styles.benefits}>
            {benefits.map((b, i) => (
              <li key={b.title} className={styles.benefit} style={{ '--i': 3 + i }}>
                <span className={styles.icon}>{b.svg}</span>
                <div>
                  <strong>{b.title}</strong>
                  <span>{b.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- formulário ---------- */}
        <form className={styles.form} style={{ '--i': 2 }} onSubmit={handleSubmit}>
          <h3 className={styles.formTitle}>Contate-nos</h3>

          <label className={styles.field}>
            <span>Nome</span>
            <input name="name" type="text" placeholder="Seu nome" required />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>E-mail</span>
              <input name="email" type="email" placeholder="seu@email.com" required />
            </label>
            <label className={styles.field}>
              <span>Telefone</span>
              <input name="phone" type="tel" placeholder="(00) 00000-0000" />
            </label>
          </div>

          <label className={styles.field}>
            <span>Mensagem</span>
            <textarea name="message" rows="4" placeholder="Está interessado em adquirir nossa bolsa?" required />
          </label>

          <div className={styles.actions}>
            <Button type="submit" variant="link" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando...' : 'Enviar'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 4l18 8-18 8 3-8-3-8z" />
                <path d="M6 12h9" />
              </svg>
            </Button>
            <p className={`${styles.feedback} ${styles[status]}`} role="status" aria-live="polite">
              {status === 'success' && 'Obrigada! Este formulário é apenas ilustrativo, nenhuma mensagem foi enviada.'}
            </p>
          </div>
        </form>
      </div>

      {/* ---------- rodapé ---------- */}
      <footer className={styles.footer}>
        <strong>Maya Store</strong>
        <span>Projeto fictício de portfólio — não afiliado à Disney/Lucasfilm.</span>
      </footer>
    </SectionLayout>
  );
}
