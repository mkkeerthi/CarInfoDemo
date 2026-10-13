import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExamplePage from './kit/ExamplePage';

export default function RedirectLinkPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(
      () => navigate('/ui-elements/redirect-page', { replace: true }),
      300,
    );
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <ExamplePage id="redirect" title="Redirect Link">
      <p id="redirecting" className="text-sm text-neutral-300">
        You are being redirected to a new URL&hellip;
      </p>
    </ExamplePage>
  );
}

export function RedirectLandingPage() {
  return (
    <ExamplePage id="redirect-page" title="Redirected">
      <p id="redirect-notice" className="text-sm text-neutral-300">You made a redirect!</p>
      <Link
        id="redirect-back"
        to="/ui-elements/redirect"
        className="text-sm text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
      >
        Back to the redirecting page
      </Link>
    </ExamplePage>
  );
}
