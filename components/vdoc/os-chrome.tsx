"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { label: "Enter", href: "#enter" },
  { label: "Living", href: "#living" },
  { label: "Realms", href: "#realms" },
  { label: "Presence", href: "#presence" },
  { label: "Create", href: "#create" },
]

export function OsChrome() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <a
          href="#enter"
          className="group relative z-10 flex items-baseline gap-0.5"
          aria-label="VDOC home"
        >
          <span className="font-display text-2xl font-semibold tracking-tight text-lunar md:text-[1.65rem]">
            VDOC
          </span>
          <span
            className="ml-1.5 inline-block h-1.5 w-1.5 translate-y-[-0.35rem] rounded-full bg-signal animate-signal"
            aria-hidden
          />
        </a>

        <nav
          className={cn(
            "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 md:flex",
            scrolled && "glass-soft surface-depth"
          )}
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <a
            href="#enter"
            className="hidden rounded-full bg-white px-5 py-2.5 text-[13px] font-medium tracking-wide text-zinc-950 transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_var(--glow-warm)] sm:inline-flex"
          >
            Open VDOC
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full glass-soft md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span
                className={cn(
                  "block h-px w-4 bg-foreground transition-transform duration-300",
                  open && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-foreground transition-transform duration-300",
                  open && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "mx-6 mt-3 overflow-hidden rounded-2xl glass-panel surface-depth transition-all duration-400 md:hidden",
          open ? "max-h-80 opacity-100" : "pointer-events-none max-h-0 opacity-0 border-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#enter"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-lunar px-4 py-3 text-center text-sm font-medium text-primary-foreground"
          >
            Open VDOC
          </a>
        </nav>
      </div>
    </header>
  )
}
