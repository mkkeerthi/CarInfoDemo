import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function AddRemoveElementsPage() {
  const [elements, setElements] = useState<number[]>([]);

  const addElement = () => setElements((list) => [...list, Date.now() + Math.random()]);
  const removeElement = (key: number) =>
    setElements((list) => list.filter((item) => item !== key));

  return (
    <ExamplePage id="add-remove-elements" title="Add/Remove Elements">
      <p className="text-sm text-neutral-300">
        Clicking the button adds a Delete button to the page; each Delete button removes itself.
      </p>
      <button
        type="button"
        id="add-element"
        onClick={addElement}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
      >
        Add Element
      </button>
      <div id="deleted-elements" className="flex flex-wrap gap-2">
        {elements.map((key, index) => (
          <button
            key={key}
            type="button"
            id={`delete-element-${index}`}
            onClick={() => removeElement(key)}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-red-500"
          >
            Delete
          </button>
        ))}
      </div>
      <p id="deleted-elements-count" className="text-xs text-neutral-500">
        {elements.length} Delete button(s) on the page
      </p>
    </ExamplePage>
  );
}
