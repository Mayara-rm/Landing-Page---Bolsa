import styles from './detailsCarousel.module.css';
import placa from '../../assets/detail-bag.png';
import charme from '../../assets/detail-grogu-bag.png';
import forro from '../../assets/detail-lining-bag.png';


const items = [
  { number: '01', title: 'Placa metálica exclusiva',
    text: 'Acabamento em metal escovado com os símbolos oficiais da Aliança Rebelde e do Império Galáctico, gravados em baixo-relevo.',
    image: placa, alt: 'Placa metálica na aba da bolsa', accent: 'var(--accent-blue, #4f8fe8)', reverse: false },
  { number: '02', title: 'Acompanha um charme exclusivo',
    text: 'O Grogu vem como pingente removível, em veludo bordado — pra personalizar ou guardar como peça de coleção.',
    image: charme, alt: 'Pingente removível em veludo bordado', accent: 'var(--accent-red, #e7423c)', reverse: true },
  { number: '03', title: 'Forro temático assinado',
    text: 'Por dentro, um padrão exclusivo com ícones do universo Star Wars — um detalhe só seu.',
    image: forro, alt: 'Forro interno com padrão temático', accent: 'var(--accent-blue, #4f8fe8)', reverse: false },
];

const posClass = ['current', 'next', 'prev'];

export default function DetailsCarousel({ current, onSelect }) {
  return (
    <div className={styles.stage}>
      {items.map((item, i) => {
        const pos = (i - current + items.length) % items.length;
        return (
          <article
            key={item.number}
            className={`${styles.card} ${styles[posClass[pos]]} ${item.reverse ? styles.reverse : ''}`}
            style={{ '--accent': item.accent }}
            aria-hidden={pos !== 0}
            onClick={() => onSelect(i)}
          >
            <img className={styles.image} src={item.image} alt={item.alt} />
            <div className={styles.content}>
              <span className={styles.number}>{item.number}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}