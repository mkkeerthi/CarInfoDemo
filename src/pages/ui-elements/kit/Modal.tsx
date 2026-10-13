import { useEffect } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
  closeLabel?: string;
}

export default function Modal({ id, title, children, onClose, closeLabel = 'Close' }: ModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const overlayKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onClose();
  };

  return (
    <div
      id={`${id}-overlay`}
      onKeyDown={overlayKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-md rounded-lg border border-neutral-700 bg-neutral-900 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <h2 id={`${id}-title`} className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            id={`${id}-close`}
            aria-label={closeLabel}
            onClick={onClose}
            className="rounded-md px-2 py-1 text-neutral-400 transition-colors duration-200 ease-in-out hover:bg-neutral-800 hover:text-white"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <div id={`${id}-content`} className="px-4 py-3">
          {children}
        </div>
      </div>
    </div>
  );
}
