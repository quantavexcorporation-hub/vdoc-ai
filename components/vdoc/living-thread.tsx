"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const threads = [
  {
    title: "Rain District, Chapter 7",
    status: "Paused at the bridge",
    tone: "Noir · Choice pending",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1400&q=80&auto=format&fit=crop",
  },
  {
    title: "Garden of Echoes",
    status: "Your companion is waiting",
    tone: "Fantasy · Living scene",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80&auto=format&fit=crop",
  },
  {
    title: "Orbital Quiet",
    status: "Score adapting to you",
    tone: "Sci-fi · Ambient",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&q=80&auto=format&fit=crop",
  },
]

export function LivingThread() {
  const scroller = useRef<HTMLDivElement>(null)

  return (
    <section
      id="living"
      className="relative py-28 md:py-36"
      aria-labelledby="living-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-xl md:mb-20">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-signal">
            Living
          </p>
          <h2
            id="living-heading"
            className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            Pick up exactly where the world left you.
          </h2>
        </div>
      </div>

      <div
        ref={scroller}
        className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:gap-7 md:px-10"
        role="list"
        aria-label="Active experiences"
      >
        {threads.map((thread, i) => (
          <article
            key={thread.title}
            role="listitem"
            className="group relative h-[28rem] w-[min(85vw,26rem)] shrink-0 snap-start overflow-hidden rounded-[1.75rem] md:h-[32rem] md:w-[30rem]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ backgroundImage: `url(${thread.image})` }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-[1.75rem]" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7 md:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-filament/90">
                {thread.tone}
              </p>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-lunar md:text-[1.7rem]">
                {thread.title}
              </h3>
              <p className="text-sm text-muted-foreground">{thread.status}</p>
              <button
                type="button"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-lunar/95 px-5 py-2.5 text-[13px] font-medium text-primary-foreground transition-all duration-300 group-hover:gap-3 hover:bg-lunar"
              >
                Resume
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <span className="sr-only">Experience {i + 1} of {threads.length}</span>
          </article>
        ))}

        <div className="w-6 shrink-0 md:w-10" aria-hidden />
      </div>
    </section>
  )
}
