import { Link, useParams } from 'react-router-dom';
import ExamplePage from './kit/ExamplePage';

export default function MultipleWindowsPage() {
  return (
    <ExamplePage id="multiple-windows" title="Multiple Windows">
      <p className="text-sm text-neutral-300">
        The first link opens a new browser window; the second stays in this tab. A test has to
        switch window handles to assert on either one.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          id="open-new-window"
          href="/ui-elements/multiple-windows/1"
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Click Here
        </a>
        <Link
          id="jump"
          to="/ui-elements/multiple-windows/2"
          className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition-colors duration-200 ease-in-out hover:bg-neutral-800"
        >
          jump
        </Link>
      </div>
      <div id="windows" className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <p id="window-content" className="text-sm text-neutral-300">Some content in this window.</p>
      </div>
    </ExamplePage>
  );
}

export function WindowPage() {
  const { id = '1' } = useParams();

  return (
    <ExamplePage id={`window-${id}`} title={`Window ${id}`}>
      <h2 id="window-title" className="text-xl font-semibold">Your title here</h2>
      <p id="window-body" className="text-sm text-neutral-300">
        This is window {id}. Use the browser back control to return to Multiple Windows.
      </p>
      <Link
        id={`window-${id}-back`}
        to="/ui-elements/multiple-windows"
        className="text-sm text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
      >
        Go back
      </Link>
    </ExamplePage>
  );
}
