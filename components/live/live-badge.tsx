'use client'

import { cn } from '@/lib/utils'

/** Quiet LIVE signal — pulse without Twitch chrome */
export function LiveBadge({
  className,
  label = 'Live',
}: {
  className?: string
  label?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-cyan/25 bg-black/45 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-cyan backdrop-blur-md',
        className
      )}
    >
      <span className="relative flex size-1.5" aria-hidden>
        <span className="absolute inset-0 rounded-full bg-cyan opacity-60 animate-ping" />
        <span className="relative size-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
      </span>
      {label}
    </span>
  )
}
