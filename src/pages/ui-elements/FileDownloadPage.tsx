import ExamplePage from './kit/ExamplePage';

const files = ['href.txt', 'csv.txt', 'to_remove.txt', 'elemental.json'];

export function DownloadLinks({ idPrefix = 'file-download' }: { idPrefix?: string }) {
  return (
    <ul id={`${idPrefix}-list`} className="space-y-2">
      {files.map((file) => (
        <li key={file}>
          <a
            id={`${idPrefix}-${file}`}
            href={`/downloads/${file}`}
            download={file}
            className="inline-flex items-center gap-2 text-sm text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
          >
            <i className="fa-solid fa-download" aria-hidden="true" />
            {file}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function FileDownloadPage() {
  return (
    <ExamplePage id="file-download" title="File Download">
      <p className="text-sm text-neutral-300">
        Each link below is a real file served by this app, so a download can be verified end to end.
      </p>
      <DownloadLinks />
    </ExamplePage>
  );
}
