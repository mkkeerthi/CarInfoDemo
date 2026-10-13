import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function JavaScriptAlertsPage() {
  const [result, setResult] = useState('You have done nothing.');

  const showAlert = () => {
    window.alert('You have been an author for 25 years!');
    setResult('You successfully clicked an alert');
  };

  const showConfirmation = () => {
    const accepted = window.confirm('You will be able to see the dialog again!');
    setResult(accepted ? 'You clicked: OK' : 'You clicked: Cancel');
  };

  const showPrompt = () => {
    const text = window.prompt('Hi, I am a JS Prompt', 'Call me mirror');
    setResult(text === null ? 'You cancelled the prompt' : `You entered: ${text}`);
  };

  const buttonClass =
    'rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500';

  return (
    <ExamplePage id="javascript-alerts" title="JavaScript Alerts">
      <p className="text-sm text-neutral-300">
        This example demonstrates how different kinds of JavaScript pop-ups can be triggered.
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" id="alert-button" onClick={showAlert} className={buttonClass}>
          Click for JS Alert
        </button>
        <button type="button" id="confirm-button" onClick={showConfirmation} className={buttonClass}>
          Click for JS Confirm
        </button>
        <button type="button" id="prompt-button" onClick={showPrompt} className={buttonClass}>
          Click for JS Prompt
        </button>
      </div>
      <p id="result" className="rounded-md border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-200">
        {result}
      </p>
    </ExamplePage>
  );
}
