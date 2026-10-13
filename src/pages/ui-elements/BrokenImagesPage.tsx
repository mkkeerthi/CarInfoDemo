import ExamplePage from './kit/ExamplePage';

const goodImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
       <rect width="120" height="120" rx="12" fill="#059669"/>
       <text x="60" y="66" font-family="sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">loaded</text>
     </svg>`,
  );

export default function BrokenImagesPage() {
  return (
    <ExamplePage id="broken-images" title="Broken Images">
      <p className="text-sm text-neutral-300">
        Two of the three images below point at files that do not exist, so their alt text renders
        and the browser logs failed network requests.
      </p>
      <div id="broken-images-row" className="flex flex-wrap items-start gap-6">
        <img id="image-ok" src={goodImage} alt="A green tile that loads" width={120} height={120} />
        <img
          id="image-broken-1"
          src="/images/does-not-exist-1.png"
          alt="Example broken image 1"
          width={120}
          height={120}
        />
        <img
          id="image-broken-2"
          src="/images/does-not-exist-2.png"
          alt="Example broken image 2"
          width={120}
          height={120}
        />
      </div>
    </ExamplePage>
  );
}
