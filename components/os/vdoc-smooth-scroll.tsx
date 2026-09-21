'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Smooth scroll scoped to #vdoc-main only — sidebar never moves.
 */
export function VdocSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const wrapper = document.getElementById('vdoc-main')
    const content = document.getElementById('vdoc-main-content')
    if (!wrapper || !content) return

    const lenis = new Lenis({
      wrapper,
      content,
      // Slightly longer + softer ease = less abrupt stops
      duration: 1.15,
      easing: (t) => {
        // easeOutExpo-ish, capped for buttery settle
        return t === 1 ? 1 : 1 - Math.pow(2, -11 * t)
      },
      smoothWheel: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.85,
      syncTouch: false,
      lerp: 0.085,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
