import Tooltip from '../../components/ui/Tooltip';
import ExamplePage from './kit/ExamplePage';

export default function TooltipPage() {
  return (
    <ExamplePage id="tooltip" title="Tooltip">
      <Tooltip id="ui-tooltip" text="This is a tooltip on hover.">
        <span className="cursor-help rounded-md border border-neutral-700 px-3 py-1 text-sm">
          Hover me
        </span>
      </Tooltip>
    </ExamplePage>
  );
}
