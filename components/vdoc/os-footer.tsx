export function OsFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight text-lunar">
            VDOC
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            AI native entertainment operating system.
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground"
          aria-label="Footer"
        >
          <a href="#living" className="transition-colors hover:text-foreground">
            Living
          </a>
          <a href="#realms" className="transition-colors hover:text-foreground">
            Realms
          </a>
          <a href="#presence" className="transition-colors hover:text-foreground">
            Presence
          </a>
          <a href="#create" className="transition-colors hover:text-foreground">
            Create
          </a>
        </nav>

        <p className="font-mono text-[11px] tracking-wide text-muted-foreground/70">
          © {new Date().getFullYear()} VDOC
        </p>
      </div>
    </footer>
  )
}
