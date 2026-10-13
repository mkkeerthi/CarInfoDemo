import { useEffect, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function ContextMenuPage() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!menu) return;
    const dismiss = () => setMenu(null);
    document.addEventListener('click', dismiss);
    return () => document.removeEventListener('click', dismiss);
  }, [menu]);

  const openMenu = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const box = event.currentTarget.getBoundingClientRect();
    setMenu({ x: event.clientX - box.left, y: event.clientY - box.top });
  };

  return (
    <ExamplePage id="context-menu" title="Context Menu">
      <p className="text-sm text-neutral-300">
        Right-click the box below to open the custom context menu.
      </p>
      <div
        id="hot-spot"
        onContextMenu={openMenu}
        className="relative h-40 w-full select-none rounded-lg border border-neutral-800 bg-neutral-900 p-4"
      >
        <span className="text-sm text-neutral-500">Right-click me</span>
        {menu && (
          <ul
            id="context-menu"
            role="menu"
            style={{ left: menu.x, top: menu.y }}
            className="absolute min-w-40 rounded-md border border-neutral-700 bg-neutral-800 py-1 shadow-xl"
          >
            <li role="menuitem">
              <a
                id="context-menu-entry"
                href="#/ui-elements/context-menu"
                onClick={(event) => event.preventDefault()}
                className="block px-3 py-1.5 text-sm text-neutral-200 transition-colors duration-200 ease-in-out hover:bg-neutral-700"
              >
                The context menu
              </a>
            </li>
          </ul>
        )}
      </div>
    </ExamplePage>
  );
}
