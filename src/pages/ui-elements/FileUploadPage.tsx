import { useState } from 'react';
import type { FormEvent } from 'react';
import ExamplePage from './kit/ExamplePage';
import Flash from './kit/Flash';

export default function FileUploadPage() {
  const [uploaded, setUploaded] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = document.getElementById('file-upload-field') as HTMLInputElement | null;
    const file = input?.files?.[0];
    setUploaded(file ? file.name : '');
  };

  return (
    <ExamplePage id="file-upload" title="File Upload">
      <p className="text-sm text-neutral-300">
        Choose a file and submit. There is no server behind this build, so the example confirms the
        upload by echoing the selected file name back.
      </p>
      {uploaded && <Flash variant="success" message={`File Uploaded: ${uploaded}`} id="upload-flash" />}
      <form id="file-upload-form" onSubmit={submit} className="max-w-md space-y-3">
        <label htmlFor="file-upload-field" className="block text-sm text-neutral-300">Choose File</label>
        <input
          id="file-upload-field"
          name="file"
          type="file"
          className="block w-full text-sm text-neutral-300 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-emerald-500"
        />
        <button
          type="submit"
          id="file-upload-submit"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
        >
          Upload
        </button>
      </form>
      <p id="uploaded-file-name" className="text-xs text-neutral-500">
        {uploaded === '' ? 'No file uploaded yet' : `Uploaded: ${uploaded}`}
      </p>
    </ExamplePage>
  );
}
