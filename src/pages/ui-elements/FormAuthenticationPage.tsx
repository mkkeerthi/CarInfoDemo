import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExamplePage from './kit/ExamplePage';
import Flash from './kit/Flash';

const credentials = { username: 'tomsmith', password: 'SuperSecretPassword!' };

export default function FormAuthenticationPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = String(data.get('username') ?? '');
    const password = String(data.get('password') ?? '');
    if (username === credentials.username && password === credentials.password) {
      sessionStorage.setItem('ui-login-secure', 'true');
      setError('');
      navigate('/ui-elements/secure');
    } else {
      setError('Your username is invalid!');
    }
  };

  const inputClass =
    'w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500';

  return (
    <ExamplePage id="form-authentication" title="Form Authentication">
      <p className="text-sm text-neutral-300">
        An ordinary login form. The reference site accepts{' '}
        <code className="text-emerald-400">tomsmith / SuperSecretPassword!</code> and this build
        does too.
      </p>
      {error && <Flash id="login-flash" variant="error" message={error} />}
      <form id="login-form" onSubmit={submit} className="max-w-sm space-y-3">
        <div>
          <label htmlFor="username" className="block text-sm text-neutral-300">Username</label>
          <input id="username" name="username" type="text" autoComplete="off" className={inputClass} />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm text-neutral-300">Password</label>
          <input id="password" name="password" type="password" className={inputClass} />
        </div>
        <button
          type="submit"
          id="login-button"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          <i className="fa-solid fa-right-to-bracket mr-2" aria-hidden="true" />
          Login
        </button>
      </form>
    </ExamplePage>
  );
}

export function SecurePage() {
  const navigate = useNavigate();
  const authorized = sessionStorage.getItem('ui-login-secure') === 'true';

  const logout = () => {
    sessionStorage.removeItem('ui-login-secure');
    navigate('/ui-elements/form-authentication');
  };

  if (!authorized) {
    return (
      <ExamplePage id="secure" title="Secure Area">
        <Flash id="secure-flash" variant="error" message="You must log in first." />
        <Link
          id="secure-login-link"
          to="/ui-elements/form-authentication"
          className="text-sm text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
        >
          Back to the login form
        </Link>
      </ExamplePage>
    );
  }

  return (
    <ExamplePage id="secure" title="Secure Area">
      <Flash id="secure-flash" variant="success" message="Welcome, Tom Smith!" />
      <button
        type="button"
        id="secure-logout"
        onClick={logout}
        className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition-colors duration-200 ease-in-out hover:bg-neutral-800"
      >
        <i className="fa-solid fa-right-from-bracket mr-2" aria-hidden="true" />
        Log out
      </button>
    </ExamplePage>
  );
}
