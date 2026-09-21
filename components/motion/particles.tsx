'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/motion/spring'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

/**
 * Lightweight background particles — canvas, rAF, mouse wake.
 */
export function BackgroundParticles({
  className,
  density = 14000,
}: {
  className?: string
  density?: number
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    if (prefersReducedMotion()) return

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.floor((w * h) / density))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.6 + Math.random() * 1.6,
        a: 0.2 + Math.random() * 0.45,
      }))
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // Convert window coords to canvas space when drawing wake
      const rect = canvas.getBoundingClientRect()
      const mx = mouse.x - rect.left
      const my = mouse.y - rect.top

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const dx = p.x - mx
        const dy = p.y - my
        const d2 = dx * dx + dy * dy
        if (d2 < 16000) {
          p.vx += dx * -0.00004
          p.vy += dy * -0.00004
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 230, 255, ${p.a})`
        ctx.fill()
      }

      const linkR = 90
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < linkR) {
            const nearMouse =
              Math.hypot(a.x - mx, a.y - my) < 180 ||
              Math.hypot(b.x - mx, b.y - my) < 180
            if (!nearMouse && d > linkR * 0.55) continue
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(100, 210, 240, ${0.12 * (1 - d / linkR)})`
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [density])

  return (
    <canvas
      ref={ref}
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
      aria-hidden
    />
  )
}
