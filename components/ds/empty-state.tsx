import * as React from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DsButton } from '@/components/ds/button'

export interface DsEmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
  /** Optional AI suggestions — existing routes only */
  suggestions?: { label: string; href: string }[]
}

const DEFAULT_SUGGESTIONS = [
  { label: 'Generate something new', href: '/converse' },
  { label: 'Explore Live', href: '/live' },
  { label: 'Enter a world', href: '/universe?c=worlds' },
  { label: 'Browse stories', href: '/universe?c=stories' },
]

function DsEmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  suggestions = DEFAULT_SUGGESTIONS,
}: DsEmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'vdoc-liquid-glass flex flex-col items-center justify-center rounded-[var(--radius-2xl)] px-8 py-14 text-center',
        className
      )}
    >
      <div className="mb-5 flex size-14 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-cyan shadow-[var(--shadow-glow-cyan)]">
        {icon ?? <Sparkles className="size-6" aria-hidden />}
      </div>
      <h3 className="ds-heading-sm text-lunar">{title || 'The OS is listening'}</h3>
      <p className="mt-3 max-w-sm ds-body-sm text-pretty text-muted-foreground">
        {description ||
          'Nothing here yet — intelligence can open a new experience, community, or live signal.'}
      </p>
      {actionLabel && onAction && (
        <DsButton className="mt-8" variant="lunar" onClick={onAction}>
          {actionLabel}
        </DsButton>
      )}
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <li key={s.href + s.label}>
            <Link
              href={s.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-cyan/30 hover:text-cyan"
            >
              <Sparkles className="size-3" aria-hidden />
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { DsEmptyState }
