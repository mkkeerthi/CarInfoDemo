import ExamplePage from './kit/ExamplePage';

export default function FramesPage() {
  return (
    <ExamplePage id="frames" title="Frames">
      <p className="text-sm text-neutral-300">
        The panel below is a separate document loaded from <code>/embed/frame</code>, so a driver
        must switch into the frame before it can see the content.
      </p>
      <iframe
        id="iframe-page"
        title="Embedded frame"
        src="/embed/frame"
        className="h-64 w-full rounded-lg border border-neutral-800 bg-neutral-900"
      />
    </ExamplePage>
  );
}
