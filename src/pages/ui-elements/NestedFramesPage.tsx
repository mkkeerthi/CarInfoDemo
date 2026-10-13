import ExamplePage from './kit/ExamplePage';

export default function NestedFramesPage() {
  return (
    <ExamplePage id="nested-frames" title="Nested Frames">
      <p className="text-sm text-neutral-300">
        Three documents are laid out like the reference site&rsquo;s{' '}
        <code>&lt;frameset&gt;</code>:
        a header across the top, a narrow panel on the left and a body filling the rest.
      </p>
      <div id="frameset" className="flex h-80 flex-col overflow-hidden rounded-lg border border-neutral-800">
        <iframe
          id="header-frame"
          title="Header frame"
          src="/embed/header-frame"
          className="h-16 w-full border-b border-neutral-800 bg-neutral-900"
        />
        <div className="flex flex-1">
          <iframe
            id="left-frame"
            title="Left frame"
            src="/embed/left-frame"
            className="h-full w-40 border-r border-neutral-800 bg-neutral-900"
          />
          <iframe
            id="body-frame"
            title="Body frame"
            src="/embed/body-frame"
            className="h-full flex-1 bg-neutral-900"
          />
        </div>
      </div>
    </ExamplePage>
  );
}
