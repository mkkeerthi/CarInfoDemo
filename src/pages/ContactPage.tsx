import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('General');
  const [subscribe, setSubscribe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 id="contact-page-title" className="text-2xl font-bold">Contact Us</h1>

      {submitted && (
        <p id="form-success" className="rounded-lg border border-emerald-700 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-300">
          Thanks, {name}! Your message has been recorded (demo only).
        </p>
      )}

      <form id="contact-form" onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-neutral-800 bg-neutral-900 p-6">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">Name</label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">Email</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
          />
        </div>

        <fieldset id="contact-topic-group">
          <legend className="mb-2 text-sm font-medium">Topic</legend>
          <div className="flex flex-wrap gap-4">
            {['General', 'Sales', 'Support', 'Feedback'].map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm">
                <input
                  id={`topic-${t.toLowerCase()}`}
                  type="radio"
                  name="topic"
                  value={t}
                  checked={topic === t}
                  onChange={() => setTopic(t)}
                  className="accent-emerald-500"
                />
                {t}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">Message</label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            id="contact-subscribe"
            type="checkbox"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
            className="accent-emerald-500"
          />
          Subscribe to newsletter
        </label>

        <button
          id="contact-submit"
          type="submit"
          className="rounded-md bg-emerald-600 px-5 py-2 font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
