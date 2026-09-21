"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"
import { ArrowUp, AudioLines } from "lucide-react"

const suggestions = [
  "Continue my story in the rain district",
  "Open a quiet realm for two",
  "Cast me as the stranger who remembers",
]

export function CommandSurface() {
  const [value, setValue] = useState("")
  const [listening, setListening] = useState(false)

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (!value.trim()) return
    // Prototype surface — ready for AI wiring
    setValue("")
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <section
      id="enter"
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden pb-16 pt-28 md:justify-center md:pb-24 md:pt-32"
      aria-labelledby="vdoc-brand"
    >
      {/* Full-bleed cinematic plane */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2400&q=80&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.05_0.006_220_/0.55)_0%,oklch(0.05_0.006_220_/0.72)_42%,oklch(0.05_0.006_220_/0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,oklch(0.78_0.07_185_/0.12),transparent_55%)] animate-atmosphere" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,oklch(0.82_0.06_75_/0.08),transparent_45%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-6 md:px-10">
        <p
          id="vdoc-brand"
          className="animate-rise font-display text-[clamp(3.5rem,12vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-lunar"
        >
          VDOC
        </p>

        <p className="animate-rise animate-rise-delay-1 mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          An entertainment operating system that listens, then builds the world around you.
        </p>

        <form
          onSubmit={submit}
          className="animate-rise animate-rise-delay-2 vdoc-prompt glass-panel surface-depth mt-12 rounded-[1.75rem] p-2 transition-all duration-500 md:mt-14"
          role="search"
          aria-label="Speak to VDOC"
        >
          <label htmlFor="vdoc-command" className="sr-only">
            Tell VDOC what to create or enter
          </label>
          <textarea
            id="vdoc-command"
            rows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="What should the world become?"
            className="w-full resize-none bg-transparent px-4 py-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none md:text-[1.05rem]"
          />
          <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-1">
            <button
              type="button"
              onClick={() => setListening((v) => !v)}
              aria-pressed={listening}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <AudioLines
                className={`h-4 w-4 ${listening ? "text-signal" : ""}`}
                aria-hidden
              />
              {listening ? "Listening…" : "Voice"}
            </button>
            <button
              type="submit"
              disabled={!value.trim()}
              aria-label="Send to VDOC"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-lunar text-primary-foreground transition-all duration-300 enabled:hover:scale-[1.04] enabled:hover:shadow-[0_0_36px_var(--glow-warm)] disabled:opacity-35"
            >
              <ArrowUp className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </form>

        <ul className="animate-rise animate-rise-delay-3 mt-6 flex flex-wrap gap-2" aria-label="Suggestions">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => setValue(s)}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-left text-[13px] text-muted-foreground transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-foreground"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
