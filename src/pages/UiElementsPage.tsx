import Collapser from '../components/ui/Collapser';
import Expander from '../components/ui/Expander';
import Tooltip from '../components/ui/Tooltip';

export default function UiElementsPage() {
  const longItems = Array.from({ length: 20 }, (_, i) => `Scroll item ${i + 1}`);

  return (
    <div className="space-y-10">
      <h1 id="ui-elements-title" className="text-2xl font-bold">UI Elements</h1>

      <section id="ui-expander-section" aria-label="Expander">
        <h2 className="mb-3 text-xl font-semibold">Expander</h2>
        <Expander id="ui-expander" title="Click to expand/collapse">
          <p id="ui-expander-content" className="text-sm text-neutral-300">
            This content is inside an expander control.
          </p>
        </Expander>
      </section>

      <section id="ui-collapser-section" aria-label="Collapser">
        <h2 className="mb-3 text-xl font-semibold">Collapser</h2>
        <Collapser id="ui-collapser" title="Click to collapse/expand">
          <p id="ui-collapser-content" className="text-sm text-neutral-300">
            This content is inside a collapser control.
          </p>
        </Collapser>
      </section>

      <section id="ui-scrollbar-section" aria-label="Scrollbar">
        <h2 className="mb-3 text-xl font-semibold">Scrollbar</h2>
        <div
          id="ui-scroll-container"
          className="h-40 overflow-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4"
        >
          <ul id="scroll-list" className="space-y-2">
            {longItems.map((item) => (
              <li key={item} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ui-tooltip-section" aria-label="Tooltip">
        <h2 className="mb-3 text-xl font-semibold">Tooltip</h2>
        <Tooltip id="ui-tooltip" text="This is a tooltip on hover.">
          <span className="cursor-help rounded-md border border-neutral-700 px-3 py-1 text-sm">
            Hover me
          </span>
        </Tooltip>
      </section>

      <section id="ui-list-section" aria-label="List view">
        <h2 className="mb-3 text-xl font-semibold">List View</h2>
        <ul id="ui-list" className="space-y-2">
          {['Item Alpha', 'Item Beta', 'Item Gamma'].map((item) => (
            <li key={item} className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
