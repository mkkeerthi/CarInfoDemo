import { useEffect, useMemo, useState } from 'react';
import ExamplePage from './kit/ExamplePage';

const pixel =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24" rx="4" fill="#059669"/></svg>`,
  );

function SlowImage({ index, delay, onLoaded }: { index: number; delay: number; onLoaded: () => void }) {
  const [src, setSrc] = useState('');
  useEffect(() => {
    const timer = window.setTimeout(() => setSrc(pixel), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);
  return (
    <img
      id={`slow-image-${index}`}
      src={src === '' ? undefined : src}
      alt=""
      width={24}
      height={24}
      onLoad={onLoaded}
      className="h-6 w-6 rounded"
    />
  );
}

export default function SlowResourcesPage() {
  const [choice, setChoice] = useState('10');
  const [pending, setPending] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(0);

  const delays = useMemo(
    () => Array.from({ length: pending ?? 0 }, () => 200 + Math.floor(Math.random() * 3000)),
    [pending],
  );

  const load = () => {
    setLoaded(0);
    setPending(Number(choice));
  };

  const done = pending !== null && loaded >= pending;

  return (
    <ExamplePage id="slow-resources" title="Slow Resources">
      <p className="text-sm text-neutral-300">
        Images are attached to the document on staggered delays so the page sits in a
        &quot;still loading&quot; state for a while — useful for testing waits that are not tied to
        network idle.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="images-select" className="text-sm text-neutral-300">How many images would you like to load?</label>
        <select
          id="images-select"
          value={choice}
          onChange={(event) => setChoice(event.target.value)}
          className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
        >
          {['10', '100', '150', '500'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button
          type="button"
          id="images-submit"
          onClick={load}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Submit
        </button>
      </div>
      <p id="status" className="text-sm font-medium">
        {pending === null ? 'Nothing loaded yet' : done ? 'Done!' : 'Loading\u2026'}
      </p>
      {pending !== null && (
        <div id="slow-images" className="flex flex-wrap gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          {delays.map((delay, index) => (
            <SlowImage
              key={index}
              index={index}
              delay={delay}
              onLoaded={() => setLoaded((value) => value + 1)}
            />
          ))}
        </div>
      )}
    </ExamplePage>
  );
}
