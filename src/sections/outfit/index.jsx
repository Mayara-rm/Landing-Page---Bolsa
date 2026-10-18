import SectionLayout from '../../layout/sectionLayout';
import modelo from '../../assets/model-outfit.png';
import detalhe from '../../assets/model-detail-outfit.png';
import styles from './outfit.module.css';

export default function Outfit({ active }) {
  return (
    <SectionLayout id="lifestyle" label="Outfit" active={active}>
      <div className={`${styles.outfit} ${active ? styles.active : ''}`}>
        <figure className={styles.main} style={{ '--i': 0 }}>
          <img
            src={modelo}
            alt="Modelo usando a bolsa transversal preta atravessada no corpo, com jaqueta escura"
          />
        </figure>

        <div className={styles.side}>
          <div className={styles.text}>
            <span className={styles.eyebrow} style={{ '--i': 1 }}>
              Feito pra ser usado
            </span>

            <h2 className={styles.title} style={{ '--i': 2 }}>
              Leve o seu lado
              <br />
              galáctico sempre
              <br />
              com você
            </h2>

            <p className={styles.description} style={{ '--i': 3 }}>
              Alça larga ajustável com faixa em referência à Aliança Rebelde,
              fecho em metal escovado e espaço interno pensado pro dia a dia,
              não só pra exibir.
            </p>
          </div>

          <figure className={styles.detail} style={{ '--i': 4 }}>
            <img
              src={detalhe}
              alt="Detalhe da mão segurando a alça listrada da bolsa"
            />
          </figure>
        </div>
      </div>
    </SectionLayout>
  );
}