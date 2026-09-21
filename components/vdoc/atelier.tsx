"use client"

const ateliers = [
  {
    title: "Story",
    line: "Begin with a sentence. VDOC expands the rest.",
  },
  {
    title: "Character",
    line: "Shape a presence with memory, voice, and will.",
  },
  {
    title: "Realm",
    line: "Design a place that reacts to every choice.",
  },
]

export function Atelier() {
  return (
    <section
      id="create"
      className="relative py-28 md:py-40"
      aria-labelledby="create-heading"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:items-end">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-signal">
              Create
            </p>
            <h2
              id="create-heading"
              className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              Make something the world can enter.
            </h2>
            <p className="mt-6 max-w-md text-pretty text-muted-foreground md:text-lg">
              Creator tools without the studio clutter — quiet, precise, impossibly capable.
            </p>
            <a
              href="#enter"
              className="mt-10 inline-flex rounded-full bg-lunar px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_48px_var(--glow-warm)]"
            >
              Open Atelier
            </a>
          </div>

          <ul className="space-y-0 divide-y divide-white/[0.08]" role="list">
            {ateliers.map((item) => (
              <li key={item.title}>
                <button
                  type="button"
                  className="group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors"
                >
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight text-lunar transition-colors group-hover:text-signal">
                      {item.title}
                    </p>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground md:text-[15px]">
                      {item.line}
                    </p>
                  </div>
                  <span
                    className="mt-2 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                    aria-hidden
                  >
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
