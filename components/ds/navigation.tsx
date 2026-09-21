'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type DsNavItem = {
  label: string
  href: string
  active?: boolean
}

export interface DsNavigationProps {
  items: DsNavItem[]
  brand?: React.ReactNode
  trailing?: React.ReactNode
  className?: string
  scrolled?: boolean
}

function DsNavigation({
  items,
  brand,
  trailing,
  className,
  scrolled,
}: DsNavigationProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-[var(--duration-slow)]',
        scrolled ? 'py-3' : 'py-5',
        className
      )}
    >
      <div className="ds-container flex items-center justify-between gap-4">
        <div className="shrink-0">{brand}</div>

        <nav
          aria-label="Primary"
          className={cn(
            'absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full px-2 py-1.5 md:flex',
            scrolled && 'ds-glass'
          )}
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-[var(--duration-normal)]',
                item.active
                  ? 'text-cyan'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">{trailing}</div>
      </div>
    </header>
  )
}

export { DsNavigation }
