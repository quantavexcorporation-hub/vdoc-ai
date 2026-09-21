'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { SPRING, springStep, prefersReducedMotion, clamp } from '@/lib/motion/spring'

type TiltCardProps = Omit<React.HTMLAttributes<HTMLElement>, 'style'> & {
  children: React.ReactNode
  maxTilt?: number
  glare?: boolean
  as?: 'div' | 'article' | 'button'
  style?: React.CSSProperties
}

/**
 * 3D tilt card — spring physics via direct DOM transforms (no React re-render storm).
 */
export function TiltCard({
  children,
  className,
  maxTilt = 10,
  glare = true,
  as: Comp = 'div',
  onPointerMove,
  onPointerLeave,
  style: styleProp,
  ...rest
}: TiltCardProps) {
  const ref = React.useRef<HTMLElement>(null)
  const glareRef = React.useRef<HTMLDivElement>(null)
  const anim = React.useRef({
    rx: 0,
    ry: 0,
    trx: 0,
    try: 0,
    vrx: 0,
    vry: 0,
    raf: 0,
  })

  React.useEffect(() => {
    return () => cancelAnimationFrame(anim.current.raf)
  }, [])

  const apply = (rx: number, ry: number, scale = 1.02) => {
    const el = ref.current
    if (!el) return
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale},${scale},1)`
  }

  const startLoop = () => {
    cancelAnimationFrame(anim.current.raf)
    if (prefersReducedMotion()) return

    const tick = () => {
      const a = anim.current
      const sx = springStep(a.rx, a.trx, a.vrx, SPRING.snappy, 1 / 60)
      const sy = springStep(a.ry, a.try, a.vry, SPRING.snappy, 1 / 60)
      a.rx = sx.value
      a.ry = sy.value
      a.vrx = sx.velocity
      a.vry = sy.velocity

      const settled =
        Math.abs(a.rx - a.trx) < 0.02 &&
        Math.abs(a.ry - a.try) < 0.02 &&
        Math.abs(a.vrx) < 0.02 &&
        Math.abs(a.vry) < 0.02

      apply(a.rx, a.ry, settled && a.trx === 0 && a.try === 0 ? 1 : 1.02)

      if (!settled) a.raf = requestAnimationFrame(tick)
    }
    anim.current.raf = requestAnimationFrame(tick)
  }

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(e)
    if (maxTilt <= 0 || prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    anim.current.trx = clamp((0.5 - py) * maxTilt * 2, -maxTilt, maxTilt)
    anim.current.try = clamp((px - 0.5) * maxTilt * 2, -maxTilt, maxTilt)
    if (glareRef.current) {
      glareRef.current.style.opacity = '0.35'
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, oklch(1 0 0 / 0.28), transparent 55%)`
    }
    startLoop()
  }

  const handleLeave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e)
    anim.current.trx = 0
    anim.current.try = 0
    if (glareRef.current) glareRef.current.style.opacity = '0'
    startLoop()
  }

  return (
    <Comp
      ref={ref as never}
      className={cn(
        'relative transform-gpu transition-[box-shadow] duration-[var(--duration-normal)]',
        '[transform-style:preserve-3d]',
        className
      )}
      {...rest}
      style={styleProp}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity duration-[var(--duration-normal)]"
          aria-hidden
        />
      )}
    </Comp>
  )
}
