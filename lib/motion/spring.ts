/** Shared motion utilities — 60fps, GPU-first (transform/opacity only) */

export const SPRING = {
  snappy: { stiffness: 380, damping: 28, mass: 0.8 },
  soft: { stiffness: 180, damping: 22, mass: 1 },
  heavy: { stiffness: 120, damping: 26, mass: 1.2 },
  magnetic: { stiffness: 420, damping: 32, mass: 0.7 },
} as const

export type SpringConfig = {
  stiffness: number
  damping: number
  mass: number
}

/** Semi-implicit Euler spring step — stable at 60fps */
export function springStep(
  current: number,
  target: number,
  velocity: number,
  cfg: SpringConfig,
  dt: number
): { value: number; velocity: number } {
  const force = -cfg.stiffness * (current - target)
  const damp = -cfg.damping * velocity
  const accel = (force + damp) / cfg.mass
  const nextV = velocity + accel * dt
  const next = current + nextV * dt
  return { value: next, velocity: nextV }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
