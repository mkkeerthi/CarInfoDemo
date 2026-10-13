interface FlashProps {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'blank';
  id?: string;
}

const variants: Record<NonNullable<FlashProps['variant']>, string> = {
  success: 'border-emerald-700 bg-emerald-500/15 text-emerald-300',
  error: 'border-red-800 bg-red-500/15 text-red-300',
  warning: 'border-amber-700 bg-amber-500/15 text-amber-300',
  blank: 'border-neutral-700 bg-neutral-800 text-neutral-200',
};

export default function Flash({ message, variant = 'blank', id = 'flash' }: FlashProps) {
  return (
    <div
      id={id}
      role="status"
      data-variant={variant}
      className={`rounded-md border px-4 py-3 text-sm ${variants[variant]}`}
    >
      <span id={`${id}-message`}>{message}</span>
    </div>
  );
}
