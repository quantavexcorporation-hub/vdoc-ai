'use client'

import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; r: number }

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * Sparse neural field — low node count, paused offscreen, 30fps throttle.
 */
export function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return

    const rand = seeded(42)
    let nodes: Node[] = []
    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let visible = true
    let running = false
    let last = 0
    let glow: CanvasGradient | null = null

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      w = canvas.clientWidth
      h = canvas.clientHeight
      if (w < 2 || h < 2) return
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(14, Math.max(8, Math.floor((w * h) / 52000)))
      nodes = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.22,
        vy: (rand() - 0.5) * 0.22,
        r: 1.1 + rand() * 1.2,
      }))
      glow = ctx.createRadialGradient(w * 0.7, h * 0.25, 0, w * 0.7, h * 0.25, w * 0.7)
      glow.addColorStop(0, 'rgba(140, 90, 255, 0.08)')
      glow.addColorStop(0.5, 'rgba(40, 210, 240, 0.04)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
    }

    const draw = (now: number) => {
      if (!visible) {
        running = false
        return
      }
      // ~30fps — enough for ambient, half the cost
      if (now - last < 32) {
        raf = requestAnimationFrame(draw)
        return
      }
      last = now

      ctx.clearRect(0, 0, w, h)
      if (glow) {
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, w, h)
      }

      const linkDist = Math.min(120, w * 0.12)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy
        if (a.x < 0 || a.x > w) a.vx *= -1
        if (a.y < 0 || a.y > h) a.vy *= -1

        for (let j = i + 1; j < nodes.length; j += 3) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDist) {
            ctx.strokeStyle = `rgba(120, 230, 255, ${(1 - dist / linkDist) * 0.28})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        ctx.fillStyle = 'rgba(170, 140, 255, 0.22)'
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(240, 248, 255, 0.75)'
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      last = 0
      raf = requestAnimationFrame(draw)
    }

    resize()
    start()

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else {
          cancelAnimationFrame(raf)
          running = false
        }
      },
      { threshold: 0.08, rootMargin: '40px' }
    )
    io.observe(canvas)

    let resizeT = 0
    const onResize = () => {
      window.clearTimeout(resizeT)
      resizeT = window.setTimeout(resize, 120)
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeT)
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ width: '100%', height: '100%' }}
    />
  )
}
