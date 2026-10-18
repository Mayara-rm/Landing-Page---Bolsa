import styles from './button.module.css';

export default function Button({ variant = 'filled', type = 'button', disabled = false, onClick, href, children }) {
  const className = `${styles.button} ${styles[variant]}`;

  if (href) {
    return <a href={href} className={className} onClick={onClick}>{children}</a>;
  }
  return <button type={type} className={className} onClick={onClick} disabled={disabled}>{children}</button>;
}