'use client'

import { Bell } from 'lucide-react'
import { UPCOMING } from '@/lib/live/data'
import { DsButton } from '@/components/ds'
import { CATEGORY_LABEL } from '@/lib/live/data'

export function UpcomingTimeline() {
  return (
    <section
      id="upcoming"
      className="relative py-16 md:py-24"
      aria-labelledby="upcoming-title"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="ds-label mb-3">Later tonight</p>
        <h2 id="upcoming-title" className="font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-lunar">
          Next on Vyra
        </h2>
        <p className="mt-3 max-w-md ds-body">Set a reminder. Enter when the signal opens.</p>

        <div
          className="ix-scroll mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          role="list"
          aria-label="Upcoming events"
        >
          {UPCOMING.map((event, i) => (
            <article
              key={event.id}
              role="listitem"
              className="relative w-[min(85vw,22rem)] shrink-0 snap-start overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[#10141B] animate-rise"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="vdoc-frame h-28 opacity-70"
                style={{ ['--frame-hue' as string]: event.hue }}
                aria-hidden
              />
              <div className="border-t border-[var(--border)] p-5">
                <p className="font-mono text-[12px] text-cyan">{event.startsAt}</p>
                <p className="mt-1 text-[12px] text-muted-foreground">{event.countdownLabel}</p>
                <p className="ds-label mt-4">{CATEGORY_LABEL[event.category]}</p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-lunar">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
                <div className="mt-5">
                  <DsButton variant="outline" size="sm">
                    <Bell className="size-3.5" aria-hidden />
                    Reminder
                  </DsButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
