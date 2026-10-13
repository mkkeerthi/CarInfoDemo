import Scrollbar from '../../components/ui/Scrollbar';
import ExamplePage from './kit/ExamplePage';

export default function ScrollbarPage() {
  return (
    <ExamplePage id="scrollbar" title="Scrollbar">
      <Scrollbar id="ui-scroll-container" listId="scroll-list" count={20} />
    </ExamplePage>
  );
}
