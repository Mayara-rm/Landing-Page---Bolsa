import './sectionLayout.css';

export default function SectionLayout({ id, label, active, align = 'center', children }) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`screen screen--${align} ${active ? 'is-active' : ''}`}
    >
      <div className="screen__content">{children}</div>
    </section>
  );
}