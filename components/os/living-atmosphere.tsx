'use client'

import { cn } from '@/lib/utils'

/**
 * Living canvas — calm charcoal with AI-engine + data-layer depth.
 * Enhancement only: decorative, pointer-events none, no layout change.
 */
export function LivingAtmosphere({
  className,
  intensity = 'subtle',
}: {
  className?: string
  intensity?: 'subtle' | 'normal' | 'strong'
}) {
  const op =
    intensity === 'subtle' ? 'opacity-25' : intensity === 'strong' ? 'opacity-45' : 'opacity-32'

  return (
    <div
      className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#212121]" />
      {/* Engine wash — soft top light */}
      <div
        className={cn(
          'absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-18%,rgba(120,160,200,0.14),transparent_55%)]',
          op
        )}
      />
      {/* Data layer — quiet cyan depth */}
      <div
        className={cn(
          'absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_85%_75%,rgba(103,232,249,0.06),transparent_60%)]',
          op
        )}
      />
      {/* Precision grid */}
      <div className="vdoc-machine-grid absolute inset-0 opacity-[0.35]" />
      {/* Slow engine pulse */}
      <div className="vdoc-engine-pulse absolute left-1/2 top-[18%] h-40 w-[min(70%,36rem)] -translate-x-1/2" />
    </div>
  )
}
