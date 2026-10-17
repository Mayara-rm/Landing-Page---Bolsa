// src/sections/gallery/index.jsx
import SectionLayout from '../../layout/sectionLayout';
import frente from '../../assets/front-bag-gallery.png';
import lateral from '../../assets/behind-bag-gallery.png';
import aberta from '../../assets/inside-bag-gallery.png';
import styles from './gallery.module.css';

// Para adicionar ou trocar uma foto, é só mexer nesta lista.
const photos = [
  { src: frente,  label: 'Frente',  alt: 'Bolsa vista de frente, com a placa metálica no centro', accent: 'var(--accent-blue, #4f8fe8)' },
  { src: lateral, label: 'Lateral', alt: 'Bolsa vista de lado, mostrando a alça e o charme do Grogu', accent: 'var(--accent-red, #e7423c)' },
  { src: aberta,  label: 'Aberta',  alt: 'Interior da bolsa com o forro temático', accent: 'var(--accent-blue, #4f8fe8)' },
];

export default function Gallery({ active }) {
  return (
    <SectionLayout id="galeria" label="Galeria do produto" active={active}>
      <div className={`${styles.gallery} ${active ? styles.active : ''}`}>
        <header className={styles.header}>
          <span className={styles.eyebrow} style={{ '--i': 0 }}>Cada ângulo</span>
          <h2 className={styles.title} style={{ '--i': 1 }}>
            Detalhes que você vai querer ver de perto
          </h2>
        </header>

        <ul className={styles.grid}>
          {photos.map((photo, i) => (
            <li
              key={photo.label}
              className={styles.item}
            
            >
              <figure className={styles.card}>
                <img src={photo.src} alt={photo.alt} />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </SectionLayout>
  );
}