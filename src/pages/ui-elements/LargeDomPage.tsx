import { useMemo } from 'react';
import ExamplePage from './kit/ExamplePage';

const SIZE = 50;

export default function LargeDomPage() {
  // Both trees are built once: they are big (2 500 table cells, 50 nested levels) and must not be
  // rebuilt when this page re-renders.
  const nested = useMemo(() => {
    let node = <p id="deep-leaf">End of the chain</p>;
    for (let level = SIZE; level >= 1; level -= 1) {
      node = (
        <div key={level} id={`nest-${level}`} data-level={level}>
          <span id={`no-siblings-${level}`}>{level}.1</span>
          <span className="sibling">{level}.2</span>
          <span className="sibling">{level}.3</span>
          {node}
        </div>
      );
    }
    return node;
  }, []);

  const table = useMemo(() => {
    const indexes = Array.from({ length: SIZE }, (_, i) => i + 1);
    return (
      <table id="large-table" className="w-full min-w-[900px] border-collapse text-left text-xs">
        <thead className="bg-neutral-900 text-neutral-300">
          <tr>
            <th className="border border-neutral-800 px-2 py-1">&nbsp;</th>
            {indexes.map((column) => (
              <th key={column} className="border border-neutral-800 px-2 py-1">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {indexes.map((row) => (
            <tr key={row}>
              <th className="border border-neutral-800 bg-neutral-900 px-2 py-1 font-medium">{row}</th>
              {indexes.map((column) => (
                <td key={column} id={`cell-${row}-${column}`} className="border border-neutral-800 px-2 py-1">
                  {row}.{column}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, []);

  return (
    <ExamplePage id="large-dom" title="Large & Deep DOM">
      <p className="text-sm text-neutral-300">
        Some pages have very large and deeply nested page layouts, which can trigger odd rendering
        issues and test performance bottlenecks (depending on your locator strategy). The tree below
        is nested {SIZE} levels deep and the table holds {SIZE * SIZE} cells.
      </p>
      <div id="nested-dom" className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        {nested}
      </div>
      <div className="overflow-auto rounded-lg border border-neutral-800">{table}</div>
    </ExamplePage>
  );
}
