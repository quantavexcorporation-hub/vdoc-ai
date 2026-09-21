'use client'

import * as React from 'react'
import { Activity } from 'lucide-react'
import type { CategoryMeta } from '@/lib/universe/data'

/** Quiet live signal — one line, not a dashboard. */
export function LiveStatus({ category }: { category: CategoryMeta }) {
  const [pulse, setPulse] = React.useState(category.status.generating)

  React.useEffect(() => {
    setPulse(category.status.generating)
    const id = window.setInterval(() => {
      setPulse((n) => n + Math.floor(Math.random() * 3))
    }, 3200)
    return () => window.clearInterval(id)
  }, [category.id, category.status.generating])

  return (
    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Activity className="size-3.5 text-cyan" aria-hidden />
      <span>
        <span className="tabular-nums text-lunar">{pulse.toLocaleString()}</span>
        {' '}generating · {category.status.online} in realm
      </span>
    </p>
  )
}
