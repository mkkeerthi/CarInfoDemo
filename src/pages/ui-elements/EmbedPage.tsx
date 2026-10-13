import { useParams } from 'react-router-dom';

const documents: Record<string, { heading: string; body: string }> = {
  frame: { heading: 'Your title here', body: 'Your content here' },
  'header-frame': { heading: 'Header', body: '' },
  'left-frame': { heading: '', body: 'LEFT' },
  'body-frame': { heading: 'Body', body: '' },
};

export default function EmbedPage() {
  const { name = '' } = useParams();
  const doc = documents[name];

  return (
    <div
      id={`embed-${name || 'unknown'}`}
      className="min-h-screen bg-neutral-900 p-4 text-neutral-100"
    >
      {doc ? (
        <>
          {doc.heading && <h1 className="mb-2 text-xl font-semibold">{doc.heading}</h1>}
          {doc.body && <p className="text-sm text-neutral-300">{doc.body}</p>}
        </>
      ) : (
        <p className="text-sm text-neutral-400">Unknown embedded document: {name}</p>
      )}
    </div>
  );
}
