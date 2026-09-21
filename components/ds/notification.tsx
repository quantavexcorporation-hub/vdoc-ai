'use client'

import * as React from 'react'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DsNotificationTone = 'info' | 'success' | 'warning' | 'error'

export type DsNotificationItem = {
  id: string
  title: string
  description?: string
  tone?: DsNotificationTone
}

const toneStyles: Record<
  DsNotificationTone,
  { icon: React.ElementType; className: string }
> = {
  info: {
    icon: Info,
    className: 'border-neon/30 bg-neon/10 text-neon',
  },
  success: {
    icon: CheckCircle2,
    className: 'border-success/30 bg-success/10 text-success',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-warning/30 bg-warning/10 text-warning',
  },
  error: {
    icon: XCircle,
    className: 'border-error/30 bg-error/10 text-error',
  },
}

export interface DsNotificationProps {
  item: DsNotificationItem
  onDismiss?: (id: string) => void
  className?: string
}

function DsNotification({ item, onDismiss, className }: DsNotificationProps) {
  const tone = item.tone ?? 'info'
  const { icon: Icon, className: toneClass } = toneStyles[tone]

  return (
    <div
      role="status"
      className={cn(
        'vdoc-feedback-toast ds-glass-strong flex w-full max-w-sm gap-3 rounded-[var(--radius-xl)] border p-4 shadow-[var(--shadow-lg),var(--shadow-glow-cyan)]',
        className
      )}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full border',
          toneClass
        )}
      >
        <Icon className="size-4" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-lunar">{item.title}</p>
        {item.description && (
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => onDismiss(item.id)}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

export interface DsNotificationStackProps {
  items: DsNotificationItem[]
  onDismiss?: (id: string) => void
  className?: string
}

function DsNotificationStack({
  items,
  onDismiss,
  className,
}: DsNotificationStackProps) {
  if (!items.length) return null
  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-6 right-6 z-[60] flex w-full max-w-sm flex-col gap-3',
        className
      )}
      aria-live="polite"
    >
      {items.map((item) => (
        <div key={item.id} className="pointer-events-auto animate-rise">
          <DsNotification item={item} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  )
}

export { DsNotification, DsNotificationStack }
