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
  life: number
  hue: number
}

/**
 * Magical AI thinking field — neural particles, gradient wave, moving light.
 * GPU/canvas rAF. Not a spinner.
 */
function NeuralThoughtCanvas({ className }: { className?: string }) {
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
    let t = 0
    let particles: Particle[] = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(48, Math.floor((w * h) / 2800))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: 0.8 + Math.random() * 1.8,
        life: Math.random(),
        hue: Math.random() > 0.55 ? 195 : 265,
      }))
    }

    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)

      // Gradient wave wash
      const waveY = h * 0.5 + Math.sin(t * 1.2) * (h * 0.12)
      const g = ctx.createLinearGradient(0, waveY - 40, w, waveY + 40)
      g.addColorStop(0, 'rgba(90, 60, 200, 0)')
      g.addColorStop(0.35 + Math.sin(t) * 0.08, 'rgba(90, 200, 255, 0.14)')
      g.addColorStop(0.55, 'rgba(140, 100, 255, 0.18)')
      g.addColorStop(1, 'rgba(90, 60, 200, 0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // Moving light sweep
      const lx = ((t * 0.22) % 1.4) * w - w * 0.2
      const light = ctx.createRadialGradient(lx, h * 0.45, 0, lx, h * 0.45, w * 0.35)
      light.addColorStop(0, 'rgba(180, 240, 255, 0.16)')
      light.addColorStop(0.45, 'rgba(100, 180, 255, 0.06)')
      light.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = light
      ctx.fillRect(0, 0, w, h)

      // Soft pulse core
      const cx = w * 0.5
      const cy = h * 0.5
      const pulse = 0.55 + Math.sin(t * 2.4) * 0.2
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.42 * pulse)
      core.addColorStop(0, `rgba(160, 230, 255, ${0.22 * pulse})`)
      core.addColorStop(0.4, `rgba(120, 90, 255, ${0.1 * pulse})`)
      core.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = core
      ctx.fillRect(0, 0, w, h)

      // Particles + links
      for (const p of particles) {
        p.x += p.vx + Math.sin(t + p.life * 6) * 0.08
        p.y += p.vy + Math.cos(t * 0.9 + p.life * 4) * 0.08
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        // gentle pull toward center (intelligence gathering)
        p.vx += (cx - p.x) * 0.00035
        p.vy += (cy - p.y) * 0.00035
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > 1.1) {
          p.vx *= 1.1 / spd
          p.vy *= 1.1 / spd
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < 70) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(140, 210, 255, ${0.22 * (1 - d / 70)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        if (p.hue < 220) {
          glow.addColorStop(0, 'rgba(160, 240, 255, 0.85)')
          glow.addColorStop(1, 'rgba(160, 240, 255, 0)')
        } else {
          glow.addColorStop(0, 'rgba(180, 140, 255, 0.8)')
          glow.addColorStop(1, 'rgba(180, 140, 255, 0)')
        }
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(240, 250, 255, 0.95)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
      aria-hidden
    />
  )
}

const PHASES = [
  'Gathering context',
  'Tracing intent',
  'Weaving signal',
  'Shaping language',
  'Igniting stream',
]

/**
 * Full thinking experience shown before first tokens arrive.
 */
