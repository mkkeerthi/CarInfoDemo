import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function GeolocationPage() {
  const [status, setStatus] = useState('Your location will appear here.');
  const [busy, setBusy] = useState(false);

  const locate = () => {
    if (!('geolocation' in navigator)) {
      setStatus('Geolocation is not available in this browser.');
      return;
    }
    setBusy(true);
    setStatus('Fetching coordinates…');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setBusy(false);
        setStatus(
          `Your location: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
        );
      },
      (error) => {
        setBusy(false);
        setStatus(`Unable to retrieve your location: ${error.message}`);
      },
      { timeout: 10000 },
    );
  };

  return (
    <ExamplePage id="geolocation" title="Geolocation">
      <p className="text-sm text-neutral-300">
        Click the button and the page asks the browser for your position. A test has to grant (or
        deny) the permission prompt and then assert on the message.
      </p>
      <button
        type="button"
        id="locate-button"
        onClick={locate}
        disabled={busy}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Where am I?
      </button>
      <p id="location-result" className="text-sm text-neutral-200">{status}</p>
    </ExamplePage>
  );
}
