interface ScrollbarProps {
  id: string;
  listId: string;
  count?: number;
}

export default function Scrollbar({ id, listId, count = 20 }: ScrollbarProps) {
  const items = Array.from({ length: count }, (_, i) => `Scroll item ${i + 1}`);

  return (
    <div
      id={id}
      className="h-40 overflow-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4"
    >
      <ul id={listId} className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm">{item}</li>
        ))}
      </ul>
    </div>
  );
}
