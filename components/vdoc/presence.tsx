"use client"

import { useState, type FormEvent } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

const opening = [
  {
    role: "presence" as const,
    text: "You’re early. The portals are still warm. Tell me who you want to be when you walk through.",
  },
  {
    role: "you" as const,
    text: "Someone who remembers a city that doesn’t exist yet.",
  },
  {
    role: "presence" as const,
    text: "Then we’ll build the memory first. Stay close — I’ll keep the light soft.",
  },
]

const choices = [
  "Follow the quieter street",
  "Ask her what she forgot",
  "Leave something behind",
]

export function Presence() {
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState(opening)

  const send = (e?: FormEvent) => {
    e?.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { role: "you", text: trimmed },
      {
        role: "presence",
        text: "Noted. The world leans toward that choice — listen for the shift.",
      },
    ])
    setValue("")
  }

  return (
    <section
      id="presence"
      className="relative py-28 md:py-36"
      aria-labelledby="presence-heading"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="mb-14 text-center md:mb-16">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-signal">
            Presence
          </p>
          <h2
            id="presence-heading"
            className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            Speak with the world.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty text-muted-foreground md:text-lg">
            Characters that listen. Choices that rewrite the scene.
          </p>
        </div>

        <div className="glass-soft surface-depth overflow-hidden rounded-[1.75rem]">
          <div className="flex items-center gap-4 border-b border-white/[0.06] px-6 py-5">
            <div className="relative h-11 w-11 shrink-0">
              <div className="absolute inset-0 rounded-full bg-signal/25 animate-breathe" />
              <div
                className="absolute inset-1 overflow-hidden rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face)",
                }}
                role="img"
                aria-label="Nova"
              />
            </div>
            <div className="min-w-0 text-left">
              <p className="font-display text-lg font-semibold tracking-tight text-lunar">
                Nova
              </p>
              <p className="text-xs text-muted-foreground">Presence · online in Lumen Fields</p>
            </div>
          </div>

          <div
            className="flex max-h-[28rem] flex-col gap-5 overflow-y-auto px-6 py-8"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={cn(
                  "flex",
                  m.role === "you" ? "justify-end" : "justify-start"
                )}
              >
                <p
                  className={cn(
                    "max-w-[85%] text-pretty text-[15px] leading-relaxed md:text-base",
                    m.role === "you"
                      ? "rounded-3xl rounded-br-lg bg-lunar/95 px-5 py-3.5 text-primary-foreground"
                      : "text-foreground/90"
                  )}
                >
                  {m.role === "presence" && (
                    <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-signal">
                      Nova
                    </span>
                  )}
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.06] px-5 py-4">
            <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Story choices">
              {choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setValue(choice)}
                  className="rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[13px] text-muted-foreground transition-all duration-300 hover:border-signal/40 hover:text-foreground"
                >
                  {choice}
                </button>
              ))}
            </div>

            <form
              onSubmit={send}
              className="flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 transition-colors focus-within:border-white/[0.16]"
            >
              <label htmlFor="presence-input" className="sr-only">
                Message Nova
              </label>
              <input
                id="presence-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Reply…"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!value.trim()}
                aria-label="Send message"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lunar text-primary-foreground transition-opacity disabled:opacity-35"
              >
                <ArrowUp className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
