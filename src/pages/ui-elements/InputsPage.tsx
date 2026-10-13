import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function InputsPage() {
  const [value, setValue] = useState('');
  const [rejected, setRejected] = useState('');

  const blockNonNumeric = (event: KeyboardEvent<HTMLInputElement>) => {
    const allowed =
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === 'Tab' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'Home' ||
      event.key === 'End' ||
      /^[0-9]$/.test(event.key);
    if (!allowed) {
      event.preventDefault();
      setRejected(event.key);
    } else {
      setRejected('');
    }
  };

  return (
    <ExamplePage id="inputs" title="Inputs">
      <p className="text-sm text-neutral-300">
        This input only accepts numbers — non-numeric keystrokes are swallowed by the page.
      </p>
      <label htmlFor="numeric-input" className="block text-sm text-neutral-300">Numeric input</label>
      <input
        id="numeric-input"
        type="number"
        inputMode="numeric"
        value={value}
        onKeyDown={blockNonNumeric}
        onChange={(event) => setValue(event.target.value)}
        className="w-48 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
      />
      <p id="input-value" className="text-sm text-neutral-400">
        Value: {value === '' ? 'empty' : value}
      </p>
      {rejected && (
        <p id="input-rejected" className="text-xs text-amber-400">
          Key "{rejected}" was blocked.
        </p>
      )}
    </ExamplePage>
  );
}
