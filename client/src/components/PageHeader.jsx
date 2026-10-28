// Shared heading block for the inner pages: eyebrow, title, optional intro.
export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <header className="page-header flow">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="page-header__title">{title}</h1>
      {intro ? <p className="page-header__intro">{intro}</p> : null}
      {children}
    </header>
  );
}