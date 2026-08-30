import type { ReactNode } from 'react';

interface TooltipProps {
  id: string;
  text: string;
  children: ReactNode;
}

export default function Tooltip({ id, text, children }: TooltipProps) {
  return (
    <span id={id} className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-xs -translate-x-1/2 rounded-md bg-neutral-800 px-3 py-1.5 text-xs text-neutral-100 opacity-0 shadow-lg transition-opacity duration-200 ease-in-out group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}
