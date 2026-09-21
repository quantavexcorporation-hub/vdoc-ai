import type { ReactNode } from 'react'
import { PageTransition } from '@/components/motion/page-transition'

/**
 * Route template — page enter only.
 * Heavy canvases (neural / particles) stay route-local so navigation stays fast.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
