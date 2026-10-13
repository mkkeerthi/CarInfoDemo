import { useEffect, useRef, useState } from 'react';
import ExamplePage from './kit/ExamplePage';

const PAGE_SIZE = 12;
const MAX_ITEMS = 120;

export default function InfiniteScrollPage() {
  const [count, setCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      setCount((current) => Math.min(current + PAGE_SIZE, MAX_ITEMS));
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const items = Array.from({ length: count }, (_, i) => i + 1);
  const complete = count >= MAX_ITEMS;

  return (
    <ExamplePage id="infinite-scroll" title="Infinite Scroll">
      <p className="text-sm text-neutral-300">
        New content loads as you scroll to the bottom of the page, so the document keeps growing.
      </p>
      <div id="content" className="space-y-3">
        {items.map((item) => (
          <div
            key={item}
            id={`infinity-item-${item}`}
            className="flex h-32 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-sm text-neutral-300"
          >
            Item {item}
          </div>
        ))}
      </div>
      <div ref={sentinelRef} id="infinity-sentinel" className="h-4" aria-hidden="true">
        {complete && (
          <p id="infinity-complete" className="text-xs text-neutral-500">
            No more content to load.
          </p>
        )}
      </div>
      <p id="infinity-count" className="text-xs text-neutral-500">{count} items loaded</p>
    </ExamplePage>
  );
}
