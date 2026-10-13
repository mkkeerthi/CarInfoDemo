import { useEffect, useRef } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function ShadowDomPage() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.shadowRoot) return;
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        p { color: #6ee7b7; font-size: 14px; margin: 0; }
        .panel { border: 1px solid #404040; border-radius: 8px; padding: 12px; background: #171717; }
      </style>
      <div class="panel">
        <p id="shadow-content">Simple Shadow Example</p>
      </div>
    `;
  }, []);

  return (
    <ExamplePage id="shadow-dom" title="Shadow DOM">
      <p className="text-sm text-neutral-300">
        The heading inside the panel lives in a shadow root, so ordinary CSS selectors and
        <code> document.querySelector</code> cannot reach it — a driver has to pierce the shadow
        boundary.
      </p>
      <div id="shadow-host" ref={hostRef}>
        <p className="text-sm text-neutral-500">
          This fallback text is replaced by the shadow content once the component mounts.
        </p>
      </div>
    </ExamplePage>
  );
}
