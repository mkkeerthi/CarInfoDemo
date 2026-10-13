import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';

interface Row {
  lastName: string;
  firstName: string;
  email: string;
  link: string;
}

const rows: Row[] = [
  { lastName: 'Bach', firstName: 'Carla', email: 'carla@carla.test', link: 'http://carla.test/' },
  { lastName: 'Vinson', firstName: 'Gregory', email: 'gregory@vinson.test', link: 'http://vinson.test/' },
  { lastName: 'Bradshaw', firstName: 'Bianca', email: 'bianca@bradshaw.test', link: 'http://bradshaw.test/' },
  { lastName: 'Kirby', firstName: 'Shania', email: 'shania@kirby.test', link: 'http://kirby.test/' },
  { lastName: 'Meyers', firstName: 'Cedric', email: 'cedric@meyers.test', link: 'http://meyers.test/' },
];

const columns: { key: keyof Row; label: string }[] = [
  { key: 'lastName', label: 'Last Name' },
  { key: 'firstName', label: 'First Name' },
  { key: 'email', label: 'Email' },
  { key: 'link', label: 'Link' },
];

export default function SortableDataTablesPage() {
  const [sorted, setSorted] = useState<Row[]>(rows);
  const [sortKey, setSortKey] = useState<keyof Row | null>(null);
  const [ascending, setAscending] = useState(true);

  const sortBy = (key: keyof Row) => {
    const nextAscending = sortKey === key ? !ascending : true;
    setSortKey(key);
    setAscending(nextAscending);
    setSorted(
      [...rows].sort((a, b) =>
        nextAscending ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]),
      ),
    );
  };

  return (
    <ExamplePage id="sortable-data-tables" title="Sortable Data Tables">
      <p className="text-sm text-neutral-300">
        Click a column header to sort the table; click it again to reverse the order.
      </p>
      <div className="overflow-auto rounded-lg border border-neutral-800">
        <table id="table" className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={
                    sortKey === column.key ? (ascending ? 'ascending' : 'descending') : 'none'
                  }
                  className="px-3 py-2"
                >
                  <button
                    type="button"
                    id={`sort-${column.key}`}
                    onClick={() => sortBy(column.key)}
                    className="flex items-center gap-2 font-semibold transition-colors duration-200 ease-in-out hover:text-emerald-400"
                  >
                    {column.label}
                    <i
                      className={`fa-solid ${
                        sortKey === column.key
                          ? ascending ? 'fa-sort-up' : 'fa-sort-down'
                          : 'fa-sort'
                      } text-neutral-500`}
                      aria-hidden="true"
                    />
                  </button>
                </th>
              ))}
              <th scope="col" className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.email} id={`row-${row.email}`} className="border-t border-neutral-800 hover:bg-neutral-900">
                <td className="px-3 py-2">{row.lastName}</td>
                <td className="px-3 py-2">{row.firstName}</td>
                <td className="px-3 py-2">{row.email}</td>
                <td className="px-3 py-2">
                  <a
                    id={`link-${row.email}`}
                    href={row.link}
                    onClick={(event) => event.preventDefault()}
                    className="text-emerald-400 underline-offset-2 hover:text-emerald-300 hover:underline"
                  >
                    <i className="fa-solid fa-pencil" aria-hidden="true" />
                  </a>
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    id={`delete-${row.email}`}
                    className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 ease-in-out hover:bg-red-500"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-auto rounded-lg border border-neutral-800">
        <table id="table2" className="w-full text-left text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th colSpan={2} className="px-3 py-2">Other Example</th>
            </tr>
            <tr>
              <th scope="col" className="px-3 py-2">Column 1</th>
              <th scope="col" className="px-3 py-2">Column 2</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-neutral-800">
              <td id="due" className="px-3 py-2">Some text</td>
              <td id="fee" className="px-3 py-2">And some more</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ExamplePage>
  );
}
