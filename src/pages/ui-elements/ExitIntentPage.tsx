import { useEffect, useState } from 'react';
import ExamplePage from './kit/ExamplePage';
import Modal from './kit/Modal';

export default function ExitIntentPage() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onMouseOut = (event: MouseEvent) => {
      // The pointer leaving through the top edge of the viewport is the classic exit intent.
      if (event.clientY <= 0 && !shown) {
        setShown(true);
        setOpen(true);
      }
    };
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, [shown]);

  return (
    <ExamplePage id="exit-intent" title="Exit Intent">
      <p className="text-sm text-neutral-300">
        Move the mouse out of the browser viewport (over the top edge) and a dialog appears once
        per visit.
      </p>
      <button
        type="button"
        id="exit-intent-simulate"
        onClick={() => {
          setShown(true);
          setOpen(true);
        }}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
      >
        Simulate Leaving The Page
      </button>
      {shown && !open && (
        <p id="exit-intent-shown" className="text-xs text-neutral-500">
          The intent dialog has already fired for this visit.
        </p>
      )}
      {open && (
        <Modal id="exit-intent-modal" title="Wait!" onClose={() => setOpen(false)}>
          <p id="exit-intent-content" className="text-sm text-neutral-300">
            Before you go &mdash; this modal was raised by the exit-intent handler.
          </p>
        </Modal>
      )}
    </ExamplePage>
  );
}
