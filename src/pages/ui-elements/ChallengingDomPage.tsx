import { useMemo } from 'react';
import ExamplePage from './kit/ExamplePage';

const columns = ['Iuvaret', 'Apeirian', 'Adipisci', 'Definiebas', 'Consequuntur', 'Phaedrum'];

const randomToken = () => Math.random().toString(36).slice(2, 8);

export default function ChallengingDomPage() {
  // Ids and classes are regenerated on every mount so a test cannot lean on them, which is the
  // whole point of this example on the reference site.
  const tokens = useMemo(
    () => ({
      header: randomToken(),
      list: randomToken(),
      canvas: randomToken(),
      table: randomToken(),
      rows: Array.from({ length: 10 }, randomToken),
    }),
    [],
  );

  return (
    <ExamplePage id="challenging-dom" title="Challenging DOM">
      <p className="text-sm text-neutral-300">
        The hardest part in automated web testing is finding the best locators (e.g., ones that are
        well named, unique, and unlikely to change). The markup below has unstable ids, a table with
        no helpful locators, and a canvas element.
      </p>

      <h3 id={tokens.header} className={`section-heading-${tokens.header} text-lg font-semibold`}>
        Challenging DOM
      </h3>

      <ul id={tokens.list} className="flex list-none gap-4 text-sm">
        <li className="nav-bar-item">bar</li>
        <li className="nav-bar-item">bar</li>
        <li className="nav-bar-item">foo</li>
      </ul>

      <canvas
        id={tokens.canvas}
        width={300}
        height={60}
        className="rounded-lg border border-neutral-800 bg-neutral-900"
        aria-label="Decorative canvas"
      />

      <div className="overflow-auto rounded-lg border border-neutral-800">
        <table id={tokens.table} className={`w-full min-w-[820px] text-left text-sm ${tokens.table}`}>
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              {columns.map((column) => (
                <th key={column} className="table-heading px-3 py-2">{column}</th>
              ))}
              <th className="table-action-heading px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, row) => (
              <tr key={row} id={tokens.rows[row]} className="border-t border-neutral-800 hover:bg-neutral-900">
                {columns.map((column) => (
                  <td key={column} className="table-cell px-3 py-2">
                    {column}
                    {row}
                  </td>
                ))}
                <td className="px-3 py-2">
                  <a
                    href="#/ui-elements/challenging-dom"
                    onClick={(event) => event.preventDefault()}
                    className={`action-${tokens.rows[row]} mr-3 text-emerald-400 hover:text-emerald-300`}
                  >
                    edit
                  </a>
                  <a
                    href="#/ui-elements/challenging-dom"
                    onClick={(event) => event.preventDefault()}
                    className={`delete ${tokens.rows[row]} text-red-400 hover:text-red-300`}
                  >
                    delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ExamplePage>
  );
}
