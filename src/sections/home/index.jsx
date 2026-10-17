// src/sections/home/index.jsx
import SectionLayout from '../../layout/sectionLayout';
import Button from '../../components/button/Button';
import heroImage from '../../assets/main-bag-home.png'; // troque pelo nome real da sua foto
import styles from './home.module.css';

export default function Home({ active, onNavigate }) {
  return (
    <SectionLayout id="home" label="Início" active={active}>
      <div className={`${styles.hero} ${active ? styles.active : ''}`}>
        <div className={styles.text}>
          <span className={styles.eyebrow} style={{ '--i': 0 }}>
            Coleção exclusiva Star Wars
          </span>

          <h1 className={styles.title} style={{ '--i': 1 }}>
            O lado galáctico
            <br />
            do seu dia a dia.
          </h1>

          <p className={styles.description} style={{ '--i': 2 }}>
            Bolsa transversal em couro sintético premium, com placa metálica
            Aliança Rebelde x Império Galáctico e charme removível do Grogu.
          </p>

          <div className={styles.actions} style={{ '--i': 3 }}>
            <Button variant="filled" onClick={() => onNavigate(4)}>
              Comprar agora
            </Button>
            <Button variant="link" onClick={() => onNavigate(3)}>
              Ver detalhes →
            </Button>
          </div>
        </div>

        <div className={styles.media}>
          <img src={heroImage} alt="Bolsa transversal preta com placa metálica e charme do Grogu" />
          <span className={styles.tag}>Edição limitada</span>
        </div>
      </div>
    </SectionLayout>
  );
}