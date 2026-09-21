'use client'

import * as React from 'react'
import {
  ArrowUp,
  AudioLines,
  ImagePlus,
  Paperclip,
  Square,
  X,
} from 'lucide-react'
import type { Attachment } from '@/lib/converse/types'
import { useConverse } from '@/lib/converse/store'
import {
  IxDropZone,
  IxVoiceAura,
  playSubmitBurst,
  useRipple,
} from '@/components/motion/interactions'
import { cn } from '@/lib/utils'

function uid() {
  return `att-${Math.random().toString(36).slice(2, 9)}`
}

type SpeechRec = {
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: ((event: {
    resultIndex: number
    results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>
  }) => void) | null
  onend: (() => void) | null
}

function getSpeechRecognition(): (new () => SpeechRec) | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRec
    webkitSpeechRecognition?: new () => SpeechRec
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function FloatingInput() {
  const { send, suggestions, state, dispatch, abortRef, path } = useConverse()
  const [value, setValue] = React.useState('')
  const [attachments, setAttachments] = React.useState<Attachment[]>([])
  const [dragging, setDragging] = React.useState(false)
  const [listening, setListening] = React.useState(false)
  const [typing, setTyping] = React.useState(false)
  const taRef = React.useRef<HTMLTextAreaElement>(null)
  const fileRef = React.useRef<HTMLInputElement>(null)
  const sendRef = React.useRef<HTMLButtonElement>(null)
  const recognitionRef = React.useRef<SpeechRec | null>(null)
  const typingTimer = React.useRef(0)
  const ripple = useRipple()

  const streaming = path.some((m) => m.streaming)
  const empty = path.length === 0
  const voiceOn = listening || state.voiceActive

  const resize = React.useCallback(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [])

  React.useEffect(() => {
    resize()
  }, [value, resize])

  React.useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (typeof detail === 'string') setValue(detail)
      taRef.current?.focus()
    }
    window.addEventListener('vdoc:prefill', onPrefill)
    return () => window.removeEventListener('vdoc:prefill', onPrefill)
  }, [])

  const addFiles = (files: FileList | File[]) => {
    const list = Array.from(files).slice(0, 6)
    const next: Attachment[] = list.map((f) => ({
      id: uid(),
      name: f.name,
      type: f.type || 'application/octet-stream',
      size: f.size,
      url: URL.createObjectURL(f),
    }))
    setAttachments((a) => [...a, ...next].slice(0, 8))
  }

  const submit = async () => {
    const trimmed = value.trim()
    if (!trimmed && attachments.length === 0) return
    if (streaming) return
    playSubmitBurst(sendRef.current)
    const text = trimmed || 'Describe these attachments'
    setValue('')
    const atts = attachments
    setAttachments([])
    await send(text, { attachments: atts.length ? atts : undefined })
  }

  const toggleVoice = () => {
    const SR = getSpeechRecognition()

    if (!SR) {
      dispatch({ type: 'SET_VOICE', active: !state.voiceActive })
      setListening((l) => !l)
      return
    }

    if (listening && recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
      setListening(false)
      dispatch({ type: 'SET_VOICE', active: false })
      return
    }

    const rec = new SR()
    rec.continuous = true
    rec.interimResults = true
    rec.onresult = (event) => {
      let interim = ''
      let final = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript
        if (event.results[i].isFinal) final += t
        else interim += t
      }
      if (final) setValue((v) => (v ? `${v} ${final}` : final).trim())
      else if (interim) {
        setValue((v) => {
          const base = v.replace(/\s*\[listening…\]$/, '')
          return `${base}${base ? ' ' : ''}[listening…]`.trim()
        })
      }
    }
    rec.onend = () => {
      setListening(false)
      dispatch({ type: 'SET_VOICE', active: false })
      setValue((v) => v.replace(/\s*\[listening…\]$/, '').trim())
    }
    recognitionRef.current = rec
    rec.start()
    setListening(true)
    dispatch({ type: 'SET_VOICE', active: true })
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-3 pb-4 pt-16 sm:px-6">
      <div
        className={cn(
          'pointer-events-auto mx-auto w-full max-w-2xl',
          'transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
          empty && 'sm:translate-y-[-8vh]'
        )}
      >
        {empty && (
          <div className="mb-6 text-center">
            <p className="ds-label mb-2">Converse</p>
            <p className="font-display text-2xl font-semibold tracking-tight text-lunar sm:text-3xl">
              What should we create?
            </p>
          </div>
        )}

        {empty && (
          <ul className="mb-4 flex flex-wrap justify-center gap-2" aria-label="Suggestions">
            {suggestions.slice(0, 3).map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setValue(s)}
                  className="max-w-[16rem] truncate rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-white/[0.03] px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:border-cyan/30 hover:text-foreground"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}

        <IxDropZone active={dragging}>
          <div
            onDragEnter={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
            }}
            className={cn(
              'vdoc-prompt ix-drop ds-glass-strong relative rounded-[var(--radius-2xl)] border border-[var(--glass-border)] p-2',
              'transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
              'focus-within:shadow-[var(--shadow-focus)]',
              voiceOn && 'ring-1 ring-cyan/30'
            )}
          >
            {attachments.length > 0 && (
              <ul className="flex flex-wrap gap-2 px-3 pt-2">
                {attachments.map((a) => (
                  <li
                    key={a.id}
                    className="ix-attach-in inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/25 py-1 pl-2 pr-1 text-[11px] text-lunar/80"
                  >
                    {a.type.startsWith('image/') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.url} alt="" className="size-6 rounded object-cover" />
                    ) : (
                      <Paperclip className="size-3.5 text-cyan" />
                    )}
                    <span className="max-w-[8rem] truncate">{a.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachments((list) => list.filter((x) => x.id !== a.id))
                      }
                      className="ix-btn rounded-md p-1 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                      aria-label="Remove"
                    >
                      <X className="size-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <textarea
              ref={taRef}
              rows={1}
              value={value}
              data-typing={typing || undefined}
              aria-label="Message VDOC"
              onChange={(e) => {
                setTyping(true)
                window.clearTimeout(typingTimer.current)
                typingTimer.current = window.setTimeout(() => setTyping(false), 420)
                setValue(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void submit()
                }
              }}
              placeholder={
                dragging
                  ? 'Drop to attach…'
                  : voiceOn
                    ? 'Listening…'
                    : empty
                      ? 'Ask anything — image, video, movie, story, code…'
                      : 'Continue the thread'
              }
              className="ix-typefield ix-focus max-h-[200px] w-full resize-none bg-transparent px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground"
            />

            <div className="flex items-center justify-between gap-2 px-1.5 pb-1">
              <div className="flex items-center gap-0.5">
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.txt,.md,.csv"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files)
                    e.target.value = ''
                  }}
                />
                <button
                  type="button"
                  onPointerDown={ripple}
                  onClick={() => fileRef.current?.click()}
                  className="ix-btn relative overflow-hidden rounded-full p-2.5 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                  aria-label="Attach"
                >
                  <Paperclip className="size-4" />
                </button>
                <button
                  type="button"
                  onPointerDown={ripple}
                  onClick={() => {
                    fileRef.current?.setAttribute('accept', 'image/*')
                    fileRef.current?.click()
                    window.setTimeout(() => {
                      fileRef.current?.setAttribute(
                        'accept',
                        'image/*,.pdf,.txt,.md,.csv'
                      )
                    }, 0)
                  }}
                  className="ix-btn relative overflow-hidden rounded-full p-2.5 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                  aria-label="Upload image"
                >
                  <ImagePlus className="size-4" />
                </button>
                <button
                  type="button"
                  onPointerDown={ripple}
                  onClick={toggleVoice}
                  aria-pressed={voiceOn}
                  className={cn(
                    'ix-btn relative overflow-hidden rounded-full p-2.5',
                    voiceOn
                      ? 'bg-cyan/15 text-cyan'
                      : 'text-muted-foreground hover:bg-white/[0.06] hover:text-foreground'
                  )}
                  aria-label="Voice mode"
                >
                  <IxVoiceAura active={voiceOn} />
                  <AudioLines className={cn('relative size-4', voiceOn && 'animate-signal')} />
                </button>
              </div>

              {streaming ? (
                <button
                  type="button"
                  onPointerDown={ripple}
                  onClick={() => abortRef.current?.abort()}
                  className="ix-btn relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-lunar text-space"
                  aria-label="Stop"
                >
                  <Square className="size-3.5" fill="currentColor" />
                </button>
              ) : (
                <button
                  ref={sendRef}
                  type="button"
                  onPointerDown={ripple}
                  onClick={() => void submit()}
                  disabled={!value.trim() && attachments.length === 0}
                  className="ix-btn relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-lunar text-space enabled:hover:shadow-[var(--shadow-glow-cyan)] disabled:opacity-30"
                  aria-label="Send"
                >
                  <ArrowUp className="size-5" />
                </button>
              )}
            </div>
          </div>
        </IxDropZone>

        <p className="mt-2 text-center text-[12px] text-muted-foreground">
          Enter to send · Shift+Enter for newline · Drop files on the input
        </p>
      </div>
    </div>
  )
}
