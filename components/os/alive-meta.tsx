import { cn } from '@/lib/utils'

const TONES = [
  { id: 'ethereal', label: 'Ethereal', className: 'text-cyan border-cyan/25 bg-cyan/10' },
  { id: 'intense', label: 'Intense', className: 'text-neon border-neon/25 bg-neon/10' },
  { id: 'warm', label: 'Warm', className: 'text-warning border-warning/25 bg-warning/10' },
  { id: 'quiet', label: 'Quiet', className: 'text-muted-foreground border-white/15 bg-white/[0.06]' },
  { id: 'electric', label: 'Electric', className: 'text-cosmic-glow border-cosmic/30 bg-cosmic/15' },
] as const

/** Deterministic tone from a seed string — no API. */
export function toneFromSeed(seed: string) {
  const s = seed || 'vdoc'
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * (i + 1)) % 997
  return TONES[h % TONES.length]
}

/** Deterministic popularity 0–100 from seed. */
export function pulseFromSeed(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return 38 + (h % 58)
}

export function AliveMeta({
  seed,
  summary,
  className,
  compact,
}: {
  seed: string
  summary?: string
  className?: string
  compact?: boolean
}) {
  const tone = toneFromSeed(seed)
  const pulse = pulseFromSeed(seed)

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-[var(--radius-sm)] border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider',
          tone.className
        )}
      >
        {tone.label}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-white/10 bg-black/35 px-1.5 py-0.5 font-mono text-[10px] text-lunar/90 backdrop-blur-sm">
        <span className="vdoc-popularity-pulse scale-75" aria-hidden />
        {pulse}%
      </span>
      {!compact && summary ? (
        <span className="line-clamp-1 text-[11px] text-muted-foreground">{summary}</span>
      ) : null}
    </div>
  )
}
