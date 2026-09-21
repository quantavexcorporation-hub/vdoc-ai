'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Futuristic logo awaken ritual — brief OS boot moment, then soft handoff.
 */
export function LogoAwaken({
  open,
  onComplete,
}: {
  open: boolean
  onComplete: () => void
}) {
  const [exiting, setExiting] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (!open) {
      setExiting(false)
      setMounted(false)
      return
    }

    setMounted(true)
    setExiting(false)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = reduced ? 120 : 1050
    const fade = reduced ? 80 : 320

    const t1 = window.setTimeout(() => setExiting(true), hold)
    const t2 = window.setTimeout(onComplete, hold + fade)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [open, onComplete])

  if (!open && !mounted) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]/92 backdrop-blur-md',
        'transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        exiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Awakening VDOC"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="vdoc-awaken-sweep absolute inset-0" />
        <div className="vdoc-awaken-ring vdoc-awaken-ring-1" />
        <div className="vdoc-awaken-ring vdoc-awaken-ring-2" />
        <div className="vdoc-awaken-ring vdoc-awaken-ring-3" />
      </div>

      <div
        className={cn(
          'relative flex flex-col items-center px-6 text-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          exiting ? 'scale-[1.02] translate-y-[-4px]' : 'scale-100'
        )}
      >
        <div className="vdoc-awaken-logo relative">
          <div className="absolute inset-0 scale-150 rounded-full bg-cyan/20 blur-3xl" aria-hidden />
          <Image
            src="/vdoc-logo.png?v=5"
            alt=""
            width={196}
            height={84}
            unoptimized
            priority
            className="relative h-16 w-auto rounded-xl object-cover shadow-[0_0_48px_rgba(103,232,249,0.25)] sm:h-20"
          />
        </div>

        <p className="vdoc-awaken-copy mt-8 text-[11px] font-medium uppercase tracking-[0.28em] text-cyan/80">
          Systems aligning
        </p>
        <p className="vdoc-awaken-copy-delay mt-2 max-w-xs text-sm text-white/50">
          Entering the living entertainment OS…
        </p>

        <div className="vdoc-awaken-bar mt-8 h-px w-40 overflow-hidden rounded-full bg-white/10">
          <div className="vdoc-awaken-bar-fill h-full bg-gradient-to-r from-transparent via-cyan to-transparent" />
        </div>
      </div>
    </div>
  )
}
