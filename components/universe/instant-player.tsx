'use client'

import * as React from 'react'
import { X, Play } from 'lucide-react'
import type { MediaItem } from '@/lib/universe/data'
import { cn } from '@/lib/utils'

export function InstantPlayer({
  item,
  onClose,
}: {
  item: MediaItem | null
  onClose: () => void
}) {
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!item) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${item.title}`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-md animate-fade"
        onClick={onClose}
        aria-label="Close"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--glass-border-strong)] bg-bg-void shadow-[var(--shadow-xl)] animate-rise"
      >
        <div className="relative aspect-video bg-black">
          {item.hue != null ? (
            <div
              className="vdoc-frame absolute inset-0"
              style={{ ['--frame-hue' as string]: item.hue }}
              aria-hidden
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-85"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-white/20 bg-black/45 text-lunar backdrop-blur-md">
              <Play className="size-7 translate-x-0.5" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div className="converse-progress h-full bg-cyan" />
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 border-t border-[var(--border)] p-5">
          <div>
            <p className="ds-label mb-1">{item.genre}</p>
            <h3 className="font-display text-xl font-semibold text-lunar">{item.title}</h3>
            <p className="mt-1 ds-body-sm">{item.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={cn(
              'rounded-full border border-[var(--glass-border)] bg-white/[0.04] p-2 text-muted-foreground',
              'transition-colors hover:bg-white/[0.08] hover:text-foreground'
            )}
            aria-label="Close player"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
