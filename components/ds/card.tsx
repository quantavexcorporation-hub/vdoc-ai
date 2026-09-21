import * as React from 'react'
import { cn } from '@/lib/utils'

function DsCard({
  className,
  interactive,
  ...props
}: React.ComponentProps<'div'> & { interactive?: boolean }) {
  return (
    <div
      data-slot="ds-card"
      className={cn(
        'rounded-[var(--radius-2xl)] border border-white/10 bg-surface-1 p-6',
        'shadow-[var(--shadow-sm)]',
        interactive &&
          'ds-hoverable ds-pressable cursor-pointer hover:border-white/16 hover:shadow-[var(--shadow-md)]',
        className
      )}
      {...props}
    />
  )
}

function DsCardMedia({
  className,
  src,
  alt = '',
  ...props
}: React.ComponentProps<'div'> & { src: string; alt?: string }) {
  return (
    <div
      data-slot="ds-card-media"
      className={cn(
        'relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden rounded-t-[var(--radius-2xl)]',
        className
      )}
      {...props}
    >
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[var(--duration-slower)] ease-[var(--ease-emphasized)] group-hover:scale-[1.03]"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent opacity-80" />
    </div>
  )
}

function DsCardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="ds-card-title"
      className={cn('ds-heading-sm text-lunar', className)}
      {...props}
    />
  )
}

function DsCardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="ds-card-description"
      className={cn('mt-2 ds-body-sm', className)}
      {...props}
    />
  )
}

function DsCardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="ds-card-footer"
      className={cn('mt-5 flex items-center gap-3', className)}
      {...props}
    />
  )
}

export { DsCard, DsCardMedia, DsCardTitle, DsCardDescription, DsCardFooter }
