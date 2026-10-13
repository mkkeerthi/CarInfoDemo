import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';

const buttonClass =
  'rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500';

export default function DynamicControlsPage() {
  const [checkboxVisible, setCheckboxVisible] = useState(true);
  const [checkboxBusy, setCheckboxBusy] = useState(false);
  const [checkboxMessage, setCheckboxMessage] = useState('');

  const [inputEnabled, setInputEnabled] = useState(false);
  const [inputBusy, setInputBusy] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const toggleCheckbox = () => {
    const next = !checkboxVisible;
    setCheckboxBusy(true);
    window.setTimeout(() => {
      setCheckboxBusy(false);
      setCheckboxVisible(next);
      setCheckboxMessage(next ? "It's back!" : "It's gone!");
    }, 1000);
  };

  const toggleInput = () => {
    const next = !inputEnabled;
    setInputBusy(true);
    window.setTimeout(() => {
      setInputBusy(false);
      setInputEnabled(next);
      setInputMessage(next ? "It's enabled!" : "It's disabled!");
    }, 2000);
  };

  const spinner = (
    <span id="loading" className="text-sm text-neutral-400">
      <i className="fa-solid fa-circle-notch fa-spin mr-2 text-emerald-400" aria-hidden="true" />
      Loading&hellip;
    </span>
  );

  return (
    <ExamplePage id="dynamic-controls" title="Dynamic Controls">
      <p className="text-sm text-neutral-300">
        This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed
        asynchronously.
      </p>

      <div id="remove-add-control-example" className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <h2 className="mb-3 text-lg font-semibold">Remove/Add</h2>
        <div className="flex items-center gap-4">
          {checkboxVisible && (
            <label htmlFor="controls-checkbox" className="flex items-center gap-2 text-sm">
              <input id="controls-checkbox" type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-500" />
              A checkbox
            </label>
          )}
          {checkboxBusy ? spinner : (
            <button type="button" id="remove-add-control" onClick={toggleCheckbox} className={buttonClass}>
              {checkboxVisible ? 'Remove' : 'Add'}
            </button>
          )}
        </div>
        <p id="remove-add-message" className="mt-2 text-sm text-emerald-400">{checkboxMessage}</p>
      </div>

      <div id="enable-disable-control-example" className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <h2 className="mb-3 text-lg font-semibold">Enable/Disable</h2>
        <div className="flex flex-wrap items-center gap-4">
          <input
            id="controls-input"
            type="text"
            value={inputEnabled ? 'Enabled input' : ''}
            readOnly
            disabled={!inputEnabled}
            aria-label="An input field"
            className="w-48 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500 disabled:opacity-50"
          />
          {inputBusy ? spinner : (
            <button type="button" id="enable-disable-control" onClick={toggleInput} className={buttonClass}>
              {inputEnabled ? 'Disable' : 'Enable'}
            </button>
          )}
        </div>
        <p id="enable-disable-message" className="mt-2 text-sm text-emerald-400">{inputMessage}</p>
      </div>
    </ExamplePage>
  );
}
