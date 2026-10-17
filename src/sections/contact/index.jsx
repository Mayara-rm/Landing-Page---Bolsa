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

// A chave fica em .env.local:  VITE_WEB3FORMS_KEY=sua-chave
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function Contact({ active }) {
  // 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // robô preencheu o campo escondido

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'Novo contato — Maya Store (Bolsa Star Wars)',
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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

          {/* campo escondido anti-spam */}
          <input type="checkbox" name="botcheck" className={styles.bot} tabIndex="-1" autoComplete="off" />

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
              {status === 'success' && 'Mensagem enviada! Em breve entramos em contato.'}
              {status === 'error' && 'Não foi possível enviar agora. Tente novamente.'}
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
