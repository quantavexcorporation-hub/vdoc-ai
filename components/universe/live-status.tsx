'use client'

import { Activity } from 'lucide-react'
import type { CategoryMeta } from '@/lib/universe/data'

/** Shelf signal — staged, not live telemetry. */
export function LiveStatus({ category }: { category: CategoryMeta }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Activity className="size-3.5 text-cyan" aria-hidden />
      <span>
        <span className="text-lunar">Preview floor</span>
        {' · '}
        {category.label} is staged. Counts here are not live.
      </span>
    </p>
  )
}
