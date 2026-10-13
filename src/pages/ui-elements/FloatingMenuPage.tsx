import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';

const menuItems = ['Elemental Selenium', 'News', 'Tutorials', 'Shop'];

export default function FloatingMenuPage() {
  const [visible, setVisible] = useState(true);

  return (
    <ExamplePage id="floating-menu" title="Floating Menu">
      <p className="text-sm text-neutral-300">
        A menu bar floats at the bottom of the viewport. Close it and it stays closed for the rest
        of this page visit, just like the reference example.
      </p>
      {!visible && (
        <button
          type="button"
          id="floating-menu-restore"
          onClick={() => setVisible(true)}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Show Floating Menu
        </button>
      )}
      {visible && (
        <nav
          id="floating-mnu"
          aria-label="Floating menu"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-700 bg-neutral-900/95 backdrop-blur"
        >
          <ul className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  id={`floating-menu-${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  href="#/ui-elements/floating-menu"
                  onClick={(event) => event.preventDefault()}
                  className="rounded-md px-3 py-2 text-sm text-neutral-300 transition-colors duration-200 ease-in-out hover:bg-neutral-800 hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="ml-auto">
              <button
                type="button"
                id="floating-menu-close"
                onClick={() => setVisible(false)}
                className="rounded-md px-3 py-2 text-sm text-neutral-400 transition-colors duration-200 ease-in-out hover:bg-neutral-800 hover:text-white"
              >
                Close <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </ExamplePage>
  );
}
