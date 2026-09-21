"use client"

const realms = [
  {
    name: "Neo Harbor",
    line: "A city that rewrites itself after midnight.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80&auto=format&fit=crop",
  },
  {
    name: "Lumen Fields",
    line: "Soft light. Ancient paths. Stories that bloom.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80&auto=format&fit=crop",
  },
  {
    name: "Driftline",
    line: "Silence between stars. Decisions that echo.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80&auto=format&fit=crop",
  },
]

export function Realms() {
  return (
    <section
      id="realms"
      className="relative py-28 md:py-36"
      aria-labelledby="realms-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-xl md:mb-20">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-signal">
            Realms
          </p>
          <h2
            id="realms-heading"
            className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            Step into spaces that notice you.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted-foreground md:text-lg">
            Not catalogs. Living environments — rendered, responsive, yours to shape.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          {realms.map((realm, index) => (
            <a
              key={realm.name}
              href="#enter"
              className="realm-plane group relative block min-h-[18rem] overflow-hidden rounded-[1.75rem] focus-visible:outline-offset-4 md:min-h-[22rem]"
              aria-label={`Enter ${realm.name}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${realm.image})`,
                  backgroundPosition: index === 1 ? "center 40%" : "center",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/45 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.07] rounded-[1.75rem]" />

              <div className="relative flex h-full min-h-[18rem] flex-col justify-end p-8 md:min-h-[22rem] md:p-12">
                <p className="mb-2 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  0{index + 1}
                </p>
                <h3 className="font-display text-3xl font-semibold tracking-tight text-lunar md:text-4xl">
                  {realm.name}
                </h3>
                <p className="mt-3 max-w-sm text-pretty text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85">
                  {realm.line}
                </p>
                <span className="mt-6 inline-flex text-[13px] font-medium text-signal opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100">
                  Enter realm →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
