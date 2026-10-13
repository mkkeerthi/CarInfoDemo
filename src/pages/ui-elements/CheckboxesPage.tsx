import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function CheckboxesPage() {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);

  return (
    <ExamplePage id="checkboxes" title="Checkboxes">
      <div id="checkboxes-group" className="flex items-center gap-6">
        <label htmlFor="checkbox-1" className="flex items-center gap-2 text-sm">
          <input
            id="checkbox-1"
            type="checkbox"
            className="h-4 w-4 accent-emerald-500"
            checked={first}
            onChange={(event) => setFirst(event.target.checked)}
          />
          Checkbox 1
        </label>
        <label htmlFor="checkbox-2" className="flex items-center gap-2 text-sm">
          <input
            id="checkbox-2"
            type="checkbox"
            className="h-4 w-4 accent-emerald-500"
            checked={second}
            onChange={(event) => setSecond(event.target.checked)}
          />
          Checkbox 2
        </label>
      </div>
      <p id="checkbox-state" className="text-sm text-neutral-400">
        Checkbox 1 is {first ? 'checked' : 'unchecked'}, checkbox 2 is{' '}
        {second ? 'checked' : 'unchecked'}.
      </p>
    </ExamplePage>
  );
}
