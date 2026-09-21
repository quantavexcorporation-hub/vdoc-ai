import * as React from 'react'
import { cn } from '@/lib/utils'

function DsSkeleton({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="ds-skeleton"
      className={cn(
        'ds-skeleton-shine rounded-[var(--radius-md)]',
        className
      )}
      aria-hidden
      {...props}
    />
  )
}

function DsSkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-2xl)] border border-white/10 bg-surface-1 p-6',
        className
      )}
      aria-busy="true"
      aria-label="Loading"
    >
      <DsSkeleton className="mb-5 aspect-[16/10] w-full rounded-[var(--radius-xl)]" />
      <DsSkeleton className="mb-3 h-5 w-2/3" />
      <DsSkeleton className="mb-2 h-4 w-full" />
      <DsSkeleton className="h-4 w-4/5" />
    </div>
  )
}

function DsSkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4', className)} aria-busy="true">
      <DsSkeleton className="size-11 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <DsSkeleton className="h-4 w-1/3" />
        <DsSkeleton className="h-3 w-2/3" />
      </div>
    </div>
  )
}

export { DsSkeleton, DsSkeletonCard, DsSkeletonRow }
