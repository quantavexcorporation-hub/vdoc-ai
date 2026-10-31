import { Suspense, type ReactNode } from 'react'
import { CardsShell } from '@/components/cards/cards-shell'

export default function CardsLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-bg-void text-muted-foreground">
          Opening Cards…
        </div>
      }
    >
      <CardsShell>{children}</CardsShell>
    </Suspense>
  )
}
