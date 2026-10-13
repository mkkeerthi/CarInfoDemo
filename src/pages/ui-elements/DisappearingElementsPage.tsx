import { useMemo, useState } from 'react';
import ExamplePage from './kit/ExamplePage';

const pages = ['Home', 'About', 'Gallery', 'Contact', 'RSS'];

export default function DisappearingElementsPage() {
  const [seed, setSeed] = useState(0);

  // Two menu entries are removed from the DOM on every load, exactly like the reference example.
  const hidden = useMemo(() => {
    const shuffled = [...pages].sort(() => Math.random() - 0.5);
    return new Set(shuffled.slice(0, 2));
  }, [seed]);

  const visible = pages.filter((page) => !hidden.has(page));

  return (
    <ExamplePage id="disappearing-elements" title="Disappearing Elements">
      <p className="text-sm text-neutral-300">
        Two of the five menu items are randomly missing each time this page is rendered, so a test
        cannot assume the menu is complete.
      </p>
      <nav id="disappearing-nav" aria-label="Disappearing menu">
        <ul className="flex flex-wrap gap-4 border-b border-neutral-800 pb-2">
          {visible.map((page) => (
            <li key={page}>
              <a
                id={`disappearing-${page.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                href="#/ui-elements/disappearing-elements"
                onClick={(event) => event.preventDefault()}
                className="text-sm text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p id="disappearing-count" className="text-xs text-neutral-500">
        {visible.length} of {pages.length} menu items present.
      </p>
      <button
        type="button"
        id="disappearing-reload"
        onClick={() => setSeed((value) => value + 1)}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
      >
        Re-randomize Menu
      </button>
    </ExamplePage>
  );
}
