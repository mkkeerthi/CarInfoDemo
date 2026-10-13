import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';
import Flash from './kit/Flash';

type Bucket = 'A' | 'B';

export default function AbTestingPage() {
  const [bucket, setBucket] = useState<Bucket>(() => {
    const stored = sessionStorage.getItem('ui-ab-bucket');
    if (stored === 'A' || stored === 'B') return stored;
    const forced = new URLSearchParams(window.location.search).get('bucket');
    const assigned: Bucket = forced === 'A' || forced === 'B'
      ? forced
      : Math.random() < 0.5 ? 'A' : 'B';
    sessionStorage.setItem('ui-ab-bucket', assigned);
    return assigned;
  });

  const reassign = () => {
    const next: Bucket = Math.random() < 0.5 ? 'A' : 'B';
    sessionStorage.setItem('ui-ab-bucket', next);
    setBucket(next);
  };

  return (
    <ExamplePage id="ab-testing" title="A/B Testing">
      <Flash message="Welcome to the A/B Testing Example." />
      <p id="ab-bucket" className="text-sm text-neutral-300">
        Your bucket id is <span className="font-semibold text-emerald-400">{bucket}</span>. The
        bucket is chosen at random the first time the example loads and then stays with you for the
        rest of the browser session, just as a cookie would on the reference site.
      </p>
      <button
        type="button"
        id="ab-reassign"
        onClick={reassign}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
      >
        Reassign Bucket
      </button>
    </ExamplePage>
  );
}
