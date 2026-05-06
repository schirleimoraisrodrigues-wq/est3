export function Field({ label, children }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-300"><span>{label}</span>{children}</label>;
}

export const inputClass = 'w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-teal-400/30 placeholder:text-slate-500 focus:ring-4';

export function Card({ children, className = '' }) {
  return <div className={`rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20 ${className}`}>{children}</div>;
}

export function Badge({ children, tone = 'slate' }) {
  const colors = { slate: 'border-white/15 text-slate-300', teal: 'border-teal-300/40 text-teal-200', red: 'border-red-300/40 text-red-200', amber: 'border-amber-300/40 text-amber-200' };
  return <span className={`rounded-full border px-3 py-1 text-xs font-bold ${colors[tone]}`}>{children}</span>;
}
