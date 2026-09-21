import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium select-none',
    'transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
    'disabled:pointer-events-none disabled:opacity-40',
    '[&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0',
    'outline-none focus-visible:shadow-[var(--shadow-focus)]',
    'ix-btn relative overflow-hidden',
    'active:scale-[0.98]',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-cyan text-primary-foreground hover:bg-cyan-soft hover:shadow-[var(--shadow-glow-cyan)] hover:-translate-y-px',
        secondary:
          'bg-cosmic-soft text-lunar hover:bg-cosmic hover:shadow-[var(--shadow-glow-cosmic)] hover:-translate-y-px',
        highlight:
          'bg-neon text-lunar hover:bg-neon-soft hover:shadow-[var(--shadow-glow-neon)] hover:-translate-y-px',
        ghost:
          'bg-transparent text-lunar-muted hover:bg-white/[0.06] hover:text-lunar',
        outline:
          'border border-white/12 bg-white/[0.02] text-lunar hover:border-cyan/30 hover:bg-cyan/[0.06] hover:-translate-y-px',
        glass:
          'ds-glass text-lunar hover:border-cyan/25 hover:bg-white/[0.08] hover:-translate-y-px',
        lunar:
          'bg-lunar text-space hover:bg-white hover:shadow-[var(--shadow-glow-cyan)] hover:-translate-y-px',
        destructive:
          'bg-error text-error-foreground hover:brightness-110',
        link:
          'bg-transparent text-cyan underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-8 rounded-[var(--radius-md)] px-3 text-[13px]',
        md: 'h-10 rounded-[var(--radius-lg)] px-4 text-sm',
        lg: 'h-12 rounded-[var(--radius-xl)] px-6 text-[15px]',
        xl: 'h-14 rounded-[var(--radius-2xl)] px-8 text-base',
        icon: 'size-10 rounded-[var(--radius-lg)]',
        'icon-sm': 'size-8 rounded-[var(--radius-md)]',
        'icon-lg': 'size-12 rounded-[var(--radius-xl)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface DsButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function DsButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: DsButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="ds-button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { DsButton, buttonVariants }
