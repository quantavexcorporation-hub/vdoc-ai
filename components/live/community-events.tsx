'use client'

import { COMMUNITY_EVENTS } from '@/lib/live/data'
import { DsButton } from '@/components/ds'

export function CommunityEvents() {
  return (
    <section
      id="community-live"
      className="relative py-16 md:py-24"
      aria-labelledby="community-live-title"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="ds-label mb-3">Community</p>
        <h2 id="community-live-title" className="ds-heading-lg max-w-xl text-lunar">
          Gathered presence
        </h2>
        <p className="mt-3 max-w-lg ds-body">
          Movie nights, watch parties, Q&A, fan voting, and live challenges — shaped together.
        </p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {COMMUNITY_EVENTS.map((event) => (
            <li key={event.id}>
              <article className="flex h-full flex-col justify-between rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[#10141B]/90 p-6 transition-colors hover:border-cyan/20">
                <div>
                  <p className="ds-label">{event.tags[0]}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-lunar">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <p className="mt-4 text-[13px] text-muted-foreground">
                    <span className="text-lunar">{event.host}</span>
                    {' · '}
                    {event.viewers} inside
                  </p>
                </div>
                <div className="mt-6">
                  <DsButton variant="glass" size="sm">
                    Join gathering
                  </DsButton>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
