'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { SPRING, springStep, prefersReducedMotion } from '@/lib/motion/spring'

/**
 * Magnetic attractor — spring-smoothed cursor pull.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
  radius = 120,
  as: Comp = 'div',
}: {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: 'div' | 'button' | 'span'
}) {
  const ref = React.useRef<HTMLElement>(null)
  const [t, setT] = React.useState({ x: 0, y: 0 })
  const state = React.useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, raf: 0 })

  React.useEffect(() => () => cancelAnimationFrame(state.current.raf), [])

  const loop = () => {
    cancelAnimationFrame(state.current.raf)
    if (prefersReducedMotion()) return
    const tick = () => {
      const s = state.current
      const sx = springStep(s.x, s.tx, s.vx, SPRING.magnetic, 1 / 60)
      const sy = springStep(s.y, s.ty, s.vy, SPRING.magnetic, 1 / 60)
      s.x = sx.value
      s.y = sy.value
      s.vx = sx.velocity
      s.vy = sy.velocity
      setT({ x: s.x, y: s.y })
      const settled =
        Math.abs(s.x - s.tx) < 0.08 &&
        Math.abs(s.y - s.ty) < 0.08 &&
        Math.abs(s.vx) < 0.08 &&
        Math.abs(s.vy) < 0.08
      if (!settled) s.raf = requestAnimationFrame(tick)
    }
    state.current.raf = requestAnimationFrame(tick)
  }

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > radius) {
      state.current.tx = 0
      state.current.ty = 0
    } else {
      const falloff = 1 - dist / radius
      state.current.tx = dx * strength * falloff
      state.current.ty = dy * strength * falloff
    }
    loop()
  }

  const onLeave = () => {
    state.current.tx = 0
    state.current.ty = 0
    loop()
  }

  return (
    <Comp
      ref={ref as never}
      className={cn('inline-flex will-change-transform', className)}
      style={{ transform: `translate3d(${t.x}px, ${t.y}px, 0)` }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </Comp>
  )
}
