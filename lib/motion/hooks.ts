'use client'

import * as React from 'react'
import { SPRING, springStep, prefersReducedMotion, type SpringConfig } from '@/lib/motion/spring'

/**
 * Spring toward a 2D target every frame. Returns live {x,y} for transform.
 */
export function useSpring2D(
  target: { x: number; y: number },
  config: SpringConfig = SPRING.soft
) {
  const [value, setValue] = React.useState(target)
  const state = React.useRef({
    x: target.x,
    y: target.y,
    vx: 0,
    vy: 0,
  })
  const targetRef = React.useRef(target)
  targetRef.current = target

  React.useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(targetRef.current)
      return
    }
    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const rawDt = (now - last) / 1000
      last = now
      const dt = Math.min(rawDt, 1 / 30) // clamp for tab switches
      const t = targetRef.current
      const sx = springStep(state.current.x, t.x, state.current.vx, config, dt)
      const sy = springStep(state.current.y, t.y, state.current.vy, config, dt)
      state.current = { x: sx.value, y: sy.value, vx: sx.velocity, vy: sy.velocity }

      const settled =
        Math.abs(sx.value - t.x) < 0.05 &&
        Math.abs(sy.value - t.y) < 0.05 &&
        Math.abs(sx.velocity) < 0.05 &&
        Math.abs(sy.velocity) < 0.05

      setValue({ x: sx.value, y: sy.value })
      if (!settled) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target.x, target.y, config])

  return value
}

export function useMouseParallax(strength = 12) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const target = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    if (prefersReducedMotion()) return
    let raf = 0
    let current = { x: 0, y: 0 }
    let vx = 0
    let vy = 0

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      target.current = { x: nx * strength, y: ny * strength }
    }

    const tick = () => {
      const sx = springStep(current.x, target.current.x, vx, SPRING.soft, 1 / 60)
      const sy = springStep(current.y, target.current.y, vy, SPRING.soft, 1 / 60)
      current = { x: sx.value, y: sy.value }
      vx = sx.velocity
      vy = sy.velocity
      setOffset(current)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return offset
}
