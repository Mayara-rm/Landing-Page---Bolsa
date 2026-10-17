import logo from '../../assets/logo.png';
import styles from './header.module.css';

// "index" é a posição da seção correspondente no array do App
const links = [
  { label: 'Home',    id: 'home',      index: 0 },
  { label: 'Galeria', id: 'galeria',   index: 1 },
  { label: 'Outfit',  id: 'lifestyle', index: 2 },
  { label: 'Detalhe', id: 'detalhes',  index: 3 },
  { label: 'Contato', id: 'contato',   index: 4 },
];

export default function Header({ activeIndex, onNavigate }) {
  // Destaques (índice 3) não tem item no menu, então o último link
  // cujo index já foi alcançado fica marcado como ativo
  const activeLink = [...links].reverse().find((l) => l.index <= activeIndex);

  return (
    <header className={styles.header}>
      <a
        href="#home"
        className={styles.logo}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(0);
        }}
      >
        <img src={logo} alt="Maya Store" />
      </a>

      <nav aria-label="Principal">
        <ul className={styles.list}>
          {links.map((link) => {
            const isActive = link === activeLink;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.index);
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}