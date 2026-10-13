import { useRef, useState } from 'react';
import ExamplePage from './kit/ExamplePage';
import Flash from './kit/Flash';

const tools = [
  { command: 'bold', icon: 'fa-bold', label: 'Bold' },
  { command: 'italic', icon: 'fa-italic', label: 'Italic' },
  { command: 'underline', icon: 'fa-underline', label: 'Underline' },
  { command: 'strikeThrough', icon: 'fa-strikethrough', label: 'Strikethrough' },
  { command: 'justifyLeft', icon: 'fa-align-left', label: 'Align left' },
  { command: 'justifyCenter', icon: 'fa-align-center', label: 'Align center' },
  { command: 'insertUnorderedList', icon: 'fa-list-ul', label: 'Bulleted list' },
];

export default function WysiwygEditorPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState('');

  const exec = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command);
  };

  const save = () => setSaved(editorRef.current?.innerText.trim() ?? '');

  return (
    <ExamplePage id="wysiwyg-editor" title="WYSIWYG Editor">
      <p className="text-sm text-neutral-300">
        A rich text editor implemented with a <code>contentEditable</code> region and the browser
        editing commands — no TinyMCE dependency.
      </p>
      <div className="max-w-2xl overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900">
        <div id="wysiwyg-toolbar" className="flex flex-wrap gap-1 border-b border-neutral-800 p-2">
          {tools.map((tool) => (
            <button
              key={tool.command}
              type="button"
              id={`wysiwyg-${tool.command}`}
              title={tool.label}
              aria-label={tool.label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => exec(tool.command)}
              className="rounded-md px-3 py-1.5 text-sm text-neutral-300 transition-colors duration-200 ease-in-out hover:bg-neutral-800 hover:text-white"
            >
              <i className={`fa-solid ${tool.icon}`} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          id="tinymce"
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="WYSIWYG editor"
          className="min-h-40 px-4 py-3 text-sm text-neutral-200 outline-none [&_ul]:list-disc [&_ul]:pl-5"
        >
          Your content here
        </div>
      </div>
      <button
        type="button"
        id="wysiwyg-save"
        onClick={save}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
      >
        Save
      </button>
      {saved && <Flash variant="success" message={`Saved: ${saved}`} id="wysiwyg-flash" />}
    </ExamplePage>
  );
}
