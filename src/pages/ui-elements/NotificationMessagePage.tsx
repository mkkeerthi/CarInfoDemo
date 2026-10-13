import { useEffect, useRef, useState } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function NotificationMessagePage() {
  const [phase, setPhase] = useState<'idle' | 'loading' | 'notified'>('idle');
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  const start = () => {
    setPhase('loading');
    timer.current = window.setTimeout(() => {
      setPhase('notified');
      timer.current = window.setTimeout(() => setPhase('idle'), 5000);
    }, 1000);
  };

  return (
    <ExamplePage id="notification-message" title="Notification Message">
      <p className="text-sm text-neutral-300">
        Clicking the button raises a flash notification that dismisses itself after a few seconds.
      </p>
      <button
        type="button"
        id="notification-trigger"
        onClick={start}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
      >
        Click to see a notification message
      </button>
      {phase === 'loading' && (
        <div id="loading" className="flex items-center gap-3 text-sm text-neutral-400">
          <i className="fa-solid fa-circle-notch fa-spin text-emerald-400" aria-hidden="true" />
          Loading&hellip;
        </div>
      )}
      {phase === 'notified' && (
        <div id="flash" role="status" className="flex items-center justify-between gap-4 rounded-md border border-emerald-700 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-300">
          <span id="flash-message">Action successful</span>
          <button
            type="button"
            id="flash-close"
            aria-label="Dismiss notification"
            onClick={() => setPhase('idle')}
            className="text-emerald-400 transition-colors duration-200 ease-in-out hover:text-white"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
      )}
    </ExamplePage>
  );
}