export function AiThinking({
  label = 'Thinking',
  className,
  compact = false,
}: {
  label?: string
  className?: string
  compact?: boolean
}) {
  const [phase, setPhase] = React.useState(0)
  const [progress, setProgress] = React.useState(8)
  const [tokens, setTokens] = React.useState(0)

  React.useEffect(() => {
    const phaseId = window.setInterval(() => {
      setPhase((p) => (p + 1) % PHASES.length)
    }, 1600)
    const progId = window.setInterval(() => {
      setProgress((p) => Math.min(94, p + 1 + Math.random() * 3))
      setTokens((n) => n + Math.floor(2 + Math.random() * 5))
    }, 180)
    return () => {
      window.clearInterval(phaseId)
      window.clearInterval(progId)
    }
  }, [])

  const status = label === 'Composing' || label === 'Thinking' ? PHASES[phase] : label

  return (
    <div
      className={cn(
        'ai-thought relative w-full overflow-hidden rounded-2xl border border-white/[0.08]',
        'bg-gradient-to-b from-white/[0.05] to-white/[0.015]',
        compact ? 'min-h-[88px] p-3' : 'min-h-[140px] p-4 sm:p-5',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={status}
    >
      <NeuralThoughtCanvas />

      {/* Gradient wave ribbon */}
      <div className="ai-thought-wave pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70" aria-hidden />

      {/* Moving light bar */}
      <div className="ai-thought-beam pointer-events-none absolute inset-y-0 w-24 opacity-60" aria-hidden />

      <div className="relative z-[1] flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {/* Pulsing intelligence core */}
          <div className="relative flex size-10 shrink-0 items-center justify-center" aria-hidden>
            <span className="ai-pulse-ring absolute inset-0 rounded-full border border-cyan/35" />
            <span className="ai-pulse-ring ai-pulse-ring-delay absolute inset-[-3px] rounded-full border border-neon/25" />
            <span className="ai-pulse-core size-2.5 rounded-full bg-cyan shadow-[0_0_16px_var(--cyan),0_0_28px_oklch(0.7_0.18_255_/0.45)]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-[14px] font-medium tracking-tight text-lunar">
              {status}
              <span className="motion-ellipsis" aria-hidden />
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Live generation · {tokens} tokens synthesizing
            </p>
          </div>

          <span className="tabular-nums font-mono text-[11px] text-cyan/80">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress visualization */}
        <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="ai-progress-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cosmic via-cyan to-neon"
            style={{ width: `${progress}%` }}
          />
          <div className="ai-progress-glint absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Token stream preview — ghost glyphs */}
        <div className="ai-token-stream flex gap-1.5 overflow-hidden font-mono text-[10px] text-cyan/40">
          {Array.from({ length: compact ? 12 : 18 }).map((_, i) => (
            <span
              key={i}
              className="ai-token-chip rounded px-1 py-0.5 bg-white/[0.03]"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {['λ', '∑', '∴', '▸', '◈', '∿', '✦', '⊙'][i % 8]}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Compact strip while tokens are already streaming.
 */
export function LiveGenerationStrip({
  className,
  tokenHint,
}: {
  className?: string
  tokenHint?: number
}) {
  return (
    <div
      className={cn(
        'relative mt-3 flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2',
        className
      )}
      aria-hidden
    >
      <span className="ai-pulse-core size-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
      <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="ai-stream-bar absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-cyan to-transparent" />
      </div>
      <span className="font-mono text-[10px] text-muted-foreground/70">
        streaming{tokenHint != null ? ` · ${tokenHint}` : ''}
      </span>
    </div>
  )
}

/**
 * Loading orb — intelligent indeterminate state
 */
export function LoadingOrb({
  className,
  label = 'Rendering',
}: {
  className?: string
  label?: string
}) {
  return (
    <div
      className={cn('flex flex-col items-center gap-4', className)}
      role="status"
      aria-live="polite"
    >
      <div className="relative size-20 overflow-hidden rounded-2xl border border-white/[0.08]" aria-hidden>
        <NeuralThoughtCanvas />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="ai-pulse-core size-2.5 rounded-full bg-cyan shadow-[0_0_16px_var(--cyan)]" />
        </div>
      </div>
      <p className="text-[12px] tracking-wide text-muted-foreground">{label}</p>
    </div>
  )
}

/** Blinking typing caret used in streams */
export function TypingCursor({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.1em] rounded-[1px] bg-cyan align-baseline motion-caret',
        className
      )}
      aria-hidden
    />
  )
}

/** Skeleton shimmer block */
export function MotionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl bg-white/[0.04]',
        'relative before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-white/[0.08] before:to-transparent',
        'before:animate-[motion-shimmer_1.6s_ease_infinite]',
        className
      )}
      aria-hidden
    />
  )
}
