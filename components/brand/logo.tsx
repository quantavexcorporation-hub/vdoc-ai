'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  href?: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  priority?: boolean
  onClick?: () => void
  framed?: boolean
}

const sizes = {
  sm: { w: 112, h: 48, img: 'h-9 w-auto rounded-lg' },
  md: { w: 148, h: 64, img: 'h-11 w-auto rounded-xl' },
  lg: { w: 196, h: 84, img: 'h-14 w-auto rounded-xl sm:h-16' },
  xl: { w: 280, h: 120, img: 'h-[4.5rem] w-auto rounded-2xl sm:h-20' },
} as const

/**
 * Official vdoc logo — original navy glyph on burgundy field (unchanged).
 */
export function BrandLogo({
  href = '/',
  className,
  size = 'md',
  priority,
  onClick,
  framed = false,
}: BrandLogoProps) {
  const s = sizes[size]

  const mark = (
    <span
      className={cn(
        'group/logo relative inline-flex items-center justify-center',
        framed &&
          'rounded-2xl p-1 shadow-[var(--shadow-md),0_0_28px_oklch(0.82_0.14_200_/0.1)] ring-1 ring-white/10',
        className
      )}
    >
      <Image
        src="/vdoc-logo.png?v=5"
        alt="vdoc"
        width={s.w}
        height={s.h}
        priority={priority}
        unoptimized
        className={cn(
          s.img,
          'object-cover object-center',
          'shadow-[0_8px_24px_rgba(0,0,0,0.45)]',
          'transition-transform duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
          'group-hover/logo:scale-[1.02]'
        )}
      />
    </span>
  )

  if (!href) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center transition-transform duration-[var(--duration-fast)] ease-[var(--ease-emphasized)] active:scale-[0.98]"
        aria-label="Awaken VDOC"
      >
        {mark}
      </button>
    )
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex items-center transition-transform duration-[var(--duration-fast)] ease-[var(--ease-emphasized)] active:scale-[0.98]"
      aria-label="vdoc home"
    >
      {mark}
    </Link>
  )
}
