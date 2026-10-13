import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExamplePage from './kit/ExamplePage';

const codes = [
  '200', '301', '303', '305', '307', '400', '401', '403', '404', '405', '406', '408', '409',
  '410', '411', '412', '413', '414', '415', '416', '417', '418', '421', '422', '423', '424',
  '425', '426', '428', '429', '431', '444', '449', '450', '451', '494', '495', '496', '497',
  '499', '500', '501', '502', '503', '504', '505', '506', '507', '509', '510', '598', '599',
];

export default function StatusCodesPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('200');

  return (
    <ExamplePage id="status-codes" title="Status Codes">
      <p className="text-sm text-neutral-300">
        Pick a status code and the example navigates to a page that reports it. Note the
        deviation: a static SPA cannot make the server answer with that HTTP status, so the code is
        only reflected in the document.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="status-code-select" className="text-sm text-neutral-300">Status</label>
        <select
          id="status-code-select"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
        >
          {codes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button
          type="button"
          id="status-code-go"
          onClick={() => navigate(`/ui-elements/status-codes/${code}`)}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Go
        </button>
      </div>
    </ExamplePage>
  );
}

export function StatusCodePage() {
  const { code = '200' } = useParams();

  useEffect(() => {
    document.title = `Status Code: ${code}`;
    return () => {
      document.title = 'Car Info Demo';
    };
  }, [code]);

  return (
    <ExamplePage id={`status-code-${code}`} title={`Status Code: ${code}`}>
      <p id="status-code-message" className="text-sm text-neutral-300">
        The requested status code is {code}
      </p>
    </ExamplePage>
  );
}
