import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ExamplePage from './kit/ExamplePage';

const variants = [
  { key: 'elements', label: 'Elements' },
  { key: 'text', label: 'Text' },
  { key: 'headers', label: 'Headers' },
  { key: 'location', label: 'Location' },
];

export default function ShiftingContentPage() {
  return (
    <ExamplePage id="shifting-content" title="Shifting Content">
      <p className="text-sm text-neutral-300">
        These examples demonstrate how content on the page can shift around after it has loaded.
      </p>
      <ul id="shifting-content-examples" className="list-disc space-y-2 pl-5 text-sm">
        {variants.map((variant) => (
          <li key={variant.key}>
            <Link
              id={`shifting-content-${variant.key}`}
              to={`/ui-elements/shifting-content/${variant.key}`}
              className="text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
            >
              {variant.label}
            </Link>
          </li>
        ))}
      </ul>
    </ExamplePage>
  );
}

const shuffled = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const randomText = () => Math.random().toString(36).slice(2, 10);

export function ShiftingContentVariantPage() {
  const { variant = 'elements' } = useParams();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick(0);
    const interval = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, [variant]);

  return (
    <ExamplePage id={`shifting-content-${variant}`} title={`Shifting Content: ${variant}`}>
      {variant === 'elements' && <ShiftingElements tick={tick} />}
      {variant === 'text' && <ShiftingText tick={tick} />}
      {variant === 'headers' && <ShiftingHeaders tick={tick} />}
      {variant === 'location' && <ShiftingLocation tick={tick} />}
    </ExamplePage>
  );
}

const panels = ['Alpha', 'Bravo', 'Charlie'];

function ShiftingElements({ tick }: { tick: number }) {
  const order = tick === 0 ? panels : shuffled(panels);
  return (
    <div id="shift-section" className="flex flex-wrap gap-3">
      {order.map((panel) => (
        <div
          key={panel}
          id={`shift-panel-${panel.toLowerCase()}`}
          className="rounded-lg border border-neutral-800 bg-neutral-900 px-6 py-4 text-sm"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}

function ShiftingText({ tick }: { tick: number }) {
  const text = tick === 0
    ? 'This sentence will randomly change character by character.'
    : Array.from({ length: 12 + Math.floor(Math.random() * 20) }, () =>
        String.fromCharCode(97 + Math.floor(Math.random() * 26)),
      ).join('');
  return <p id="shifting-text" className="text-sm text-neutral-300">{text}</p>;
}

function ShiftingHeaders({ tick }: { tick: number }) {
  const level = 1 + (tick % 6);
  const Heading = `h${level}` as 'h1';
  return (
    <div id="shifting-header" className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <Heading className="font-bold">The headline keeps changing size</Heading>
      <p className="mt-2 text-xs text-neutral-500">Currently rendered as &lt;h{level}&gt;</p>
    </div>
  );
}

function ShiftingLocation({ tick }: { tick: number }) {
  const fragment = tick === 0 ? 'start' : randomText();
  useEffect(() => {
    window.history.replaceState(null, '', `#${fragment}`);
  }, [fragment]);
  return (
    <p id="shifting-location" className="text-sm text-neutral-300">
      Current URL fragment: <code className="text-emerald-400">{fragment}</code>
    </p>
  );
}
