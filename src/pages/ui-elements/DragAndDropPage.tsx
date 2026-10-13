import { useState } from 'react';
import type { DragEvent } from 'react';
import ExamplePage from './kit/ExamplePage';

type Column = 'a' | 'b';

const titles: Record<Column, string> = { a: 'Cucumber', b: 'Tomato' };

export default function DragAndDropPage() {
  // Which draggable item currently sits in which column.
  const [columns, setColumns] = useState<Record<Column, Column>>({ a: 'a', b: 'b' });
  const [dragging, setDragging] = useState<Column | null>(null);

  const dropOn = (target: Column) => {
    if (dragging !== null && columns[target] !== dragging) {
      setColumns({ a: columns.b, b: columns.a });
    }
    setDragging(null);
  };

  const prevent = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  const panelClass = (target: Column) =>
    `flex min-h-40 flex-1 flex-col items-center justify-center rounded-lg border-2 p-6 text-center transition-colors duration-200 ease-in-out ${
      dragging !== null && columns[target] !== dragging
        ? 'border-emerald-500 bg-emerald-500/10'
        : 'border-neutral-800 bg-neutral-900'
    }`;

  return (
    <ExamplePage id="drag-and-drop" title="Drag and Drop">
      <p className="text-sm text-neutral-300">
        Drag one column&rsquo;s item onto the other column to swap their contents.
      </p>
      <div id="content" className="flex flex-col gap-4 sm:flex-row">
        {(['a', 'b'] as Column[]).map((target) => (
          <div
            key={target}
            id={`column-${target}`}
            onDragOver={prevent}
            onDrop={() => dropOn(target)}
            className={panelClass(target)}
          >
            <h3
              id={`column-${target}-header`}
              className="mb-3 text-lg font-semibold text-neutral-200"
            >
              Column {target.toUpperCase()}
            </h3>
            <div
              id={`drag-item-${columns[target]}`}
              draggable
              onDragStart={() => setDragging(columns[target])}
              onDragEnd={() => setDragging(null)}
              className="flex h-24 w-24 cursor-grab items-center justify-center rounded-lg bg-neutral-800 text-sm text-neutral-300 active:cursor-grabbing"
            >
              {titles[columns[target]]}
            </div>
          </div>
        ))}
      </div>
      <p id="drag-and-drop-state" className="text-xs text-neutral-500">
        Column A holds {titles[columns.a]}, Column B holds {titles[columns.b]}
      </p>
    </ExamplePage>
  );
}
