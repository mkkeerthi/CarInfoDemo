import { useEffect, useState } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function DynamicContentPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ExamplePage id="dynamic-content" title="Dynamic Content">
      <p className="text-sm text-neutral-300">
        Content is injected into the page a moment after it loads, so a test has to wait for it.
      </p>
      {!loaded ? (
        <div id="loading" className="flex items-center gap-3 text-sm text-neutral-400">
          <i className="fa-solid fa-circle-notch fa-spin text-emerald-400" aria-hidden="true" />
          Loading&hellip;
        </div>
      ) : (
        <div id="content" className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-200">
            Additional dynamic content has been successfuly added. Look for other{' '}
            <code className="text-emerald-400">&lt;div&gt;</code> elements with an{' '}
            <code className="text-emerald-400">ID</code> of{' '}
            <code className="text-emerald-400">content</code>.
          </p>
        </div>
      )}
    </ExamplePage>
  );
}
