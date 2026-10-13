import { useState } from 'react';
import type { FormEvent } from 'react';
import ExamplePage from './kit/ExamplePage';
import Flash from './kit/Flash';

export default function ForgotPasswordPage() {
  const [secret, setSecret] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSecret('Toys are toys');
  };

  return (
    <ExamplePage id="forgot-password" title="Forgot Password">
      <p className="text-sm text-neutral-300">
        Ask for a password reset and the example hands back a fake &quot;secret&quot;, the same way
        the reference site does.
      </p>
      {secret && (
        <Flash
          id="flash"
          variant="warning"
          message={`Your secret is "${secret}"! A floating message should have appeared at the top of the page.`}
        />
      )}
      <form id="forgot-password-form" onSubmit={submit} className="max-w-sm space-y-3">
        <label htmlFor="email" className="block text-sm text-neutral-300">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
        />
        <button
          type="submit"
          id="retrieve-password-submit"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Retrieve password
        </button>
      </form>
    </ExamplePage>
  );
}
