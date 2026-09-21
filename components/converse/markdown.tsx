'use client'

import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

function PreBlock({ children }: { children: React.ReactNode }) {
  const preRef = React.useRef<HTMLPreElement>(null)
  const [copied, setCopied] = React.useState(false)
  const [lang, setLang] = React.useState('code')

  React.useEffect(() => {
    const code = preRef.current?.querySelector('code')
    const match = code?.className.match(/language-(\w+)/)
    if (match) setLang(match[1])
  }, [children])

  const copy = async () => {
    const text = preRef.current?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="converse-code group relative my-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0c12]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan/80">
          {lang}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] text-muted-foreground transition-colors duration-[var(--duration-fast)] hover:bg-white/[0.06] hover:text-foreground"
        >
          {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        ref={preRef}
        className="overflow-x-auto p-4 text-[13px] leading-relaxed [&_code]:font-mono [&_code]:text-[13px] [&_code]:bg-transparent [&_code]:p-0"
      >
        {children}
      </pre>
    </div>
  )
}

export function Markdown({
  content,
  className,
  streaming,
}: {
  content: string
  className?: string
  streaming?: boolean
}) {
  return (
    <div
      className={cn(
        'converse-md max-w-none text-[15px] leading-[1.7] text-lunar/90',
        streaming && 'converse-md-streaming',
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-3 mt-6 font-display text-2xl font-semibold tracking-tight text-lunar first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-2 mt-5 font-display text-xl font-semibold tracking-tight text-lunar">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 font-display text-lg font-semibold text-lunar">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-3 list-disc space-y-1.5 pl-5 marker:text-cyan/60">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1.5 pl-5 marker:text-cyan/60">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-cyan underline decoration-cyan/30 underline-offset-4 transition-colors hover:decoration-cyan"
              target="_blank"
              rel="noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-lunar">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-2 border-cyan/40 pl-4 text-muted-foreground">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-white/[0.08]" />,
          pre: ({ children }) => <PreBlock>{children}</PreBlock>,
          code: ({ className, children, ...props }) => {
            const isBlock = typeof className === 'string' && className.includes('language-')
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code
                className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.86em] text-cyan"
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
      {streaming && <span className="converse-caret" aria-hidden />}
    </div>
  )
}
