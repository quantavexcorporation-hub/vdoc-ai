'use client'

export function AiExperiencePanel() {
  return (
    <section
      id="ai-never-sleeps"
      className="relative py-16 md:py-28"
      aria-labelledby="ai-panel-title"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--glass-border-strong)] bg-[#10141B]/70 ds-glass-strong">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,oklch(0.82_0.14_200_/0.18),transparent_55%),radial-gradient(ellipse_at_70%_70%,oklch(0.52_0.18_295_/0.22),transparent_50%)]"
            aria-hidden
          />
          <div className="absolute inset-0 opacity-30 mix-blend-screen" aria-hidden>
            <div className="absolute left-[20%] top-[30%] size-1 rounded-full bg-cyan animate-pulse" />
            <div
              className="absolute left-[55%] top-[45%] size-1 rounded-full bg-neon animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
            <div
              className="absolute left-[70%] top-[25%] size-1.5 rounded-full bg-cosmic-glow/80 animate-pulse"
              style={{ animationDelay: '0.8s' }}
            />
            <div
              className="absolute left-[35%] top-[65%] size-1 rounded-full bg-cyan/70 animate-pulse"
              style={{ animationDelay: '1.1s' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070A]/85 via-[#05070A]/40 to-transparent" />

          <div className="relative grid gap-10 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-14">
            <div>
              <p className="ds-label mb-4">Always on</p>
              <h2
                id="ai-panel-title"
                className="font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-lunar"
              >
                PLAYVERSE stays awake
              </h2>
              <p className="mt-5 max-w-md ds-body">
                While you rest, experiences continue. Stories evolve. Worlds keep running.
                Characters remember. New signal appears in real time.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {[
                  'AI stories evolve continuously',
                  'AI worlds continue running',
                  'AI characters remember you',
                  'New content appears in real time',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                    <span className="text-lunar/90">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="relative min-h-[16rem] overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-black/30"
              aria-hidden
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,oklch(0.82_0.14_200_/0.2),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,oklch(0.52_0.18_295_/0.25),transparent_55%)]" />
              <div className="absolute inset-x-6 bottom-6 top-6 rounded-[var(--radius-lg)] border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
                <div className="flex h-full flex-col justify-between p-5">
                  <p className="font-mono text-[11px] tracking-wider text-cyan">NEURAL · ACTIVE</p>
                  <div>
                    <p className="font-display text-2xl font-semibold text-lunar">Continuous field</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Generation never queues for night.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
