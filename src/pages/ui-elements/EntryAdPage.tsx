import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';
import Modal from './kit/Modal';

export default function EntryAdPage() {
  const [open, setOpen] = useState(true);

  return (
    <ExamplePage id="entry-ad" title="Entry Ad">
      <p className="text-sm text-neutral-300">
        A modal dialog pops up as soon as this page is shown &mdash; a test has to dismiss it before
        interacting with anything else.
      </p>
      {!open && (
        <button
          type="button"
          id="entry-ad-reopen"
          onClick={() => setOpen(true)}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Show Me Again
        </button>
      )}
      {open && (
        <Modal id="entry-ad-modal" title="Fancybox" onClose={() => setOpen(false)}>
          <p id="entry-ad-content" className="text-sm text-neutral-300">
            This is a modal dialog with some content. You can close it with the button in the
            corner or by pressing Escape.
          </p>
          <button
            type="button"
            id="entry-ad-dismiss"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
          >
            Close me!
          </button>
        </Modal>
      )}
    </ExamplePage>
  );
}
