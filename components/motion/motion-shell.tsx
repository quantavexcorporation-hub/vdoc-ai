'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Lightweight shell — CSS atmosphere only (no canvases, no rAF).
 */
export function MotionShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  /** @deprecated ignored — canvases are route-local for performance */
  neural?: boolean
  /** @deprecated ignored */
  particles?: boolean
}) {
  return (
    <div className={cn('relative', className)}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_10%,oklch(0.52_0.18_295_/0.14),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_80%,oklch(0.82_0.14_200_/0.08),transparent_45%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function FadeInView({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-[700ms] ease-[var(--ease-emphasized)]',
        show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
