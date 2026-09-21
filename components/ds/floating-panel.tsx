import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DsFloatingPanelProps extends React.ComponentProps<'div'> {
  elevated?: boolean
  strong?: boolean
}

function DsFloatingPanel({
  className,
  elevated = true,
  strong = false,
  ...props
}: DsFloatingPanelProps) {
  return (
    <div
      data-slot="ds-floating-panel"
      className={cn(
        strong ? 'ds-glass-strong' : 'ds-glass',
        'rounded-[var(--radius-2xl)]',
        elevated && 'shadow-[var(--shadow-xl)]',
        className
      )}
      {...props}
    />
  )
}

function DsFloatingPanelHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="ds-floating-panel-header"
      className={cn(
        'flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4',
        className
      )}
      {...props}
    />
  )
}

function DsFloatingPanelBody({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="ds-floating-panel-body"
      className={cn('px-5 py-4', className)}
      {...props}
    />
  )
}

export { DsFloatingPanel, DsFloatingPanelHeader, DsFloatingPanelBody }
