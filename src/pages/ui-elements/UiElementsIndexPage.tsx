import { examples } from './examples';
import { Link } from 'react-router-dom';

export default function UiElementsIndexPage() {
  const available = examples.filter((example) => !example.hidden);

  return (
    <div className="space-y-6">
      <h1 id="ui-elements-title" className="text-2xl font-bold">UI Elements</h1>
      <p id="ui-elements-intro" className="text-sm text-neutral-300">
        A collection of UI element examples to test web interactions against. Click an example
        name to open its own page.
      </p>

      <section aria-label="Available examples">
        <h2 id="available-examples-title" className="mb-3 text-xl font-semibold">
          Available Examples
        </h2>
        <ul id="ui-elements-list" className="space-y-2">
          {available.map(({ title, path }) => (
            <li key={path}>
              <Link
                id={`ui-element-${path}`}
                to={`/ui-elements/${path}`}
                className="text-sm text-emerald-400 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-emerald-300 hover:underline"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <p id="ui-elements-count" className="mt-3 text-xs text-neutral-500">
          {available.length} examples available
        </p>
      </section>
    </div>
  );
}
