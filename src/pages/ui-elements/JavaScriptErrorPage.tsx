import { useEffect, useState } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function JavaScriptErrorPage() {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFired(true);
      // Mirrors the reference site's onload="alertEvent()" markup: the handler runs a global that
      // nothing ever defines, so the browser logs an uncaught error against this page.
      throw new ReferenceError('alertEvent is not defined');
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ExamplePage id="javascript-error" title="JavaScript onload event error">
      <p className="text-sm text-neutral-300">
        This page raises an uncaught JavaScript error while it loads. The error is only visible in
        the browser console (or to a listener such as <code>window.onerror</code>), never in the
        rendered page &mdash; which is exactly why it is a useful fixture.
      </p>
      <p id="javascript-error-state" className="text-xs text-neutral-500">
        {fired ? 'The onload error has been raised.' : 'Waiting for the load-time error.'}
      </p>
    </ExamplePage>
  );
}
