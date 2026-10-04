import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ current = 1, total = 1, onChange }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1)
    .filter(p => p === 1 || p === total || Math.abs(p - current) <= 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button disabled={current === 1} onClick={() => onChange(current - 1)}
        className="p-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50">
        <ChevronLeft size={18} />
      </button>
      {pages.map((p, i) => (
        <span key={p}>
          {i > 0 && pages[i-1] !== p - 1 && <span className="px-2">…</span>}
          <button
            onClick={() => onChange(p)}
            className={`w-10 h-10 rounded-lg ${current === p ? 'bg-accent text-white' : 'hover:bg-gray-100 border'}`}
          >
            {p}
          </button>
        </span>
      ))}
      <button disabled={current === total} onClick={() => onChange(current + 1)}
        className="p-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}