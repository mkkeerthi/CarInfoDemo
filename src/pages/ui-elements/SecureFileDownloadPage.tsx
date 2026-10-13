import ExamplePage from './kit/ExamplePage';
import AuthGate from './kit/AuthGate';
import { DownloadLinks } from './FileDownloadPage';

export default function SecureFileDownloadPage() {
  return (
    <ExamplePage id="download-secure" title="Secure File Download">
      <AuthGate id="download-secure-gate" realm="Secure Download" username="admin" password="admin">
        <p className="text-sm text-neutral-300">You are authenticated — the files are below.</p>
        <DownloadLinks idPrefix="download-secure" />
      </AuthGate>
    </ExamplePage>
  );
}
