'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

/** Soft enter on every route — used from app/template.tsx */
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      className={cn('motion-page-enter min-h-dvh', className)}
    >
      {children}
    </div>
  )
}
