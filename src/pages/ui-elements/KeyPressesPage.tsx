import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function KeyPressesPage() {
  const [entered, setEntered] = useState('');

  const capture = (event: KeyboardEvent<HTMLInputElement>) => {
    setEntered(event.key === ' ' ? 'Space' : event.key);
  };

  return (
    <ExamplePage id="key-presses" title="Key Presses">
      <p className="text-sm text-neutral-300">
        Type a key in the box below and the example reports which key the page received.
      </p>
      <label htmlFor="key-target" className="block text-sm text-neutral-300">Key catcher</label>
      <input
        id="key-target"
        type="text"
        autoComplete="off"
        onKeyDown={capture}
        className="w-48 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
      />
      <p id="key-result" className="text-sm text-neutral-200">
        {entered === '' ? 'Nothing pressed yet' : `You entered: ${entered}`}
      </p>
    </ExamplePage>
  );
}
