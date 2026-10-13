import ExamplePage from './kit/ExamplePage';
import AuthGate from './kit/AuthGate';

export default function DigestAuthPage() {
  return (
    <ExamplePage id="digest-auth" title="Digest Authentication">
      <AuthGate id="digest-auth-gate" realm="Digest Auth" username="admin" password="admin">
        <p id="digest-auth-body" className="text-sm text-neutral-300">
          You are inside the digest-protected area. The reference site issues a{' '}
          <code>WWW-Authenticate: Digest</code> challenge; this build repeats the same credentials
          check in-app.
        </p>
      </AuthGate>
    </ExamplePage>
  );
}
