import ExamplePage from './kit/ExamplePage';

export default function DropdownPage() {
  return (
    <ExamplePage id="dropdown" title="Dropdown">
      <p className="text-sm text-neutral-300">
        Hover (or focus) the menu below to reveal its options.
      </p>
      <div id="dropdown-example" className="group relative inline-block">
        <button
          type="button"
          id="dropdown-toggle"
          aria-haspopup="true"
          className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-neutral-200 outline-none transition-colors duration-200 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700"
        >
          Elemental Selenium <i className="fa-solid fa-caret-down ml-1" aria-hidden="true" />
        </button>
        <ul
          id="dropdown-menu"
          role="menu"
          className="invisible absolute left-0 top-full z-10 mt-1 w-56 rounded-md border border-neutral-700 bg-neutral-800 py-1 opacity-0 shadow-xl transition-all duration-200 ease-in-out group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
        >
          {[
            { id: 'dropdown-elemental-selenium', label: 'Elemental Selenium' },
            { id: 'dropdown-about', label: 'About' },
            { id: 'dropdown-contact', label: 'Contact' },
          ].map((item) => (
            <li key={item.id} role="none">
              <a
                id={item.id}
                role="menuitem"
                href="#/ui-elements/dropdown"
                onClick={(event) => event.preventDefault()}
                className="block px-4 py-2 text-sm text-neutral-200 transition-colors duration-200 ease-in-out hover:bg-neutral-700 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ExamplePage>
  );
}
