import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ExamplePage from './kit/ExamplePage';

export default function DynamicLoadingPage() {
  return (
    <ExamplePage id="dynamic-loading" title="Dynamic Loading">
      <p className="text-sm text-neutral-300">
        These two examples demonstrate how to handle dynamic page content in your test automation.
      </p>
      <ul id="dynamic-loading-examples" className="list-disc space-y-2 pl-5 text-sm">
        <li>
          <Link
            id="dynamic-loading-example-1"
            to="/ui-elements/dynamic-loading/1"
            className="text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
          >
            Example 1
          </Link>{' '}
          &mdash; the element is rendered after a delay.
        </li>
        <li>
          <Link
            id="dynamic-loading-example-2"
            to="/ui-elements/dynamic-loading/2"
            className="text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
          >
            Example 2
          </Link>{' '}
          &mdash; the element is rendered and then deleted from the DOM.
        </li>
      </ul>
    </ExamplePage>
  );
}

export function DynamicLoadingVariantPage() {
  const { variant = '1' } = useParams();
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);
  useEffect(() => setPhase('idle'), [variant]);

  const later = (delay: number, action: () => void) => {
    timers.current.push(window.setTimeout(action, delay));
  };

  const start = () => {
    setPhase('loading');
    later(2000, () => {
      setPhase('done');
      if (variant === '2') later(2000, () => setPhase('idle'));
    });
  };

  return (
    <ExamplePage id={`dynamic-loading-${variant}`} title={`Dynamic Loading ${variant}`}>
      <div id="timer-reference" className="hidden">{variant}</div>
      <button
        type="button"
        id="start"
        onClick={start}
        disabled={phase !== 'idle'}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Start Loading
      </button>
      {phase === 'loading' && (
        <div id="loading" className="flex items-center gap-3 text-sm text-neutral-400">
          <i className="fa-solid fa-circle-notch fa-spin text-emerald-400" aria-hidden="true" />
          Loading&hellip;
        </div>
      )}
      {phase === 'done' && (
        <p id="loading-status" className="text-2xl font-semibold">Hello World!</p>
      )}
      {variant === '2' && phase === 'idle' && (
        <p id="loading-removed" className="text-xs text-neutral-500">
          The rendered element has been deleted from the page.
        </p>
      )}
    </ExamplePage>
  );
}
