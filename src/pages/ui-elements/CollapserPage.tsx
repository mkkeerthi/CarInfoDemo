import Collapser from '../../components/ui/Collapser';
import ExamplePage from './kit/ExamplePage';

export default function CollapserPage() {
  return (
    <ExamplePage id="collapser" title="Collapser">
      <Collapser id="ui-collapser" title="Click to collapse/expand">
        <p id="ui-collapser-content" className="text-sm text-neutral-300">
          This content is inside a collapser control.
        </p>
      </Collapser>
    </ExamplePage>
  );
}
