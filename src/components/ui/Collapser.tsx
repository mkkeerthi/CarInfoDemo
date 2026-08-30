import { useState } from 'react';
import type { ReactNode } from 'react';

interface CollapserProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function Collapser({ id, title, children }: CollapserProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div id={id} className="rounded-lg border border-neutral-800 bg-neutral-900">
      <button
        type="button"
        id={`${id}-toggle`}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors duration-200 ease-in-out hover:bg-neutral-800"
      >
        <span>{title}</span>
        <i
          className={`fa-solid fa-chevron-down text-neutral-400 transition-transform duration-200 ease-in-out ${collapsed ? '' : 'rotate-180'}`}
          aria-hidden="true"
        />
      </button>
      {!collapsed && (
        <div id={`${id}-content`} className="border-t border-neutral-800 px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
}
