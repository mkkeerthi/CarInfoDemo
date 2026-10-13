import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FormEvent, ReactNode } from 'react';
import Flash from './Flash';

interface AuthGateProps {
  id: string;
  realm: string;
  username: string;
  password: string;
  children: ReactNode;
}

export default function AuthGate({ id, realm, username, password, children }: AuthGateProps) {
  const [searchParams] = useSearchParams();
  const sessionKey = `ui-auth-${realm}`;

  const [authorized, setAuthorized] = useState(() => {
    if (sessionStorage.getItem(sessionKey) === 'true') return true;
    const queryUser = searchParams.get('username');
    const queryPass = searchParams.get('password');
    return queryUser === username && queryPass === password;
  });
  const [failed, setFailed] = useState(false);

  const inputClass =
    'w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500';

  if (authorized) {
    const logout = () => {
      sessionStorage.removeItem(sessionKey);
      setFailed(false);
      setAuthorized(false);
    };
    return (
      <div id={`${id}-secure`} className="space-y-3">
        <Flash
          id={`${id}-flash`}
          variant="success"
          message={`Welcome to the ${realm} Area. When you are done, click logout here.`}
        />
        <button
          type="button"
          id={`${id}-logout`}
          onClick={logout}
          className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition-colors duration-200 ease-in-out hover:bg-neutral-800"
        >
          Log out
        </button>
        {children}
      </div>
    );
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enteredUser = String(data.get(`${id}-username`) ?? '');
    const enteredPass = String(data.get(`${id}-password`) ?? '');
    if (enteredUser === username && enteredPass === password) {
      sessionStorage.setItem(sessionKey, 'true');
      setFailed(false);
      setAuthorized(true);
    } else {
      setFailed(true);
    }
  };

  return (
    <div id={id} className="max-w-sm space-y-3">
      <p id={`${id}-prompt`} className="text-sm text-neutral-300">
        The reference site protects this page with an HTTP authentication challenge. This build
        gates it in-app instead &mdash; the credentials are{' '}
        <span className="text-emerald-400">admin / admin</span>.
      </p>
      {failed && (
        <Flash id={`${id}-flash`} variant="error" message="Login failed — wrong credentials." />
      )}
      <form onSubmit={submit} className="space-y-3" aria-label={`${realm} credentials`}>
        <label htmlFor={`${id}-username`} className="block text-sm text-neutral-300">User</label>
        <input id={`${id}-username`} name={`${id}-username`} type="text" className={inputClass} />
        <label htmlFor={`${id}-password`} className="block text-sm text-neutral-300">Password</label>
        <input id={`${id}-password`} name={`${id}-password`} type="password" className={inputClass} />
        <button
          type="submit"
          id={`${id}-submit`}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
