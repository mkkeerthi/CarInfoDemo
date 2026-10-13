import Expander from '../../components/ui/Expander';
import ExamplePage from './kit/ExamplePage';

export default function ExpanderPage() {
  return (
    <ExamplePage id="expander" title="Expander">
      <Expander id="ui-expander" title="Click to expand/collapse">
        <p id="ui-expander-content" className="text-sm text-neutral-300">
          This content is inside an expander control.
        </p>
      </Expander>
    </ExamplePage>
  );
}
