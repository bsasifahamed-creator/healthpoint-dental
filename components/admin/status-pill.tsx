import { CheckCircle2, CircleDashed, XCircle } from 'lucide-react';

type Status = string;

const map: Record<Status, { label: string; classes: string; Icon: typeof CheckCircle2 }> = {
  confirmed: { label: 'Confirmed', classes: 'text-teal', Icon: CheckCircle2 },
  pending: { label: 'Pending', classes: 'text-ink-mid', Icon: CircleDashed },
  cancelled: { label: 'Cancelled', classes: 'text-red-500', Icon: XCircle },
  completed: { label: 'Completed', classes: 'text-green', Icon: CheckCircle2 },
};

export function StatusPill({ status }: { status: Status }) {
  const value = (status || 'pending').toLowerCase();
  const m = map[value] ?? map.pending;
  const Icon = m.Icon;
  return (
    <span className={`glass-pill inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${m.classes}`}>
      <Icon className="size-3" strokeWidth={2} aria-hidden />
      {m.label}
    </span>
  );
}
