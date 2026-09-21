'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/motion/spring'

/** Soft haptic-like press scale via data attribute */
export function usePressFeedback<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)

  const onPointerDown = React.useCallback(() => {
    ref.current?.setAttribute('data-pressed', 'true')
  }, [])
  const onPointerUp = React.useCallback(() => {
    ref.current?.removeAttribute('data-pressed')
  }, [])

  return {
    ref,
    pressProps: {
      onPointerDown,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onPointerCancel: onPointerUp,
    } as const,
  }
}

/** Ripple reward on click — cyan pulse from pointer */
export function useRipple() {
  const spawn = React.useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion()) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ripple = document.createElement('span')
    ripple.className = 'ix-ripple'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    el.appendChild(ripple)
    window.setTimeout(() => ripple.remove(), 650)
  }, [])
  return spawn
}

type IxButtonProps = React.ComponentProps<'button'> & {
  reward?: boolean
}

/** Intelligent interactive button shell */
export function IxButton({
  className,
  children,
  reward = true,
  onPointerDown,
  ...props
}: IxButtonProps) {
  const ripple = useRipple()
  return (
    <button
      type="button"
      className={cn('ix-btn relative overflow-hidden', className)}
      onPointerDown={(e) => {
        if (reward) ripple(e)
        onPointerDown?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

/** Selection chip with intelligent highlight */
export function IxSelectable({
  selected,
  className,
  children,
  onSelect,
}: {
  selected?: boolean
  className?: string
  children: React.ReactNode
  onSelect?: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn('ix-select', selected && 'ix-select-on', className)}
    >
      {children}
    </button>
  )
}

/** Drop zone with magnetic invitation state */
export function IxDropZone({
  active,
  className,
  children,
}: {
  active: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-drop={active ? 'active' : undefined}
      className={cn('ix-drop', active && 'ix-drop-active', className)}
    >
      {children}
      {active && (
        <div className="ix-drop-veil pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-[inherit]">
          <span className="rounded-full border border-cyan/30 bg-black/40 px-4 py-2 text-[12px] text-cyan backdrop-blur-md">
            Drop to attach
          </span>
        </div>
      )}
    </div>
  )
}

/** Scroll progress + soft scrollbar intelligence */
export function useIntelligentScroll(ref: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = el.scrollHeight - el.clientHeight
        const p = max > 0 ? el.scrollTop / max : 0
        el.style.setProperty('--ix-scroll', String(p))
        el.toggleAttribute('data-scrolled', el.scrollTop > 8)
      })
    }
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
    }
  }, [ref])
}

/** Swipe gesture helper for mobile sheets/rails */
export function useSwipe(
  onSwipe: (dir: 'left' | 'right' | 'up' | 'down') => void,
  threshold = 48
) {
  const start = React.useRef<{ x: number; y: number } | null>(null)
  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0]
      start.current = { x: t.clientX, y: t.clientY }
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (!start.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - start.current.x
      const dy = t.clientY - start.current.y
      start.current = null
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
      if (Math.abs(dx) > Math.abs(dy)) onSwipe(dx > 0 ? 'right' : 'left')
      else onSwipe(dy > 0 ? 'down' : 'up')
    },
  }
}

/** Typing reward — caret glow while composing */
export function IxTypingField({
  className,
  value,
  onChange,
  ...props
}: React.ComponentProps<'textarea'> & { value: string; onChange: (v: string) => void }) {
  const [typing, setTyping] = React.useState(false)
  const timer = React.useRef<number>(0)

  return (
    <textarea
      {...props}
      value={value}
      data-typing={typing || undefined}
      className={cn('ix-typefield', className)}
      onChange={(e) => {
        setTyping(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setTyping(false), 420)
        onChange(e.target.value)
      }}
    />
  )
}

/** Voice activation aura */
export function IxVoiceAura({ active, className }: { active: boolean; className?: string }) {
  if (!active) return null
  return (
    <span className={cn('ix-voice-aura', className)} aria-hidden>
      <span />
      <span />
      <span />
    </span>
  )
}

/** Submit burst reward */
export function playSubmitBurst(anchor: HTMLElement | null) {
  if (!anchor || prefersReducedMotion()) return
  const burst = document.createElement('span')
  burst.className = 'ix-submit-burst'
  anchor.appendChild(burst)
  window.setTimeout(() => burst.remove(), 700)
}
