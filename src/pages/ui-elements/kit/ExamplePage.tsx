import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ExamplePageProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function ExamplePage({ id, title, children }: ExamplePageProps) {
  return (
    <div className="space-y-4">
      <Link
        id="ui-example-back"
        to="/ui-elements"
        className="inline-flex items-center gap-2 text-sm text-emerald-400 transition-colors duration-200 ease-in-out hover:text-emerald-300"
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        UI Elements
      </Link>

      <section id={`ui-${id}-section`} className="space-y-3" aria-label={title}>
        <h1 id={`ui-${id}-title`} className="text-2xl font-bold">{title}</h1>
        {children}
      </section>
    </div>
  );
}
