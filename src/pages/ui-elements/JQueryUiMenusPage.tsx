import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import ExamplePage from './kit/ExamplePage';

interface MenuEntry {
  label: string;
  icon: string;
  children?: string[];
}

const menu: MenuEntry[] = [
  { label: 'About', icon: 'fa-circle-info', children: ['About this site', 'All Email', 'About The Log', 'Icons'] },
  { label: 'Equipment', icon: 'fa-desktop', children: ['Curved Screen', 'Flat Screen', 'Projector'] },
  { label: 'Download', icon: 'fa-download' },
  { label: 'Help', icon: 'fa-question', children: ['FAQ', 'Contact Support'] },
];

export default function JQueryUiMenusPage() {
  const [active, setActive] = useState(0);
  const [openSub, setOpenSub] = useState<number | null>(null);
  const [lastPicked, setLastPicked] = useState('');
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusItem = (index: number) => {
    const clamped = (index + menu.length) % menu.length;
    setActive(clamped);
    itemRefs.current[clamped]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusItem(active + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusItem(active - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        focusItem(menu.length - 1);
        break;
      case 'ArrowRight':
        if (menu[active].children) {
          event.preventDefault();
          setOpenSub(active);
        }
        break;
      case 'ArrowLeft':
      case 'Escape':
        setOpenSub(null);
        break;
      default:
        break;
    }
  };

  return (
    <ExamplePage id="jquery-ui-menus" title="JQuery UI Menus">
      <p className="text-sm text-neutral-300">
        The reference example uses the jQuery UI menu widget. This build reproduces it with plain
        React so the same keyboard interactions (arrows, Home/End, Enter, Esc) can be tested without
        a jQuery dependency.
      </p>
      <div className="flex items-start gap-4">
        <ul
          id="jqueryui-menu"
          role="menu"
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className="w-52 rounded-lg border border-neutral-700 bg-neutral-900 py-1"
        >
          {menu.map((entry, index) => (
            <li key={entry.label} role="none">
              <button
                type="button"
                role="menuitem"
                id={`jqueryui-menu-${entry.label.toLowerCase()}`}
                ref={(node) => { itemRefs.current[index] = node; }}
                tabIndex={active === index ? 0 : -1}
                aria-haspopup={entry.children ? true : undefined}
                aria-expanded={entry.children ? openSub === index : undefined}
                onFocus={() => setActive(index)}
                onMouseEnter={() => setOpenSub(entry.children ? index : null)}
                onClick={() => setOpenSub(openSub === index ? null : (entry.children ? index : null))}
                className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-neutral-200 outline-none transition-colors duration-200 ease-in-out hover:bg-neutral-800 focus:bg-neutral-800"
              >
                <i className={`fa-solid ${entry.icon} w-4 text-emerald-400`} aria-hidden="true" />
                <span className="flex-1">{entry.label}</span>
                {entry.children && (
                  <i className="fa-solid fa-caret-right text-neutral-500" aria-hidden="true" />
                )}
              </button>
              {entry.children && openSub === index && (
                <ul
                  id={`jqueryui-submenu-${entry.label.toLowerCase()}`}
                  role="menu"
                  aria-label={`${entry.label} submenu`}
                  className="ml-6 border-l border-neutral-800 py-1"
                >
                  {entry.children.map((child) => (
                    <li key={child} role="none">
                      <button
                        type="button"
                        role="menuitem"
                        id={`jqueryui-item-${child.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        onClick={() => {
                          setLastPicked(child);
                          setOpenSub(null);
                        }}
                        className="block w-full px-3 py-1.5 text-left text-sm text-neutral-300 transition-colors duration-200 ease-in-out hover:bg-neutral-800 hover:text-white"
                      >
                        {child}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p id="jqueryui-selection" className="text-sm text-neutral-400">
        {lastPicked === '' ? 'No menu item chosen yet' : `You selected: ${lastPicked}`}
      </p>
    </ExamplePage>
  );
}
