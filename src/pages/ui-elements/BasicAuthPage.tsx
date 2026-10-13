import ExamplePage from './kit/ExamplePage';
import AuthGate from './kit/AuthGate';

export default function BasicAuthPage() {
  return (
    <ExamplePage id="basic-auth" title="Basic Auth">
      <AuthGate id="basic-auth-gate" realm="Basic Auth" username="admin" password="admin">
        <p id="basic-auth-body" className="text-sm text-neutral-300">
          You are inside the protected area. On the reference site this content is only served
          after the browser answers an HTTP 401 challenge with <code>admin:admin</code>.
        </p>
      </AuthGate>
    </ExamplePage>
  );
}
