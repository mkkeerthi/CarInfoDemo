import ExamplePage from './kit/ExamplePage';

export default function ListViewPage() {
  return (
    <ExamplePage id="list-view" title="List View">
      <ul id="ui-list" className="space-y-2">
        {['Item Alpha', 'Item Beta', 'Item Gamma'].map((item) => (
          <li
            key={item}
            className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </ExamplePage>
  );
}
