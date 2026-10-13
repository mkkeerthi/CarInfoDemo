import ExamplePage from './kit/ExamplePage';

export default function TyposPage() {
  return (
    <ExamplePage id="typos" title="Typos">
      {/* This example is supposed to look badly written: misspellings are deliberate. */}
      <p id="typo-copy-1" className="text-sm text-neutral-300">
        iIt&rsquo;s not uncommon for me to make a typo, but you&rsquo;ll notice that when I say
        &quot;typos&quot; I tend to write &quot;typos&quot; corectly. Here is a mistake: recieve,
        achive, seperate.
      </p>
      <p id="typo-copy-2" className="text-sm text-neutral-300">
        Some tpyos are so subtle that you do not notice them unless you read this paragraph
        character by charcter. Wiat for it&hellip; thre.
      </p>
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <p id="typo-copy-3" className="text-sm text-neutral-300">
          Awkward spelling mistakes, like tehse, are hard to spot when they are burried in a long
          sentance that a test needs to assert against.
        </p>
      </div>
    </ExamplePage>
  );
}
