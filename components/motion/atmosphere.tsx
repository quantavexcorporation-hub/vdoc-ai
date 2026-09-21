'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/motion/spring'
import { useMouseParallax } from '@/lib/motion/hooks'

/**
 * Global cursor intelligence — soft glow that follows intent.
 */
export function CursorField({ className }: { className?: string }) {
  const glow = React.useRef<HTMLDivElement>(null)
  const pos = React.useRef({ x: -200, y: -200, tx: -200, ty: -200 })

  React.useEffect(() => {
    if (prefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
    }

    const tick = () => {
      const p = pos.current
      p.x += (p.tx - p.x) * 0.14
      p.y += (p.ty - p.y) * 0.14
      if (glow.current) {
        glow.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glow}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[90] size-[420px] -translate-x-1/2 -translate-y-1/2',
          'rounded-full bg-[radial-gradient(circle,oklch(0.82_0.14_200_/0.12),transparent_62%)]',
          'mix-blend-screen will-change-transform',
          'hidden md:block',
          className
        )}
      aria-hidden
    />
  )
}

/**
 * Floating gradient orbs — parallax with the cursor.
 */
export function FloatingGradients({ className }: { className?: string }) {
  const offset = useMouseParallax(18)

  return (
    <div className={cn('pointer-events-none fixed inset-0 overflow-hidden', className)} aria-hidden>
      <div
        className="absolute -left-[10%] top-[-15%] size-[55vw] max-w-[720px] rounded-full bg-cosmic/25 blur-[100px] will-change-transform motion-float-a"
        style={{ transform: `translate3d(${offset.x * 0.6}px, ${offset.y * 0.4}px, 0)` }}
      />
      <div
        className="absolute -right-[8%] top-[20%] size-[40vw] max-w-[520px] rounded-full bg-cyan/15 blur-[90px] will-change-transform motion-float-b"
        style={{ transform: `translate3d(${offset.x * -0.5}px, ${offset.y * 0.7}px, 0)` }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] size-[45vw] max-w-[600px] rounded-full bg-neon/10 blur-[110px] will-change-transform motion-float-c"
        style={{ transform: `translate3d(${offset.x * 0.3}px, ${offset.y * -0.5}px, 0)` }}
      />
    </div>
  )
}
