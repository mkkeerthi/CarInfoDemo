import { useState } from 'react';
import type { ReactNode } from 'react';

interface ExpanderProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function Expander({ id, title, children }: ExpanderProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div id={id} className="rounded-lg border border-neutral-800 bg-neutral-900">
      <button
        type="button"
        id={`${id}-toggle`}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors duration-200 ease-in-out hover:bg-neutral-800"
      >
        <span>{title}</span>
        <i
          className={`fa-solid fa-chevron-down text-neutral-400 transition-transform duration-200 ease-in-out ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {expanded && (
        <div id={`${id}-content`} className="border-t border-neutral-800 px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
}
