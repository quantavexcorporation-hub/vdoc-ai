'use client'

import { Suspense, type ReactNode } from 'react'
import { HomeChrome } from '@/components/home/home-chrome'
import { VdocSmoothScroll } from '@/components/os/vdoc-smooth-scroll'
import { cn } from '@/lib/utils'

/**
 * Quantrion-style shell: sidebar stays put, only main pane scrolls.
 * Optional rightRail sits beside main (desktop) like Quantrion PromoRightRail.
 */
export function VdocShell({
  children,
  className,
  mood,
  rightRail,
}: {
  children: ReactNode
  className?: string
  mood?: string
  rightRail?: ReactNode
}) {
  return (
    <div
      className={cn(
        'vdoc-main-canvas vdoc-machine-os flex h-dvh overflow-hidden bg-[#212121] text-foreground',
        className
      )}
      data-mood={mood}
      data-machine="ai-engine"
    >
      <Suspense fallback={null}>
        <HomeChrome />
      </Suspense>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="vdoc-mobile-top-spacer shrink-0 md:hidden" aria-hidden />
        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <div
            id="vdoc-main"
            className="min-h-0 min-w-0 flex-1 overflow-x-clip overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
          >
            <div
              id="vdoc-main-content"
              className="min-w-0 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
            >
              {children}
            </div>
          </div>
          {rightRail ? (
            <div className="hidden min-h-0 shrink-0 overflow-hidden xl:block">{rightRail}</div>
          ) : null}
        </div>
      </div>

      <VdocSmoothScroll />
    </div>
  )
}
