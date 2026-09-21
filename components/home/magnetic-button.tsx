'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/motion/magnetic'

type MagneticButtonProps = React.ComponentProps<'button'> & {
  strength?: number
}

/**
 * Magnetic button — spring cursor attraction.
 */
export function MagneticButton({
  className,
  children,
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  return (
    <Magnetic strength={strength} as="div" className="inline-flex">
      <button
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center will-change-transform',
          'transition-transform duration-[var(--duration-fast)] ease-[var(--ease-emphasized)]',
          'active:scale-[0.97]',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Magnetic>
  )
}
