'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

export type DsSidebarItem = {
  icon: LucideIcon
  label: string
  href?: string
  active?: boolean
  onClick?: () => void
}

export interface DsSidebarProps {
  items: DsSidebarItem[]
  brand?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  defaultExpanded?: boolean
}

function DsSidebar({
  items,
  brand,
  footer,
  className,
  defaultExpanded = false,
}: DsSidebarProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen flex-col py-6',
        'ds-glass border-r border-white/[0.06]',
        'transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-emphasized)]',
        expanded ? 'w-56' : 'w-16',
        className
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-label="Sidebar"
    >
      <div className="mb-8 px-4">{brand}</div>

      <nav className="flex-1 space-y-1 px-2">
        {items.map((item) => {
          const Comp = item.href ? 'a' : 'button'
          return (
            <Comp
              key={item.label}
              href={item.href}
              type={item.href ? undefined : 'button'}
              onClick={item.onClick}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'flex w-full items-center gap-3 rounded-[var(--radius-lg)] px-3 py-3 text-sm font-medium',
                'transition-colors duration-[var(--duration-normal)]',
                item.active
                      ? 'bg-cyan/15 text-cyan shadow-[inset_0_0_0_1px_oklch(0.82_0.14_200_/0.25)]'
                  : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
              )}
            >
              <item.icon className="size-5 shrink-0" aria-hidden />
              <span
                className={cn(
                  'truncate transition-opacity duration-[var(--duration-normal)]',
                  expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
                )}
              >
                {item.label}
              </span>
            </Comp>
          )
        })}
      </nav>

      {footer && (
        <div
          className={cn(
            'px-2 transition-opacity duration-[var(--duration-normal)]',
            expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {footer}
        </div>
      )}
    </aside>
  )
}

export { DsSidebar }
