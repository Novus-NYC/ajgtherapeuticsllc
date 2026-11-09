// The mark: a circle of light. It stands for the healing circle and the spotlight.
export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="13" fill="none" stroke="#C9A45C" strokeWidth="3" />
      <circle cx="16" cy="16" r="5.5" fill="#C9A45C" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Mark />
      <span className="flex flex-col leading-none">
        <span className="display text-[1.375rem] tracking-[0.02em]">AJG</span>
        <span className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-muted">
          Therapeutics
        </span>
      </span>
    </span>
  )
}
